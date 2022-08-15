import React from "react";
import {
  UserContextType,
  SelectedEventContextType,
  InProgressEventContextType,
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
export const InProgressEventContext =
  React.createContext<InProgressEventContextType>({
    inProgressEvent: undefined,
    setInProgressEvent: () => undefined,
    inProgressItem: undefined,
    setInProgressItem: () => undefined,
    dateTime: undefined,
    setDateTime: () => undefined,
  });
