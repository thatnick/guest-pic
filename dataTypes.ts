export interface User {
    email: string,
    name: string,
    events: Event[],
    avatar: string,
    otherInfor: string,
};

export interface Event {
    title: string,
    startDate: Date,
    banner: string,
    users: User[],
    hosts: User[],
    itinerary: ItineraryItems[],
    photos: Photos[],
}

export interface ItineraryItems {
    startTime: Date,
    endTime: Date,
    title: string,
    description: string,
    location: [number, number],
}

export interface Photos {
    filepath: string,
    user: string,
    timestamp: Date,
}