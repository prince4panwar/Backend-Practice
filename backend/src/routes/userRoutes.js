const express = require("express");
const router = express.Router();

const {
  createUser,
  logInUser,
  getUsers,
  isAuthenticated,
} = require("../controller/userController.js");

router.get("/users", getUsers);
router.post("/users/signup", createUser);
router.post("/users/signin", logInUser);
router.get("/users/authenticate", isAuthenticated);

module.exports = router;
