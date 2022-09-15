import './styles.css';
import { Review } from 'types/Review';
import axios, { AxiosRequestConfig } from 'axios';
import { BASE_URL, requestBackend } from 'util/requests';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SpringPage } from 'types/vendor/spring';
import { AxiosParams } from 'types/vendor/axios';
import ReviewForm from 'components/ReviewForm';
import ReviewListing from 'components/ReviewListing';

type UrlParams = {
  movieId: string;
};


const MovieDetails = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const { movieId } = useParams<UrlParams>();

  useEffect(() => {
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: `${BASE_URL}/movies/${movieId}/reviews`,
      withCredentials: true

    };

    requestBackend(params).then((response) => {
      console.log(response.data);
      console.log(reviews)
      setReviews(response.data);
      console.log(reviews)
    });
  }, [movieId]);

  return (
    <div className="movie-details-container bg-secundary">
      <h1>
        Detalhes do Filme <br /> id: {movieId}
      </h1>
      <ReviewForm />

      <ReviewListing reviews={reviews} />
      
    </div>
  );
};

export default MovieDetails;
