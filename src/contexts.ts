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
    inProgressEvents: undefined,
    setInProgressEvents: () => undefined,
    inProgressItems: undefined,
    setInProgressItems: () => undefined,
    dateTime: undefined,
    setDateTime: () => undefined,
  });
