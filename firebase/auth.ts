import { app } from "./firebaseApp";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export const createUserAccount = (email: string, password: string) => {
  const auth = getAuth(app);
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      console.log(`${userCredential.user} is signed in`);
    })
    .catch((error) => {
      // TODO: Handle these errors!
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
};
