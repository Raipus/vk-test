export interface MovieShort {
  id: number;
  name: string;
  alternativeName: string;
  year: number;
  rating: {
    kp: number | null;
    imdb: number | null;
    tmdb: number | null;
    filmCritics: number | null;
    russianFilmCritics: number | null;
    await: number | null;
  };
  poster: {
    url: string | null;
    previewUrl: string | null;
  };
  genres: { name: string }[];
}

export interface MovieListResponse {
  docs: MovieShort[];
  total: number;
  limit: number;
  page: number;
  pages: number;
}

export interface MovieDetail extends MovieShort {
  description: string;
}
