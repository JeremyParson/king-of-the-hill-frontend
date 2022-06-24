import { createContext } from "react";

export const UserReducerContext = createContext({
  user: {},
  setUser: () => {},
});
