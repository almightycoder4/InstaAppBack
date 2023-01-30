const { Post } = require("../models/Post");

async function createPost(req, res) {
  try {
    const user = req.user;

    const { title, content, device } = req.body;

    const post = await Post.create({
      title,
      content,
      device,
      author: {
        userId: user._id,
        name: user.name,
      },
    });

    return res.send({
      data: post,
    });
  } catch (err) {
    return res.status(500).send({
      error: "Something went wrong",
    });
  }
}

async function getPost(req, res) {
  try {
    const user = req.user;
    const id = user._id;
    let post = await Post.find({ "author.userId": id });

    let totalPost = await Post.count({ "author.userId": id });

    return res.send({
      data: {
        post,
        totalPost,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      error: "Something went wrong",
    });
  }
}

async function getPostId(req, res) {
  try {
    const { id } = req.params;
    const body = req.body;

    let post = await Post.findOneAndUpdate({ id }, { body });

    if (post) {
      return res.send({
        data: post,
      });
    } else {
      return res.status(404).send({
        error: "Posts does not exist",
      });
    }
  } catch (err) {
    console.log(err);
  }
}
async function delPost(req, res) {
  try {
    const { id } = req.params;

    let post = await Post.findOneAndRemove(id);

    if (post) {
      return res.send({
        data: post,
      });
    } else {
      return res.status(404).send({
        error: "Posts does not exist",
      });
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  createPost,
  getPost,
  getPostId,
  delPost,
};
