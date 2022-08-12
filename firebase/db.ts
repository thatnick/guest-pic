import { app } from "./firebaseApp";
import {
  getFirestore,
  getDoc,
  setDoc,
  doc,
  collection,
  getDocs,
  updateDoc,
  arrayUnion
} from "firebase/firestore";
import { ItineraryItems, newEvent, User } from "../dataTypes";

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
    return {};
  }
};

export const getEvents = async () => {
  const querySnapshot = await getDocs(collection(db, "events"));
  const events = [];
  querySnapshot.forEach((doc: any) => {
    // doc.data() is never undefined for query doc snapshots
    //console.log(doc.id, " => ", doc.data());
    events.push({ id: doc.id, data: doc.data() });
  });

  return events;
};

export const addImage = async (image: string) => {
  try {
    console.log(image);
    const docRef = await setDoc(doc(db, "images", image), {
      name: image,
    });
  } catch (err) {
    console.error("Error adding document: ", err);
    return "";
  }
};

export const addEvent = async (eventToAdd: Event) => {
  try {
    const docRef = await setDoc(doc(db, "events", Math.random().toString()), {
      title: eventToAdd.title,
      description: eventToAdd.description,
      location: eventToAdd.location,
      itinerary: [],
      guests: [eventToAdd.hosts],
      photos: [],
      date: eventToAdd.date,
      banner: eventToAdd.banner,
      hosts: [eventToAdd.hosts],
    });
  } catch (err) {
    console.error("Error adding new event: ", err);
    return "";
  }
};

export const addEventToUser = async (email, event) => {

  const userRef = doc(db, "users", email);
  
  await updateDoc(userRef, {
    events: arrayUnion(event)
  });
}

export const addItineraryItem = async (itineryItem: ItineraryItems) => {
  try {
    const docRef = await setDoc(doc(db, "itinery", Math.random().toString()), {
      title: itineryItem.title,
      description: itineryItem.description,
      location: itineryItem.location,
      time: itineryItem.time,
      event: "??? Need to change this"
    });
  } catch (err) {
    console.error("Error adding new event: ", err);
    return "";
  }  
} 

export const addUserToEvent = async (email, event) => {
const eventRef = doc(db,"events",event)
await updateDoc(eventRef, {
  guests: arrayUnion(email)
})

}
