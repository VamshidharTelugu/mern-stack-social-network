const express = require("express");
const router = express.Router();
const jwtVerify = require("../../middleware/jwtVerify");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../../models/User");

router.get("/", jwtVerify, async (req, res) => {
  try {
    const foundUser = await User.findById(req.user.id).select("-password");
    return res.json({ user: foundUser });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

router.post(
  "/",
  [
    check("email", "Enter a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ msg: "User doesn't not exist" }] });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ error: [{ msg: "Password is incorrect" }] });
    }

    jwt.sign(
      { user: { id: user.id } },
      config.get("jwtSecret"),
      { expiresIn: 360000000 },

      (err, token) => {
        if (err) {
          return res.status(500).send("server Error");
        }
        return res.json({ token: token });
      }
    );
  }
);
module.exports = router;
