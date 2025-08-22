import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FiDownload, FiShare2, FiEdit2, FiTrash2, FiSave } from "react-icons/fi";

const HistoryPage = () => {
    const [snippets, setSnippets] = useState([]);
    const [editingIdx, setEditingIdx] = useState(null);
    const [editedTitle, setEditedTitle] = useState("");

    useEffect(() => {
        const savedSnippets = JSON.parse(localStorage.getItem("codeSnippets")) || [];
        setSnippets(savedSnippets);
    }, []);

    const updateLocalStorage = (updatedSnippets) => {
        setSnippets(updatedSnippets);
        localStorage.setItem("codeSnippets", JSON.stringify(updatedSnippets));
    };

    const handleDownload = (snippet) => {
        const safeTitle = snippet.title.replace(/[^a-z0-9]/gi, "_");
        const element = document.createElement("a");
        const file = new Blob([snippet.code], { type: "text/plain" });
        element.href = URL.createObjectURL(file);
        element.download = safeTitle + ".txt";
        document.body.appendChild(element);
        element.click();
        toast.success("Downloaded successfully!");
    };

    const handleShare = async (snippet) => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: snippet.title,
                    text: snippet.code,
                });
                toast.success("Shared successfully!");
            } catch (err) {
                toast.error("Sharing failed!");
            }
        } else {
            navigator.clipboard.writeText(snippet.code);
            toast.success("Code copied to clipboard!");
        }
    };

    const handleDelete = (idx) => {
        const updated = [...snippets];
        updated.splice(idx, 1);
        updateLocalStorage(updated);
        toast.success(" removed successfully!");
    };

    const startEditing = (idx) => {
        setEditingIdx(idx);
        setEditedTitle(snippets[idx].title); // only title editable
    };

    const saveEdit = () => {
        const updated = [...snippets];
        updated[editingIdx].title = editedTitle; // only update title
        updateLocalStorage(updated);
        setEditingIdx(null);
        toast.success("File name updated!");
    };

    const cancelEdit = () => {
        setEditingIdx(null);
    };

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-16">

            <h2 className="text-3xl sm:text-4xl font-extrabold text-green-600 mb-10 text-center">
                Your Code History
            </h2>

            {snippets.length === 0 ? (
                <p className="text-gray-600 text-center">No saved snippets yet!</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {snippets.map((snippet, idx) => (
                        <div
                            key={idx}
                            className="bg-white p-5 rounded-xl shadow-md border border-gray-200 flex flex-col justify-between"
                        >
                            <div>
                                {editingIdx === idx ? (
                                    <input
                                        type="text"
                                        value={editedTitle}
                                        onChange={(e) => setEditedTitle(e.target.value)}
                                        className="w-full mb-2 border px-2 py-1 rounded"
                                    />
                                ) : (
                                    <>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-1">{snippet.title}</h3>
                                        <p className="text-sm text-gray-500 mb-3">{snippet.language}</p>
                                        <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto max-h-40">
                                            {snippet.code.length > 200
                                                ? snippet.code.substring(0, 200) + "..."
                                                : snippet.code}
                                        </pre>
                                    </>
                                )}
                            </div>

                            <div className="flex justify-between mt-4 flex-wrap gap-2">
                                <button
                                    onClick={() => handleShare(snippet)}
                                    className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                                >
                                    <FiShare2 /> Share
                                </button>

                                <button
                                    onClick={() => handleDownload(snippet)}
                                    className="flex items-center gap-1 text-green-600 hover:text-green-800"
                                >
                                    <FiDownload /> Download
                                </button>

                                {editingIdx === idx ? (
                                    <>
                                        <button
                                            onClick={saveEdit}
                                            className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800"
                                        >
                                            <FiSave /> Save
                                        </button>
                                        <button
                                            onClick={cancelEdit}
                                            className="flex items-center gap-1 text-red-600 hover:text-red-800"
                                        >
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => startEditing(idx)}
                                            className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800"
                                        >
                                            <FiEdit2 /> Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(idx)}
                                            className="flex items-center gap-1 text-red-600 hover:text-red-800"
                                        >
                                            <FiTrash2 /> Delete
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default HistoryPage;
