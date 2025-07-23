import fs from "fs";
import path from "path";
import { v4 as uuid } from "uuid";
import { exec } from "child_process";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Handle __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const tempDir = path.join(__dirname, "temp");
if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

const createTempFile = (extension, code) => {
  const filename = `${uuid()}.${extension}`;
  const filePath = path.join(tempDir, filename);
  fs.writeFileSync(filePath, code);
  return filePath;
};

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

export const runJavaScript = async (code) => {
  return new Promise((resolve, reject) => {
    try {
      const start = process.hrtime();
      const startMem = process.memoryUsage().rss;
      let output = "";
      const log = console.log;
      console.log = (...args) => {
        output += args.join(" ") + "\n";
      };
      eval(code);
      console.log = log;
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
  const className = (code.match(/public\s+class\s+(\w+)/) || [])[1] || "Main";
  const filePath = path.join(tempDir, `${className}.java`);
  fs.writeFileSync(filePath, code);

  return new Promise((resolve, reject) => {
    exec(`javac "${filePath}"`, (err, _, stderr) => {
      if (err) {
        if (stderr.includes("javac: not found") || err.message.includes("javac")) {
          return reject("Java Compiler (javac) not found. Please install JDK.");
        }
        return reject("Java Compilation Error: " + stderr);
      }

      const start = process.hrtime();
      const startMem = process.memoryUsage().rss;

      exec(`java -cp "${tempDir}" ${className}`, (err2, stdout, stderr2) => {
        const [s, ns] = process.hrtime(start);
        if (err2) return reject("Java Runtime Error: " + stderr2);
        resolve({
          stdout: stdout.trim() || "No output",
          executionTime: `${(s * 1e3 + ns / 1e6).toFixed(2)}ms`,
          memoryUsed: `${((process.memoryUsage().rss - startMem) / 1024 / 1024).toFixed(2)}MB`,
        });
      });
    });
  });
};