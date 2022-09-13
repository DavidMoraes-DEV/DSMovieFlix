import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Switch } from "react-router-dom"
import Home from "./pages/home"
import Movies from "pages/Movies";
import MovieDetails from "pages/MovieDetails/MovieDetails";


const Routes = () => (
    <BrowserRouter>
        <Navbar />
        <Switch>
            <Route path="/" exact>
                <Home />
            </Route>
            <Route path="/movies" exact>
                <Movies />
            </Route>
            <Route path="/movies/:movieId" >
                <MovieDetails />
            </Route>
        </Switch>
    </BrowserRouter>
);

export default Routes;