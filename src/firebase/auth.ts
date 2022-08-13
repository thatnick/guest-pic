import { app } from "./firebaseApp";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { User } from "../types";

export const createUserAccount = (user: User, password: string) => {
  const auth = getAuth(app);
  return createUserWithEmailAndPassword(auth, user.id, password)
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
  const auth = getAuth(app);
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      console.log(`signed in as ${userCredential.user.email}`);
      // TODO: get the users details from the user collection in the db
      // and add them to the user context
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
};
