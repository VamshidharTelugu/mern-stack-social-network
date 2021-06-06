const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/User");
const { json } = require("express");
module.exports = async function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    return res
      .status(401)
      .json({ msg: "Token not found, User not authroized" });
  }

  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    req.user = decoded.user;

    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ msg: "Invalid Token" });
  }
};
//take token from header, check if you have one
// authenticate it with jwt
//if authenticated send back the user details with the got id
//use that middle ware in api/auth route
