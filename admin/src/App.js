import React, { useEffect } from "react";
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import MovieList from "./pages/movieList/MovieList";
import Movie from "./pages/movie/Movie";
import NewMovie from "./pages/newMovie/NewMovie";
import Login from "./pages/login/Login";
import { useContext } from "react";
import { AuthContext } from "./context/authContext/AuthContext";
import SerieList from "./pages/serieList/SerieList";
import NewSerie from "./pages/newSerie/NewSerie";
import Serie from "./pages/serie/Serie";


function App() {
  const { user } = useContext(AuthContext);


  return (
    <Router>
      <Switch>
        <Route path="/login"> {user ? <Redirect to="/" /> : <Login />}</Route>
        {user ? (
          [
            <>
              <Topbar />
              <div className="container">
                <Sidebar />
                <Route exact path="/">
                  <Home />
                </Route>

                <Route path="/users">
                  <UserList />
                </Route>
                <Route path="/user/:userId">
                  <User />
                </Route>
                <Route path="/newUser">
                  <NewUser />
                </Route>

                <Route path="/movies">
                  <MovieList />
                </Route>
                <Route path="/movie/:movieId">
                  <Movie />
                </Route>
                <Route path="/newMovie">
                  <NewMovie />
                </Route>

                <Route path="/series">
                  <SerieList />
                </Route>
                <Route path="/serie/:serieId">
                  <Serie />
                </Route>
                <Route path="/newSerie">
                  <NewSerie />
                </Route>
              </div>
            </>,
          ]
        ) : (
          <Route path="/">
            <Login /> : <Redirect to="/login" />
          </Route>
        )}
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
