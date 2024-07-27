import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

async function searchContent(
  query: string,
  page = 1
) {
  const res = await fetch(
    `http://www.omdbapi.com/?s=${query}&page=${page}&apikey=f428776a`
  );
  const data = await res.json();
  return {
    results: data.Search || [],
    totalResults:
      parseInt(data.totalResults) || 0,
  };
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q: string; page?: string };
}) {
  const query = searchParams.q;
  const page = parseInt(searchParams.page || "1");
  const { results, totalResults } =
    await searchContent(query, page);
  const totalPages = Math.ceil(totalResults / 10);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">
          Search Results for "{query}"
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {results.map((item: any) => (
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
                  <h2 className="text-xl font-semibold mb-2">
                    {item.Title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    {item.Year}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 capitalize">
                    {item.Type}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          {page > 1 && (
            <Link
              href={`/search?q=${query}&page=${
                page - 1
              }`}
              className="mx-2 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Previous
            </Link>
          )}
          {page < totalPages && (
            <Link
              href={`/search?q=${query}&page=${
                page + 1
              }`}
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
