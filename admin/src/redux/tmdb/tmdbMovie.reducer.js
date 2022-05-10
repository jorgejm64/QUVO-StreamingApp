import { tmdbActionTypes } from "./tmdb.types";

const initialState = {
  loading: false,
  error: "",
  data: [],
};

const tmdbMovieReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case tmdbActionTypes.FETCH_TMDB_MOVIES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case tmdbActionTypes.FETCH_TMDB_MOVIES_SUCCESS:
      return {
        ...state,
        data: payload,
        loading: false,
        error: "",
      };
    case tmdbActionTypes.FETCH_TMDB_MOVIES_FAILURE:
      return {
        ...state,
        data: [],
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export default tmdbMovieReducer;
