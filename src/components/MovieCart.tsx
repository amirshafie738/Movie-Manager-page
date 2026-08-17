import { Heart, Pencil, Star, Trash2 } from "lucide-react";
import type { Imovie } from "../types/movie";
interface MovieCartProps {
  movie: Imovie;
  index:number;
}

function MovieCart({ movie,index }: MovieCartProps) {
  return (
    <>
      
      <tbody>
            <tr key={movie.id} className="border-b border-gray-200">
            <td className="p-4">{index+1}</td>
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
                  <button className="rounded border p-2 cursor-pointer">
                    <Heart size={18} />
                  </button>

                  <button className="rounded border p-2 cursor-pointer">
                    <Pencil size={18} />
                  </button>

                  <button className="rounded border p-2 text-red-500 cursor-pointer">
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
    </>
  );
}
export default MovieCart;
