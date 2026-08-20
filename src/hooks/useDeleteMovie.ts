import { useMutation } from "@tanstack/react-query";
import type { Imovie } from "../types/movie";
import { api } from "../services/api/axios";

export function useDeleteMovie() {
  return useMutation({
    mutationFn: async (id: string): Promise<Imovie> => {
      const response = await api.delete<Imovie>(`/movies/${id}`);

      return response.data;
    },
  });
}