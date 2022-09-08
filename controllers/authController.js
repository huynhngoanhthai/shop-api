const User = require("../models/userModel");
const { sign } = require("jsonwebtoken");
const ApiError = require("../utils/apiError");
const catchAsync = require("../middlewares/catchAsync");

exports.signup = catchAsync(async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.create({ name, email, password });

  res.status(200).json({
    message: "Successfully signed up!",
    data: user,
  });
});

exports.login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Please provide email and password!");
  }

  const user = await User.findOne({ email }).select("+password");

  const checked = await user.correctPassword(password, user.password);
  if (checked == "blocked") {
    throw new ApiError(403, "user blocked");
  }
  if (!user || !checked) {
    throw new ApiError(401, "Incorrect email or password");
  } else {
    const token = sign(
      {
        email: user.email,
        password: user.password, //password hashed
        name: user.name,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.status(200).json({
      success: true,
      token: token,
      user: req.user,
    });
  }
});

exports.forgotPassword = catchAsync(async (req, res) => {
  const { email } = req.body;

  if (!email) throw new ApiError(400, "Please provide email!");

  const user = await User.findOne({ email });

  const randomPassword = Math.floor(Math.random() * 99999999) + 10000000;

  user.updateOne({ password: randomPassword });
  EmailService.sendEmail(
    user.email,
    "forgot Password",
    "password new: " + randomPassword
  );

  res.status(200).json({ success: true, message: "Please checked your email" });
});

exports.resetPassword = catchAsync(async (req, res) => {
  const { password, passwordConfirmation } = req.body;
  const user = await User.findOneAndUpdate({ email: req.user.email });

  EmailService.sendEmail(
    "huynhngoanhthai@gmail.com",
    "Welcome to website",
    "user@example.com"
  );
});
