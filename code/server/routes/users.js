const express = require("express");
const router = express.Router();
const userController = require("../controllers/users");
const { auth } = require("../middleware/auth");

router.get("/auth", auth, userController.auth);

router.post("/register", userController.register);

router.post("/login", userController.login);

router.get("/logout", auth, userController.logout);

router.post("/updateInformation", auth, userController.updateInformation);

router.get("/getAllUsers", auth, userController.getAllUsers);

router.get("/getUserById", auth, userController.getUserById);

router.get("/deleteUserById", auth, userController.deleteUserById);

module.exports = router;
