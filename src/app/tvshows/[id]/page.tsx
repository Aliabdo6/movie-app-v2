import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MovieDetails from "@/components/MovieDetails";

async function getTVShowDetails(id: string) {
  const res = await fetch(
    `http://www.omdbapi.com/?i=${id}&apikey=f428776a`
  );
  const data = await res.json();
  return data;
}

async function getRelatedContent(
  title: string,
  type: string
) {
  const res = await fetch(
    `http://www.omdbapi.com/?s=${title}&type=${type}&apikey=f428776a`
  );
  const data = await res.json();
  return data.Search || [];
}

export default async function TVShowDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const tvShow = await getTVShowDetails(
    params.id
  );
  const relatedContent = await getRelatedContent(
    tvShow.Title,
    tvShow.Type
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <MovieDetails movie={tvShow} />

        <h2 className="text-2xl font-bold mt-8 mb-4">
          Related Content
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {relatedContent
            .slice(0, 4)
            .map((item: any) => (
              <Link
                href={`/${item.Type}s/${item.imdbID}`}
                key={item.imdbID}
              >
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-105">
                  <img
                    src={item.Poster}
                    alt={item.Title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2">
                      {item.Title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {item.Year}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
