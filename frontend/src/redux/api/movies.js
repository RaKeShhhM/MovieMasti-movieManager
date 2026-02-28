import { apiSlice } from "./apiSlice";
import { MOVIE_URL, UPLOAD_URL } from "../constants";

export const moviesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllMovies: builder.query({
      query: () => `${MOVIE_URL}/all-movies`,
    }),
    createMovie: builder.mutation({
      query: (newMovie) => ({
        url: `${MOVIE_URL}/create-movie`,
        method: "POST",
        body: newMovie,
      }),
    }),

    updateMovie: builder.mutation({
      query: ({ id, updatedMovie }) => ({
        url: `${MOVIE_URL}/update-movie/${id}`,
        method: "PUT",
        body: updatedMovie,
      }),
    }),

    addMovieReview: builder.mutation({
      query: ({ id, rating, comment }) => ({
        url: `${MOVIE_URL}/${id}/reviews`,
        method: "POST",
        body: { rating, id, comment },
      }),
    }),

    deleteComment: builder.mutation({
      query: ({ movieId, reviewId }) => ({
        url: `${MOVIE_URL}/delete-comment`,
        method: "DELETE",
        body: { movieId, reviewId },
      }),
    }),

    deleteMovie: builder.mutation({
      query: (id) => ({
        url: `${MOVIE_URL}/delete-movie/${id}`,
        method: "DELETE",
      }),
    }),

    getSpecificMovie: builder.query({
      query: (id) => `${MOVIE_URL}/specific-movie/${id}`,
    }),

    uploadImage: builder.mutation({
      query: (formData) => ({
        url: `${UPLOAD_URL}`,
        method: "POST",
        body: formData,
      }),
    }),

    getNewMovies: builder.query({
      query: () => `${MOVIE_URL}/new-movies`,
    }),

    getTopMovies: builder.query({
      query: () => `${MOVIE_URL}/top-movies`,
    }),

    getRandomMovies: builder.query({
      query: () => `${MOVIE_URL}/random-movies`,
    }),
  }),
});

export const {
  useGetAllMoviesQuery,// This hook is for fetching the complete list of movies
  useCreateMovieMutation,// This hook is for creating a new movie entry
  useUpdateMovieMutation,// This hook is for updating an existing movie's details
  useAddMovieReviewMutation,// This hook is for adding a new review to a specific movie
  useDeleteCommentMutation,// This hook is for deleting a specific review from a movie
  useGetSpecificMovieQuery,// This hook is for fetching detailed information about a specific movie by its ID
  useUploadImageMutation,// This hook is for uploading an image file and getting its URL in response
  useDeleteMovieMutation,// This hook is for deleting a specific movie by its ID
  // The following hooks are for fetching categorized movie lists
  useGetNewMoviesQuery,// This hook is for fetching the latest movies added to the database
  useGetTopMoviesQuery,// This hook is for fetching the top-rated movies
  useGetRandomMoviesQuery,// This hook is for fetching a random selection of movies
} = moviesApiSlice;
