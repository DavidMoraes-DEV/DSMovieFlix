import './styles.css';
import { ReactComponent as MainImage } from '../../assets/images/star.svg';
import { Review } from 'types/Review';
import axios from 'axios';
import { BASE_URL } from 'util/request';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

type UrlParams = {
  movieId: string;
}

const MovieDetails = () => {
 
  const { movieId } = useParams<UrlParams>();
  const [review, setReview] = useState<Review>();

  useEffect(() => {
    axios.get(`${BASE_URL}/movies/${movieId}/reviews`)
    .then((response) => {
      setReview(response.data);
    });
  }, [review, movieId]);

  return (
    <div className="movie-details-container bg-secundary">
      <h1>
        Detalhes do Filme <br /> id: {review?.movieId}
      </h1>

      <div className="movie-details-form base-card">
        <form action="submit" className="form-itens">
          <input
            type="text"
            className="base-input"
            placeholder="Deixe sua avaliação aqui"
            name="username"
          />
          <button>SALVAR AVALIAÇÃO</button>
        </form>
      </div>

      <div className="movie-details-evaluation base-card">

        <div className="evaluation-username">
          <MainImage />
          <h1>{review?.user.name}</h1>
        </div>

        <div className="evaluation">{review?.text}</div>

        
      </div>
    </div>
  );
};

export default MovieDetails;
