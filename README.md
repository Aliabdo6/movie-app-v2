<h1 align="center"> Movie App v2  </h1>


<p align="center">
<img src="https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js" alt="Next.js" style="animation: badge-animation 1s ease-in-out infinite alternate;">
<img src="https://img.shields.io/badge/TailwindCSS-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="TailwindCSS" style="animation: badge-animation 1s ease-in-out infinite alternate;">
<img src="https://img.shields.io/badge/Clerk-red?style=for-the-badge&logo=clerk" alt="Clerk" style="animation: badge-animation 1s ease-in-out infinite alternate;">
<img src="https://img.shields.io/badge/OMDb%20API-red?style=for-the-badge&logo=omdb" alt="OMDb API" style="animation: badge-animation 1s ease-in-out infinite alternate;">
<img src="https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge" alt="License: MIT" style="animation: badge-animation 1s ease-in-out infinite alternate;">
<img src="https://img.shields.io/badge/-TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" style="animation: badge-animation 1s ease-in-out infinite alternate;">
</p>


## Overview

Movie App v2 is a Next.js application leveraging the App Router, styled with Tailwind CSS, and offering optional user authentication through Clerk. The app supports both dark and light modes via next-themes and features a responsive navbar, movie and TV show grids, dynamic routes, search functionality, and advanced filtering and pagination.

## Features

- **Next.js App Router** for routing
- **Tailwind CSS** for styling
- **Clerk** for optional user authentication
- **Dark and light mode support** using next-themes
- **Responsive Navbar** with navigation links and theme toggle
- **Movies Page** displaying a grid of movies
- **TV Shows Page** displaying a grid of TV series
- **Dynamic Routes** for individual movie details
- **Search Functionality** to find specific movies or TV shows
- **Filtering** for Movies and TV Shows
- **Pagination** and filtering functionality
- **Fetch Movies** function with optional year and type filters
- **Filter Buttons** for All, Movies, Series, and 2023
- **Grid Display** of movie cards with links to individual movie pages
- **Pagination Buttons** (Previous and Next) that maintain current filters
- **Page Counter** showing the current page and total pages
- **Live Search Results** in the Navbar as the user types
- **Dynamic Search Results Page** that displays all results upon pressing enter or clicking the search button
- **Related/Recommended Content** on individual movie and TV show pages

## User Capabilities

Users can:

- Browse through all movies
- Filter by type (movie or series)
- Filter by year (2023 as an example, additional years can be added)
- Navigate through pages of results
- Click on a movie to view its details

## API

This application uses the [OMDb API](https://www.omdbapi.com/), The Open Movie Database, to fetch movie and TV show data. The OMDb API provides a comprehensive database of movie and TV show information, including details such as titles, years, genres, directors, actors, plot summaries, and more.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Aliabdo6/movie-app-v2.git
    ```
2. Install dependencies:
    ```bash
    cd movie-app-v2
    npm install
    ```
3. Add your OMDb API key to the environment variables:
    ```bash
    NEXT_PUBLIC_OMDB_API_KEY=your_api_key
    ```
4. Run the development server:
    ```bash
    npm run dev
    ```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Clerk](https://clerk.dev/)
- [next-themes](https://github.com/pacocoursey/next-themes)
- [OMDb API](https://www.omdbapi.com/)

