const cloudinary = require("../config/cloudinary.js");
const streamifier = require("streamifier");
const Todo = require("../models/Todo.js");

const createTodo = async (req, res) => {
  try {
    const { content, status } = req.body;
    let imageUrl = null;

    // If user attached an image file, upload to Cloudinary
    if (req.file) {
      // Wrap Cloudinary stream upload in a Promise
      const uploadResult = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "todos" },
          (error, result) => {
            if (error) {
              return reject(error);
            }
            return resolve(result);
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
      });

      imageUrl = uploadResult.secure_url; // hosted image link
    }

    const todo = await Todo.create({
      content,
      status,
      userId: req.userId,
      image: imageUrl,
    });

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
    const { userId } = req;
    const todo = await Todo.find({ userId })
      .populate({
        path: "userId",
        select: "name email", // only bring these fields
      })
      .lean();
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
    const { content, status } = req.body;
    let imageUrl = null;
    if (req.file) {
      // Wrap Cloudinary stream upload in a Promise
      const uploadResult = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "todos" },
          (error, result) => {
            if (error) {
              return reject(error);
            }
            return resolve(result);
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
      });

      imageUrl = uploadResult.secure_url; // hosted image link
    }

    const todo = imageUrl
      ? await Todo.findByIdAndUpdate(
          id,
          { content, status, image: imageUrl },
          { new: true }
        )
      : await Todo.findByIdAndUpdate(id, { content, status }, { new: true });
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
