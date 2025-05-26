import { Movie } from "../../types/movie";
import Image from "next/image";
import Link from "next/link";
import { fetchMovieDetails, getImageUrl } from "../../services/movieService";

export default async function MovieDetail({
  params,
}: {
  params: { id: string };
}) {
  try {
    const movie = await fetchMovieDetails(params.id);

    return (
      <div className='container mx-auto px-4 py-8'>
        <Link
          href='/'
          className='text-blue-500 hover:underline mb-8 inline-block'>
          ← Back to Movies
        </Link>

        <div className='bg-white rounded-lg shadow-lg min-h-[500px] overflow-hidden'>
          <div className='md:flex min-h-[500px]'>
            <div className='md:flex-shrink-0 relative h-auto md:w-1/3'>
              <Image
                src={getImageUrl(movie.poster_path, "original")}
                alt={movie.title}
                fill
                className='object-cover'
                sizes='(max-width: 768px) 100vw, 33vw'
                priority
              />
            </div>
            <div className='p-8'>
              <h1 className='text-3xl font-bold text-gray-900 mb-4'>
                {movie.title}
              </h1>
              <p className='text-gray-600 mb-4'>
                Release Date:{" "}
                {new Date(movie.release_date).toLocaleDateString()}
              </p>
              <p className='text-gray-600 mb-4'>
                Rating: {movie.vote_average.toFixed(1)}/10
              </p>
              <p className='text-gray-700'>{movie.overview}</p>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className='flex flex-col items-center justify-center min-h-screen'>
        <h1 className='text-2xl font-bold mb-4'>
          Failed to load movie details
        </h1>
        <Link href='/' className='text-blue-500 hover:underline'>
          Back to Home
        </Link>
      </div>
    );
  }
}
