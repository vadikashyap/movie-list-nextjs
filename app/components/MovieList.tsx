"use client";

import { useState, useCallback } from "react";
import { Movie, MovieResponse } from "../types/movie";
import { fetchMovies } from "../services/movieService";
import MovieCard from "./MovieCard";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import { useRouter } from "next/navigation";

interface MovieListProps {
  initialMovies: MovieResponse;
}

export default function MovieList({ initialMovies }: MovieListProps) {
  const router = useRouter();
  const [movies, setMovies] = useState<Movie[]>(initialMovies.results);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(
    initialMovies.page < initialMovies.total_pages
  );

  const loadMovies = useCallback(async (pageNum: number, query?: string) => {
    try {
      setLoading(true);
      const response = await fetchMovies(pageNum, query);
      if (pageNum === 1) {
        setMovies(response.results);
      } else {
        setMovies((prev) => [...prev, ...response.results]);
      }
      setHasMore(pageNum < response.total_pages);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSearch = useCallback(
    (query: string) => {
      setSearchQuery(query);
      setPage(1);
      loadMovies(1, query);
    },
    [loadMovies]
  );

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadMovies(nextPage, searchQuery);
    }
  }, [loading, hasMore, page, searchQuery, loadMovies]);

  const { lastElementRef } = useInfiniteScroll(loadMore);

  const handleMovieClick = (movieId: number) => {
    router.push(`/movie/${movieId}`);
  };

  return (
    <>
      <div className='mb-8'>
        <input
          type='text'
          placeholder='Search movies...'
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className='w-full px-6 py-4 bg-black/50 border border-gray-700 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-red-600 transition-all duration-300'
        />
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6'>
        {movies.map((movie, index) => (
          <div
            key={`${movie.id}-${index}`}
            ref={index === movies.length - 1 ? lastElementRef : null}>
            <MovieCard
              movie={movie}
              onClick={() => handleMovieClick(movie.id)}
            />
          </div>
        ))}
      </div>

      {loading && (
        <div className='text-center mt-8'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto'></div>
        </div>
      )}
    </>
  );
}
