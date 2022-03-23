const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/User");

require("dotenv/config");

const JWT_SECRET = process.env.JWTSecret;

// Create user
router.post("/create", async (req, res) => {
  const newUser = new User({
    userName: req.body.userName,
    password: req.body.password,
  });

  const userAlreadyExists = await User.find({
    userName: req.body.userName,
  }).then((resp) => resp.length > 0);

  if (userAlreadyExists) {
    res.json({ message: "USER ALREADY EXISTS" });
  } else {
    newUser
      .save()
      .then((data) => {
        res.status(200).json({ user: data._id });
      })
      .catch((err) => {
        res.status(400).json({ error: err });
      });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      userName: req.body.userName,
      password: req.body.password,
    });
    if (user) {
      const payload = {
        id: user._id,
      };
      const token = jwt.sign(payload, JWT_SECRET);
      res.status(200).json({ token: token });
    } else {
      res.status(400).json({ message: "Incorrect userName or password " });
    }
  } catch (error) {
    console.log("error", error);
  }
});

module.exports = router;
