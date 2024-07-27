import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

async function getMovies(
  page = 1,
  year?: string,
  type?: string
) {
  let url = `http://www.omdbapi.com/?s=movie&page=${page}&apikey=f428776a`;
  if (year) url += `&y=${year}`;
  if (type) url += `&type=${type}`;
  const res = await fetch(url);
  const data = await res.json();
  return {
    movies: data.Search || [],
    totalResults:
      parseInt(data.totalResults) || 0,
  };
}

export default async function MoviesPage({
  searchParams,
}: {
  searchParams: {
    page?: string;
    year?: string;
    type?: string;
  };
}) {
  const page = parseInt(searchParams.page || "1");
  const year = searchParams.year;
  const type = searchParams.type;
  const { movies, totalResults } =
    await getMovies(page, year, type);
  const totalPages = Math.ceil(totalResults / 10);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">
          Movies
        </h1>
        <div className="mb-4">
          <Link
            href="/movies"
            className="mr-2 px-3 py-1 bg-blue-500 text-white rounded"
          >
            All
          </Link>
          <Link
            href="/movies?type=movie"
            className="mr-2 px-3 py-1 bg-blue-500 text-white rounded"
          >
            Movies
          </Link>
          <Link
            href="/movies?type=series"
            className="mr-2 px-3 py-1 bg-blue-500 text-white rounded"
          >
            Series
          </Link>
          <Link
            href="/movies?year=2023"
            className="px-3 py-1 bg-blue-500 text-white rounded"
          >
            2023
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {movies.map((movie: any) => (
            <Link
              href={`/movies/${movie.imdbID}`}
              key={movie.imdbID}
            >
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-105">
                <img
                  src={movie.Poster}
                  alt={movie.Title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">
                    {movie.Title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    {movie.Year}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          {page > 1 && (
            <Link
              href={`/movies?page=${page - 1}${
                year ? `&year=${year}` : ""
              }${type ? `&type=${type}` : ""}`}
              className="mx-2 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Previous
            </Link>
          )}
          {page < totalPages && (
            <Link
              href={`/movies?page=${page + 1}${
                year ? `&year=${year}` : ""
              }${type ? `&type=${type}` : ""}`}
              className="mx-2 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Next
            </Link>
          )}
        </div>
        <div className="mt-4 text-center text-gray-600 dark:text-gray-400">
          Page {page} of {totalPages}
        </div>
      </main>
      <Footer />
    </div>
  );
}
