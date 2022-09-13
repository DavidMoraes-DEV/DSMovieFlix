import { Link } from 'react-router-dom';
import './styles.css';

const Movies = () => {
  return (
    <div className="movies-container">
      <h1>Tela listagem de filmes</h1>
      <Link to="/movies/:movieId">
        <p>Acessar /movies/1</p>
      </Link>
      <Link to="/movies/:movieId">
        <p>Acessar /movies/2</p>
      </Link>
    </div>
  );
};

export default Movies;
