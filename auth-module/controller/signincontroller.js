const User = require("../model/user");
const bcrypt = require("bcrypt");

const signin = async (req, res) => {
    console.log("Received body:", req.body);
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    // Find user by email
    const user = await User.findOne({ email });
    console.log("user found",user)
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match:", isMatch);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Return success
    res.status(200).json({ message: "Signin successful!" });
  } catch (err) {
    console.error("Signin Error:", err);
    res.status(500).json({ message: "Server error." });
  }
};

module.exports = {signin};
