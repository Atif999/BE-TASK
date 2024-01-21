const express = require("express");
const UserController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authenticationMiddleware");
const {
  validateCreateUser,
  validateUpdateUser,
  validateLogin,
} = require("../middlewares/validateUser");

const router = express.Router();

router.post("/", validateCreateUser, UserController.createUser);

router.put("/", authMiddleware, validateUpdateUser, UserController.updateUser);

router.get("/", authMiddleware, UserController.getUser);

router.delete("/", authMiddleware, UserController.deleteUser);

router.post("/login", validateLogin, UserController.login);

router.post("/logout/all", UserController.logoutAll);

module.exports = router;
