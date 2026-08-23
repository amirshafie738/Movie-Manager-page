import { useEffect, type Dispatch, type SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { movieSchema, type MovieFormData } from "../validation/movieSchema";
import { queryClient } from "../main";
import { usePostMovie } from "../services/api/movie";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import toast from "react-hot-toast";
import { cancelEdit } from "../redux/reducers/TodoCartRaducer";
import { useUpdateMovie } from "../hooks/useUpdateMovie";

interface IMovieForm {
  setIsFormOpen: Dispatch<SetStateAction<boolean>>;
}

// validation
function FormPage({ setIsFormOpen }: IMovieForm) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MovieFormData>({
    resolver: zodResolver(movieSchema),
    defaultValues: {
      title: "",
      genre: "",
      description: "",
    },
  });
   // information redux reducer
   const selectedMovie = useSelector(
    (state: RootState) => state.movie.selectedMovie
  );

  //  fetch post
  const { mutate: createMovie, isPending: iscreating } = usePostMovie();

  const { mutate: updateMovie, isPending: isupdating } = useUpdateMovie();

  const isPending = iscreating || isupdating;
  const dispatch = useDispatch();

  function onSubmit(data: MovieFormData) {
    if (selectedMovie) {
      updateMovie(
        {
          id: selectedMovie.id,
          data,
        },
        {
          onSuccess: () => {
            toast.success("Movie updated successfully!");

            queryClient.invalidateQueries({
              queryKey: ["movies"],
            });

            reset();
            dispatch(cancelEdit());
            setIsFormOpen(false);
          },

          onError: (error) => {
            console.log(error);
          },
        }
      );

      return;
    }

    createMovie(data, {
      onSuccess: () => {
        toast.success("Movie added successfully!");

        queryClient.invalidateQueries({
          queryKey: ["movies"],
        });

        reset();
        setIsFormOpen(false);
      },

      onError: (error) => {
        console.log(error);
      },
    });
  }
 
  const isEditMode = !!selectedMovie;
  useEffect(() => {
    if (selectedMovie) {
      reset({
        title: selectedMovie.title,
        genre: selectedMovie.genre,
        year: selectedMovie.year,
        rating: selectedMovie.rating,
        description: selectedMovie.description,
        image: selectedMovie.image,
      });
    }
  }, [selectedMovie, reset]);

  // close modal
  function handleCloseForm() {
    reset();

    dispatch(cancelEdit());

    setIsFormOpen(false);
  }
  return (
    <div className="mb-6 rounded-lg border bg-base-100 p-6 shadow">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold">
          {isEditMode ? "Edit Movie" : "Add Movie"}
        </h1>

        <button
          type="button"
          onClick={handleCloseForm}
          className="btn btn-sm btn-circle"
        >
          ✕
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        {/* Title */}
        <label className="label">Title</label>

        <input
          type="text"
          placeholder="Enter Movie title"
          className={`input input-bordered w-full ${
            errors.title ? "input-error" : ""
          }`}
          {...register("title")}
        />

        {errors.title && (
          <p className="text-sm text-error">{errors.title.message}</p>
        )}

        {/* Genre */}
        <label className="label">Genre</label>

        <select
          {...register("genre")}
          className={`select select-bordered w-full ${
            errors.genre ? "select-error" : ""
          }`}
        >
          <option value="" disabled>
            Select genre
          </option>

          <option value="Sci-Fi">Sci-Fi</option>
          <option value="Drama">Drama</option>
          <option value="Crime">Crime</option>
          <option value="Action">Action</option>
        </select>

        {errors.genre && (
          <p className="text-sm text-error">{errors.genre.message}</p>
        )}

        {/* Year */}
        <label className="label">Year</label>

        <input
          type="number"
          placeholder="e.g. 2010"
          className={`input input-bordered w-full ${
            errors.year ? "input-error" : ""
          }`}
          {...register("year", {
            valueAsNumber: true,
          })}
        />

        {errors.year && (
          <p className="text-sm text-error">{errors.year.message}</p>
        )}

        {/* Rating */}
        <label className="label">Rating</label>

        <input
          type="number"
          step="0.1"
          placeholder="e.g. 8.5"
          className={`input input-bordered w-full ${
            errors.rating ? "input-error" : ""
          }`}
          {...register("rating", {
            valueAsNumber: true,
          })}
        />

        {errors.rating && (
          <p className="text-sm text-error">{errors.rating.message}</p>
        )}

        {/* Description */}
        <label className="label">Description</label>

        <textarea
          placeholder="Enter Movie Description..."
          className={`textarea textarea-bordered w-full ${
            errors.description ? "textarea-error" : ""
          }`}
          {...register("description")}
        />

        {errors.description && (
          <p className="text-sm text-error">{errors.description.message}</p>
        )}
        <label className="label">Image URL</label>

        <input
          type="text"
          placeholder="Enter movie image URL"
          className={`input input-bordered w-full ${
            errors.image ? "input-error" : ""
          }`}
          {...register("image")}
        />

        {errors.image && (
          <p className="text-sm text-error">{errors.image.message}</p>
        )}
        {/* Buttons */}
        <div className="mt-4 flex justify-end gap-3">
          <button type="button" onClick={handleCloseForm} className="btn">
            Cancel
          </button>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={isPending}
          >
            {isPending
              ? "Adding..."
              : isEditMode
              ? "Update Movie"
              : "Add Movie"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormPage;
