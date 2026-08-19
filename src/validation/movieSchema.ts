import { z } from "zod";

export const movieSchema = z.object({
  title: z.string().min(1, "Title is required"),

  genre: z.string().min(1, "Please select a genre"),

  year: z
    .number({
      error: "Year is required",
    })
    .min(1888, "Enter a valid year")
    .max(new Date().getFullYear(), "Year cannot be in the future"),

  rating: z
    .number({
      error: "Rating is required",
    })
    .min(0, "Rating must be at least 0")
    .max(10, "Rating cannot be more than 10"),

  description: z.string().min(10, "Description must be at least 10 characters"),

  image: z.string().url("Please enter a valid image URL"),
});

export type MovieFormData = z.infer<typeof movieSchema>;
