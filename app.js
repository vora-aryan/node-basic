const express = require("express");
require("./src/util/db");
const app = express();

const multer = require("multer");
const memUpload = multer({ storage: multer.memoryStorage() });

const cron = require("node-cron");

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));
app.use(express.text());

const PORT = 3001;

const userRoutes = require("./src/routes/userRouter");
const roleRouter = require("./src/routes/roleRouter");
const uploadRouter = require("./src/routes/uploadRouter");
const { sendMail } = require("./src/controllers/mailController");
const { upload } = require("./src/controllers/uploadController");
const { default: mongoose } = require("mongoose");

app.use("/user", userRoutes);
app.use("/role", roleRouter);
app.use("/upload", uploadRouter);

app.post("/mail", memUpload.single("doc"), sendMail);
// app.post("/mail", sendMail);

const recordSchema = new mongoose.Schema({
  value: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Record = mongoose.model("Record", recordSchema);

let i = 1;
cron.schedule("* * * * *", async () => {
  try {
    const record = await Record.create({ value: `Test ${i++}` });
    console.log(`Inserted: Test ${i - 1}`);
  } catch (error) {
    console.error("Error inserting record:", error);
  }
});

cron.schedule("*/3 * * * *", async () => {
  try {
    const threeMinutesAgo = new Date(Date.now() - 3 * 60 * 1000);
    const result = await Record.deleteMany({
      createdAt: { $lte: threeMinutesAgo },
    });

    console.log(
      `Deleted ${result.deletedCount} records older than 5 minutes at:`,
      new Date().toISOString()
    );
  } catch (error) {
    console.error("Error deleting records:", error);
  }
});

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
