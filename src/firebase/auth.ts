import { app } from "./firebaseApp";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

const auth = getAuth(app);

export const createUserAccount = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log(`signed in as ${userCredential.user.email}`);
    })
    .catch((error) => {
      // TODO: Handle these errors
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
};

export const signIn = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password).then(
    (userCredential) => {
      console.log(`signed in as ${userCredential.user.email}`);
    }
  );
};

export const signUserOut = () => {
  signOut(auth);
};

export const observeAuth = (callback) => {
  onAuthStateChanged(auth, callback);
};
