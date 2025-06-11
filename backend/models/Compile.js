const mongoose = require("mongoose");

const compileSchema = new mongoose.Schema(
  {
    language: {
      type: String,
      required: [true, "Language is required"],
      enum: ["c", "cpp", "java", "python", "javascript"],
    },
    code: {
      type: String,
      required: [true, "Code is required"],
    },
  
    output: {
      type: String,
    },
    executionTime: {
      type: String,
    },
    memoryUsed: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Compile", compileSchema);
