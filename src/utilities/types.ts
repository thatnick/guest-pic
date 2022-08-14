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
  date: Date;
  bannerUrl: string;
}

export interface ItineraryItem {
  id: string;
  title: string;
  description: string;
  location: string;
  time: Date;
}

export interface Photo {
  id: string;
  downloadUrl: string;
  userEmail: string;
}

export interface Props<T> {
  object: T;
}

export interface EventContextType {
  event: Event;
  setEvent: (prevEvent: Event) => void;
}

export interface UserContextType {
  user: User;
  setUser: (prevUser: User) => void;
}
