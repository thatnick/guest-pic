import { Dispatch, SetStateAction } from "react";

export interface User {
  email: string;
  name: string;
  avatarUrl: string;
}

export interface Event {
  id?: string;
  title: string;
  description: string;
  location: string;
  itinerary: ItineraryItem[];
  photoPaths: string[];
  date: Date;
  bannerUrl: string;
}

export interface ItineraryItem {
  title: string;
  description: string;
  location: string;
  time: Date;
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
