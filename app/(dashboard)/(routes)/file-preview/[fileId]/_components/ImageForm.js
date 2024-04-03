import { useUser } from '@clerk/nextjs';
import React, { useState, useEffect } from 'react';
import GlobalApi from '../../../../../_utils/GlobalApi';

const ImageForm = ({ onPasswordSave, fileInfo, saveSuccess }) => {
  const [enablePassword, setEnablePassword] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [emailError, setEmailError] = useState('');
  const { user } = useUser();

  const sendEmail = () => {
    // Email validation
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      setEmailSent(false); // Reset emailSent state
      return; // Stop execution if email is invalid
    }

    const data = {
      emailToSend: email,
      userName: user?.fullName,
      fileName: fileInfo?.fileName,
      fileSize: fileInfo?.fileSize,
      fileType: fileInfo?.fileType,
      shortUrl: fileInfo?.shortUrl,
      password: password 
    };
  
    GlobalApi.sendEmail(data)
      .then(resp => {
        console.log(resp);
        console.log("Hi Data:");
        setEmailSent(true); // Update emailSent state to true
        setEmailError(''); // Clear any previous error message
      })
      .catch(error => {
        console.error('Error sending email:', error);
        if (error.response && error.response.data && error.response.data.error) {
          setEmailError(error.response.data.error.message); // Set error message from response
        } else {
          setEmailError('Error sending email. Please try again later.');
        }
        setEmailSent(false); // Reset emailSent state on error
      });
  };
  // Email validation function
  const validateEmail = (email) => {
    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handlePasswordChange = (e) => {
    setEnablePassword(e.target.checked);
    setPassword(e.target.checked ? '' : '');
  };


  return (
    <div className="container mx-auto mt-8">
      <div className="max-w-4xl mx-auto flex">
        {/* Image space */}
        <div className="w-1/2">
          <div className="bg-gray-100 border border-gray-300 rounded-md p-4">
            {/* Display the image */}
            {fileInfo && fileInfo.fileUrl && (
              <img src={fileInfo.fileUrl} alt="Uploaded Image" className="w-full max-w-lg mx-auto" />
            )}
          </div>
        </div>
        {/* Form space */}
        <div className="w-1/2 px-4">
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600 font-semibold">Go to Upload</span>
            </div>
            <input
              type="text"
              value={fileInfo ? fileInfo.shortUrl : ''}
              readOnly
              className="w-full px-3 py-2 mb-4 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Short URL"
            />
            <label className="inline-flex items-center mb-4">
              <input
                type="checkbox"
                checked={enablePassword}
                onChange={handlePasswordChange}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="ml-2 text-gray-700">Enable Password?</span>
            </label>
            
            {enablePassword && (
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 mb-4 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Password"
              />
            )}
            <div className="mt-4">
              <button
                onClick={() => onPasswordSave(password)}
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Save
              </button>
              {saveSuccess && (
                <div className="mt-2 text-green-600">Password saved successfully!</div>
              )}
            </div>
            <div className="flex items-center mt-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 mr-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Send File to Email"
              />
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={sendEmail} // Call sendEmail directly without arrow function
              >
                Send Email
              </button>
            </div>
            {/* Display email error message */}
            {emailError && (
              <div className="mt-2 text-red-600">{emailError}</div>
            )}
            {/* Display email sent success message */}
            {emailSent && (
              <div className="mt-2 text-green-600">Email sent successfully!</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ImageForm;
