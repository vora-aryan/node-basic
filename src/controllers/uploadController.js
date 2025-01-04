const multer = require("multer");

// steps to upload file
// 1. create storage -> destination, filename
// 2. create upload -> storage, limits
// 3. create uploadFile -> upload(req,res)

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },

  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 },
});

const uploadFile = (req, res) => {
  try {
    return res.status(200).send(req.file);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = { uploadFile, upload };
