const express = require("express");
const router = express.Router();
const { compileCode } = require("../controllers/compileController");

// Route: POST /api/compile
router.post("/compile", compileCode);

module.exports = router;
