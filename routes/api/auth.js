const express = require("express");
const router = express.Router();
const jwtVerify = require("../../middleware/jwtVerify");
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

module.exports = router;
