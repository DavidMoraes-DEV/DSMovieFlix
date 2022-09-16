import { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Movie } from 'types/Movie';
import { SpringPage } from 'types/vendor/spring';
import { requestBackend } from 'util/requests';
import './styles.css';

type Props = {
  genreId?: number;
};

const MovieCard = ({ genreId }: Props) => {
  const [movieGenre, setMovieGenre] = useState<SpringPage<Movie>>();

  useEffect(() => {
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: `/movies`,
      withCredentials: true,
      params: {
        genreId: genreId,
      },
    };

    requestBackend(params).then((response) => {
      setMovieGenre(response.data);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="row moviecard-container">
      {movieGenre?.content.map((movie) => (
        <div className="col-sm-6 col-md-4 col-xl-3 moviecard-container-content" key={movie.id}>
          <div className="base-card moviecard-item">
            <Link to={`/movies/${movie.id}`}>
              <div className="moviecard-content-image">
                <img
                  src={movie.imgUrl}
                  alt={movie.title}
                  className="moviecard-image"
                />
              </div>
              <div className="moviecard-title">
                <h1>{movie.title}</h1>
              </div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieCard;
