const jwt = require("jsonwebtoken");

const ApiError = require("../utils/apiError");

exports.jwtAuth = (req, res, next) => {
  const headerToken = req.headers.authorization;
  if (!headerToken) {
    throw new ApiError(
      401,
      "You are not logged in! Please log in to get access."
    );
  }
  const token = headerToken.split(" ")[1];
  if (!token) {
    throw new ApiError(401, "invalid signature");
  }
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (err) {
    // console.log(JSON.stringify(err, null, 2));
    throw new ApiError(401, "invalid signature");
  }
};
