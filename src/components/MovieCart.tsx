import { Heart, Pencil, Star, Trash2 } from "lucide-react";
import type { Imovie } from "../types/movie";
import type { RootState } from "../redux/store";
import { useDeleteMovie } from "../hooks/useDeleteMovie";
import { queryClient } from "../main";
import { useDispatch, useSelector } from "react-redux";
import { startEdit } from "../redux/reducers/TodoCartRaducer";
import { toggleFavorite } from "../redux/reducers/favoriteSlice";

interface MovieCartProps {
  movie: Imovie;
  index: number;
  setIsFormOpen:React.Dispatch<React.SetStateAction<boolean>>;
}

function MovieCart({ movie, index, setIsFormOpen }: MovieCartProps) {
  // delete movie
  const { mutate, isPending } = useDeleteMovie();
  function handleDelete() {
    mutate(movie.id, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["movies"],
        });
      },
    });
  }

  const dipatch = useDispatch();

  // favorit 
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorits
  );
  
  const isFavorite = favorites.some(
    (item) => item.id === movie.id
  );

  return (
    <>
      <tbody>
        <tr key={movie.id} className="border-b border-gray-200">
          <td className="p-4">{index + 1}</td>
          <td className="p-4">
            <div className="flex items-center gap-4">
              <img
                src={movie.image}
                alt={movie.title}
                className="h-24 w-16 rounded object-cover"
              />

              <div className="max-w-xs">
                <h2 className="font-semibold">{movie.title}</h2>

                <p className="mt-2 text-sm text-gray-500">
                  {movie.description}
                </p>
              </div>
            </div>
          </td>

          <td className="p-4 text-sm">{movie.genre}</td>

          <td className="p-4 text-sm">{movie.year}</td>

          <td className="p-4">
            <div className="flex items-center gap-1">
              <Star size={16} className="fill-yellow-400 text-yellow-400" />

              <span>{movie.rating}</span>
            </div>
          </td>

          <td className="p-4">
            <div className="flex gap-2">
              <button  onClick={() => dipatch(toggleFavorite(movie))} className="rounded border p-2 cursor-pointer">
                <Heart size={18} fill={isFavorite ? "red" : "none"} />
              </button>

              <button
                onClick={() => {
                  dipatch(startEdit(movie));
                  setIsFormOpen(true);
                }}
                className="rounded border p-2 cursor-pointer"
              >
                <Pencil size={18} />
              </button>

              <button
                className="rounded border p-2 text-red-500 cursor-pointer"
                onClick={handleDelete}
                disabled={isPending}
              >
                {isPending ? "Deleting..." : <Trash2 size={18} />}
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </>
  );
}
export default MovieCart;
