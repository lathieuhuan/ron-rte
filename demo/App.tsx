import { useState } from "react";
import { TextEditor } from "@/TextEditor";

function App() {
  const [content, setContent] = useState("");
  const [isEditable, setIsEditable] = useState(true);

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };

  return (
    <div className="p-4 container max-w-5xl mx-auto space-y-4">
      <h1 className="text-2xl text-center font-bold">Rich Text Editor</h1>

      <div>
        <button onClick={() => setIsEditable(!isEditable)}>Toggle</button>
      </div>

      <TextEditor
        className="h-86"
        value={content}
        editable={isEditable}
        onChange={handleContentChange}
      />

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
