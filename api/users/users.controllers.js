const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const saltRounds = 10;
dotenv.config();
const hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

const generateToken = (user) => {
  const payload = { id: user._id, username: user.username };
  const token = jwt.sign(payload, process.env.JWT_SECERET, { expiresIn: "1h" });
  return token;
};

exports.signup = async (req, res, next) => {
  try {
    const { password } = req.body;
    const securePass = await hashPassword(password);
    req.body.password = securePass;
    const newUser = await User.create(req.body);
    const token = generateToken(newUser);
    res.status(201).json({ token: token });
  } catch (err) {
    next(err);
  }
};

exports.signin = async (req, res) => {
  try {
    const token = generateToken(req.user);
    res.status(201).json({ token: token });
  } catch (error) {
    res.status(500).json("Server Error");
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().populate("urls");
    res.status(201).json(users);
  } catch (err) {
    next(err);
  }
};
