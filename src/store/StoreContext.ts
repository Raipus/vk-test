import React from "react";
import movieStore, { MovieStore } from "./MovieStore";

interface IStores {
  movieStore: MovieStore;
}

export const StoreContext = React.createContext<IStores>({
  movieStore,
});
