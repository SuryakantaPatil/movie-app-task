import { Box, Image, Text, IconButton } from "@chakra-ui/react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../store/moviesSlice";
import type { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary";

interface MovieCardProps {
  movie: {
    imdbID: string;
    Title: string;
    Poster: string;
    Year: string;
  };
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const favorites = useSelector((state: RootState) => state.movies.favorites);
  const isFavorite = favorites.includes(movie.imdbID);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleFavorite(movie.imdbID));
  };

  return (
    <ErrorBoundary>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        position="relative"
        p={2}
        boxShadow="lg"
        width="200px"
        cursor="pointer"
        onClick={() => navigate(`/movies/${movie.imdbID}`)}
        _hover={{ transform: "scale(1.05)" }}
        transition="transform 0.2s"
      >
        <Image
          src={movie.Poster}
          alt={movie.Title}
          objectFit="cover"
          height="300px"
          width="100%"
        />

        <Box p="4" position="relative">
          <Text fontWeight="bold">{movie.Title}</Text>
          <Text fontSize="sm" color="gray.500">
            {movie.Year}
          </Text>
        </Box>

        <IconButton
          aria-label="Toggle Favorite"
          onClick={handleFavoriteClick}
          position="absolute"
          bottom="5px"
          right="5px"
          variant="ghost"
          colorScheme={isFavorite ? "red" : "gray"}
          zIndex={2}
          _hover={{ bg: "transparent" }}
          //  icon={isFavorite ? <AiFillHeart size="40px" /> : <AiOutlineHeart size="40px" />}
        >
          {isFavorite ? (
            <AiFillHeart size="40px" color="red" />
          ) : (
            <AiOutlineHeart size="40px" />
          )}
        </IconButton>
      </Box>
    </ErrorBoundary>
  );
};

export default MovieCard;
