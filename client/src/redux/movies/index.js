import { combineReducers } from "redux";
import actionMoviesReducer from "./action.reducer";
import adventureMoviesReducer from "./adventure.reducer";
import comedyMoviesReducer from "./comedy.reducer";
import crimeMoviesReducer from "./crime.reducer";
import documentaryMoviesReducer from "./documentary.reducer";
import dramaMoviesReducer from "./drama.reducer";
import historyMoviesReducer from "./history.reducer";
import horrorMoviesReducer from "./horror.reducer";
import musicMoviesReducer from "./music.reducer";
import mysteryMoviesReducer from "./mystery.reducer";
import romanceMoviesReducer from "./romance.reducer";
import scifyMoviesReducer from "./scify.reducer";
import suspenseMoviesReducer from "./suspense.reducer";
import warMoviesReducer from "./war.reducer";
import allMoviesReducer from "./movies.reducer";


export default combineReducers({
    actionMovies: actionMoviesReducer,
    adventureMovies: adventureMoviesReducer,
    comedyMovies: comedyMoviesReducer,
    crimeMovies: crimeMoviesReducer,
    documentaryMovies: documentaryMoviesReducer,
    dramaMovies: dramaMoviesReducer,
    historyMovies: historyMoviesReducer,
    horrorMovies: horrorMoviesReducer,
    musicMovies: musicMoviesReducer,
    mysteryMovies: mysteryMoviesReducer,
    romanceMovies: romanceMoviesReducer,
    scifyMovies: scifyMoviesReducer,
    suspenseMovies: suspenseMoviesReducer,
    warMovies: warMoviesReducer,
    allMovies: allMoviesReducer,
})