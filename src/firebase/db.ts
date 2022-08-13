import { app } from "./firebaseApp";
import {
  getFirestore,
  getDoc,
  setDoc,
  addDoc,
  doc,
  getDocs,
  updateDoc,
  arrayUnion,
  collection,
  deleteDoc,
  where,
  query,
  documentId,
} from "firebase/firestore";
import { User, Event } from "../utilities/types";

const db = getFirestore(app);

export const addUser = async ({ email, name, avatarUrl }) => {
  try {
    const docRef = doc(db, "users", email);
    await setDoc(docRef, {
      name,
      avatarUrl,
    });
    const user: User = { email, name, avatarUrl };
    return user;
  } catch (err) {
    console.error("Error adding document: ", err);
  }
};

export const getUserByEmail = async (email: string) => {
  const docRef = doc(db, "users", email);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const userDoc = docSnap.data();
    const user: User = {
      name: userDoc.name,
      avatarUrl: userDoc.avatarUrl,
      email: docRef.id,
    };
    return user;
  } else {
    console.log("No such document!");
  }
};

export const getUsers = async (emails?: string[]) => {
  let q;
  const usersRef = collection(db, "users");
  if (emails) {
    q = query(usersRef, where(documentId(), "in", emails));
  } else {
    q = usersRef;
  }

  const querySnapshot = await getDocs(q);
  const users: User[] = [];
  querySnapshot.forEach((document) => {
    const userDoc = document.data();
    users.push({
      email: document.id,
      name: userDoc.name,
      avatarUrl: userDoc.avatarUrl,
    });
  });
};

export const addEvent = async ({
  title,
  description,
  location,
  date,
  bannerUrl,
}) => {
  const event: Event = {
    title,
    description,
    location,
    itinerary: [],
    photoPaths: [],
    date,
    bannerUrl,
  };
  try {
    const docRef = await addDoc(collection(db, "events"), event);
    event.id = docRef.id;
    return event;
  } catch (err) {
    console.error("Error adding new event: ", err);
  }
};

export const getEvents = async (eventIds?: string[]) => {
  let q;
  const eventsRef = collection(db, "events");
  if (eventIds) {
    q = query(eventsRef, where(documentId(), "in", eventIds));
  } else {
    q = eventsRef;
  }

  const querySnapshot = await getDocs(q);
  const events: Event[] = [];
  querySnapshot.forEach((document) => {
    const eventDoc = document.data();

    events.push({
      id: document.id,
      title: eventDoc.title,
      description: eventDoc.description,
      location: eventDoc.location,
      itinerary: eventDoc.itinerary,
      photoPaths: eventDoc.photoPaths,
      date: eventDoc.date,
      bannerUrl: eventDoc.bannerUrl,
    });
  });

  return events;
};

export const getEventsByGuestEmail = async (email: string) => {
  const eventIds: string[] = [];

  const guestsRef = collection(db, "guests");
  const q = query(guestsRef, where("email", "==", email));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    eventIds.push(data.eventId);
  });
  return getEvents(eventIds);
};

export const getGuestUsersByEventId = async (eventID: string) => {
  const emails: string[] = [];

  const guestsRef = collection(db, "guests");
  const q = query(guestsRef, where("eventId", "==", eventID));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    emails.push(data.email);
  });
  return getUsers(emails);
};

export const addGuestToEvent = async ({ eventId, email, isHost }) => {
  try {
    const docRef = await addDoc(collection(db, "guests"), {
      email,
      eventId,
      isHost,
      attending: isHost,
    });
    return docRef.id;
  } catch (err) {
    console.error("Error adding document: ", err);
  }
};

export const addPhotoToEvent = async ({ eventId, photoPath }) => {
  // TODO: add to the itinerary item within the event?
  try {
    const eventRef = doc(db, "events", eventId);
    await updateDoc(eventRef, {
      photoPaths: arrayUnion(photoPath),
    });
  } catch (err) {
    console.error("Error adding document: ", err);
  }
};

export const addItineraryItemToEvent = async ({ eventId, itineraryItem }) => {
  try {
    const eventRef = doc(db, "events", eventId);
    await updateDoc(eventRef, {
      itinerary: arrayUnion(itineraryItem),
    });
  } catch (err) {
    console.error("Error adding new event: ", err);
  }
};

export const deleteAllDocsInCollection = async (collectionName: string) => {
  const querySnapshot = await getDocs(collection(db, collectionName));

  const toDelete: Promise<void>[] = [];

  querySnapshot.forEach((doc) => {
    toDelete.push(deleteDoc(doc.ref));
  });

  Promise.all(toDelete).then(() =>
    console.log(`documents in ${collectionName} deleted`)
  );
};
