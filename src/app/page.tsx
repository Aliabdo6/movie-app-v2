import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroCarousel from "@/components/HeroCarousel";

async function getFeaturedMovie() {
  const res = await fetch(
    `http://www.omdbapi.com/?i=tt0111161&apikey=f428776a`
  );
  const data = await res.json();
  return data;
}

async function getMovies() {
  const res = await fetch(
    `http://www.omdbapi.com/?s=movie&type=movie&page=1&apikey=f428776a`
  );
  const data = await res.json();
  return data.Search || [];
}

async function getTVShows() {
  const res = await fetch(
    `http://www.omdbapi.com/?s=series&type=series&page=1&apikey=f428776a`
  );
  const data = await res.json();
  return data.Search || [];
}

export default async function Home() {
  const [featuredMovie, movies, tvShows] =
    await Promise.all([
      getFeaturedMovie(),
      getMovies(),
      getTVShows(),
    ]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero section (keep as is) */}
        <HeroCarousel />
        {/* Featured movie section (keep as is) */}

        <div className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold mb-6">
            Popular Movies
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {movies
              .slice(0, 4)
              .map((movie: any) => (
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
                      <h3 className="text-xl font-semibold mb-2">
                        {movie.Title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {movie.Year}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>

        <div className="bg-gray-100 dark:bg-gray-900">
          <div className="container mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold mb-6">
              Popular TV Shows
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {tvShows
                .slice(0, 4)
                .map((show: any) => (
                  <Link
                    href={`/tvshows/${show.imdbID}`}
                    key={show.imdbID}
                  >
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-105">
                      <img
                        src={show.Poster}
                        alt={show.Title}
                        className="w-full h-64 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="text-xl font-semibold mb-2">
                          {show.Title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          {show.Year}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
