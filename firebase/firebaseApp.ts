import { initializeApp } from "firebase/app";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMFh6vmNRkkXCW1XPhfHZPj5UoTm_HSRc",
  authDomain: "guest-pic.firebaseapp.com",
  projectId: "guest-pic",
  storageBucket: "guest-pic.appspot.com",
  messagingSenderId: "537421743943",
  appId: "1:537421743943:web:d93a4d95ff78aa89de6e62",
};

export const app = initializeApp(firebaseConfig);
