import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";
import jsPDF from "jspdf";

const defaultCode = {
  javascript: `// Write JS code here\nconsole.log("Hello, world!");`,
  python: `# Write Python code here\nprint("Hello, world!")`,
  c: `#include <stdio.h>\nint main() {\n  printf("Hello, world!\\n");\n  return 0;\n}`,
  cpp: `#include <iostream>\nusing namespace std;\nint main() {\n  cout << "Hello, world!" << endl;\n  return 0;\n}`,
  java: `public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello, world!");\n  }\n}`,
};

const CodeEditor = () => {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(defaultCode.javascript);
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_COMPILE_URL 

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
      const res = await axios.post(`${API_URL}compile`, { language, code });
      const data = res.data;
      setOutput(
        `Output:\n${data.output}\n\nExecution Time: ${data.executionTime}\nMemory Used: ${data.memoryUsed}`
      );
    } catch (err) {
      setOutput("Error: " + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  const savePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text(`Language: ${language.toUpperCase()}`, 10, 10);
    doc.text("Code:", 10, 20);
    const codeLines = doc.splitTextToSize(code, 180);
    doc.text(codeLines, 10, 30);
    let y = 30 + codeLines.length * 7;
    doc.text("Output:", 10, y + 10);
    const outputLines = doc.splitTextToSize(output || "No output yet.", 180);
    doc.text(outputLines, 10, y + 20);
    doc.save(`Code_${language}.pdf`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white p-4 w-full">

      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <div className="w-full sm:w-1/3 md:w-1/4">
          <label className="block mb-1 text-sm">Select Language:</label>
          <select
            value={language}
            onChange={handleLanguageChange}
            className="w-full bg-gray-800 px-3 py-2 rounded"
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="c">C</option>
            <option value="cpp">C++</option>
            <option value="java">Java</option>
          </select>
        </div>

        <button
          onClick={savePDF}
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-sm font-semibold self-start sm:self-end"
        >
          Save as PDF
        </button>
      </div>

      {/* Code Editor */}
      <div className="w-full">
        <Editor
          height="60vh"
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

      {/* Run Button */}
      <div className="mt-4">
        <button
          onClick={runCode}
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded font-semibold disabled:opacity-50"
        >
          {loading ? "Running..." : "Run Code"}
        </button>
      </div>

      {/* Printable Section */}
      <div
        
        className="mt-6 bg-white text-black rounded p-6 hidden-print"
      >
        <h2 className="text-xl font-bold mb-2">
          Language: {language.toUpperCase()}
        </h2>
      
      
        <h3 className="text-lg font-semibold text-gray-700">Output:</h3>
        <pre className="whitespace-pre-wrap break-words bg-gray-100 p-3 rounded mt-2 text-sm">
          {output || "No output yet."}
        </pre>
      </div>
    </div>
  );
};

export default CodeEditor;