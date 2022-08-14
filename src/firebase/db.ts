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
} from "firebase/firestore";
import { User, Event, ItineraryItem, Photo } from "../utilities/types";

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
      // TODO: this needs additional value of not yet RSVP'd
      attending: isHost,
    });
    return docRef.id;
  } catch (err) {
    console.error("Error adding document: ", err);
  }
};

export const addPhotoToEvent = async ({ eventId, photoPath }) => {
  try {
    const subColRef = collection(db, "events", eventId, "itineraryItems");
    addDoc(subColRef, { photoPath });
  } catch (err) {
    console.error("Error adding document: ", err);
  }
};

export const addItineraryItemToEvent = async ({ eventId, itineraryItem }) => {
  try {
    const docRef = doc(db, "events", eventId);
    const colRef = collection(docRef, "itineraryItems");
    addDoc(colRef, itineraryItem);
  } catch (err) {
    console.error("Error adding new itinerary item: ", err);
  }
};

export const getItineraryItemsByEvent = async (eventId: string) => {
  const items: ItineraryItem[] = [];
  const docRef = doc(db, "events", eventId);
  const colRef = collection(docRef, "itineraryItems");
  const qs = await getDocs(colRef);
  qs.forEach((document) => {
    const itineraryDoc = document.data();
    items.push({
      id: document.id,
      title: itineraryDoc.title,
      description: itineraryDoc.description,
      location: itineraryDoc.location,
      time: itineraryDoc.time,
    });
  });
  return items;
};

export const getItineraryItemByEventandItemId = async (
  eventId: string,
  itemId: string
) => {
  const docRef = doc(db, "events", eventId, "itineraryItems", itemId);
  const docSnap = await getDoc(docRef);

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

export const getPhotosByEventAndItineraryItem = async (
  eventId: string,
  itemId: string
) => {
  const subColRef = collection(
    db,
    "events",
    eventId,
    "itineraryItems",
    itemId,
    "photos"
  );

  const photos: Photo[] = [];
  const qs = await getDocs(subColRef);
  qs.forEach((document) => {
    const photoDoc = document.data();
    photos.push({
      id: document.id,
      path: photoDoc.path,
      userEmail: photoDoc.userEmail,
    });
  });
  return photos;
};

export const getPhotoByEventItemAndPhotoId = async (
  eventId: string,
  itemId: string,
  photoId: string
) => {
  const docRef = doc(
    db,
    "events",
    eventId,
    "itineraryItems",
    itemId,
    "photos",
    photoId
  );
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const photoDoc = docSnap.data();
    const item: Photo = {
      id: itemId,
      path: photoDoc.path,
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
      const photos = await getPhotosByEventAndItineraryItem(event.id, item.id);
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
