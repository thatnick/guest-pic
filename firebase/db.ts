import { app } from "./firebaseApp";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { User } from "../dataTypes";

const db = getFirestore(app);

export const addUser = async (user: User) => {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      name: user.name,
      email: user.email,
      events: user.events,
      avatar: user.avatar,
      otherInfo: user.otherInfo,
    });
    return docRef.id;
  } catch (err) {
    console.error("Error adding document: ", err);
  }
};
