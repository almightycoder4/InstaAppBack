const express = require("express");
const {
  createPost,
  getPost,
  getPostId,
  delPost,
} = require("../controllers/post");
const checkauth = require("../middlewares/auth");

const postRouter = express.Router();

postRouter.post("/addPost", checkauth, createPost);
postRouter.get("/posts", checkauth, getPost);
postRouter.post("/posts/update/:id", getPostId);
postRouter.post("/posts/delete/:id", delPost);

module.exports = postRouter;
