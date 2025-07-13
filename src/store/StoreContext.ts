import React from "react";
import movieStore, { MovieStore } from "./MovieStore";
import favoriteStore, { FavoriteStore } from "./FavoriteStore";

interface IStores {
  movieStore: MovieStore;
  favoriteStore: FavoriteStore;
}

export const StoreContext = React.createContext<IStores>({
  movieStore,
  favoriteStore,
});
