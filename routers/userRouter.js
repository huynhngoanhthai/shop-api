const express = require("express");
const authController = require("../controllers/authController");
const { jwtAuth } = require("../middlewares/jwtAuth");

const router = express.Router();
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/resetPassword", jwtAuth, authController.resetPassword);
router.post("/forgotPassword", authController.forgotPassword);

module.exports = router;
