const mongoose = require("mongoose");

const blockUser = mongoose.Schema({
  timeBlock: { type: Date, default: new Date(), expires: "1m" },
});
mongoose.set("runValidators", true);

const blocked = mongoose.model("blockusers", blockUser);
module.exports = blocked;
