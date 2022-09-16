import './styles.css';
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark main-nav">
      <div className="container-fluid">
        <Link to={'/'} className="nav-logo-text">
            <h4>MovieFlix</h4>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
