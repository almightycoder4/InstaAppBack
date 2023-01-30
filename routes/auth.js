const express = require("express");
const { register, login, getLoggedUser } = require("../controllers/auth");
const checkauth = require("../middlewares/auth");

const authRouter = express.Router();

authRouter.post("/users/register", register);
authRouter.post("/users/login", login);
authRouter.get("/users/loggedUser", checkauth, getLoggedUser);

module.exports = authRouter;
