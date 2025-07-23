// Importing modules using ES Module syntax
import Compile from "../models/Compile.js";
import { runJavaScript, runPython, runC_CPP, runJava } from "../utils/jsExecutor.js";

// Controller function
export const compileCode = async (req, res) => {
  const { language, code } = req.body;

  if (!language || !code) {
    return res.status(400).json({ success: false, error: "Missing language or code" });
  }

  try {
    let execRes;

    switch (language) {
      case "javascript":
        execRes = await runJavaScript(code);
        break;
      case "python":
        execRes = await runPython(code);
        break;
      case "c":
      case "cpp":
        execRes = await runC_CPP(code, language);
        break;
      case "java":
        execRes = await runJava(code);
        break;
      default:
        return res.status(400).json({ success: false, error: "Unsupported language" });
    }

    const compiled = await Compile.create({
      language,
      code,
      output: execRes.stdout,
      executionTime: execRes.executionTime,
      memoryUsed: execRes.memoryUsed,
    });

    res.json({
      success: true,
      output: compiled.output,
      executionTime: compiled.executionTime,
      memoryUsed: compiled.memoryUsed,
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.toString() });
  }
};
