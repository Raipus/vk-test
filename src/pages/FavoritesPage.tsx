import React from "react";
import { observer } from "mobx-react-lite";
import { useStores } from "../hooks/useStores";
import { Box, Typography } from "@mui/material";
import MovieCard from "../components/MovieCard";

const FavoritesPage: React.FC = observer(() => {
  const { favoriteStore } = useStores();

  return (
    <Box p={3}>
      <Typography variant="h4" mb={2}>
        Избранное
      </Typography>

      {favoriteStore.favorites.length === 0 ? (
        <Typography>Список избранного пуст.</Typography>
      ) : (
        <Box display="flex" flexWrap="wrap" gap={2}>
          {favoriteStore.favorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </Box>
      )}
    </Box>
  );
});

export default FavoritesPage;
