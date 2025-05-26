import { Suspense } from "react";
import { fetchMovies } from "./services/movieService";
import MovieList from "./components/MovieList";

export default async function Home({
  searchParams,
}: {
  searchParams: { query?: string };
}) {
  const query = await Promise.resolve(searchParams?.query || "");
  const movies = await fetchMovies(1, query);

  return (
    <main className='min-h-screen bg-black text-white'>
      <div className='relative'>
        {/* Hero Section */}
        <div className='relative h-[60vh] w-full'>
          {movies.results[0] && (
            <div className='absolute inset-0'>
              <img
                src={`https://image.tmdb.org/t/p/original${movies.results[0].backdrop_path}`}
                alt={movies.results[0].title}
                className='w-full h-full object-cover'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent' />
            </div>
          )}
          <div className='absolute bottom-0 left-0 right-0 p-8'>
            <h1 className='text-4xl md:text-6xl font-bold mb-4'>
              {movies.results[0]?.title}
            </h1>
            <p className='text-lg md:text-xl max-w-2xl text-gray-300'>
              {movies.results[0]?.overview}
            </p>
          </div>
        </div>

        {/* Search and Content */}
        <div className='relative z-10 px-4 md:px-8'>
          <div className='max-w-7xl mx-auto'>
            <div className='mt-8'>
              <h2 className='text-2xl font-bold mb-6 flex items-center'>
                {query ? (
                  <>
                    <span>Search Results for</span>
                    <span className='ml-2 text-red-600'>"{query}"</span>
                  </>
                ) : (
                  "Popular Movies"
                )}
              </h2>

              <Suspense fallback={<div>Loading...</div>}>
                <MovieList initialMovies={movies} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
