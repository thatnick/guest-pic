import React from "react";
import { UserContextType, EventContextType } from "./utilities/types";

export const UserContext = React.createContext<UserContextType>({
  user: undefined,
  setUser: () => undefined,
});
export const EventContext = React.createContext<EventContextType>({
  event: undefined,
  setEvent: () => undefined,
});
