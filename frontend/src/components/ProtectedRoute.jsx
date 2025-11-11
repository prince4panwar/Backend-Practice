import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = loading
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
  }, [token]);

  // While checking token validity, show a loader
  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  // If not authenticated, redirect
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise, render protected children
  return children;
};

export default ProtectedRoute;
