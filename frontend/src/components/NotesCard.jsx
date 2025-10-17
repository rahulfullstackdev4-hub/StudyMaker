import React from "react";

const NotesCard = ({ title, summary, fileUrl }) => {
  return (
    <div className="bg-white shadow-md rounded p-4 mb-4">
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-gray-700 mb-2">{summary}</p>
      {fileUrl && (
        <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
          View File
        </a>
      )}
    </div>
  );
};

export default NotesCard;
