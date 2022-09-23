import { AxiosRequestConfig } from 'axios';
import MovieFilter, { MovieGenreFilter } from 'components/MovieFilter';
import Pagination from 'components/Pagination';
import { useCallback, useEffect, useState } from 'react';
import { Movie } from 'types/Movie';
import { SpringPage } from 'types/vendor/spring';
import { requestBackend } from 'util/requests';
import MovieCard from './MovieCard';
import './styles.css';

type ControlComponentsData = {
  activePage: number;
  filterData: MovieGenreFilter;
};

const MoviesCatalog = () => {
  const [pageMovies, setPageMovies] = useState<SpringPage<Movie>>();

  const [controlComponentsData, setControlComponentsData] =
    useState<ControlComponentsData>({
      activePage: 0,
      filterData: { name: '', genre: null },
    });

  const handlePageChange = (pageNumber: number) => {
    setControlComponentsData({ activePage: pageNumber, filterData: controlComponentsData.filterData });
  };

  const handleSubmitFilter = (data: MovieGenreFilter) => {
    setControlComponentsData({ activePage: 0, filterData: data });
  };

  const getMovies = useCallback(() => {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: '/movies',
      withCredentials: true,
      params: {
        page: controlComponentsData.activePage,
        size: 4,
        genreId: controlComponentsData.filterData.genre?.id,
      },
    };

    requestBackend(config).then((response) => {
      setPageMovies(response.data);
    });
  }, [controlComponentsData]);

  useEffect(() => {
    getMovies();
  }, [getMovies]);

  return (
    <div className="row movies-container">
      <MovieFilter onSubmitFilter={handleSubmitFilter}/>

      <div className="row moviecard-container">
        {pageMovies?.content.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
      <div className="movies-pagination-container">
        <Pagination pageCount={pageMovies ? pageMovies.totalPages : 0} range={3} onChange={handlePageChange} />
      </div>
    </div>
  );
};

export default MoviesCatalog;
