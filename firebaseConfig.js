// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBUy3ZSYcTJNRiwMPhhqDtOcFtAzXOGHow",
  authDomain: "file-sharing-app-f616d.firebaseapp.com",
  projectId: "file-sharing-app-f616d",
  storageBucket: "file-sharing-app-f616d.appspot.com",
  messagingSenderId: "942294062692",
  appId: "1:942294062692:web:49527fe831cfa42fb5b171",
  measurementId: "G-35KFM0WH03"
};

// Initialize Firebase
// const analytics = getAnalytics(app);
export const app = initializeApp(firebaseConfig);