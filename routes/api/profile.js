const express = require("express");
const jwtVerify = require("../../middleware/jwtVerify");
const router = express.Router();
const Profile = require("../../models/Profile");

router.get("/me", jwtVerify, async (req, res) => {
  try {
    const userId = req.user.id;
    const profile = await Profile.findOne({ userId }).populate("user", [
      "name",
      "avatar",
    ]);
    if (!profile) {
      return res.status(400).json({ msg: "No profile found for this user" });
    }

    return res.json(profile);
  } catch (e) {
    console.error(e);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
