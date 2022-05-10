import { tmdbActionTypes } from "./tmdb.types";

const initialState = {
  loading: false,
  error: "",
  data: [],
};

const tmdbSerieReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case tmdbActionTypes.FETCH_TMDB_SERIES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case tmdbActionTypes.FETCH_TMDB_SERIES_SUCCESS:
      return {
        ...state,
        data: payload,
        loading: false,
        error: "",
      };
    case tmdbActionTypes.FETCH_TMDB_SERIES_FAILURE:
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

export default tmdbSerieReducer;