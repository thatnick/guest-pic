import React from "react";
import {
  UserContextType,
  SelectedEventContextType,
  InProgressEventsContextType,
} from "./utilities/types";

export const UserContext = React.createContext<UserContextType>({
  user: undefined,
  setUser: () => undefined,
});
export const SelectedEventContext =
  React.createContext<SelectedEventContextType>({
    selectedEvent: undefined,
    setEvent: () => undefined,
  });
export const InProgressEventsContext =
  React.createContext<InProgressEventsContextType>({
    inProgressEvents: [],
    setInProgressEvents: () => undefined,
    inProgressItems: [],
    setInProgressItems: () => undefined,
    dateTime: new Date(),
    setDateTime: () => undefined,
  });
