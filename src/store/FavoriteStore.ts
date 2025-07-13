import { makeAutoObservable, runInAction } from "mobx";
import type { MovieShort } from "../api/types";

const STORAGE_KEY = import.meta.env.VITE_;

export class FavoriteStore {
  favorites: MovieShort[] = [];

  constructor() {
    makeAutoObservable(this);
    this.loadFromStorage();
  }

  loadFromStorage() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const list: MovieShort[] = JSON.parse(raw);
        runInAction(() => {
          this.favorites = list;
        });
      }
    } catch {
      console.error("Ошибка при загрузке избранного");
    }
  }

  saveToStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.favorites));
  }

  isFavorite(id: number) {
    return this.favorites.some((f) => f.id === id);
  }

  add(movie: MovieShort) {
    if (!this.isFavorite(movie.id)) {
      this.favorites.push(movie);
      this.saveToStorage();
    }
  }

  remove(id: number) {
    this.favorites = this.favorites.filter((f) => f.id !== id);
    this.saveToStorage();
  }
}

const favoriteStore = new FavoriteStore();
export default favoriteStore;
