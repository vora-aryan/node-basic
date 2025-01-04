const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: ["admin", "user"],
  },
});

const roleModel = mongoose.model("roles", roleSchema);
module.exports = roleModel;
