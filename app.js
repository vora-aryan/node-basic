const express = require("express");
require("./src/util/db");
const app = express();

const multer = require("multer");
const memUpload = multer({ storage: multer.memoryStorage() });

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));
app.use(express.text());

const PORT = 3001;

const userRoutes = require("./src/routes/userRouter");
const roleRouter = require("./src/routes/roleRouter");
const uploadRouter = require("./src/routes/uploadRouter");
const { sendMail } = require("./src/controllers/mailController");
const { upload } = require("./src/controllers/uploadController");

app.use("/user", userRoutes);
app.use("/role", roleRouter);
app.use("/upload", uploadRouter);

app.post("/mail", memUpload.single("doc"), sendMail);
// app.post("/mail", sendMail);

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
