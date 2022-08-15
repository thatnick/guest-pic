import { Timestamp } from "firebase/firestore";

export interface User {
  email: string;
  name: string;
  avatarUrl: string;
}

export interface Guest {
  id: string;
  email: string;
  eventId: string;
  isHost: boolean;
  attending: "yes" | "no" | "?";
}

export interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  date: Timestamp;
  bannerUrl: string;
}

export interface ItineraryItem {
  id: string;
  title: string;
  description: string;
  location: string;
  time: Timestamp;
}

export interface Photo {
  id: string;
  downloadUrl: string;
  userEmail: string;
}

export interface Props<T> {
  object: T;
}

export interface SelectedEventContextType {
  selectedEvent: Event;
  setSelectedEvent: (prevEvent: Event) => void;
}

export interface InProgressEventContextType {
  inProgressEvent: Event;
  setInProgressEvent: (prevEvent: Event) => void;
  inProgressItem: ItineraryItem;
  setInProgressItem: (prevEvent: ItineraryItem) => void;
}

export interface UserContextType {
  user: User;
  setUser: (prevUser: User) => void;
}
