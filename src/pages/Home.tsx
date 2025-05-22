import {
  Box,
  Grid,
  Input,
  Spinner,
  Center,
  Heading,
  Button,
} from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../api/fetchMovies";
import { setMovies, loadFavorites } from "../store/moviesSlice";
import type { RootState } from "../store/store";
import MovieCard from "../components/MovieCard";
import ErrorBoundary from "../components/ErrorBoundary";

const Home = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state: RootState) => state.movies.allMovies);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true);
        const movies = await fetchMovies();
        dispatch(setMovies(movies));
        dispatch(loadFavorites());
      } catch (err) {
        console.error("Failed to fetch movies", err);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [dispatch]);

  const filteredMovies = useMemo(() => {
    return movies.filter((movie) =>
      movie.Title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [movies, searchTerm]);

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <ErrorBoundary>
      <Box p={4}>
        <Heading mb={4}>Movies</Heading>
        <Button
          asChild
          variant="surface"
          position="absolute"
          top="25px"
          right="30px"
        >
          <a href="/favorites">View Favorites </a>
        </Button>

        <Input
          placeholder="Search movies..."
          mb={4}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={6}>
          {filteredMovies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </Grid>
      </Box>
    </ErrorBoundary>
  );
};

export default Home;
