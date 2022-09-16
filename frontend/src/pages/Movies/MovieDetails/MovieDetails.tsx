import './styles.css';
import { Review } from 'types/Review';
import { AxiosRequestConfig } from 'axios';
import { BASE_URL, requestBackend } from 'util/requests';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
      <h1>
        Avaliações do filme: <br /> {movie?.title} - id: {movie?.id}
      </h1>

      {hasAnyRoles(['ROLE_MEMBER']) && (
        <ReviewForm movieId={movieId} onInsertReview={handleInsertReview} />
      )}

      <ReviewListing reviews={reviews} />
    </div>
  );
};

export default MovieDetails;
