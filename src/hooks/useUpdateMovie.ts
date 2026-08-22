import { useMutation } from "@tanstack/react-query";
import type { Imovie } from "../types/movie";
import type { MovieFormData } from "../validation/movieSchema";
import { api } from "../services/api/axios";

interface UpdateMovieParams {
  id: string;
  data: MovieFormData;
}

export function useUpdateMovie() {
  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: UpdateMovieParams): Promise<Imovie> => {
      const response = await api.patch<Imovie>(
        `/movies/${id}`,
        data
      );

      return response.data;
    },
  });
}