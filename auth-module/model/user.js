const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// Create schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    immutable: true, // ✅ Email can't be changed after creation
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    match: [/^\+92[0-9]{10}$/, "Phone must be valid Pakistani number with +92"],
  },
  gender: {
    type: String,
    enum: ["male", "female", "custom"],
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  profile: {
    type: String, // will store image path
  },
  cover: {
    type: String, // will store image path
  },
  passwordChangedAt: {
    type: Date,
    default: null,
  }
});

// ✅ Pre-save hook to log creation (you can use it later for password hashing)
userSchema.pre("save", function (next) {
  console.log("User is being saved...");
  next();
});
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model("User", userSchema);
