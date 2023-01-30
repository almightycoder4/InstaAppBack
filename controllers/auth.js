const { User } = require("../models/User");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const axios = require("axios");
const brcypt = require("bcryptjs");

function generateToken(user) {
  const { _id, name, email } = user;

  return jwt.sign(
    {
      _id,
      name,
      email,
    },
    config.JWT_SECRET_KEY
  );
}

async function register(req, res) {
  try {
    let { name, email, gender, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).send({
        error: "Fill all required fields.",
      });
    }

    let user = await User.findOne({
      email,
    });

    if (user) {
      return res.status(400).send({
        error: "Email already exists.",
      });
    }

    password = brcypt.hashSync(password);

    user = await User.create({
      name,
      email,
      gender,
      password,
    });

    return res.send({
      message: "Registration successful",
    });
  } catch (err) {
    return res.status(500).send({
      error: "Something went wrong",
    });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(400).send({
        error: "Email doesn't exists.",
      });
    }

    if (!brcypt.compareSync(password, user.password)) {
      return res.status(400).send({
        error: "Wrong password",
      });
    }

    const token = generateToken(user);
    const { _id, name } = user;

    return res.send({
      message: "Login successful",
      data: {
        token,
        user: {
          _id,
          name,
          email,
        },
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      error: "Something went wrong",
    });
  }
}

async function getLoggedUser(req, res) {
  try {
    const user = req.user;

    return res.send({
      data: user,
    });
  } catch (err) {
    return res.status(500).send({
      error: "Something went wrong",
    });
  }
}

module.exports = {
  register,
  login,
  getLoggedUser,
};
