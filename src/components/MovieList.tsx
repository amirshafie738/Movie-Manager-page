import { useQuery } from "@tanstack/react-query";
import { getMovies } from "../services/api/movie";
import type { Imovie } from "../types/movie";
import MovieCart from "./MovieCart";
import { useState } from "react";
interface MovieFormProps {
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
  search: string;
  genre: string;
}
function MovieList({ setIsFormOpen, search, genre }: MovieFormProps) {
  // صفحات پیج
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["movies", search, genre, page],
    queryFn: () => getMovies({ search, genre, page, limit: 5 }),
  });
  if (isLoading) {
    return <p>Loading</p>;
  }

  if (isError) {
    return <p>{error.message}</p>;
  }

  //فیلم‌های صفحه فعلی

  const movies: Imovie[] = data?.data ?? [];

  // تعداد کل صفحات

  const totalPages = data?.pages ?? 1;
  return (
    <div className="flex flex-col gap-5 w-full overflow-x-auto">
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
          {movies.map((movie: Imovie, index: number) => (
            <MovieCart
              key={movie.id}
              movie={movie}
              index={index}
              setIsFormOpen={setIsFormOpen}
            />
          ))}
        </table>
      </div>
      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-6">
        {/* صفحه قبل */}
        <button
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page === 1}
          className="px-4 py-2 rounded-lg border disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
        >
          Previous
        </button>

        {/* شماره صفحات */}
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => setPage(pageNumber)}
              className={`w-10 h-10 rounded-lg border ${
                page === pageNumber
                  ? "bg-blue-400 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {pageNumber}
            </button>
          )
        )}

        {/* صفحه بعد */}
        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page === totalPages}
          className="px-4 py-2 rounded-lg border disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
        >
          next
        </button>
      </div>
    </div>
  );
}

export default MovieList;
