import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import TodoPage from "./pages/TodoPage.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import React from "react";
import Username from "./pages/Username.jsx";

const router = createBrowserRouter([
  { path: "/", Component: Register },
  { path: "/login", Component: Login },
  {
    path: "/update/username",
    element: (
      <ProtectedRoute>
        <Username />
      </ProtectedRoute>
    ),
  },
  {
    path: "/todos",
    element: (
      <ProtectedRoute>
        <TodoPage />
      </ProtectedRoute>
    ),
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
