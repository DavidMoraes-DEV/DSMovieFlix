import { Link } from 'react-router-dom';
import './styles.css';

const CardLogin = () => {
  return (
    <div className="login-container base-card">
      <h1>LOGIN</h1>
      <form action="submit" className='form-container'>
        <div className="input-email">
          <input
            type="text"
            className="form-control base-input"
            placeholder="Email"
            name="username"
          />
        </div>
        <div className="input-password">
          <input
            type="password"
            className="form-control base-input"
            placeholder="Password"
            name="password"
          />
        </div>
        <Link to="/movies">
          <button>FAZER LOGIN</button>
        </Link>
      </form>
    </div>
  );
};

export default CardLogin;
