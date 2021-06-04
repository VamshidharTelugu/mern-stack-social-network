const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

router.post(
  "/",
  [
    check("name", "Name can't be empty").notEmpty(),
    check("email", "Enter a valid email").isEmail(),
    check(
      "password",
      "Password should be atleast 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
     res.status(400).send({ errors: errors.array() });
     return;
    }
    res.send("Someone made a post req to this endpoint");
  }
);

module.exports = router;
