"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface CarouselItem {
  imdbID: string;
  Title: string;
  Poster: string;
  Type: string;
}

export default function HeroCarousel() {
  const [items, setItems] = useState<
    CarouselItem[]
  >([]);
  const [isLoading, setIsLoading] =
    useState(true);

  useEffect(() => {
    const fetchCarouselItems = async () => {
      const popularTitles = [
        "Inception",
        "Breaking Bad",
        "The Godfather",
        "Game of Thrones",
        "Pulp Fiction",
      ];
      const fetchPromises = popularTitles.map(
        (title) =>
          fetch(
            `http://www.omdbapi.com/?t=${title}&apikey=f428776a`
          ).then((res) => res.json())
      );
      const results = await Promise.all(
        fetchPromises
      );
      setItems(
        results.filter(
          (item) => item.Response === "True"
        )
      );
      setIsLoading(false);
    };

    fetchCarouselItems();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative">
      <Slider {...settings}>
        {items.map((item) => (
          <div
            key={item.imdbID}
            className="relative h-96"
          >
            <img
              src={item.Poster}
              alt={item.Title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-4xl font-bold text-white mb-4">
                  {item.Title}
                </h2>
                <Link
                  href={`/${item.Type}s/${item.imdbID}`}
                >
                  <span className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition duration-300">
                    Learn More
                  </span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
