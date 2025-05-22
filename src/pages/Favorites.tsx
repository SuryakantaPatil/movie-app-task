import { Box, Button, Grid, Heading } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import MovieCard from "../components/MovieCard";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { loadAllMovies, loadFavorites } from "../store/moviesSlice";
import ErrorBoundary from "../components/ErrorBoundary";

const Favorites: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allMovies = useSelector((state: RootState) => state.movies.allMovies);
  const favoriteIds = useSelector((state: RootState) => state.movies.favorites);

  const favoriteMovies = allMovies.filter((movie) =>
    favoriteIds.includes(movie.imdbID)
  );

  useEffect(() => {
    dispatch(loadFavorites());
    dispatch(loadAllMovies());
  }, [dispatch]);

  return (
    <ErrorBoundary>
      <Box
        textAlign="center"
        p={4}
        bgGradient="linear(to-r, gray.800, gray.900)"
        minH="100vh"
        position="relative"
        zIndex={1}
      >
        <Heading mb={4}>Favorite Movies</Heading>

        <Button
          onClick={() => navigate("/")}
          colorScheme="teal"
          variant="surface"
          position="absolute"
          top="30px"
          right="20px"
        >
          Back to Home
        </Button>
        {favoriteMovies.length > 0 ? (
          <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={6}>
            {favoriteMovies.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </Grid>
        ) : (
          <Box mt={6}>No favorite movies found.</Box>
        )}
      </Box>
    </ErrorBoundary>
  );
};

export default Favorites;
