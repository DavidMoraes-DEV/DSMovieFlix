import { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { Genre } from 'types/Genre';
import { requestBackend } from 'util/requests';
import MovieCard from './MovieCard';
import './styles.css';

const MoviesCatalog = () => {
  const [genre, setGenre] = useState<Genre[]>([]);

  useEffect(() => {
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: '/genres',
      withCredentials: true,
    };

    requestBackend(params).then((response) => {
      setGenre(response.data);
    });
  }, []);

  return (
    <div className="row movies-container">
      <h3>CATEGORIAS</h3>
      {genre?.map((genre) => (
        <div className="genre-container" key={genre.id}>
          <h5>{genre.name}</h5>
          <MovieCard genreId={genre.id} />
        </div>
      ))}
    </div>
  );
};

export default MoviesCatalog;
