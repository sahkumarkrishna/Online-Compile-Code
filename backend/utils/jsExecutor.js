const { execFile, exec } = require("child_process");
const fs = require("fs").promises;
const os = require("os");
const path = require("path");

async function writeTemp(code, ext) {
  const file = path.join(os.tmpdir(), `run_${Date.now()}.${ext}`);
  await fs.writeFile(file, code);
  return file;
}

function measureProcess(cmd, args = []) {
  return new Promise((resolve, reject) => {
    const start = process.hrtime();
    const startMem = process.memoryUsage().heapUsed;

    execFile(cmd, args, { timeout: 5000, maxBuffer: 1e6 }, (err, stdout, stderr) => {
      const elapsed = process.hrtime(start);
      const endMem = process.memoryUsage().heapUsed;

      const executionTime = `${(elapsed[0] * 1e3 + elapsed[1] / 1e6).toFixed(3)}ms`;
      const memoryUsed = `${((endMem - startMem) / 1024).toFixed(0)}KB`;

      if (err) return reject(stderr || err.message);
      resolve({ stdout, executionTime, memoryUsed });
    });
  });
}

async function runJavaScript(code) {
  const file = await writeTemp(code, "js");
  try {
    return await measureProcess("node", [file]);
  } finally {
    fs.unlink(file).catch(() => {});
  }
}

async function runPython(code) {
  const file = await writeTemp(code, "py");
  try {
    return await measureProcess("python", [file]);
  } finally {
    fs.unlink(file).catch(() => {});
  }
}

async function runC_CPP(code, lang) {
  const ext = lang === "c" ? "c" : "cpp";
  const file = await writeTemp(code, ext);
  const exe = file.replace(`.${ext}`, "");
  try {
    await exec(`gcc ${file} -o ${exe}`);
    return await measureProcess(exe);
  } finally {
    fs.unlink(file).catch(() => {});
    fs.unlink(exe).catch(() => {});
  }
}

async function runJava(code) {
  const file = await writeTemp(code, "java");
  const dir = path.dirname(file);
  try {
    await exec(`javac ${file}`);
    return await measureProcess("java", ["-cp", dir, "Main"]);
  } finally {
    fs.unlink(file).catch(() => {});
    fs.unlink(path.join(dir, "Main.class")).catch(() => {});
  }
}

module.exports = { runJavaScript, runPython, runC_CPP, runJava };
