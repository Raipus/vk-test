import axios from "axios";
import type { MovieListResponse, MovieDetail } from "./types";
import qs from 'qs';

const api = axios.create({
  baseURL: "https://api.kinopoisk.dev/v1.4",
  headers: {
    "X-API-KEY": import.meta.env.VITE_KINOPOISK_API_KEY,
  },
  paramsSerializer: params =>
    qs.stringify(params, { arrayFormat: 'repeat' })
});

export interface MovieListParams {
  page?: number;
  limit?: number;
  filters?: Record<string, unknown>;
}

export const fetchMovies = (params: MovieListParams) => {
  const { page = 1, limit = 50, filters = {} } = params;
  return api.get<MovieListResponse>("/movie", {
    params: {
      page,
      limit,
      ...filters,
    },
  });
};

export const fetchMovieById = (id: string) => {
  return api.get<MovieDetail>(`/movie/${id}`);
};
