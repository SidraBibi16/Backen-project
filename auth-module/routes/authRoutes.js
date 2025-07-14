const express = require("express");
const router = express.Router();
const User = require("../model/user");
const upload = require("../middleware/uploads");
const bcrypt = require("bcrypt");
const moment = require("moment");

// POST /signup route
router.post(
  "/signup",
  upload.fields([{ name: "profile" }, { name: "cover" }]),
  async (req, res) => {
    try {
      // ✅ 1. Validate and parse inputs
      const { username, email, password, phone, gender, dob } = req.body;

      if (!dob || isNaN(Date.parse(dob))) {
        return res.status(400).json({ message: "Invalid date of birth provided." });
      }

      // const dobDate = moment(dob, "YYYY-MM-DD");
      // if (!dobDate.isValid()) {
      //   return res.status(400).json({ message: "DOB format is invalid." });
      // }

      // const age = moment().diff(dobDate, "years");
      // if (age < 15) {
      //   return res.status(400).json({ message: "You must be at least 15 years old." });
      // }

      // ✅ 2. Check for existing user
      const existingEmail = await User.findOne({ email });
      if (existingEmail)
        return res.status(400).json({ message: "Email already exists." });

      const existingPhone = await User.findOne({ phone });
      if (existingPhone)
        return res.status(400).json({ message: "Phone number already used." });

      // ✅ 3. Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // ✅ 4. Handle uploaded files
      console.log("📂 Uploaded files:", req.files); // Debug log
      const profileFile = req.files?.profile?.[0]?.filename || "";
      const coverFile = req.files?.cover?.[0]?.filename || "";

      // ✅ 5. Create user
      const user = new User({
        username,
        email,
        password: hashedPassword,
        phone,
        gender,
        dob,
        profile: profileFile,
        cover: coverFile,
        passwordChangedAt: new Date(),
      });

      await user.save();

      // ✅ 6. Success response
      res.status(201).json({ message: "Signup successful!" });
    } catch (err) {
      console.error("❌ Signup Error:", err);
      res.status(500).json({ message: "Server error." });
    }
  }

);
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({}, "-password -__v"); // exclude password and __v
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users." });
  }
});


module.exports = router;
