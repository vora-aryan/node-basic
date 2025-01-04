const mongoose = require("mongoose");
const roleModel = require("../models/role.model");

const addRole = async (req, res) => {
  try {
    const roleData = await roleModel.create(req.body);

    res.json({
      msg: "Role added",
      data: roleData,
    });
  } catch (error) {
    console.log(error);

    res.json({
      message: "error while adding role" + error.message,
    });
  }
};

const getRoles = async (req, res) => {
  try {
    const roleData = await roleModel.find();

    res.json({
      msg: "Roles",
      data: roleData,
    });
  } catch (error) {
    res.json({
      message: "error while loading role",
    });
  }
};

module.exports = { addRole, getRoles };
