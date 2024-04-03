import React, { useState } from 'react';

const FileDisplayComponent = ({ fileInfo }) => {
  const [password, setPassword] = useState('');
  const [showFile, setShowFile] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === fileInfo.password) {
      setShowFile(true);
      setWrongPassword(false);
    } else {
      setWrongPassword(true);
    }
  };

  const handleDownload = () => {
    const downloadLink = document.createElement('a');
    downloadLink.href = fileInfo?.fileUrl;
    downloadLink.download = fileInfo?.fileName;
    downloadLink.click();
  };

  const isImageFile =
    fileInfo?.fileType === 'image/jpeg' ||
    fileInfo?.fileType === 'image/jpg' ||
    fileInfo?.fileType === 'image/png';

  return (
    <div className="flex justify-center items-center h-screen">
      {!showFile && (
        <form onSubmit={handlePasswordSubmit} className="flex flex-col items-center">
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full max-w-xs px-4 py-2 rounded border"
          />
          <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
            Submit
          </button>
          {wrongPassword && <p className="text-red-500">Wrong password. Please try again.</p>}
        </form>
      )}
      {showFile && isImageFile && (
        <div className="flex flex-col items-center">
          <img
            src={fileInfo.fileUrl}
            alt={fileInfo.fileName}
            style={{ maxWidth: '100%', maxHeight: '80vh' }}
          />
          <button onClick={handleDownload} style={downloadButtonStyle}>
            Download
          </button>
        </div>
      )}
      {showFile && !isImageFile && (
        <div className="flex flex-col items-center">
          <h2>{fileInfo.fileName}</h2>
          <p>File Type: {fileInfo.fileType}</p>
          <p>File Size: {fileInfo.fileSize}</p>
          <button onClick={handleDownload} style={downloadButtonStyle}>
            Download
          </button>
        </div>
      )}
    </div>
  );
};

const downloadButtonStyle = {
  marginTop: '1rem',
  padding: '0.5rem 1rem',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default FileDisplayComponent;
