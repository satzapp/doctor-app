const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    fullName: String,
    email: String,
    mobile: Number,
    role: Number,
    password: String,
    status: Boolean,
  },
  {
    timestamps: true,
  }
);
const User = (module.exports = mongoose.model("users", userSchema));

module.exports.checkEmailExists = async (email) => {
  var emailCheck = await User.find({ email: email });
  return emailCheck.length ? true : false;
};

module.exports.checkMobileExists = async (mobile) => {
  var mobileCheck = await User.find({ mobile: mobile });
  return mobileCheck.length ? true : false;
};
