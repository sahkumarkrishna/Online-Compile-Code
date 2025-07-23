const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");
const { exec } = require("child_process");

// ✅ Create or ensure temp directory
const tempDir = path.join(__dirname, "../temp");
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir);
}

// ✅ Create a temporary file with a given extension
const createTempFile = (extension, code) => {
  const filename = `${uuid()}.${extension}`;
  const filePath = path.join(tempDir, filename);
  fs.writeFileSync(filePath, code);
  return filePath;
};

// ✅ Detect working Python command (python / python3 / py)
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

    let output = "";
    const originalLog = console.log;

    try {
      console.log = (...args) => {
        output += args.join(" ") + "\n";
      };

      eval(code); // ⚠️ Only for controlled input

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

      if (err) {
        return reject(new Error("Python Execution Error: " + (stderr || err.message)));
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

  // ✅ Add MinGW path (Update if needed)
  const mingwPath = "C:\\MinGW\\bin";
  process.env.PATH = `${mingwPath};${process.env.PATH}`;

  return new Promise((resolve, reject) => {
    const compileCmd = language === "c"
      ? `gcc "${filePath}" -o "${outputPath}"`
      : `g++ "${filePath}" -o "${outputPath}"`;

    exec(compileCmd, (err, stdout, stderr) => {
      if (err) {
        return reject(new Error(`${language.toUpperCase()} Compilation Error: ${stderr || err.message}`));
      }

      const startTime = process.hrtime();
      const startMemory = process.memoryUsage().rss;

      exec(`"${outputPath}"`, (err2, stdout2, stderr2) => {
        const [sec, nano] = process.hrtime(startTime);
        const executionTime = `${(sec * 1e3 + nano / 1e6).toFixed(2)}ms`;
        const memoryUsed = `${((process.memoryUsage().rss - startMemory) / 1024 / 1024).toFixed(2)}MB`;

        if (err2) {
          return reject(new Error(`${language.toUpperCase()} Runtime Error: ${stderr2 || err2.message}`));
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
  const match = code.match(/public\s+class\s+([A-Za-z_][A-Za-z0-9_]*)/);
  const className = match ? match[1] : "Main";

  const filePath = path.join(tempDir, `${className}.java`);
  fs.writeFileSync(filePath, code);
  const dir = path.dirname(filePath);

  return new Promise((resolve, reject) => {
    exec(`javac "${filePath}"`, (err, stdout, stderr) => {
      if (err) {
        return reject(new Error("Java Compilation Error: " + (stderr || err.message)));
      }

      const startTime = process.hrtime();
      const startMemory = process.memoryUsage().rss;

      exec(`java -cp "${dir}" ${className}`, (err2, stdout2, stderr2) => {
        const [sec, nano] = process.hrtime(startTime);
        const executionTime = `${(sec * 1e3 + nano / 1e6).toFixed(2)}ms`;
        const memoryUsed = `${((process.memoryUsage().rss - startMemory) / 1024 / 1024).toFixed(2)}MB`;

        if (err2) {
          return reject(new Error("Java Runtime Error: " + (stderr2 || err2.message)));
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
