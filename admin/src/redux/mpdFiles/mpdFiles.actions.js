import axios from "../../axiosInstance";
import { mpdFilesActionTypes } from "./mpdFiles.types";

//Generando las acciones
export const fetchMpdFilesRequest = () => ({
  type: mpdFilesActionTypes.FETCH_MPD_FILES_REQUEST,
});

export const fetchMpdFilesSuccess = (mpdFiles) => ({
  type: mpdFilesActionTypes.FETCH_MPD_FILES_SUCCESS,
  payload: mpdFiles,
});

export const fetchMpdFilesFailure = (error) => ({
  type: mpdFilesActionTypes.FETCH_MPD_FILES_FAILURE,
  payload: error,
});

//Llamada a la API
export const fetchMpdFilesAsync = (baseURL) => {
  return (dispatch) => {
    try {
      dispatch(fetchMpdFilesRequest());
      axios
      .get(baseURL, {
        headers: {
          token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      })
      .then((res) => {
        const mpdFiles = res.data;
          dispatch(fetchMpdFilesSuccess(mpdFiles));
      });
    } catch (e) {
        dispatch(fetchMpdFilesFailure(e));
    }
  };
};
