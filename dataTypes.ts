export interface User {
  email: string;
  name: string;
  events: Event[];
  avatar: string;
  reference: string;
}

export interface Event {
  title: string,
  description: string,
  location: string,
  itinerary: ItineraryItems[],
  guests: User[],
  photos: Photos[],
  date: string,
  banner: string,
  hosts: User[],
}

export interface ItineraryItems {
  title: string,
  description: string,
  location: string,
  time: string,
  event: string,
}

export interface Photos {
  filepath: string;
  user: string;
  timestamp: Date;
}

export interface newEvent {
  title: string,
  description: string,
  location: string,
  date: string,
  banner: string,
  hosts: object,
}
