const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  // console.log(req.body);
  const user = await User.findOne({ email });
  // console.log(user);
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    console.log("password incorrect");
    return res.status(400).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign({ email: user.email, id: user._id }, "test", {
    expiresIn: "1h",
  });
  res.status(200).json({ result: user, token });
};

module.exports = { handleLogin };
