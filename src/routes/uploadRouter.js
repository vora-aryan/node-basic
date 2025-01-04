const uploadRouter = require("express").Router();
const uploadController = require("../controllers/uploadController");
const { upload } = require("../controllers/uploadController");

uploadRouter.post(
  "/upload",
  upload.single("myImg"),
  uploadController.uploadFile
);

module.exports = uploadRouter;
