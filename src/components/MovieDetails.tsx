"use client";

import { useTheme } from "next-themes";

export default function MovieDetails({
  movie,
}: {
  movie: any;
}) {
  const { theme } = useTheme();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img
            src={movie.Poster}
            alt={movie.Title}
            className="h-48 w-full object-cover md:w-48"
          />
        </div>
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-2">
            {movie.Title}
          </h1>
          <p
            className={`${
              theme === "dark"
                ? "text-gray-400"
                : "text-gray-600"
            } mb-4`}
          >
            {movie.Year} | {movie.Runtime} |{" "}
            {movie.Genre}
          </p>
          <p
            className={`${
              theme === "dark"
                ? "text-gray-300"
                : "text-gray-700"
            } mb-4`}
          >
            {movie.Plot}
          </p>
          <p
            className={`${
              theme === "dark"
                ? "text-gray-300"
                : "text-gray-700"
            } mb-2`}
          >
            <strong>Director:</strong>{" "}
            {movie.Director}
          </p>
          <p
            className={`${
              theme === "dark"
                ? "text-gray-300"
                : "text-gray-700"
            } mb-2`}
          >
            <strong>Actors:</strong>{" "}
            {movie.Actors}
          </p>
          <p
            className={`${
              theme === "dark"
                ? "text-gray-300"
                : "text-gray-700"
            } mb-2`}
          >
            <strong>IMDb Rating:</strong>{" "}
            {movie.imdbRating}
          </p>
        </div>
      </div>
    </div>
  );
}
