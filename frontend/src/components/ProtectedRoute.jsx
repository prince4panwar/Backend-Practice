import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserStore } from "../store/userStore";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = loading
  const user = useUserStore((state) => state.user);
  const addUser = useUserStore((state) => state.addUser);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
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

    verifyUser();
  }, [token, navigate]);

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
        className="text-3xl font-bold sticky top-0 p-4 flex justify-center items-center gap-4 bg-blue-500 text-white w-full"
        style={{
          height: "70px",
        }}
      >
        <span className="font-bold"> {user?.name}'s Tasks</span>
        <Avatar onClick={() => navigate("/update/username")}>
          <AvatarImage src={user?.pic} className="cursor-pointer" />
          <AvatarFallback>
            <img
              src="https://res.cloudinary.com/dsaiclywa/image/upload/v1763988872/user_qe0ygk.png"
              alt="profile image"
              className="cursor-pointer"
            />
          </AvatarFallback>
        </Avatar>
      </div>
      {children}
    </div>
  );
};

export default ProtectedRoute;
