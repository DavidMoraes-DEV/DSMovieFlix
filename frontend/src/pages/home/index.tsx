import { ReactComponent as MainImage } from '../../assets/images/main-image.svg';
import CardLogin from './CardLogin';
import './styles.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-container-card">
        <h1>Avalie Filmes</h1>
        <p>Diga o que você achou do seu filme favorito</p>
        <MainImage />
      </div>
      <div className="home-container-login">
        <CardLogin />
      </div>
    </div>
  );
};

export default Home;
