import React, { useState, DragEvent } from "react";

interface DragAndDropProps {
  onDrop: (files: File[]) => void;
  multiple?: boolean;
}

const DragAndDrop: React.FC<DragAndDropProps> = ({
  onDrop,
  multiple = true,
}) => {
  const [dragging, setDragging] = useState(false);
  const [fileNames, setFileNames] = useState<string[]>([]);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    setFileNames(droppedFiles.map((file) => file.name));

    if (droppedFiles.length > 0) {
      onDrop(droppedFiles);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    setFileNames(selectedFiles.map((file) => file.name));

    if (selectedFiles.length > 0) {
      onDrop(selectedFiles);
    }
  };

  return (
    <div>
      <div
        className={`border-dashed border-2 rounded-lg p-6 text-center cursor-pointer transition ${
          dragging ? "border-blue-500 bg-blue-100" : "border-gray-300"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <p className="mb-2">
          {multiple ? "Drag and drop files here" : "Drag and drop a file here"}
        </p>
        <p className="text-sm text-gray-500">Or click to select files</p>
        <input
          type="file"
          className="hidden"
          onChange={handleFileChange}
          multiple={multiple}
          id="file-input"
        />
        <label htmlFor="file-input" className="btn btn-secondary mt-4">
          Select File(s)
        </label>
      </div>

      {/* Display selected file names */}
      {fileNames.length > 0 && (
        <ul className="mt-4">
          {fileNames.map((fileName, index) => (
            <li key={index} className="text-sm text-gray-600">
              {fileName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DragAndDrop;
