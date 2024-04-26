'use client';

import React, { useEffect, useState } from 'react';
import { getFirestore, getDoc, doc } from 'firebase/firestore';
import { app } from '../../../../../firebaseConfig';
import FileDisplayComponent from './_components/FileDisplayComponent';


const FilePage = ({ params }) => {
  const db = getFirestore(app);
  const [fileInfo, setFileInfo] = useState(null);

  useEffect(() => {
    const getFileInfo = async () => {
      try {
        const docRef = doc(db, 'uploadedFile', params?.fileId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setFileInfo(data);
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching document:', error);
      }
    };

    console.log(params?.fileId);
    params?.fileId && getFileInfo();
  }, [db, params?.fileId]);

  return (
    <div>
      <FileDisplayComponent fileInfo={fileInfo} />
    </div>
  );
};

export default FilePage;