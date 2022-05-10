import { combineReducers } from "redux";
import tmdbMovieReducer from "./tmdbMovie.reducer";
import tmdbCreditsgMoviesReducer from "./tmdbCreditsMovie.reducer";
import tmdbSerieReducer from "./tmdbSerie.reducer";
import tmdbCreditsSerieReducer from "./tmdbCreditsSerie.reducer"
import tmdbSeasonReducer from "./tmdbSeason.reducer";

export default combineReducers({
    tmdbMovie: tmdbMovieReducer,
    tmdbCreditsMovie: tmdbCreditsgMoviesReducer,
    tmdbSerie: tmdbSerieReducer,
    tmdbCreditsSerie: tmdbCreditsSerieReducer,
    tmdbSeason: tmdbSeasonReducer,
})