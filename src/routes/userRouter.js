const userRouter = require("express").Router();
const verifyUser = require("../../middlewares/authMiddleware");
const userController = require("../controllers/userController");

userRouter.get("/users", userController.getAllUsers);
userRouter.get("/user/:id", userController.getUserById);
userRouter.post("/user", userController.addUser);
userRouter.post("/login", userController.loginUser);
userRouter.delete("/user/:id", userController.deleteUser);
userRouter.delete("/usersbyname", userController.deleteUserByName);
userRouter.put("/updateuser/:id", userController.updateUser);

module.exports = userRouter;
