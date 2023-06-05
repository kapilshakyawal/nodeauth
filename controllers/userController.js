const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.userSignup = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Name , Email or Password is not found!" });
  }
  const user = await userModel.create({
    name,
    email,
    password,
  });
  if (!user) {
    return res.status(400).json({ message: "Error in registering user..." });
  }

  res.status(200).json({ message: "User registered!" });
};

exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email or Password not found!" });
    }
    const findUser = await userModel.findOne({ email });
    console.log(findUser);
    if (!findUser) {
      return res.status(400).json({ message: "User not found." });
    }
    const token = jwt.sign(
      {
        data: email,
      },
      "kapilshakyawalhere",
      { expiresIn: "1h" }
    );
    console.log(token);
    const filter = { email: email };
    const update = { token: token };
    const user = await userModel.findOneAndUpdate(filter, update);
    console.log(user);
    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }
    res.status(200).json({ message: "User Login sucessfully!" });
  } catch (error) {
    res.send(error);
  }
};
