import "./App.css";
import React from "react";
import TodoPage from "./pages/TodoPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import { Toaster } from "react-hot-toast";

const router = createBrowserRouter([
  { path: "/", Component: Register },
  { path: "/login", Component: Login },
  {
    path: "/todos",
    element: (
      <ProtectedRoute>
        <TodoPage />
      </ProtectedRoute>
    ),
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 1300,
        }}
      />
    </>
  );
}

export default App;
