import React, { useEffect, useState } from "react";
import {
  Slider,
  Typography,
  Autocomplete,
  TextField,
  Button,
} from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./MovieFilters.css";

export interface MovieFilterValues {
  genres: string[];
  rating: [number, number];
  year: [number, number];
}

const ALL_GENRES = import.meta.env.VITE_GENRES?.split(",") ?? [];

const MovieFilters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [genres, setGenres] = useState<string[]>([]);
  const [rating, setRating] = useState<[number, number]>([0, 10]);
  const [year, setYear] = useState<[number, number]>([1874, 2050]);

  useEffect(() => {
    const g = searchParams.get("genres");
    const rf = searchParams.get("ratingFrom");
    const rt = searchParams.get("ratingTo");
    const yf = searchParams.get("yearFrom");
    const yt = searchParams.get("yearTo");

    if (g) setGenres(g.split(","));
    if (rf && rt) setRating([+rf, +rt]);
    if (yf && yt) setYear([+yf, +yt]);
  }, [searchParams]);

  const handleApply = () => {
    const uiParams: Record<string, string> = {
      ratingFrom: String(rating[0]),
      ratingTo: String(rating[1]),
      yearFrom: String(year[0]),
      yearTo: String(year[1]),
    };
    if (genres.length) uiParams.genres = genres.join(",");

    setSearchParams(uiParams);
  };

  const handleReset = () => {
    setGenres([]);
    setRating([0, 10]);
    setYear([1874, 2050]);
  };

  return (
    <div className="movie-filters">
      <Typography variant="h6">Фильтры</Typography>

      <Autocomplete
        multiple
        options={ALL_GENRES}
        value={genres}
        onChange={(_, v) => setGenres(v)}
        renderInput={(params) => <TextField {...params} label="Жанры" />}
      />

      <div>
        <Typography>Рейтинг</Typography>
        <Slider
          value={rating}
          onChange={(_, v) => setRating(v as [number, number])}
          min={0}
          max={10}
          valueLabelDisplay="auto"
        />
      </div>

      <div>
        <Typography>Год выпуска</Typography>
        <Slider
          value={year}
          onChange={(_, v) => setYear(v as [number, number])}
          min={1874}
          max={2050}
          valueLabelDisplay="auto"
        />
      </div>

      <div className="movie-filters__buttons">
        <Button variant="contained" onClick={handleApply}>
          Применить фильтры
        </Button>
        <Link to={`/movies`}>
          <Button variant="outlined" onClick={handleReset}>
            Сбросить фильтры
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default MovieFilters;
