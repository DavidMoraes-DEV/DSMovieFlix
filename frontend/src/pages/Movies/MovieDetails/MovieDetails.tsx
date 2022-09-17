import './styles.css';
import { ReactComponent as ArrowIcon } from 'assets/images/arrow.svg';
import { Review } from 'types/Review';
import { AxiosRequestConfig } from 'axios';
import { BASE_URL, requestBackend } from 'util/requests';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReviewForm from 'components/ReviewForm';
import ReviewListing from 'components/ReviewListing';
import { hasAnyRoles } from 'util/auth';
import { Movie } from 'types/Movie';

type UrlParams = {
  movieId: string;
};

const MovieDetails = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [movie, setMovie] = useState<Movie>();
  const { movieId } = useParams<UrlParams>();

  useEffect(() => {
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: `${BASE_URL}/movies/${movieId}/reviews`,
      withCredentials: true,
    };

    requestBackend(params).then((response) => {
      setReviews(response.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieId]);

  const handleInsertReview = (review: Review) => {
    const clone = [...reviews];
    clone.push(review);
    setReviews(clone);
  };

  useEffect(() => {
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: `${BASE_URL}/movies/${movieId}`,
      withCredentials: true,
    };

    requestBackend(params).then((response) => {
      setMovie(response.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieId]);

  return (
    <div className="movie-details-container bg-secundary">
      <div className="goback-container">
        <Link to={'/movies'} className="goback-container-link">
          <ArrowIcon />
          <h2>VOLTAR</h2>
        </Link>
      </div>
      <div className="base-card movie-details-item">
        <div className="movie-details-image">
          <img src={movie?.imgUrl} alt={movie?.title} className="movie-image" />
        </div>
        <div className="movie-details-info">
          <h1>{movie?.title}</h1>
          <h3>{movie?.subTitle}</h3>
          <h6>Ano de Lançamento: {movie?.year}</h6>
          <div className="movie-details-synopsis-card">
            <h6>Sinópse</h6>
          </div>
          <div className="movie-details-synopsis">
            <p>{movie?.synopsis}</p>
          </div>
        </div>
      </div>

      {hasAnyRoles(['ROLE_MEMBER']) && (
        <ReviewForm movieId={movieId} onInsertReview={handleInsertReview} />
      )}

      <ReviewListing reviews={reviews} />
    </div>
  );
};

export default MovieDetails;
