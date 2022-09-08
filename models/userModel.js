const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Blocked = require("./blockUser");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please tell us your name!"],
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
    },
    photo: {
      type: String,
      default: "default.jpg",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minLength: [6, "Please more than 6 characters"],
      maxLength: [30, "max length 30 characters"],
      select: false,
    },
    active: {
      type: Boolean,
    },

    blockedUser: {
      type: mongoose.Types.ObjectId,
      ref: "blockusers",
    },

    countMistake: {
      type: Number,
      default: 0,
    },
  },
  // options
  {
    toJSON: {
      virtuals: true,
    },
  }
);

mongoose.set("runValidators", true);

userSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    const salt = bcrypt.genSaltSync();
    const hashPassword = bcrypt.hashSync(this.password, salt);
    this.password = hashPassword;
    next();
  }
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  if (
    this.blockedUser != undefined &&
    (await Blocked.findById(this.blockedUser)) != null
  ) {
    return "blocked";
  }

  if (!(await bcrypt.compare(candidatePassword, userPassword))) {
    if (this.countMistake == 5) {
      const blocked = await Blocked.create({});
      await this.updateOne({
        countMistake: 0,
        blockedUser: blocked._id,
      });
      return "blocked";
    }
    await this.updateOne({
      countMistake: this.countMistake + 1,
    });
    return false;
  }
  await this.updateOne({
    countMistake: 0,
  });
  this.set("blockedUser", undefined, { strict: false });
  return true;
};

const Users = mongoose.model("users", userSchema);
module.exports = Users;
