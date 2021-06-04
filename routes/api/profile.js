const express = require('express');
const router = express.Router();


router.get('/', (req, res) => res.send("This is the profile router"));


module.exports  = router;