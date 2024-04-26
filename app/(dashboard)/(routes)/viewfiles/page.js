// ViewFiles.jsx
"use client";
import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import { app } from '../../../../firebaseConfig';
import FileCard from './_components/FileCard';

const ViewFiles = () => {
  const { user } = useUser();
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchUserFiles = async () => {
      try {
        const db = getFirestore(app);
        const q = query(
          collection(db, 'uploadedFile'),
          where('userEmail', '==', user.emailAddresses[0].emailAddress)
        );
        const querySnapshot = await getDocs(q);
        const filesData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setFiles(filesData);
      } catch (error) {
        console.error('Error fetching user files:', error);
      }
    };
    if (user) {
      fetchUserFiles();
    }
  }, [user]);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">My Files</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {files.map((file) => (
          <FileCard key={file.id} file={file} />
        ))}
      </div>
    </div>
  );
};

export default ViewFiles;