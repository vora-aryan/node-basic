const userModel = require("../models/user.model");
const { generatePass, comparePass } = require("../util/genPassword");
const { generateToken } = require("../util/tokenUtil");
const { sendMailUtil } = require("./mailController");
const jwt = require("jsonwebtoken");

const getAllUsers = async (req, res) => {
  const users = await userModel.find().populate("role");
  res.json({
    message: "List of users",
    data: users,
  });
};

const getUserById = async (req, res) => {
  const user = await userModel.findById(req.params.id);
  if (user) {
    res.json({
      message: "User found",
      data: user,
    });
  } else {
    res.json({
      message: "User not found",
    });
  }
};

const addUser = async (req, res) => {
  const { name, age, course, stauts, password, email } = req.body;

  req.body.password = await generatePass(req.body.password);
  const user = await userModel.create(req.body);

  const token = generateToken(user.toObject(), "abc");

  sendMailUtil(email, token);

  res.json({
    data: user,
  });
};

const verifyUser = async (req, res) => {
  const { token } = req.query;

  if (!token) return res.json({ message: "Token required" });
  console.log(token);

  try {
    const user = jwt.verify(token, "abc");

    // if (!user) {
    //   return res.json({ message: "User invalid" });
    // }

    const validateUser = await userModel.findById(user._id);

    const updateStatus = await userModel.updateOne(
      { _id: user._id },
      { $set: { verfied: true } }
    );

    if (!validateUser) return res.json({ message: "User invalid" });

    return res.json({
      message: "User verified successfully",
      updateStatus,
    });
  } catch (error) {
    return res.json({ message: "Something went wrong" });
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  console.log("id---" + id);
  const deletedUser = await userModel.findByIdAndDelete(id);
  if (deletedUser) {
    res.json({
      message: "User deleted successfully",
      data: deletedUser,
    });
  } else {
    res.json({
      message: "User not found",
    });
  }
};
const deleteUserByName = async (req, res) => {
  const name = req.query.name;

  const deletedUsers = await userModel.deleteMany({ name: name });
  if (deletedUsers) {
    res.json({
      message: "Users deleted successfully",
      data: deletedUsers,
    });
  } else {
    res.json({
      message: "User not found",
    });
  }
};

const updateUser = async (req, res) => {
  const id = req.params.id;
  const updateUserObj = req.body;

  const updatedUser = await userModel.findByIdAndUpdate(id, updateUserObj, {
    new: true,
  });

  if (updatedUser) {
    res.json({ msg: "User updated successfully", data: updatedUser });
  } else {
    res.json({ msg: "User not found" });
  }
};

const loginUser = async (req, res) => {
  const { name, password } = req.body;

  const userExist = await userModel.findOne({ name: name });
  console.log(userExist);

  if (userExist) {
    const validateUser = await comparePass(password, userExist.password);

    if (validateUser) {
      const token = generateToken(userExist.toObject());
      res.json({
        message: "Login success",
        data: token,
      });

      res.json({ message: "User logged in" });
    } else {
      res.status(401).json({ message: "Wrong password" });
    }
  } else {
    res.status(402).json({ message: "User not found" });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  deleteUser,
  deleteUserByName,
  updateUser,
  verifyUser,
  loginUser,
};
