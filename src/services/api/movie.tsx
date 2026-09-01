import { useMutation } from "@tanstack/react-query";
import type { Imovie } from "../../types/movie";
import type { MovieFormData } from "../../validation/movieSchema";
import { api } from "./axios";
interface GetMoviesParams {
  search?: string;
  genre?: string;
}

export async function getMovies({
  search = "",
  genre = "",
}: GetMoviesParams) {
  const params: Record<string, string> = {};

  if (search.trim()) {
    params["title:contains"] = search.trim();
  }

  if (genre) {
    params.genre = genre;
  }

  const response = await api.get("/movies", {
    params,
  });

  return response.data;
}
export function usePostMovie() {
  return useMutation({
    mutationFn: async (movie: MovieFormData): Promise<Imovie> => {
      
      const response = await api.post<Imovie>("/movies", movie);
      return response.data;
    },
  });
}
