import { api } from "./axios";

export async function getMovies() {
  const response = await api.get("/movies");
  return response.data;
}
