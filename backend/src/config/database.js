const mongoose = require("mongoose");

const connect = async () => {
  try {
    await mongoose.connect("mongodb://localhost/todo-dev");
  } catch (error) {
    console.log("Something went wrong in database connection");
  }
};

module.exports = connect;
