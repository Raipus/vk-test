import React, { useState } from "react";
import { Link } from "react-router-dom";
import type { MovieShort } from "../api/types";
import "./MovieCard.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useStores } from "../hooks/useStores";
import { IconButton } from "@mui/material";
import FavoriteModal from "./FavoriteModal";

interface Props {
  movie: MovieShort;
}

const MovieCard: React.FC<Props> = ({ movie }) => {
  const { favoriteStore } = useStores();
  const [openModal, setOpenModal] = useState(false);
  const posterUrl = movie.poster?.url || "/placeholder.png";
  const movieName = movie.name || movie.alternativeName;

  const handleAddConfirm = () => {
    favoriteStore.add(movie);
    setOpenModal(false);
  };

  const handleRemoveConfirm = () => {
    favoriteStore.remove(movie.id);
    setOpenModal(false);
  };

  return (
    <div className="movie-card">
      <Link to={`/movies/${movie.id}`}>
        <img src={posterUrl} className="movie-card__img" />
        <div className="movie-card__info">
          <h3 className="movie-card__title">
            {movieName} ({movie.year})
          </h3>
          <p className="movie-card__rating">
            Рейтинг: {movie.rating.kp ?? "–"}
          </p>
        </div>
      </Link>

      <div className="movie-card__favorite">
        <IconButton
          onClick={() => setOpenModal(true)}
          style={{ backgroundColor: "#ffffff" }}
          size="small"
        >
          {favoriteStore.isFavorite(movie.id) ? (
            <FavoriteIcon color="error" fontSize="small" />
          ) : (
            <FavoriteBorderIcon fontSize="small" />
          )}
        </IconButton>
      </div>

      <FavoriteModal
        open={openModal}
        onAddConfirm={handleAddConfirm}
        onRemoveConfirm={handleRemoveConfirm}
        onCancel={() => setOpenModal(false)}
        movieName={movieName}
        isFavorite={favoriteStore.isFavorite(movie.id)}
      />
    </div>
  );
};

export default MovieCard;
