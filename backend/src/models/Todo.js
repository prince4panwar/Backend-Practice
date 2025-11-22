const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "in-progress"],
      default: "pending",
    },
    image: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Todo = mongoose.model("Todo", todoSchema);
module.exports = Todo;
