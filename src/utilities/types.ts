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
  attending: boolean;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  date: Date;
  bannerUrl: string;
}

export interface ItineraryItem {
  id: string;
  title: string;
  description: string;
  location: string;
  startTime: Date;
  endTime: Date;
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

export interface InProgressEventsContextType {
  inProgressEvents: Event[];
  setInProgressEvents: (prevEvents: Event[]) => void;
  inProgressItems: ItineraryItem[];
  setInProgressItems: (prevItems: ItineraryItem[]) => void;
  dateTime: Date;
  setDateTime: (prevDateTime: Date) => void;
}

export interface UserContextType {
  user: User;
  setUser: (prevUser: User) => void;
}
