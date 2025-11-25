import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserStore } from "../store/userStore";
import { LogOut } from "lucide-react";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = loading
  const user = useUserStore((state) => state.user);
  const addUser = useUserStore((state) => state.addUser);
  const deleteUser = useUserStore((state) => state.deleteUser);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    verifyUser();
  }, [token, navigate]);

  const verifyUser = async () => {
    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    try {
      const response = await axios.get(
        "http://localhost:3000/api/users/authenticate",
        {
          headers: { "x-access-token": token },
        }
      );
      addUser(response.data.data);

      if (response.data.success) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      setIsAuthenticated(false);
    }
  };

  function onLogout() {
    deleteUser();
    navigate("/login");
    toast.success("Logged out successfully");
    setTimeout(() => {
      localStorage.removeItem("token");
    }, 1);
  }

  // While checking token validity, show a loader
  if (isAuthenticated === null) {
    return (
      <div className="bg-blue-400 text-center text-white">Loading Tasks...</div>
    );
  }

  // If not authenticated, redirect
  if (!isAuthenticated) {
    toast.error("Please login first");
    return <Navigate to="/login" replace />;
  }

  // Otherwise, render protected children
  return (
    <div className="h-screen overflow-hidden">
      <div
        className="text-3xl font-bold sticky top-0 px-8 py-2 flex items-center bg-blue-500 text-white w-full"
        style={{
          height: "70px",
        }}
      >
        <div className="w-1/2 flex justify-end">
          <span className="font-bold"> {user?.name}'s Tasks</span>
        </div>
        <div className="w-1/2 flex justify-end items-center gap-4">
          <Avatar
            onClick={() => navigate("/update/username")}
            className="w-10 h-10"
          >
            <AvatarImage src={user?.pic} className="cursor-pointer" />
            <AvatarFallback>
              <img
                src="https://res.cloudinary.com/dsaiclywa/image/upload/v1763988872/user_qe0ygk.png"
                alt="profile image"
                className="cursor-pointer"
              />
            </AvatarFallback>
          </Avatar>
          <Link className="text-sm hover:underline" onClick={onLogout}>
            Logout
          </Link>
        </div>
      </div>
      {children}
    </div>
  );
};

export default ProtectedRoute;
