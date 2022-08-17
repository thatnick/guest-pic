import { createUserAccount } from "./auth";
import {
  addEvent,
  addUser,
  addGuestToEvent,
  deleteAllDocsInCollection,
  addItineraryItemToEvent,
  deleteAllItineraryItemsAndPhotos,
} from "./db";

export const deleteAllDocsInDb = () => {
  deleteAllItineraryItemsAndPhotos();
  deleteAllDocsInCollection("users");
  deleteAllDocsInCollection("events");
  deleteAllDocsInCollection("guests");
};

export const seedUserAccounts = () => {
  createUserAccount("marge@s.com", "test123");
  createUserAccount("homer@s.com", "test123");
  createUserAccount("lisa@s.com", "test123");
  createUserAccount("bart@s.com", "test123");
};

export const seedDb = async () => {
  addUser({
    email: "marge@s.com",
    name: "Marge",
    avatarUrl:
      "https://media.herworld.com/public/Marge%20Simpson%20on%20her%20batty%20blue%20beehive%20%20the%20secret%20to%20eternal%20youth!%20b.png?compress=true&quality=80&w=600&dpr=2.6",
  });
  addUser({
    email: "homer@s.com",
    name: "Homer",
    avatarUrl:
      "https://i.guim.co.uk/img/media/88f6b98714035656cb18fb282507b60e82edb0d7/0_57_2560_1536/master/2560.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=0f65e142d72b44c837382331ecbaaa51",
  });
  addUser({
    email: "bart@s.com",
    name: "Bart",
    avatarUrl:
      "https://upload.wikimedia.org/wikipedia/en/a/aa/Bart_Simpson_200px.png",
  });
  addUser({
    email: "lisa@s.com",
    name: "Lisa",
    avatarUrl:
      "https://static.wikia.nocookie.net/p__/images/e/ec/Lisa_Simpson.png/revision/latest/top-crop/width/360/height/360?cb=20160403144746&path-prefix=protagonist",
  });

  const event1 = await addEvent({
    title: "Our wedding",
    description: "All night long",
    location: "Your house",
    date: new Date("2022-08-19T19:30"),
    bannerUrl:
      "https://images.pexels.com/photos/796607/pexels-photo-796607.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  });

  const event2 = await addEvent({
    title: "Nick's 40th",
    description: "Cinema Paradiso",
    location: "Drive in",
    date: new Date("2022-08-27T18:30"),
    bannerUrl:
      "https://images.pexels.com/photos/226737/pexels-photo-226737.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  });

  addGuestToEvent({
    eventId: event1.id,
    email: "marge@s.com",
    isHost: true,
  });
  addGuestToEvent({
    eventId: event1.id,
    email: "homer@s.com",
    isHost: false,
  });

  addGuestToEvent({
    eventId: event2.id,
    email: "marge@s.com",
    isHost: true,
  });
  addGuestToEvent({
    eventId: event2.id,
    email: "bart@s.com",
    isHost: false,
  });
  addGuestToEvent({
    eventId: event2.id,
    email: "lisa@s.com",
    isHost: false,
  });

  addItineraryItemToEvent({
    eventId: event1.id,
    title: "Buffet",
    description: "A buffet",
    location: "A table in your house",
    startTime: new Date("2022-08-19T19:30"),
    endTime: new Date("2022-08-19T20:30"),
  });
  addItineraryItemToEvent({
    eventId: event1.id,
    title: "Karaoke",
    description: "Singing",
    location: "On a table in your house",
    startTime: new Date("2022-08-19T20:30"),
    endTime: new Date("2022-08-19T21:30"),
  });
  addItineraryItemToEvent({
    eventId: event2.id,
    title: "Arrive",
    description: "File starts",
    location: "Multiplex",
    startTime: new Date("2022-08-27T18:30"),
    endTime: new Date("2022-08-27T21:30"),
  });
  console.log("seeding complete");
};
