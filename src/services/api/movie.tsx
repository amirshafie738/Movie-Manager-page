import { useMutation } from "@tanstack/react-query";
import type { Imovie } from "../../types/movie";
import type { MovieFormData } from "../../validation/movieSchema";
import { api } from "./axios";

export async function getMovies() {
  const response = await api.get("/movies");
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
