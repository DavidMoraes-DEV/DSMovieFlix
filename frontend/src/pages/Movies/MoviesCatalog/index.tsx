import { AxiosRequestConfig } from 'axios';
import Pagination from 'components/Pagination';
import { useEffect, useState } from 'react';
import Select from 'react-select';
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
      <div className="movies-filter-container">
        <div className="base-card movies-filter-content">
          <Select options={genre} classNamePrefix="movies-filter-select"
          />
        </div>
      </div>
      {genre?.map((genre) => (
        <MovieCard genreId={genre.id} />
      ))}
      <div className='movies-pagination-container'>
        <Pagination pageCount={genre ? genre.length : 0} range={3}/>
      </div>
    </div>
  );
};

export default MoviesCatalog;
