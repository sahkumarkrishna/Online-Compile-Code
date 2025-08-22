import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";
import toast from "react-hot-toast";

const defaultCode = {
  javascript: `// Write JS code here\nconsole.log("Hello, world!");`,
  python: `# Write Python code here\nprint("Hello, world!")`,
  c: `#include <stdio.h>\nint main() {\n  printf("Hello, world!\\n");\n  return 0;\n}`,
  cpp: `#include <iostream>\nusing namespace std;\nint main() {\n  cout << "Hello, world!" << endl;\n  return 0;\n}`,
  java: `public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello, world!");\n  }\n}`,
};

const CompileCode = () => {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(defaultCode.javascript);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_COMPILE_URL;

  const handleEditorChange = (value) => setCode(value);

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    setLanguage(lang);
    setCode(defaultCode[lang] || "");
    setOutput("");
  };

  const runCode = async () => {
    setLoading(true);
    setOutput("");
    try {
      const res = await axios.post(`${API_URL}compile`, { language, code, input });
      const data = res.data;
      const runOutput = `Output:\n${data.output}\n\nExecution Time: ${data.executionTime}\nMemory Used: ${data.memoryUsed}`;
      setOutput(runOutput);

      const savedSnippets = JSON.parse(localStorage.getItem("codeSnippets")) || [];
      savedSnippets.unshift({
        title: `Snippet ${new Date().toLocaleString()}`,
        language,
        code,
        input,
        output: runOutput,
        saved: false,
      });
      localStorage.setItem("codeSnippets", JSON.stringify(savedSnippets));

      toast.success("Saved to history!");
    } catch (err) {
      setOutput("Error: " + (err.response?.data?.error || err.message));
      toast.error("Failed to run code.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white p-4 md:p-6 lg:p-10">
      {/* Controls */}
      <div className="flex flex-col lg:flex-row lg:items-end gap-4 mb-4">
        {/* Language Selector */}
        <div className="flex-1 lg:max-w-xs">
          <label className="block mb-1 text-sm font-medium">Language</label>
          <select
            value={language}
            onChange={handleLanguageChange}
            className="w-full bg-gray-800 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="c">C</option>
            <option value="cpp">C++</option>
            <option value="java">Java</option>
          </select>
        </div>

        {/* Input Field */}
        <div className="flex-1 lg:max-w-2xl">
          <label className="block mb-1 text-sm font-medium">Input (stdin)</label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter input for your code"
            className="w-full bg-gray-800 px-3 py-2 rounded text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Run Button */}
        <div className="lg:flex-none lg:mt-0 mt-2 w-full lg:w-auto">
          <button
            onClick={runCode}
            disabled={loading}
            className="w-full lg:w-auto bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded font-semibold disabled:opacity-50"
          >
            {loading ? "Running..." : "Run Code"}
          </button>
        </div>
      </div>

      {/* Code Editor */}
      <div className="w-full rounded overflow-hidden shadow-lg mb-4">
        <Editor
          height="50vh"
          language={language}
          value={code}
          onChange={handleEditorChange}
          theme="vs-dark"
          options={{
            fontSize: 16,
            minimap: { enabled: false },
            wordWrap: "on",
            automaticLayout: true,
          }}
        />
      </div>

      {/* Output Section */}
      <div className="w-full bg-white text-black rounded shadow-md p-6 overflow-x-auto">
        <h2 className="text-xl font-bold mb-2">Language: {language.toUpperCase()}</h2>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Output:</h3>
        <pre className="whitespace-pre-wrap break-words bg-gray-100 p-3 rounded text-sm max-h-96 overflow-y-auto">
          {output || "No output yet."}
        </pre>
      </div>
    </div>
  );
};

export default CompileCode;
