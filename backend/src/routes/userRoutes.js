const express = require("express");
const multer = require("multer");
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

const upload = multer({ storage: multer.memoryStorage() });

router.get("/users", getUsers);
router.post("/users/signup", upload.single("pic"), createUser);
router.post("/users/signin", logInUser);
router.get("/users/authenticate", isAuthenticated);
router.patch(
  "/users/:id",
  upload.single("pic"),
  isAuthenticatedUser,
  updateUser
);

module.exports = router;
