
export const fetchMovies = async () => {
  const res = await fetch("https://www.omdbapi.com/?apikey=c8483c95&s=avengers"); // Update as needed

  if (!res.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await res.json();

  if (!Array.isArray(data.Search)) {
    console.error("Expected data.Search to be an array. Got:", data);
    throw new Error("API response is not an array of movies");
  }

  return data.Search;
};
