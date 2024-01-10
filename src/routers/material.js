// Requiring packages
    const express = require("express");

// Requiring my files

// Defining variables
    const router = express.Router();

router.get("/", (req, res) => {
    res.send("Hello");
});

module.exports = router;