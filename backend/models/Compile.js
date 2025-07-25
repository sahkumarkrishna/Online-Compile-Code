// models/Compile.js
import mongoose from "mongoose";

const compileSchema = new mongoose.Schema(
  {
    language: { type: String, required: true },
    code: { type: String, required: true },
    output: String,
    executionTime: String,
    memoryUsed: String,
  },
  { timestamps: true }
);

const Compile = mongoose.model("Compile", compileSchema);

export default Compile;
