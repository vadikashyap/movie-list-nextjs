import { Movie } from "../types/movie";
import Image from "next/image";
import { getImageUrl } from "../services/movieService";

interface MovieCardProps {
  movie: Movie;
  onClick: () => void;
}

export default function MovieCard({ movie, onClick }: MovieCardProps) {
  return (
    <div
      className='relative group cursor-pointer transition-transform duration-300 hover:scale-105'
      onClick={onClick}>
      <div className='relative aspect-[2/3] w-full overflow-hidden rounded-lg'>
        <Image
          src={getImageUrl(movie.poster_path)}
          alt={movie.title}
          fill
          className='object-contain transition-transform duration-300 group-hover:scale-110'
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
      </div>

      <div className='absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
        <h3 className='text-lg font-bold truncate'>{movie.title}</h3>
        <p className='text-sm text-gray-300'>
          {new Date(movie.release_date).getFullYear()}
        </p>
        <div className='flex items-center mt-2'>
          <span className='text-yellow-400'>★</span>
          <span className='ml-1 text-sm'>{movie.vote_average.toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
}
