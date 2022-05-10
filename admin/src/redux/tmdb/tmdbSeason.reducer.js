import { tmdbActionTypes } from "./tmdb.types";

const initialState = {
  loading: false,
  error: "",
  data: [],
};

const tmdbSeasonReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case tmdbActionTypes.FETCH_TMDB_SEASON_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case tmdbActionTypes.FETCH_TMDB_SEASON_SUCCESS:
      return {
        ...state,
        data: payload,
        loading: false,
        error: "",
      };
    case tmdbActionTypes.FETCH_TMDB_SEASON_FAILURE:
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

export default tmdbSeasonReducer;