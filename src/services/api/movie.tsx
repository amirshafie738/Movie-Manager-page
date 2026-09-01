import { useMutation } from "@tanstack/react-query";
import type { Imovie } from "../../types/movie";
import type { MovieFormData } from "../../validation/movieSchema";
import { api } from "./axios";
interface GetMoviesParams {
  search?: string;
  genre?: string;
  page?: number;
  limit?: number;
}

export async function getMovies({
  search = "",
  genre = "",
  page = 1,
  limit = 5,
}: GetMoviesParams) {
  const params: Record<string, string> = {};

  if (search.trim()) {
    params["title:contains"] = search.trim();
  }

  if (genre) {
    params.genre = genre;
  }

  params["_page"] = String(page);
  params["_per_page"] = String(limit);

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
