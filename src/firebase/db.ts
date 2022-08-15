import { app } from "./firebaseApp";
import {
  getFirestore,
  getDoc,
  setDoc,
  addDoc,
  doc,
  getDocs,
  collection,
  deleteDoc,
  where,
  query,
  documentId,
  updateDoc,
  Timestamp,
} from "firebase/firestore";
import { User, Event, ItineraryItem, Photo, Guest } from "../utilities/types";
import { uploadPhoto } from "./storage";

const db = getFirestore(app);

export const addUser = async ({
  email,
  name,
  avatarUrl,
}: {
  email: string;
  name: string;
  avatarUrl: string;
}) => {
  try {
    const userRef = doc(db, "users", email);
    await setDoc(userRef, {
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
  const userRef = doc(db, "users", email);
  const docSnap = await getDoc(userRef);

  if (docSnap.exists()) {
    const userDoc = docSnap.data();
    const user: User = {
      name: userDoc.name,
      avatarUrl: userDoc.avatarUrl,
      email: userRef.id,
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
}: {
  title: string;
  description: string;
  location: string;
  date: Timestamp;
  bannerUrl: string;
}) => {
  try {
    const eventRef = await addDoc(collection(db, "events"), {
      title,
      description,
      location,
      date,
      bannerUrl,
    });
    const event: Event = {
      id: eventRef.id,
      title,
      description,
      location,
      date,
      bannerUrl,
    };
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

export const getGuestUsersByEventId = async (eventId: string) => {
  const emails: string[] = [];

  const guestsRef = collection(db, "guests");
  const q = query(guestsRef, where("eventId", "==", eventId));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    emails.push(data.email);
  });
  return getUsers(emails);
};

export const addGuestToEvent = async ({
  email,
  eventId,
  isHost,
}: {
  email: string;
  eventId: string;
  isHost: boolean;
}) => {
  try {
    const attending = isHost ? "yes" : "?";
    const guestRef = await addDoc(collection(db, "guests"), {
      email,
      eventId,
      isHost,
      attending,
    });
    const guest: Guest = {
      id: guestRef.id,
      email,
      eventId,
      isHost,
      attending,
    };
    return guest;
  } catch (err) {
    console.error("Error adding document: ", err);
  }
};

export const addPhotoToItineraryItem = async ({
  eventId,
  itemId,
  userEmail,
  filePath,
}: {
  eventId: string;
  itemId: string;
  userEmail: string;
  filePath: string;
}) => {
  try {
    const photosRef = collection(
      db,
      "events",
      eventId,
      "itineraryItems",
      itemId,
      "photos"
    );

    const photoRef = await addDoc(photosRef, { userEmail });
    const downloadUrl = await uploadPhoto({
      filePath,
      eventId,
      itemId,
      photoId: photoRef.id,
    });
    updateDoc(photoRef, { downloadUrl });
  } catch (err) {
    console.error("Error adding document: ", err);
  }
};

export const addItineraryItemToEvent = async ({
  eventId,
  title,
  description,
  location,
  time,
}: {
  eventId: string;
  title: string;
  description: string;
  location: string;
  time: Timestamp;
}) => {
  try {
    const eventRef = doc(db, "events", eventId);
    const itemsRef = collection(eventRef, "itineraryItems");
    const newDocRef = await addDoc(itemsRef, {
      title,
      description,
      location,
      time,
    });
    const item: ItineraryItem = {
      id: newDocRef.id,
      title,
      description,
      location,
      time,
    };
    return item;
  } catch (err) {
    console.error("Error adding new itinerary item: ", err);
  }
};

export const getItineraryItems;

export const getItineraryItemsByEvent = async (eventId: string) => {
  const items: ItineraryItem[] = [];
  const eventRef = doc(db, "events", eventId);
  const itemsRef = collection(eventRef, "itineraryItems");
  const querySnapshot = await getDocs(itemsRef);
  querySnapshot.forEach((document) => {
    const itemDoc = document.data();
    items.push({
      id: document.id,
      title: itemDoc.title,
      description: itemDoc.description,
      location: itemDoc.location,
      time: itemDoc.time,
    });
  });
  return items;
};

export const getItineraryItemById = async (eventId: string, itemId: string) => {
  const itemRef = doc(db, "events", eventId, "itineraryItems", itemId);
  const docSnap = await getDoc(itemRef);

  if (docSnap.exists()) {
    const itemDoc = docSnap.data();
    const item: ItineraryItem = {
      id: itemId,
      title: itemDoc.title,
      description: itemDoc.description,
      location: itemDoc.location,
      time: itemDoc.time,
    };
    return item;
  }
};

export const getInProgressEventsByDate = async (
  dateTime: Date,
  email: string
) => {
  const timestamp = Timestamp.fromDate(dateTime);
  const eventsRef = collection(db, "events");

  const q = query(eventsRef, where("date", "==", timestamp));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
  });
};

export const getPhotosByItineraryItem = async (
  eventId: string,
  itemId: string
) => {
  const photosRef = collection(
    db,
    "events",
    eventId,
    "itineraryItems",
    itemId,
    "photos"
  );

  const photos: Photo[] = [];
  const querySnapshot = await getDocs(photosRef);
  querySnapshot.forEach((document) => {
    const photoDoc = document.data();
    photos.push({
      id: document.id,
      downloadUrl: photoDoc.downloadUrl,
      userEmail: photoDoc.userEmail,
    });
  });
  return photos;
};

export const getPhotoByPhotoId = async (
  eventId: string,
  itemId: string,
  photoId: string
) => {
  const photoRef = doc(
    db,
    "events",
    eventId,
    "itineraryItems",
    itemId,
    "photos",
    photoId
  );
  const docSnap = await getDoc(photoRef);

  if (docSnap.exists()) {
    const photoDoc = docSnap.data();
    const item: Photo = {
      id: itemId,
      downloadUrl: photoDoc.downloadUrl,
      userEmail: photoDoc.userEmail,
    };
    return item;
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

export const deleteAllItineraryItemsAndPhotos = async () => {
  const events = await getEvents();
  events.forEach(async (event) => {
    const items = await getItineraryItemsByEvent(event.id);
    items.forEach(async (item) => {
      const photos = await getPhotosByItineraryItem(event.id, item.id);
      photos.forEach(async (photo) => {
        const photoRef = doc(
          db,
          "events",
          event.id,
          "itineraryItems",
          item.id,
          "photos",
          photo.id
        );
        deleteDoc(photoRef);
      });
      const itemRef = doc(db, "events", event.id, "itineraryItems", item.id);
      deleteDoc(itemRef);
    });
    console.log(`items and photos in event ${event.title} deleted`);
  });
};
