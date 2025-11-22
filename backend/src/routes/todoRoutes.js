const express = require("express");
const multer = require("multer");
const router = express.Router();
const {
  createTodo,
  getTodos,
  deleteTodo,
  updateTodo,
  getTodoById,
} = require("../controller/todoController.js");
const {
  isAuthenticatedUser,
} = require("../middlewares/authRequestValidator.js");

const upload = multer({ storage: multer.memoryStorage() });

router.post("/todos", upload.single("image"), isAuthenticatedUser, createTodo);
router.get("/todos", isAuthenticatedUser, getTodos);
router.get("/todos/:id", isAuthenticatedUser, getTodoById);
router.delete("/todos/:id", isAuthenticatedUser, deleteTodo);
router.patch(
  "/todos/:id",
  upload.single("image"),
  isAuthenticatedUser,
  updateTodo
);

module.exports = router;
