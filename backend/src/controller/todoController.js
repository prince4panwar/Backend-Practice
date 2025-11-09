const Todo = require("../models/Todo.js");

const createTodo = async (req, res) => {
  try {
    const { name, email, content } = req.body;
    const todo = await Todo.create({ name, email, content });
    return res.status(201).json({
      success: true,
      message: "Todo created successfully",
      data: todo,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Could not create todo",
      error: error,
    });
  }
};

const getTodos = async (req, res) => {
  try {
    const todo = await Todo.find({});
    return res.status(200).json({
      success: true,
      message: "Todo fetched successfully",
      data: todo,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Could find todos",
      error: error,
    });
  }
};

const getTodoById = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    return res.status(200).json({
      success: true,
      message: "Todo fetched successfully",
      data: todo,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Could not find todo",
      error: error,
    });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "Todo deleted successfully",
      data: todo,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Could not delete todo",
      error: error,
    });
  }
};

const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, content } = req.body;
    const todo = await Todo.findByIdAndUpdate(
      id,
      { name, email, content },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Todo updated successfully",
      data: todo,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Could not update todo",
      error: error,
    });
  }
};

module.exports = {
  createTodo,
  getTodos,
  getTodoById,
  deleteTodo,
  updateTodo,
};
