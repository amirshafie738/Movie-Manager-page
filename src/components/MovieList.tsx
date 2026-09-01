import { useQuery } from "@tanstack/react-query";
import { getMovies } from "../services/api/movie";
import type { Imovie } from "../types/movie";
import MovieCart from "./MovieCart";
interface MovieFormProps {
  setIsFormOpen:React.Dispatch<React.SetStateAction<boolean>>;
  search:string;
  genre:string;
}
function MovieList({setIsFormOpen,search,genre}:MovieFormProps) {

  const {
    data:movies,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["movies", search,genre],
    queryFn: () => getMovies({ search,genre }),
  });
  if (isLoading) {
    return <p>Loading</p>;
  }

  if (isError) {
    return <p>{error.message}</p>;
  }
  return (
    <>
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b text-left text-sm text-gray-500">
            <th className="p-4">#</th>
              <th className="p-4">Title</th>
              <th className="p-4">Genre</th>
              <th className="p-4">Year</th>
              <th className="p-4">Rating</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          {movies.map((movie: Imovie,index:number) => (
            <MovieCart key={movie.id} movie={movie} index={index} setIsFormOpen={setIsFormOpen}/>
          ))}
        </table>
      </div>
    </>
  );
}

export default MovieList;
