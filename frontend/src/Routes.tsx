import Navbar from './components/Navbar';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/home';
import MovieDetails from 'pages/Movies/MovieDetails/MovieDetails';
import PrivateRoute from 'components/PrivateRoute';
import MoviesCatalog from 'pages/Movies/MoviesCatalog';

const Routes = () => (
  <BrowserRouter>
    <Navbar />
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <PrivateRoute path="/movies">
        <Route path="/movies" exact>
          <MoviesCatalog />
        </Route>
        <Route path="/movies/:movieId">
          <MovieDetails />
        </Route>
      </PrivateRoute>
    </Switch>
  </BrowserRouter>
);

export default Routes;
