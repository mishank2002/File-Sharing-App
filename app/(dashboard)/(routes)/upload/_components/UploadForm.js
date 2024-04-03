import React, { useState, useEffect } from 'react';
import AlertMessage from './AlertMessage';
import FilePreview from './FilePreview';
import ProgressBar from './ProgessBar';

function UploadForm({ uploadBtnClick, progress }) {
    const [file, setFile] = useState();
    const [errorMessage, setErrorMessage] = useState();

    // Function to handle file selection
    const onFileSelect = (file) => {
        if (file && file.size > 2000000) {
            console.log("Size if Greater Than 2MB");
            setErrorMessage("Max limit of 2MB exceeded");
            return;
        }
        setErrorMessage(null);
        setFile(file);
    };

    // Reset file after 3 seconds when progress reaches 100%
    // useEffect(() => {
    //     let timer;
    //     if (progress === 100) {
    //         timer = setTimeout(() => {
    //             setFile(null);
    //             setTimeout(() => {
    //                 window.location.reload();
    //             }, 1000); // Reload the page after 2 seconds
    //         }, 2000); // Set file to null after 3 seconds
    //     }
    //     return () => clearTimeout(timer);
    // }, [progress]);

    return (
        <div className='text-center'>
            <div className="flex items-center justify-center w-full">
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-blue-300 border-dashed rounded-lg cursor-pointer bg-blue-50 light:hover:bg-bray-800 light:bg-gray-700 hover:bg-gray-100 light:border-gray-600 light:hover:border-gray-500 light:hover:bg-gray-600">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-12 h-12 mb-4 text-blue-500 light:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                        </svg>
                        <p className="mb-2 text-lg md:text-2xl text-gray-500 light:text-gray-400"><span className="font-semibold">Click to upload</span> or <strong className='text-primary'>drag</strong>  and <strong className='text-primary'>drop</strong></p>
                        <p className="text-xs text-gray-500 light:text-gray-400">SVG, PNG, JPG or GIF (MAX. Size 2MB)</p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" onChange={(event) => onFileSelect(event.target.files[0])}/>
                </label>
            </div> 
            {errorMessage && <AlertMessage msg={errorMessage} />}
            {file && <FilePreview file={file} removeFile={() => setFile(null)} />}
            {progress > 0 ? <ProgressBar progress={progress} /> : <button disabled={!file} className="p-2 bg-primary text-white width-[30%] rounded-full mt-5 disabled:bg-gray-400" onClick={() => uploadBtnClick(file)}>Upload</button>}
            {progress === 100 && <div>File Uploaded Successfully</div>}
        </div>
    );
}

export default UploadForm;
