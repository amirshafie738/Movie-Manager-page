import { useQuery } from "@tanstack/react-query";
import { getMovies } from "../services/api/movie";
import type { Imovie } from "../types/movie";
import MovieCart from "./MovieCart";

function MovieList() {
    const {
        data: movies,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["movies"],
        queryFn: getMovies,
    });
    if (isLoading) {
        return <p>Loading</p>;
    }

    if (isError) {
        return <p>{error.message}</p>;
    }
    return (
        <>
            {movies.map((movie: Imovie) => (
                <MovieCart key={movie.id} movie={movie}/>
            ))}
        </>
    );
}

export default MovieList;
