const mongoose = require("mongoose");

module.exports = mongoose.connect(process.env.MONGO_URL, function (err, db) {
  if (err) {
    return console.log(err);
  }
  console.log("Database connection successfully!");
});
