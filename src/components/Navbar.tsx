"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import {
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

async function searchMovies(query: string) {
  const res = await fetch(
    `http://www.omdbapi.com/?s=${query}&apikey=f428776a`
  );
  const data = await res.json();
  return data.Search || [];
}

export default function Navbar() {
  const { setTheme, theme } = useTheme();
  const { isSignedIn } = useUser();
  const [searchQuery, setSearchQuery] =
    useState("");
  const [searchResults, setSearchResults] =
    useState([]);
  const router = useRouter();

  useEffect(() => {
    const delayDebounceFn = setTimeout(
      async () => {
        if (searchQuery) {
          const results = await searchMovies(
            searchQuery
          );
          setSearchResults(results.slice(0, 5));
        } else {
          setSearchResults([]);
        }
      },
      300
    );

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(
        `/search?q=${encodeURIComponent(
          searchQuery
        )}`
      );
      setSearchResults([]);
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-2xl font-bold text-gray-900 dark:text-white"
            >
              MovieApp
            </Link>
          </div>
          <div className="flex items-center">
            <form
              onSubmit={handleSearch}
              className="mr-4 relative"
            >
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) =>
                  setSearchQuery(e.target.value)
                }
                className="px-3 py-2 rounded-md text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700"
              />
              {searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 mt-1 rounded-md shadow-lg z-10">
                  {searchResults.map(
                    (result: any) => (
                      <Link
                        key={result.imdbID}
                        href={`/${result.Type}s/${result.imdbID}`}
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() =>
                          setSearchResults([])
                        }
                      >
                        {result.Title} (
                        {result.Year})
                      </Link>
                    )
                  )}
                </div>
              )}
            </form>
            <Link
              href="/movies"
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2"
            >
              Movies
            </Link>
            <Link
              href="/tvshows"
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2"
            >
              TV Shows
            </Link>
            <button
              onClick={() =>
                setTheme(
                  theme === "dark"
                    ? "light"
                    : "dark"
                )
              }
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2"
            >
              {theme === "dark" ? "🌞" : "🌙"}
            </button>
            {isSignedIn ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <SignInButton mode="modal">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                  Sign In
                </button>
              </SignInButton>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
