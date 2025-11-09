const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Todo = mongoose.model("Todo", todoSchema);
module.exports = Todo;
