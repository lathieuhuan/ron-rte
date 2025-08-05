import { useState } from "react";
import { TextEditor } from "@/TextEditor";

function App() {
  const [content, setContent] = useState("");

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto space-y-4">
      <h1 className="text-2xl text-center font-bold">Ron Rich Text Editor</h1>

      <TextEditor className="h-86" value={content} onChange={handleContentChange} />

      <div>
        <h3>Current Content (HTML):</h3>
        <pre className="bg-gray-100 p-2 rounded-sm text-sm whitespace-pre-wrap max-h-40 overflow-auto">
          {content}
        </pre>
      </div>
    </div>
  );
}

export default App;
