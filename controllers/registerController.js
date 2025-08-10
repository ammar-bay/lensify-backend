const User = require("../model/User");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { email, password, re_password, name } = req.body;
  console.log(req.body);
  try {
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    if (password !== re_password) {
      return res.status(400).json({ message: "Passwords don't match" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await User.create({
      email,
      password: hashedPassword,
      name,
    });
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

module.exports = { handleNewUser };
