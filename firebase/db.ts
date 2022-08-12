import { app } from "./firebaseApp";
import {
  getFirestore,
  getDoc,
  setDoc,
  addDoc,
  doc,
  collection,
  getDocs,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { ItineraryItem, User, Event } from "../types";

const db = getFirestore(app);

export const addUser = async (user: User) => {
  try {
    await setDoc(doc(db, "users", user.id), {
      name: user.name,
      avatarUrl: user.avatarUrl,
    });
  } catch (err) {
    console.error("Error adding document: ", err);
  }
};

const addUserEvent = async (event: Event, user: User) => {
  try {
    await addDoc(collection(db, "eventUser"), {
      eventId: event.id,
      userId: user.id,
    });
  } catch (err) {
    console.error("Error adding document: ", err);
  }
};

export const getUserByEmail = async (email: string) => {
  const docRef = doc(db, "users", email);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    return docSnap.data();
  } else {
    console.log("No such document!");
    return {};
  }
};

export const getEvents = async () => {
  const querySnapshot = await getDocs(collection(db, "events"));
  const events: Event[] = [];
  querySnapshot.forEach((document) => {
    const eventDoc = document.data();
    events.push({
      id: eventDoc.id,
      title: eventDoc.title,
      description: eventDoc.description,
      location: eventDoc.location,
      itinerary: eventDoc.itinerary,
      photoPaths: eventDoc.photoPaths,
      date: eventDoc.date,
      bannerUrl: eventDoc.bannerUrl,
      hostIds: eventDoc.hostIds,
    });
  });

  return events;
};

export const addPhotoToEvent = async (event: Event, photoPath: string) => {
  try {
    if (!event.id) {
      throw new Error("Error, event id is undefined");
    }
    const eventRef = doc(db, "events", event.id);
    await updateDoc(eventRef, {
      photoPaths: arrayUnion(photoPath),
    });
  } catch (err) {
    console.error("Error adding document: ", err);
  }
};

export const addEvent = async (event: Event) => {
  try {
    await addDoc(collection(db, "events"), event);
  } catch (err) {
    console.error("Error adding new event: ", err);
  }
};

export const addItineraryItemToEvent = async (
  itineraryItem: ItineraryItem,
  event: Event
) => {
  try {
    if (!event.id) {
      throw new Error("Error, event id is undefined");
    }
    const eventRef = doc(db, "events", event.id);
    await updateDoc(eventRef, {
      itinerary: arrayUnion(itineraryItem),
    });
  } catch (err) {
    console.error("Error adding new event: ", err);
  }
};
