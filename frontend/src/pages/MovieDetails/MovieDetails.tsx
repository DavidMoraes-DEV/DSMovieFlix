import './styles.css';
import { ReactComponent as MainImage } from '../../assets/images/star.svg';

const MovieDetails = () => {
  return (
    <div className="movie-details-container">
      <h1>Detalhes do Filme <br /> id: 1</h1>
      <div className="movie-details-form base-card">
        <form action="submit" className='form-itens'>
          <input
            type="text"
            className="form-control base-input"
            placeholder="Deixe sua avaliação aqui"
            name="username"
          />
          <button>SALVAR AVALIAÇÃO</button>
        </form>
      </div>
      <div className="movie-details-evaluation base-card">
        <div className='evaluation-username'>
          <MainImage />
          <h1>Nome do Usuário</h1>
        </div>
        <div className="evaluation">Gostei muito do filme. Foi muito bom mesmo. Pena que durou pouco.</div>
        <div className='evaluation-username'>
          <MainImage />
          <h1>Nome do Usuário</h1>
        </div>
        <div className="evaluation">Gostei muito do filme. Foi muito bom mesmo. Pena que durou pouco.</div>
        <div className='evaluation-username'>
          <MainImage />
          <h1>Nome do Usuário</h1>
        </div>
        <div className="evaluation">Gostei muito do filme. Foi muito bom mesmo. Pena que durou pouco.</div>
        <div className='evaluation-username'>
          <MainImage />
          <h1>Nome do Usuário</h1>
        </div>
        <div className="evaluation">Gostei muito do filme. Foi muito bom mesmo. Pena que durou pouco.</div>
      </div>
    </div>
  );
};

export default MovieDetails;
