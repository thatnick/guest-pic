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
      // Signed in
      console.log(`signed in as ${userCredential.user.email}`);
    })
    .catch((error) => {
      // TODO: Handle these errors!
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
};

export const signIn = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password).then(
    (userCredential) => {
      // Signed in
      console.log(`signed in as ${userCredential.user.email}`);
      // TODO: get the users details from the user collection in the db
      // and add them to the user context
    }
  );
};

export const signUserOut = () => {
  signOut(auth);
};

export const observeAuth = (callback) => {
  onAuthStateChanged(auth, callback);
};
