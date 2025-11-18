const express = require("express");
const router = express.Router();

const {
  createUser,
  logInUser,
  getUsers,
  isAuthenticated,
  updateUser,
} = require("../controller/userController.js");
const {
  isAuthenticatedUser,
} = require("../middlewares/authRequestValidator.js");

router.get("/users", getUsers);
router.post("/users/signup", createUser);
router.post("/users/signin", logInUser);
router.get("/users/authenticate", isAuthenticated);
router.patch("/users/:id", isAuthenticatedUser, updateUser);

module.exports = router;
