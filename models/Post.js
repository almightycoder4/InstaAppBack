const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: {
    userId: String,
    name: String,
  },
});

const Post = mongoose.model("Post", PostSchema);

module.exports = { Post };
