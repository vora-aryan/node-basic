const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
    },
    password: {
      type: String,
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "roles",
    },
    age: {
      type: Number,
    },
    course: {
      type: String,
    },
    status: {
      type: Boolean,
      default: true,
    },
    field: {
      type: String,
      enum: ["IT", "Other"],
    },
    verfied: {
      type: Boolean,
      default: false,
    },
    hobbies: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
