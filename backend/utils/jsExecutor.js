const fs = require("fs");
const os = require("os");
const { v4: uuid } = require("uuid");
const { exec } = require("child_process");

// Create temporary source file in system temp directory
const createTempFile = (extension, code) => {
  const filePath = `${os.tmpdir()}/${uuid()}.${extension}`;
  fs.writeFileSync(filePath, code);
  return filePath;
};

// Detect available Python command
const detectPythonCommand = () => {
  const candidates = ["python", "python3", "py"];
  return new Promise((resolve, reject) => {
    const tryNext = (index) => {
      if (index >= candidates.length) {
        return reject(new Error("No working Python command found"));
      }
      exec(`${candidates[index]} --version`, (err) => {
        if (!err) return resolve(candidates[index]);
        tryNext(index + 1);
      });
    };
    tryNext(0);
  });
};

// ------------------ JavaScript ------------------
exports.runJavaScript = async (code) => {
  return new Promise((resolve, reject) => {
    const startTime = process.hrtime();
    const startMemory = process.memoryUsage().rss;

    try {
      let output = "";
      const originalLog = console.log;

      console.log = (...args) => {
        output += args.join(" ") + "\n";
      };

      eval(code); // ⚠️ Not safe for untrusted code

      console.log = originalLog;

      const [sec, nano] = process.hrtime(startTime);
      const executionTime = `${(sec * 1e3 + nano / 1e6).toFixed(2)}ms`;
      const memoryUsed = `${((process.memoryUsage().rss - startMemory) / 1024 / 1024).toFixed(2)}MB`;

      resolve({
        stdout: output.trim() || "No output",
        executionTime,
        memoryUsed,
      });
    } catch (err) {
      console.log = originalLog;
      reject(new Error("JavaScript Execution Error: " + err.message));
    }
  });
};

// ------------------ Python ------------------
exports.runPython = async (code) => {
  const filePath = createTempFile("py", code);
  const pythonCmd = await detectPythonCommand();

  return new Promise((resolve, reject) => {
    const startTime = process.hrtime();
    const startMemory = process.memoryUsage().rss;

    exec(`${pythonCmd} "${filePath}"`, (err, stdout, stderr) => {
      const [sec, nano] = process.hrtime(startTime);
      const executionTime = `${(sec * 1e3 + nano / 1e6).toFixed(2)}ms`;
      const memoryUsed = `${((process.memoryUsage().rss - startMemory) / 1024 / 1024).toFixed(2)}MB`;

      if (err || stderr) {
        const errorMsg = stderr || err.message;
        return reject(new Error("Python Execution Error: " + errorMsg));
      }

      resolve({
        stdout: stdout.trim() || "No output",
        executionTime,
        memoryUsed,
      });
    });
  });
};

// ------------------ C / C++ ------------------
exports.runC_CPP = async (code, language) => {
  const extension = language === "c" ? "c" : "cpp";
  const filePath = createTempFile(extension, code);
  const outputPath = filePath.replace(`.${extension}`, "");

  return new Promise((resolve, reject) => {
    const compileCmd =
      language === "c"
        ? `gcc "${filePath}" -o "${outputPath}"`
        : `g++ "${filePath}" -o "${outputPath}"`;

    exec(compileCmd, (err, stdout, stderr) => {
      if (err || stderr) {
        const errorMsg = stderr || err.message;
        return reject(new Error(`${language.toUpperCase()} Compilation Error: ${errorMsg}`));
      }

      const startTime = process.hrtime();
      const startMemory = process.memoryUsage().rss;

      exec(`"${outputPath}"`, (err2, stdout2, stderr2) => {
        const [sec, nano] = process.hrtime(startTime);
        const executionTime = `${(sec * 1e3 + nano / 1e6).toFixed(2)}ms`;
        const memoryUsed = `${((process.memoryUsage().rss - startMemory) / 1024 / 1024).toFixed(2)}MB`;

        if (err2 || stderr2) {
          const errorMsg = stderr2 || err2.message;
          return reject(new Error(`${language.toUpperCase()} Runtime Error: ${errorMsg}`));
        }

        resolve({
          stdout: stdout2.trim() || "No output",
          executionTime,
          memoryUsed,
        });
      });
    });
  });
};

// ------------------ Java ------------------
exports.runJava = async (code) => {
  const filePath = createTempFile("java", code);
  const className = filePath.split("/").pop().replace(".java", "");
  const dir = os.tmpdir();

  return new Promise((resolve, reject) => {
    exec(`javac "${filePath}"`, (err, stdout, stderr) => {
      if (err || stderr) {
        const errorMsg = stderr || err.message;
        return reject(new Error("Java Compilation Error: " + errorMsg));
      }

      const startTime = process.hrtime();
      const startMemory = process.memoryUsage().rss;

      exec(`java -cp "${dir}" ${className}`, (err2, stdout2, stderr2) => {
        const [sec, nano] = process.hrtime(startTime);
        const executionTime = `${(sec * 1e3 + nano / 1e6).toFixed(2)}ms`;
        const memoryUsed = `${((process.memoryUsage().rss - startMemory) / 1024 / 1024).toFixed(2)}MB`;

        if (err2 || stderr2) {
          const errorMsg = stderr2 || err2.message;
          return reject(new Error("Java Runtime Error: " + errorMsg));
        }

        resolve({
          stdout: stdout2.trim() || "No output",
          executionTime,
          memoryUsed,
        });
      });
    });
  });
};
