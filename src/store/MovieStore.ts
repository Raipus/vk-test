import { makeAutoObservable, runInAction } from "mobx";
import type { MovieShort, MovieDetail } from "../api/types";
import {
  fetchMovies,
  fetchMovieById,
  type MovieListParams,
} from "../api/kinopoisk";

export class MovieStore {
  movies: MovieShort[] = [];
  total = 0;
  page = 0;
  pages = 1;
  isLoadingList = false;
  errorList: string | null = null;

  currentMovie: MovieDetail | null = null;
  isLoadingDetail = false;
  errorDetail: string | null = null;

  filters: MovieListParams["filters"] = {};

  constructor() {
    makeAutoObservable(this);
  }

  async loadMovies(initialFilters: MovieListParams["filters"] = {}) {
    this.movies = [];
    this.errorList = null;
    this.isLoadingList = true;
    this.page = 1;
    this.filters = initialFilters;
    try {
      const res = await fetchMovies({
        page: 1,
        limit: 50,
        filters: initialFilters,
      });
      runInAction(() => {
        this.movies = res.data.docs;
        this.total = res.data.total;
        this.pages = res.data.pages;
      });
    } catch (e: any) {
      runInAction(() => {
        this.errorList = e.message || "Не удалось загрузить список фильмов";
      });
    } finally {
      runInAction(() => {
        this.isLoadingList = false;
      });
    }
  }

  async loadMore() {
    if (this.page >= this.pages || this.isLoadingList) return;
    this.isLoadingList = true;
    const nextPage = this.page + 1;
    try {
      const res = await fetchMovies({
        page: nextPage,
        limit: 50,
        filters: this.filters,
      });
      runInAction(() => {
        this.movies.push(...res.data.docs);
        this.page = nextPage;
      });
    } catch (e: any) {
    runInAction(() => {
      this.errorList = e.message || "Не удалось загрузить дальше список фильмов";
    });
    } finally {
      runInAction(() => {
        this.isLoadingList = false;
      });
    }
  }

  async loadDetail(id: string) {
    this.isLoadingDetail = true;
    try {
      const res = await fetchMovieById(id);
      runInAction(() => {
        this.currentMovie = res.data;
      });
    } catch (e: any) {
      runInAction(() => {
        this.errorDetail = e.message || "Не удалось загрузить информацию о фильме";
      });
    } finally {
      runInAction(() => {
        this.isLoadingDetail = false;
      });
    }
  }
}

const movieStore = new MovieStore();
export default movieStore;
