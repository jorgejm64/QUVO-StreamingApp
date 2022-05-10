import axios from "../../axiosInstance";
import { seriesActionTypes } from "./series.types";

//FETCH
export const fetchSeriesRequest = () => ({
  type: seriesActionTypes.FETCH_SERIES_REQUEST,
});

export const fetchSeriesSuccess = (data) => ({
  type: seriesActionTypes.FETCH_SERIES_SUCCESS,
  payload: data,
});

export const fetchSeriesFailure = (error) => ({
  type: seriesActionTypes.FETCH_SERIES_FAILURE,
  payload: error,
});

export const fetchSeriesAsync = () => {
  return (dispatch) => {
    try {
      dispatch(fetchSeriesRequest());
      axios
        .get("series", {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        })
        .then((res) => {
          const seriesData = res.data;
          dispatch(fetchSeriesSuccess(seriesData));
        });
    } catch (e) {
      dispatch(fetchSeriesFailure(e));
    }
  };
};

//GET ONE
export const getSeriesRequest = () => ({
  type: seriesActionTypes.GET_SERIES_REQUEST,
});

export const getSeriesSuccess = (data) => ({
  type: seriesActionTypes.GET_SERIES_SUCCESS,
  payload: data,
});

export const getSeriesFailure = (error) => ({
  type: seriesActionTypes.GET_SERIES_FAILURE,
  payload: error,
});

export const getSeriesAsync = (id) => {
  return (dispatch) => {
    try {
      dispatch(getSeriesRequest());
      axios
        .get("series/find/" + id, {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        })
        .then((res) => {
          const serieData = res.data;
          dispatch(getSeriesSuccess(serieData));
        });
    } catch (e) {
      dispatch(getSeriesFailure(e));
    }
  };
};

//DELETE
export const deleteSeriesRequest = () => ({
  type: seriesActionTypes.DELETE_SERIES_REQUEST,
});

export const deleteSeriesSuccess = (message) => ({
  type: seriesActionTypes.DELETE_SERIES_SUCCESS,
  payload: message,
});

export const deleteSeriesFailure = (error) => ({
  type: seriesActionTypes.DELETE_SERIES_FAILURE,
  payload: error,
});

export const deleteSeriesAsync = (id) => {
  return (dispatch) => {
    try {
      dispatch(deleteSeriesRequest());
      axios.delete("series/" + id, {
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      });
      dispatch(deleteSeriesSuccess(id));
      document.location.href="/series";
    } catch (e) {
      dispatch(deleteSeriesFailure(e));
    }
  };
};

//UPDATE
export const updateSeriesRequest = () => ({
  type: seriesActionTypes.UPDATE_SERIES_REQUEST,
});

export const updateSeriesSuccess = (data) => ({
  type: seriesActionTypes.UPDATE_SERIES_SUCCESS,
  payload: data,
});

export const updateSeriesFailure = (error) => ({
  type: seriesActionTypes.UPDATE_SERIES_FAILURE,
  payload: error,
});

export const updateSeriesAsync = (id, serie) => {
  return (dispatch) => {
    try {
      dispatch(updateSeriesRequest());
      axios
        .put("series/update/" + id, serie, {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        })
        .then((res) => {
          const serieData = res.data;
          dispatch(updateSeriesSuccess(serieData));
        });
        window.location.assign("/series");
    } catch (e) {
      dispatch(updateSeriesFailure(e));
    }
  };
};

//CREATE
export const createSeriesRequest = () => ({
  type: seriesActionTypes.CREATE_SERIES_REQUEST,
});

export const createSeriesSuccess = (data) => ({
  type: seriesActionTypes.CREATE_SERIES_SUCCESS,
  payload: data,
});

export const createSeriesFailure = (error) => ({
  type: seriesActionTypes.CREATE_SERIES_FAILURE,
  payload: error,
});

export const createSeriesAsync = (serie) => {
  return (dispatch) => {
    try {
      dispatch(createSeriesRequest());
      axios
        .post("series/create", serie, {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        })
        .then((res) => {
          const serieData = res.data;
          dispatch(createSeriesSuccess(serieData));
        });
    } catch (e) {
      dispatch(createSeriesFailure(e));
    }
  };
};
