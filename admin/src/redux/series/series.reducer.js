import { seriesActionTypes } from "./series.types";

const initialState = {
  loading: false,
  error: "",
  data: [],
};

const seriesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case seriesActionTypes.UPDATE_SERIES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case seriesActionTypes.UPDATE_SERIES_SUCCESS:
      return {
        ...state,
        data: payload,
        loading: false,
        error: "",
      };
    case seriesActionTypes.UPDATE_SERIES_FAILURE:
      return {
        ...state,
        data: [],
        loading: false,
        error: payload,
      };
    case seriesActionTypes.DELETE_SERIES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case seriesActionTypes.DELETE_SERIES_SUCCESS:
      return {
        ...state,
        data: payload,
        loading: false,
        error: "",
      };
    case seriesActionTypes.DELETE_SERIES_FAILURE:
      return {
        ...state,
        data: [],
        loading: false,
        error: payload,
      };
    case seriesActionTypes.FETCH_SERIES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case seriesActionTypes.FETCH_SERIES_SUCCESS:
      return {
        ...state,
        data: payload,
        loading: false,
        error: "",
      };
    case seriesActionTypes.FETCH_SERIES_FAILURE:
      return {
        ...state,
        data: [],
        loading: false,
        error: payload,
      };
    case seriesActionTypes.CREATE_SERIES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case seriesActionTypes.CREATE_SERIES_SUCCESS:
      return {
        ...state,
        data: payload,
        loading: false,
        error: "",
      };
    case seriesActionTypes.CREATE_SERIES_FAILURE:
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

export default seriesReducer;
