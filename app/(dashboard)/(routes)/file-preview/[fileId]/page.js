// FilePreview.js
"use client"
// FilePreview.js
import React, { useEffect, useState } from 'react';
import { getFirestore, updateDoc, getDoc, doc } from 'firebase/firestore';
import { app } from '../../../../../FirebaseConfig';
import ImageForm from './_components/imageForm';

function FilePreview({ params }) {
  const db = getFirestore(app);
  const [fileInfo, setFileInfo] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    const getFileInfo = async () => {
      try {
        const docRef = doc(db, "uploadedFile", params?.fileId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setFileInfo(data);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    console.log(params?.fileId);
    params?.fileId && getFileInfo();
  }, [db, params?.fileId]);

  const handlePasswordSave = async (password) => {
    const docRef = doc(db, "uploadedFile", params?.fileId);
    await updateDoc(docRef, { password: password });
    setSaveSuccess(true);

    // Fetch the updated document data
    const updatedDocSnap = await getDoc(docRef);
    if (updatedDocSnap.exists()) {
      const updatedData = updatedDocSnap.data();
      setFileInfo(updatedData);
    }
  };

  return (
    <div>
      <ImageForm
        fileInfo={fileInfo}
        saveSuccess={saveSuccess}
        onPasswordSave={handlePasswordSave}
      />
    </div>
  );
}

export default FilePreview;