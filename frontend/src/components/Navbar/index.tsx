import './styles.css';
import { Link } from "react-router-dom";
import { useContext, useEffect } from 'react';
import { AuthContext } from 'AuthContext';
import { getTokenData, isAuthenticated } from 'util/auth';
import { removeAuthData } from 'util/storage';
import history from 'util/history';

const Navbar = () => {

  const { authContextData, setAuthContextData } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated()) {
      setAuthContextData({
        authenticated: isAuthenticated(),
        tokenData: getTokenData(),
      });
    } else {
      setAuthContextData({
        authenticated: false,
      });
    }
  }, [setAuthContextData]);

  const handleLogoutClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    removeAuthData();
    setAuthContextData({
      authenticated: false,
    });
    history.replace('/');
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark main-nav">
      <div className="container-fluid">
        <Link to={'/'} className="nav-logo-text">
            <h4>MovieFlix</h4>
        </Link>
        {authContextData.authenticated ? (
          <div className="button-logout">
            <a href="#logout" onClick={handleLogoutClick}>
              SAIR
            </a>
          </div>
        ) : (
          ''
        )}
      </div>
    </nav>
  );
}

export default Navbar;
