import React from "react";
import { Link } from "react-router-dom";
import type { MovieShort } from "../api/types";
import "./MovieCard.css";

interface Props {
  movie: MovieShort;
}

const MovieCard: React.FC<Props> = ({ movie }) => {
  const posterUrl = movie.poster?.url || "/placeholder.png";
  const movieName = movie.name || movie.alternativeName;

  return (
    <Link to={`/movies/${movie.id}`} className="movie-card">
      <img src={posterUrl} className="movie-card__img" />
      <div className="movie-card__info">
        <h3 className="movie-card__title">
          {movieName} ({movie.year})
        </h3>
        <p className="movie-card__rating">Рейтинг: {movie.rating.kp ?? "–"}</p>
      </div>
    </Link>
  );
};

export default MovieCard;
