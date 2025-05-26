import { Movie, MovieResponse } from "../types/movie";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

if (!API_KEY) {
  throw new Error(
    "TMDB API key is not configured. Please add NEXT_PUBLIC_TMDB_API_KEY to your .env.local file"
  );
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchWithRetry = async (
  url: string,
  options: RequestInit,
  retries = MAX_RETRIES
): Promise<Response> => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response;
  } catch (error) {
    if (retries > 0) {
      console.log(`Retrying... ${retries} attempts left`);
      await sleep(RETRY_DELAY);
      return fetchWithRetry(url, options, retries - 1);
    }
    throw error;
  }
};

export const fetchMovies = async (
  page: number = 1,
  query?: string
): Promise<MovieResponse> => {
  try {
    let url: string;
    if (query) {
      url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
        query
      )}&page=${page}`;
    } else {
      url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`;
    }

    console.log("Fetching movies from:", url); // Debug log

    const response = await fetchWithRetry(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      cache: "force-cache",
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

export const fetchMovieDetails = async (movieId: string): Promise<Movie> => {
  try {
    const url = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`;

    console.log("Fetching movie details from:", url); // Debug log

    const response = await fetchWithRetry(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      cache: "force-cache",
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};

export const getImageUrl = (
  path: string,
  size: "w500" | "original" = "w500"
): string => {
  if (!path) return "https://via.placeholder.com/500x750?text=No+Image";
  return `${IMAGE_BASE_URL}/${size}${path}`;
};
