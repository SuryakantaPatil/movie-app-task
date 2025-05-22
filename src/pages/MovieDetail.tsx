import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { Box, Button, Heading, Image, Text } from "@chakra-ui/react";

const MovieDetail = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const movie = useSelector((state: RootState) =>
    state.movies.allMovies.find((m) => m.imdbID === movieId)
  );

  if (!movie) {
    return <Text>Movie not found.</Text>;
  }

  return (
    <Box p={6}>
      <Button onClick={() => navigate("/")}>← Back to Home</Button>
      <Image src={movie.Poster} alt={movie.Title} maxW="300px" mt={4} />
      <Heading mt={4}>{movie.Title}</Heading>
      <Text>Year: {movie.Year}</Text>
      <Text>Type: {movie.Type}</Text>
    </Box>
  );
};

export default MovieDetail;
