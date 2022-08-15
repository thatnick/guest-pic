import { initializeApp } from "firebase/app";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyDpwTnSo5oTtw6YEGDR8EipNsJbjP5BETo",
  authDomain: "guestpic.firebaseapp.com",
  projectId: "guestpic",
  storageBucket: "guestpic.appspot.com",
  messagingSenderId: "17074317713",
  appId: "1:17074317713:web:3eb53eb96bacc7c93f1230",
  measurementId: "G-2LR0V9D6FT",
};

export const app = initializeApp(firebaseConfig);
