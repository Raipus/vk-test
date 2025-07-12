import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Box, Typography, CircularProgress, Chip } from '@mui/material';
import { useStores } from '../hooks/useStores';

const MovieDetailPage: React.FC = observer(() => {
  const { id } = useParams();
  const { movieStore } = useStores();

  useEffect(() => {
    if (id) movieStore.loadDetail(id);
  }, [id, movieStore]);

  if (movieStore.isLoadingDetail) {
    return (
      <Box textAlign="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (movieStore.errorDetail) {
    return (
      <Box textAlign="center" mt={4} color="error.main">
        {movieStore.errorDetail}
      </Box>
    );
  }

  const movie = movieStore.currentMovie;
  if (!movie) {
    return (
      <Box textAlign="center" mt={4}>
        Фильм не найден
      </Box>
    );
  }

  const movieName = movie.name || movie.alternativeName;

  return (
    <Box p={3} display="flex" flexDirection={{ xs: 'column', sm: 'column', md: 'column', lg: 'row' }} gap={3} alignItems={{ xs: 'center', sm: 'center', md: 'center', lg: 'start'}}>
      <img
        src={movie.poster?.url || "/placeholder.png"}
        alt={movieName}
        style={{ maxWidth: 300, maxHeight: 428.5, borderRadius: 12 }}
      />

      <Box>
        <Typography variant="h4" gutterBottom>{movieName}</Typography>

        <Typography variant="subtitle1">
          <strong>Описание:</strong>
        </Typography>
        <Typography variant="body1">
          {movie.description || 'Описание отсутствует'}
        </Typography>

        <Typography variant="subtitle1">
          <strong>Дата выхода:</strong> {movie.year}
        </Typography>

        <Typography variant="subtitle1">
          <strong>Рейтинг:</strong> {movie.rating?.kp ?? '—'}
        </Typography>

        <Typography variant="subtitle1">
          <strong>Жанры:</strong>
        </Typography>
        <Box mt={1} display="flex" flexWrap="wrap" gap={1}>
          {movie.genres?.map(g => (
            <Chip key={g.name} label={g.name} />
          ))}
        </Box>
      </Box>
    </Box>
  );
});

export default MovieDetailPage;
