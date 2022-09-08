const catchError = (err, req, res, next) => {
  console.log(JSON.stringify(err, null, 2));

  if (err.code === 11000) {
    err.statusCode = 400;
    const key = Object.keys(err.keyValue);
    err.message = `${key} is supplicated`;
  }
  if (err.name === "ValidationError") {
    const keys = Object.keys(err.errors);
    const ErrorObj = {};
    keys.map((key) => {
      if (key === "count") ErrorObj["block"] = "your account is blocked";
      else ErrorObj[key] = err.errors[key].message;
    });

    err.statusCode = 400;
    err.message = ErrorObj;
  }
  if (err.kind === "ObjectId") {
    err.statusCode = 400;
    err.message = "bad id";
  }
  res.status(err.statusCode).json({
    success: false,
    statusCode: err.statusCode,
    message: err.message,
  });
};
module.exports = catchError;
