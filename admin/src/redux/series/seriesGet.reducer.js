import { seriesActionTypes } from "./series.types";

const initialState = {
  loading: false,
  error: "",
  data: [],
};

const seriesGetReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case seriesActionTypes.GET_SERIES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case seriesActionTypes.GET_SERIES_SUCCESS:
      return {
        ...state,
        data: payload,
        loading: false,
        error: "",
      };
    case seriesActionTypes.GET_SERIES_FAILURE:
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

export default seriesGetReducer;
