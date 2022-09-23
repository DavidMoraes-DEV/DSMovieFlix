import { Link } from 'react-router-dom';
import { Movie } from 'types/Movie';
import './styles.css';

type Props = {
  movie?: Movie;
};

const MovieCard = ({ movie }: Props) => {
  return (
    <div className="col-sm-6 col-xl-3 moviecard-container-content">
      <div className="base-card moviecard-item">
        <Link to={`/movies/${movie?.id}`}>
          <div className="moviecard-content-image">
            <img
              src={movie?.imgUrl}
              alt={movie?.title}
              className="moviecard-image"
            />
          </div>
          <div className="moviecard-title">
            <h1>{movie?.title}</h1>
            <h2>{movie?.year}</h2>
            <p>{movie?.subTitle}</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;
