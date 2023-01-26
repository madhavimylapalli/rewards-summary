import { createContext } from "react";

export const HomeContext = createContext({
  users: [],
  transactions: [],
  pointsTable: [],
  activeUser: null,
});
