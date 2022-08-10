import { app } from "./firebaseApp";
import {
  getFirestore,
  getDoc,
  setDoc,
  doc,
  collection,
  getDocs,
} from "firebase/firestore";
import { User } from "../dataTypes";

const db = getFirestore(app);

export const addUser = async (user: User) => {
  try {
    const docRef = await setDoc(doc(db, "users", user.email), {
      name: user.name,
      email: user.email,
      events: user.events,
      avatar: user.avatar,
    });
  } catch (err) {
    console.error("Error adding document: ", err);
    return "";
  }
};

export const getUserByEmail = async (email: string) => {
  const docRef = doc(db, "users", email);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    return docSnap.data();
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
};

export const getEvents = async () => {
  const querySnapshot = await getDocs(collection(db, "events"));
  const events = [];
  querySnapshot.forEach((doc: any) => {
    // doc.data() is never undefined for query doc snapshots
    //console.log(doc.id, " => ", doc.data());
    events.push(doc.data());
  });
  return events;

}

export const addImage = async (image: string) => {
  try { console.log(image)
    const docRef = await setDoc(doc(db, "images", image), {
      name: image,
      
   
    });
    
  } catch (err) {
    console.error("Error adding document: ", err);
    return "";
  }

};
