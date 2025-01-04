const { getRoles, addRole } = require("../controllers/roleController");

const roleRouter = require("express").Router();

roleRouter.get("/roles", getRoles);
roleRouter.post("/role", addRole);

module.exports = roleRouter;
