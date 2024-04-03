// FileCard.jsx
import React from 'react';
import Link from 'next/link';

const FileCard = ({ file }) => {
  // Function to determine icon based on file type
  const getFileIcon = () => {
    if (file.fileType.startsWith('image')) {
      return <img src={file.fileUrl} alt={file.fileName} className="w-full h-auto max-h-48 object-cover" />;
    } else if (file.fileType === 'application/pdf') {
      return <img src="/pdf-icon.png" alt="PDF" className="w-full h-auto max-h-48 object-contain" />;
    } else if (file.fileType.startsWith('video')) {
      return <img src="/video-icon.png" alt="Video" className="w-full h-auto max-h-48 object-contain" />;
    } else if (file.fileType.startsWith('audio')) {
      return <img src="/audio-icon.png" alt="Audio" className="w-full h-auto max-h-48 object-contain" />;
    } else if (file.fileType.startsWith('text')) {
      return <img src="/text-icon.png" alt="Text" className="w-full h-auto max-h-48 object-contain" />;
    } else {
      return <img src="/doc-icon.png" alt="Document" className="w-full h-auto max-h-48 object-contain" />;
    }
  };

  return (
    <Link href={`/file-preview/${file.id}`} passHref>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
        <div className="file-icon">{getFileIcon()}</div>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">{file.fileName}</h3>
          <p className="text-gray-600">File Type: {file.fileType}</p>
          <p className="text-gray-600">File Size: {(file.fileSize / (1024 * 1000)).toFixed(2)} MB</p>
          {file.password && <p className="text-gray-600">File Password: {file.password}</p>}
        </div>
      </div>
    </Link>
  );
};

export default FileCard;