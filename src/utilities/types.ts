export interface User {
  id?: string;
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
  hostIds: string[];
}

export interface ItineraryItem {
  title: string;
  description: string;
  location: string;
  time: string;
}

export interface Props<T> {
  object: T;
}
