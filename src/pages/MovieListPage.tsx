import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import InfiniteScroll from "react-infinite-scroll-component";
import { CircularProgress, Box } from "@mui/material";
import { useStores } from "../hooks/useStores";
import MovieCard from "../components/MovieCard";
import "./MovieListPage.css";

const MovieListPage: React.FC = observer(() => {
  const { movieStore } = useStores();

  useEffect(() => {
    movieStore.loadMovies();
  }, [movieStore]);

  if (movieStore.isLoadingList && movieStore.movies.length === 0) {
    return (
      <Box mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className="movie-list-page">
      <InfiniteScroll
        dataLength={movieStore.movies.length}
        next={() => movieStore.loadMore()}
        hasMore={movieStore.page < movieStore.pages}
        loader={
          <Box my={2} className="movie-list-page__grid">
            <CircularProgress size={24} />
          </Box>
        }
        scrollThreshold="200px"
      >
        <div className="movie-list-page__grid">
          {movieStore.movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </InfiniteScroll>

      {!movieStore.isLoadingList && movieStore.page >= movieStore.pages && (
        <Box textAlign="center" my={3}>
          Больше фильмов нет
        </Box>
      )}

      {movieStore.errorList && (
        <Box textAlign="center" my={3} color="error.main">
          Ошибка загрузки: {movieStore.errorList}
        </Box>
      )}

      {!movieStore.isLoadingList &&
        movieStore.movies.length === 0 &&
        !movieStore.errorList && (
          <Box textAlign="center" my={3}>
            По вашим фильтрам ничего не найдено
          </Box>
        )}
    </div>
  );
});

export default MovieListPage;
