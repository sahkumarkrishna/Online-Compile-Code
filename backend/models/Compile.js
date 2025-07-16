const mongoose = require("mongoose");

const compileSchema = new mongoose.Schema({
  language: { type: String, required: true },
  code: { type: String, required: true },
  output: String,
  executionTime: String,
  memoryUsed: String,
}, { timestamps: true });

module.exports = mongoose.model("Compile", compileSchema);
