"use client";
import React, { useEffect, useState } from 'react';
import UploadForm from './_components/UploadForm';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from '../../../../FirebaseConfig';
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { useUser } from '@clerk/nextjs';
import {generateRandomString} from '../../../_utils/generateRandomString'
import { useRouter } from 'next/navigation';

function Upload() {
  const { user } = useUser();
  const [progress, setProgress] = useState(0); // Initialize progress state with 0
  const [uploadComplete, setUploadComplete] = useState(false); // State to track if upload is complete
  const storage = getStorage(app);
  const db = getFirestore(app);
  const router=useRouter();
  const [fileDocId,setFileDocId]=useState();

  const uploadFile = (file) => {
    const metadata = { contentType: file.type };
    const storageRef = ref(storage, 'file-upload/' + file?.name);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    // Create a promise to track the upload task completion
    const uploadPromise = new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          setProgress(progress);
        },
        (error) => {
          reject(error);
        },
        () => {
          // Handle successful uploads
          setUploadComplete(true);
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            resolve(downloadURL);
          });
        }
      );
    });

    // Wait for the upload to complete before saving the file information
    uploadPromise
      .then((downloadURL) => {
        saveInfo(file, downloadURL);
      })
      .catch((error) => {
        console.error('Error uploading file:', error);
      });
  };

  const saveInfo = async (file, fileUrl) => {
    const docId = generateRandomString().toString();
    try {
      await setDoc(doc(db, "uploadedFile", docId), {
        fileName: file?.name,
        fileSize: file?.size,
        fileType: file?.type,
        fileUrl: fileUrl,
        userEmail: user?.primaryEmailAddress.emailAddress,
        userName: user?.fullName,
        password: '',
        id: docId,
        shortUrl: process.env.NEXT_PUBLIC_BASE_URL+'/'+docId
      });
      setFileDocId(docId); 
    } catch (error) {
      console.error('Error saving file information:', error);
    }
  }
  
  

  useEffect(() => {
    if (fileDocId) {
      setTimeout(() => {
        router.push(`/file-preview/${fileDocId}`);
      }, 1000);
    }
  }, [fileDocId, router]);
  
  return (
    <div className='p-5 px-8 md:px-28'>
      <h2 className='text-[20px] text-center m-5'>Start <strong className='text-primary'>Uploading</strong> Files And <strong className='text-primary'>Share</strong> It</h2>
      <UploadForm uploadBtnClick={(file) => uploadFile(file)} progress={progress} uploadComplete={uploadComplete} />
    </div>
  );
}

export default Upload;