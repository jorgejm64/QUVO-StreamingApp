import axios from "../../axiosInstance";
import { tmdbActionTypes } from "./tmdb.types";

//GET MOVIE DATA
export const fetchTmdbMovieRequest = () => ({
  type: tmdbActionTypes.FETCH_TMDB_MOVIES_REQUEST,
});

export const fetchTmdbMovieSuccess = (tmdb) => ({
  type: tmdbActionTypes.FETCH_TMDB_MOVIES_SUCCESS,
  payload: tmdb,
});

export const fetchTmdbMovieFailure = (error) => ({
  type: tmdbActionTypes.FETCH_TMDB_MOVIES_FAILURE,
  payload: error,
});

export const fetchTmdbMovieAsync = (id) => {
  return (dispatch) => {
    try {
      //Estado inicial
      dispatch(fetchTmdbMovieRequest());
      //Realizamos petición a TMDB
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=89e7953e807ae02c4e1ef162506e7f04&language=es-ES`
        )
        .then((res) => {
          //Devolvemos los datos
          const tmdbMovie = res.data;
          //Estado final success
          dispatch(fetchTmdbMovieSuccess(tmdbMovie));
        });
    } catch (e) {
      //Estado final si hubo error
      dispatch(fetchTmdbMovieFailure(e));
    }
  };
};

//GET MOVIE CREDITS
export const fetchTmdbCreditsMovieRequest = () => ({
  type: tmdbActionTypes.FETCH_TMDB_CREDITS_MOVIES_REQUEST,
});

export const fetchTmdbCreditsMovieSuccess = (tmdb) => ({
  type: tmdbActionTypes.FETCH_TMDB_CREDITS_MOVIES_SUCCESS,
  payload: tmdb,
});

export const fetchTmdbCreditsMovieFailure = (error) => ({
  type: tmdbActionTypes.FETCH_TMDB_CREDITS_MOVIES_FAILURE,
  payload: error,
});

export const fetchTmdbCreditsMovieAsync = (id) => {
  return (dispatch) => {
    try {
      dispatch(fetchTmdbCreditsMovieRequest());
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=89e7953e807ae02c4e1ef162506e7f04&language=es-ES`
        )
        .then((res) => {
          const tmdbMovie = res.data;
          dispatch(fetchTmdbCreditsMovieSuccess(tmdbMovie));
        });
    } catch (e) {
      dispatch(fetchTmdbCreditsMovieFailure(e));
    }
  };
};

//GET SERIE DATA
export const fetchTmdbSerieRequest = () => ({
  type: tmdbActionTypes.FETCH_TMDB_SERIES_REQUEST,
});

export const fetchTmdbSerieSuccess = (tmdb) => ({
  type: tmdbActionTypes.FETCH_TMDB_SERIES_SUCCESS,
  payload: tmdb,
});

export const fetchTmdbSerieFailure = (error) => ({
  type: tmdbActionTypes.FETCH_TMDB_SERIES_FAILURE,
  payload: error,
});

export const fetchTmdbSerieAsync = (id) => {
  return (dispatch) => {
    try {
      console.log("Peticion de datos")
      dispatch(fetchTmdbSerieRequest());
      axios
        .get(
          `https://api.themoviedb.org/3/tv/${id}?api_key=89e7953e807ae02c4e1ef162506e7f04&language=es-ES`
        )
        .then((res) => {
          const tmdbSerie = res.data;
          dispatch(fetchTmdbSerieSuccess(tmdbSerie));
        });
    } catch (e) {
      dispatch(fetchTmdbSerieFailure(e));
    }
  };
};

//GET SERIE CREDITS
export const fetchTmdbCreditsSerieRequest = () => ({
  type: tmdbActionTypes.FETCH_TMDB_CREDITS_SERIES_REQUEST,
});

export const fetchTmdbCreditsSerieSuccess = (tmdb) => ({
  type: tmdbActionTypes.FETCH_TMDB_CREDITS_SERIES_SUCCESS,
  payload: tmdb,
});

export const fetchTmdbCreditsSerieFailure = (error) => ({
  type: tmdbActionTypes.FETCH_TMDB_CREDITS_SERIES_FAILURE,
  payload: error,
});

export const fetchTmdbCreditsSerieAsync = (id) => {
  return (dispatch) => {
    try {
      dispatch(fetchTmdbCreditsSerieRequest());
      axios
        .get(
          `https://api.themoviedb.org/3/tv/${id}/credits?api_key=89e7953e807ae02c4e1ef162506e7f04&language=es-ES`
        )
        .then((res) => {
          const tmdbSerie = res.data;
          dispatch(fetchTmdbCreditsSerieSuccess(tmdbSerie));
        });
    } catch (e) {
      dispatch(fetchTmdbCreditsSerieFailure(e));
    }
  };
};

//GET SERIE SEASON AND EPISODE INFO
export const fetchTmdbSeasonRequest = () => ({
  type: tmdbActionTypes.FETCH_TMDB_SEASON_REQUEST,
});

export const fetchTmdbSeasonSuccess = (tmdb) => ({
  type: tmdbActionTypes.FETCH_TMDB_SEASON_SUCCESS,
  payload: tmdb,
});

export const fetchTmdbSeasonFailure = (error) => ({
  type: tmdbActionTypes.FETCH_TMDB_SEASON_FAILURE,
  payload: error,
});

export const fetchTmdbSeasonAsync = (id, n) => {
  return (dispatch) => {
    try {
      let seasonArray = []
      dispatch(fetchTmdbSeasonRequest());
      for (let i = 1; i <= n; i++) {
      axios
        .get(
          `https://api.themoviedb.org/3/tv/${id}/season/${i}?api_key=89e7953e807ae02c4e1ef162506e7f04&language=es-ES`
        )
        .then((res) => {
          const tmdbSeason = res.data;
          seasonArray.push(tmdbSeason);
          if (n === i) {
            dispatch(fetchTmdbSeasonSuccess(seasonArray));
          }
        });
      }
    } catch (e) {
      dispatch(fetchTmdbSeasonFailure(e));
    }
  };
};
