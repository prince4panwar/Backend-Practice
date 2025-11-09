const express = require("express");
const router = express.Router();
const {
  createTodo,
  getTodos,
  deleteTodo,
  updateTodo,
  getTodoById,
} = require("../controller/todoController.js");

router.post("/todos", createTodo);
router.get("/todos", getTodos);
router.get("/todos/:id", getTodoById);
router.delete("/todos/:id", deleteTodo);
router.patch("/todos/:id", updateTodo);

module.exports = router;
