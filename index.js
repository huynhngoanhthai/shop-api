require("dotenv").config();
require("./configs/DB/mongodb");
const express = require("express");
const cors = require("cors");
const EmailService = require("./utils/sendMail");
EmailService.init();
const app = express();
app.use(express.json());
app.use(cors());
const userRouter = require("./routers/userRouter");
app.use("/api/v1/users", userRouter);
const productRouter = require("./routers/productRouter");
app.use("/api/v1/products", productRouter);

const ApiError = require("./utils/apiError");
app.all("*", (req, res, next) => {
  next(new ApiError(404, `Can't find ${req.originalUrl} on this server!`));
});

// middlewares
const catchError = require("./middlewares/catchError");
app.use(catchError);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
