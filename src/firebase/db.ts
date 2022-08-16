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
  collectionGroup,
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
    console.log("addUser");
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
  console.log("etUserByEmail");
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
  console.log("getUsers");
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
  date: Date;
  bannerUrl: string;
}) => {
  try {
    console.log("addEvent");
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
  console.log("getEvents");

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
      date: eventDoc.date.toDate(),
      bannerUrl: eventDoc.bannerUrl,
    });
  });

  return events;
};

export const getEventsByGuestEmail = async (email: string) => {
  console.log("getEventsByGuestEmail");

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
  console.log("getGuestUsersByEventId");

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
    console.log("addGuestToEvent");
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
    console.log("addPhotoToItineraryItem");
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
  startTime,
  endTime,
}: {
  eventId: string;
  title: string;
  description: string;
  location: string;
  startTime: Date;
  endTime: Date;
}) => {
  try {
    console.log("addItineraryItemToEvent");
    const eventRef = doc(db, "events", eventId);
    const itemsRef = collection(eventRef, "itineraryItems");

    const newDocRef = await addDoc(itemsRef, {
      title,
      description,
      location,
      startTime,
      endTime,
    });
    const item: ItineraryItem = {
      id: newDocRef.id,
      title,
      description,
      location,
      startTime,
      endTime,
    };
    return item;
  } catch (err) {
    console.error("Error adding new itinerary item: ", err);
  }
};

export const getItineraryItems = async () => {
  console.log("getItineraryItems");
  const items: ItineraryItem[] = [];
  const itemsQuery = query(collectionGroup(db, "itineraryItems"));
  const querySnapshot = await getDocs(itemsQuery);
  querySnapshot.forEach((document) => {
    const itemDoc = document.data();
    items.push({
      id: document.id,
      title: itemDoc.title,
      description: itemDoc.description,
      location: itemDoc.location,
      startTime: itemDoc.time,
      endTime: itemDoc.endTime.toDate(),
    });
  });
};

export const getItineraryItemsByEvent = async (eventId: string) => {
  console.log("getItineraryItemsByEvent");
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
      startTime: itemDoc.startTime.toDate(),
      endTime: itemDoc.endTime.toDate(),
    });
  });
  return items;
};

export const getItineraryItemById = async (eventId: string, itemId: string) => {
  console.log("getItineraryItemById");
  const itemRef = doc(db, "events", eventId, "itineraryItems", itemId);
  const docSnap = await getDoc(itemRef);

  if (docSnap.exists()) {
    const itemDoc = docSnap.data();
    const item: ItineraryItem = {
      id: itemId,
      title: itemDoc.title,
      description: itemDoc.description,
      location: itemDoc.location,
      startTime: itemDoc.startTime.toDate(),
      endTime: itemDoc.endTime.toDate(),
    };
    return item;
  }
};

export const getInProgressEventsByGuest = async (email: string, date: Date) => {
  console.log("getInProgressEventsByGuest");
  const guestsEvents = await getEventsByGuestEmail(email);
  const inProgressEvents: Event[] = [];
  guestsEvents.forEach((event) => {
    if (datesAreOnSameDay(event.date, date)) {
      inProgressEvents.push(event);
    }
  });
  return inProgressEvents;
};

export const getInProgressItemsByEvent = async (
  events: Event[],
  time: Date
) => {
  console.log("getInProgressItemsByEvent");
  const inProgressItems: ItineraryItem[] = [];
  events.forEach(async (event) => {
    const items = await getItineraryItemsByEvent(event.id);
    items.forEach((item) => {
      if (timeIsBetweenStartAndEnd(time, item.startTime, item.endTime)) {
        inProgressItems.push(item);
      }
    });
  });
  return inProgressItems;
};

export const getPhotos = async () => {
  console.log("getPhotos");
  const photos: Photo[] = [];
  const photosQuery = query(collectionGroup(db, "photos"));
  const querySnapshot = await getDocs(photosQuery);
  querySnapshot.forEach((document) => {
    const itemDoc = document.data();
    photos.push({
      id: document.id,
      downloadUrl: itemDoc.downloadUrl,
      userEmail: itemDoc.userEmail,
    });
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
  console.log("getPhotosByItineraryItem");
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
  console.log("getPhotoByPhotoId");
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
  console.log("deleteAllDocsInCollection");
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
  console.log("deleteAllItineraryItemsAndPhotos");
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

const datesAreOnSameDay = (first: Date, second: Date) =>
  first.getFullYear() === second.getFullYear() &&
  first.getMonth() === second.getMonth() &&
  first.getDate() === second.getDate();

const timeIsBetweenStartAndEnd = (
  time: Date,
  startTime: Date,
  endTime: Date
) => {
  const startNum = startTime.getHours() * 60 + startTime.getMinutes();
  const endNum = endTime.getHours() * 60 + endTime.getMinutes();
  const timeNum = time.getHours() * 60 + time.getMinutes();

  return startNum <= timeNum && timeNum <= endNum;
};
