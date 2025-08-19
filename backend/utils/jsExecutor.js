import fs from "fs";
import path from "path";
import { v4 as uuid } from "uuid";
import { exec } from "child_process";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Handle __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Ensure temp directory exists
const tempDir = path.join(__dirname, "temp");
if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

// Create temp file
const createTempFile = (extension, code, className = null) => {
  let filename;

  if (extension === "java" && className) {
    filename = `${className}.java`; // Java requires filename = classname
  } else {
    filename = `${uuid()}.${extension}`;
  }

  const filePath = path.join(tempDir, filename);
  fs.writeFileSync(filePath, code);
  return filePath;
};

// Cleanup file (optional)
const cleanupFile = (filePath) => {
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
};


// Detect Python command
const detectPythonCommand = () => {
  const candidates = ["python", "python3", "py"];
  return new Promise((resolve, reject) => {
    const tryNext = (i) => {
      if (i >= candidates.length) return reject("Python not found");
      exec(`${candidates[i]} --version`, (err) => {
        if (!err) return resolve(candidates[i]);
        tryNext(i + 1);
      });
    };
    tryNext(0);
  });
};

// JavaScript Runner
export const runJavaScript = async (code) => {
  return new Promise((resolve, reject) => {
    try {
      const start = process.hrtime();
      const startMem = process.memoryUsage().rss;
      let output = "";

      const originalLog = console.log;
      console.log = (...args) => {
        output += args.join(" ") + "\n";
      };

      eval(code); // CAUTION: Eval can be unsafe if user input is not sanitized

      console.log = originalLog;

      const [s, ns] = process.hrtime(start);
      resolve({
        stdout: output.trim() || "No output",
        executionTime: `${(s * 1e3 + ns / 1e6).toFixed(2)}ms`,
        memoryUsed: `${((process.memoryUsage().rss - startMem) / 1024 / 1024).toFixed(2)}MB`,
      });
    } catch (err) {
      reject("JavaScript Error: " + err.message);
    }
  });
};

// Python Runner
export const runPython = async (code) => {
  const filePath = createTempFile("py", code);
  const python = await detectPythonCommand();
  return new Promise((resolve, reject) => {
    const start = process.hrtime();
    const startMem = process.memoryUsage().rss;
    exec(`${python} "${filePath}"`, (err, stdout, stderr) => {
      const [s, ns] = process.hrtime(start);
      if (err) return reject("Python Error: " + (stderr || err.message));
      resolve({
        stdout: stdout.trim() || "No output",
        executionTime: `${(s * 1e3 + ns / 1e6).toFixed(2)}ms`,
        memoryUsed: `${((process.memoryUsage().rss - startMem) / 1024 / 1024).toFixed(2)}MB`,
      });
    });
  });
};

// C/C++ Runner
export const runC_CPP = async (code, language) => {
  const ext = language === "c" ? "c" : "cpp";
  const filePath = createTempFile(ext, code);
  const outPath = filePath.replace(`.${ext}`, "");
  return new Promise((resolve, reject) => {
    const compiler = language === "c" ? "gcc" : "g++";
    exec(`${compiler} "${filePath}" -o "${outPath}"`, (err, _, stderr) => {
      if (err) return reject("Compilation Error: " + stderr);
      const start = process.hrtime();
      const startMem = process.memoryUsage().rss;
      exec(`"${outPath}"`, (err2, stdout, stderr2) => {
        const [s, ns] = process.hrtime(start);
        if (err2) return reject("Runtime Error: " + stderr2);
        resolve({
          stdout: stdout.trim() || "No output",
          executionTime: `${(s * 1e3 + ns / 1e6).toFixed(2)}ms`,
          memoryUsed: `${((process.memoryUsage().rss - startMem) / 1024 / 1024).toFixed(2)}MB`,
        });
      });
    });
  });
};

export const runJava = async (code) => {
  const match = code.match(/public\s+class\s+(\w+)/);
  const className = match ? match[1] : "Main";

  // Create temp .java file
  const filePath = createTempFile("java", code, className);

  return new Promise((resolve, reject) => {
    // Compile Java
    exec(`javac "${filePath}"`, (err, stdout, stderr) => {
      if (err) {
        cleanupFile(filePath);
        return reject("Java Compilation Error:\n" + (stderr || stdout));
      }

      const start = process.hrtime();
      const startMem = process.memoryUsage().rss;

      // Run Java program
      exec(`java -cp "${tempDir}" ${className}`, (err2, stdout2, stderr2) => {
        const [s, ns] = process.hrtime(start);

        // Cleanup files
        cleanupFile(filePath);
        const classFile = path.join(tempDir, `${className}.class`);
        cleanupFile(classFile);

        if (err2) {
          return reject("Java Runtime Error:\n" + (stderr2 || stdout2));
        }

        resolve({
          stdout: stdout2.trim() || "No output",
          executionTime: `${(s * 1e3 + ns / 1e6).toFixed(2)} ms`,
          memoryUsed: `${((process.memoryUsage().rss - startMem) / 1024 / 1024).toFixed(2)} MB`,
        });
      });
    });
  });
};
