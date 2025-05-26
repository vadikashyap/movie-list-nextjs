import { fetchMovieDetails } from "@/app/services/movieService";
import Image from "next/image";
import Link from "next/link";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function MoviePage({ params }: PageProps) {
  const movie = await fetchMovieDetails(params.id);

  if (!movie) {
    return (
      <div className='min-h-screen bg-black text-white flex items-center justify-center'>
        <h1 className='text-2xl'>Movie not found</h1>
      </div>
    );
  }

  return (
    <main className='min-h-screen bg-black text-white'>
      {/* Back Button */}
      <div className='absolute top-4 left-4 z-10'>
        <Link
          href='/'
          className='flex items-center gap-2 px-4 py-2 bg-black/50 hover:bg-black/70 
                   rounded-full transition-colors duration-300 text-white'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-5 w-5'
            viewBox='0 0 20 20'
            fill='currentColor'>
            <path
              fillRule='evenodd'
              d='M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z'
              clipRule='evenodd'
            />
          </svg>
          Back to Movies
        </Link>
      </div>

      {/* Hero Section */}
      <div className='relative h-[70vh] w-full'>
        <Image
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          fill
          className='object-cover'
          priority
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent' />
      </div>

      {/* Movie Details */}
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-4xl mx-auto'>
          <h1 className='text-4xl md:text-5xl font-bold mb-4'>{movie.title}</h1>

          <div className='flex items-center gap-4 mb-6'>
            <span className='text-yellow-500'>
              ★ {movie.vote_average.toFixed(1)}
            </span>
            <span className='text-gray-400'>|</span>
            <span>{new Date(movie.release_date).getFullYear()}</span>
            <span className='text-gray-400'>|</span>
            <span>{movie.runtime} min</span>
          </div>

          <p className='text-lg text-gray-300 mb-8'>{movie.overview}</p>

          <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            {movie.genres.map((genre) => (
              <span
                key={genre.id}
                className='px-4 py-2 bg-red-600 rounded-full text-center'>
                {genre.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
