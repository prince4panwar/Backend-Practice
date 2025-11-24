import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "motion/react";

function Todo() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [todo, setTodo] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/todos/${userId}`,
        {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        }
      );
      setTodo(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="h-screen overflow-auto">
      <div
        className="text-3xl font-bold sticky top-0 p-4 flex justify-center gap-4 bg-blue-500 text-white w-full"
        style={{
          height: "70px",
        }}
      >
        <span className="font-bold">Task Details</span>
      </div>
      <div className="px-4 py-6">
        <p className="font-bold rounded-xl bg-blue-200 mb-6 p-4">
          {todo?.content}
        </p>
        {todo?.image && <img src={todo?.image} alt="image" width={300} />}
        <p className="font-bold text-blue py-2">
          Status: {todo?.status.charAt(0).toUpperCase() + todo?.status.slice(1)}
        </p>
        <p className="font-bold text-blue px-py-2">
          Creation date:{" "}
          {new Date(todo?.createdAt).toLocaleString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
        </p>
      </div>
      <motion.button
        whileTap={{ scale: 0.95 }}
        className="bg-green-900 hover:bg-green-800 text-white py-2 px-4 mx-4 text-md font-bold rounded cursor-pointer"
        onClick={() => navigate("/todos")}
      >
        My Tasks
      </motion.button>
    </div>
  );
}

export default Todo;
