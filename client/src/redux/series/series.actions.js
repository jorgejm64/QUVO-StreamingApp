import axios from "../../axiosInstance";
import { seriesActionTypes } from "./series.types";

//Action Series
export const fetchActionSeriesRequest = () => ({
  type: seriesActionTypes.FETCH_ACTION_SERIES_REQUEST,
});

//si todo va bien con la toma de datos desde la DB
export const fetchActionSeriesSuccess = (actionSeries, isPage) => ({
  /*  Si hay peliculas de tipo accion en la pagina y quedan en base de datos
   *   cargamos más.
   */
  type: isPage
    ? seriesActionTypes.FETCH_ACTION_SERIES_SUCCESS
    : seriesActionTypes.LOAD_MORE_ACTION_SERIES_SUCCESS,
  //Devolvemos
  payload: actionSeries,
});

//si ocurre algún error en la toma de datos de DB
export const fetchActionSeriesFailure = (error) => ({
  type: seriesActionTypes.FETCH_ACTION_SERIES_FAILURE,
  //Devolvemos
  payload: error,
});

export const fetchActionSeriesAsync = (baseURL, isPage) => {
  return (dispatch) => {
    //Disparamos la funcion
    dispatch(fetchActionSeriesRequest());
    axios
      .get(baseURL, {
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      }) //Hacemos el GET a base de datos
      .then((res) => {
        const actionSeries = res.data.map((el) => ({
          ...el,
        }));
        //si ya hay contenido en la página
        if (isPage) {
          dispatch(fetchActionSeriesSuccess(actionSeries, isPage));
        } else dispatch(fetchActionSeriesSuccess(actionSeries));
      });
  };
};

//Adventure Series
export const fetchAdventureSeriesRequest = () => ({
  type: seriesActionTypes.FETCH_ADVENTURE_SERIES_REQUEST,
});

export const fetchAdventureSeriesSuccess = (actionSeries, isPage) => ({
  type: isPage
    ? seriesActionTypes.FETCH_ADVENTURE_SERIES_SUCCESS
    : seriesActionTypes.LOAD_MORE_ADVENTURE_SERIES_SUCCESS,
  payload: actionSeries,
});

export const fetchAdventureSeriesFailure = (error) => ({
  type: seriesActionTypes.FETCH_ADVENTURE_SERIES_FAILURE,
  payload: error,
});

export const fetchAdventureSeriesAsync = (baseURL, isPage) => {
  return (dispatch) => {
    dispatch(fetchAdventureSeriesRequest());
    axios
      .get(baseURL, {
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      })
      .then((res) => {
        const adventureSeries = res.data.map((el) => ({
          ...el,
        }));
        if (isPage) {
          dispatch(fetchAdventureSeriesSuccess(adventureSeries, isPage));
        } else dispatch(fetchAdventureSeriesSuccess(adventureSeries));
      });
  };
};

//Comedy Series
export const fetchComedySeriesRequest = () => ({
  type: seriesActionTypes.FETCH_COMEDY_SERIES_REQUEST,
});

export const fetchComedySeriesSuccess = (actionSeries, isPage) => ({
  type: isPage
    ? seriesActionTypes.FETCH_COMEDY_SERIES_SUCCESS
    : seriesActionTypes.LOAD_MORE_COMEDY_SERIES_SUCCESS,
  payload: actionSeries,
});

export const fetchComedySeriesFailure = (error) => ({
  type: seriesActionTypes.FETCH_COMEDY_SERIES_FAILURE,
  payload: error,
});

export const fetchComedySeriesAsync = (baseURL, isPage) => {
  return (dispatch) => {
    dispatch(fetchComedySeriesRequest());
    axios
      .get(baseURL, {
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      })
      .then((res) => {
        const comedySeries = res.data.map((el) => ({
          ...el,
        }));
        if (isPage) {
          dispatch(fetchComedySeriesSuccess(comedySeries, isPage));
        } else dispatch(fetchComedySeriesSuccess(comedySeries));
      });
  };
};

//Crime Series
export const fetchCrimeSeriesRequest = () => ({
  type: seriesActionTypes.FETCH_CRIME_SERIES_REQUEST,
});

export const fetchCrimeSeriesSuccess = (actionSeries, isPage) => ({
  type: isPage
    ? seriesActionTypes.FETCH_CRIME_SERIES_SUCCESS
    : seriesActionTypes.LOAD_MORE_CRIME_SERIES_SUCCESS,
  payload: actionSeries,
});

export const fetchCrimeSeriesFailure = (error) => ({
  type: seriesActionTypes.FETCH_CRIME_SERIES_FAILURE,
  payload: error,
});

export const fetchCrimeSeriesAsync = (baseURL, isPage) => {
  return (dispatch) => {
    dispatch(fetchCrimeSeriesRequest());
    axios
      .get(baseURL, {
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      })
      .then((res) => {
        const crimeSeries = res.data.map((el) => ({
          ...el,
        }));
        if (isPage) {
          dispatch(fetchCrimeSeriesSuccess(crimeSeries, isPage));
        } else dispatch(fetchCrimeSeriesSuccess(crimeSeries));
      });
  };
};

//Documentary Series
export const fetchDocumentarySeriesRequest = () => ({
  type: seriesActionTypes.FETCH_DOCUMENTARY_SERIES_REQUEST,
});

export const fetchDocumentarySeriesSuccess = (actionSeries, isPage) => ({
  type: isPage
    ? seriesActionTypes.FETCH_DOCUMENTARY_SERIES_SUCCESS
    : seriesActionTypes.LOAD_MORE_DOCUMENTARY_SERIES_SUCCESS,
  payload: actionSeries,
});

export const fetchDocumentarySeriesFailure = (error) => ({
  type: seriesActionTypes.FETCH_DOCUMENTARY_SERIES_FAILURE,
  payload: error,
});

export const fetchDocumentarySeriesAsync = (baseURL, isPage) => {
  return (dispatch) => {
    dispatch(fetchDocumentarySeriesRequest());
    axios
      .get(baseURL, {
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      })
      .then((res) => {
        const documentarySeries = res.data.map((el) => ({
          ...el,
        }));
        if (isPage) {
          dispatch(fetchDocumentarySeriesSuccess(documentarySeries, isPage));
        } else dispatch(fetchDocumentarySeriesSuccess(documentarySeries));
      });
  };
};

//Drama Series
export const fetchDramaSeriesRequest = () => ({
  type: seriesActionTypes.FETCH_DRAMA_SERIES_REQUEST,
});

export const fetchDramaSeriesSuccess = (actionSeries, isPage) => ({
  type: isPage
    ? seriesActionTypes.FETCH_DRAMA_SERIES_SUCCESS
    : seriesActionTypes.LOAD_MORE_DRAMA_SERIES_SUCCESS,
  payload: actionSeries,
});

export const fetchDramaSeriesFailure = (error) => ({
  type: seriesActionTypes.FETCH_DRAMA_SERIES_FAILURE,
  payload: error,
});

export const fetchDramaSeriesAsync = (baseURL, isPage) => {
  return (dispatch) => {
    dispatch(fetchDramaSeriesRequest());
    axios
      .get(baseURL, {
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      })
      .then((res) => {
        const dramaSeries = res.data.map((el) => ({
          ...el,
        }));
        if (isPage) {
          dispatch(fetchDramaSeriesSuccess(dramaSeries, isPage));
        } else dispatch(fetchDramaSeriesSuccess(dramaSeries));
      });
  };
};

//History Series
export const fetchHistorySeriesRequest = () => ({
  type: seriesActionTypes.FETCH_HISTORY_SERIES_REQUEST,
});

export const fetchHistorySeriesSuccess = (actionSeries, isPage) => ({
  type: isPage
    ? seriesActionTypes.FETCH_HISTORY_SERIES_SUCCESS
    : seriesActionTypes.LOAD_MORE_HISTORY_SERIES_SUCCESS,
  payload: actionSeries,
});

export const fetchHistorySeriesFailure = (error) => ({
  type: seriesActionTypes.FETCH_HISTORY_SERIES_FAILURE,
  payload: error,
});

export const fetchHistorySeriesAsync = (baseURL, isPage) => {
  return (dispatch) => {
    dispatch(fetchHistorySeriesRequest());
    axios
      .get(baseURL, {
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      })
      .then((res) => {
        const historySeries = res.data.map((el) => ({
          ...el,
        }));
        if (isPage) {
          dispatch(fetchHistorySeriesSuccess(historySeries, isPage));
        } else dispatch(fetchHistorySeriesSuccess(historySeries));
      });
  };
};

//Horror Series
export const fetchHorrorSeriesRequest = () => ({
  type: seriesActionTypes.FETCH_HORROR_SERIES_REQUEST,
});

export const fetchHorrorSeriesSuccess = (actionSeries, isPage) => ({
  type: isPage
    ? seriesActionTypes.FETCH_HORROR_SERIES_SUCCESS
    : seriesActionTypes.LOAD_MORE_HORROR_SERIES_SUCCESS,
  payload: actionSeries,
});

export const fetchHorrorSeriesFailure = (error) => ({
  type: seriesActionTypes.FETCH_HORROR_SERIES_FAILURE,
  payload: error,
});

export const fetchHorrorSeriesAsync = (baseURL, isPage) => {
  return (dispatch) => {
    dispatch(fetchHorrorSeriesRequest());
    axios
      .get(baseURL, {
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      })
      .then((res) => {
        const horrorSeries = res.data.map((el) => ({
          ...el,
        }));
        if (isPage) {
          dispatch(fetchHorrorSeriesSuccess(horrorSeries, isPage));
        } else dispatch(fetchHorrorSeriesSuccess(horrorSeries));
      });
  };
};

//Music Series
export const fetchMusicSeriesRequest = () => ({
  type: seriesActionTypes.FETCH_MUSIC_SERIES_REQUEST,
});

export const fetchMusicSeriesSuccess = (actionSeries, isPage) => ({
  type: isPage
    ? seriesActionTypes.FETCH_MUSIC_SERIES_SUCCESS
    : seriesActionTypes.LOAD_MORE_MUSIC_SERIES_SUCCESS,
  payload: actionSeries,
});

export const fetchMusicSeriesFailure = (error) => ({
  type: seriesActionTypes.FETCH_MUSIC_SERIES_FAILURE,
  payload: error,
});

export const fetchMusicSeriesAsync = (baseURL, isPage) => {
  return (dispatch) => {
    dispatch(fetchMusicSeriesRequest());
    axios
      .get(baseURL, {
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      })
      .then((res) => {
        const musicSeries = res.data.map((el) => ({
          ...el,
        }));
        if (isPage) {
          dispatch(fetchMusicSeriesSuccess(musicSeries, isPage));
        } else dispatch(fetchMusicSeriesSuccess(musicSeries));
      });
  };
};

//Mystery Series
export const fetchMysterySeriesRequest = () => ({
  type: seriesActionTypes.FETCH_MYSTERY_SERIES_REQUEST,
});

export const fetchMysterySeriesSuccess = (actionSeries, isPage) => ({
  type: isPage
    ? seriesActionTypes.FETCH_MYSTERY_SERIES_SUCCESS
    : seriesActionTypes.LOAD_MORE_MYSTERY_SERIES_SUCCESS,
  payload: actionSeries,
});

export const fetchMysterySeriesFailure = (error) => ({
  type: seriesActionTypes.FETCH_MYSTERY_SERIES_FAILURE,
  payload: error,
});

export const fetchMysterySeriesAsync = (baseURL, isPage) => {
  return (dispatch) => {
    dispatch(fetchMysterySeriesRequest());
    axios
      .get(baseURL, {
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      })
      .then((res) => {
        const mysterySeries = res.data.map((el) => ({
          ...el,
        }));
        if (isPage) {
          dispatch(fetchMysterySeriesSuccess(mysterySeries, isPage));
        } else dispatch(fetchMysterySeriesSuccess(mysterySeries));
      });
  };
};

//Romance Series
export const fetchRomanceSeriesRequest = () => ({
  type: seriesActionTypes.FETCH_ROMANCE_SERIES_REQUEST,
});

export const fetchRomanceSeriesSuccess = (actionSeries, isPage) => ({
  type: isPage
    ? seriesActionTypes.FETCH_ROMANCE_SERIES_SUCCESS
    : seriesActionTypes.LOAD_MORE_ROMANCE_SERIES_SUCCESS,
  payload: actionSeries,
});

export const fetchRomanceSeriesFailure = (error) => ({
  type: seriesActionTypes.FETCH_ROMANCE_SERIES_FAILURE,
  payload: error,
});

export const fetchRomanceSeriesAsync = (baseURL, isPage) => {
  return (dispatch) => {
    dispatch(fetchRomanceSeriesRequest());
    axios
      .get(baseURL, {
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      })
      .then((res) => {
        const romanceSeries = res.data.map((el) => ({
          ...el,
        }));
        if (isPage) {
          dispatch(fetchRomanceSeriesSuccess(romanceSeries, isPage));
        } else dispatch(fetchRomanceSeriesSuccess(romanceSeries));
      });
  };
};

//scify Series
export const fetchScifySeriesRequest = () => ({
  type: seriesActionTypes.FETCH_SCIFY_SERIES_REQUEST,
});

export const fetchScifySeriesSuccess = (actionSeries, isPage) => ({
  type: isPage
    ? seriesActionTypes.FETCH_SCIFY_SERIES_SUCCESS
    : seriesActionTypes.LOAD_MORE_SCIFY_SERIES_SUCCESS,
  payload: actionSeries,
});

export const fetchScifySeriesFailure = (error) => ({
  type: seriesActionTypes.FETCH_SCIFY_SERIES_FAILURE,
  payload: error,
});

export const fetchScifySeriesAsync = (baseURL, isPage) => {
  return (dispatch) => {
    dispatch(fetchScifySeriesRequest());
    axios
      .get(baseURL, {
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      })
      .then((res) => {
        const scifySeries = res.data.map((el) => ({
          ...el,
        }));
        if (isPage) {
          dispatch(fetchScifySeriesSuccess(scifySeries, isPage));
        } else { dispatch(fetchScifySeriesSuccess(scifySeries));};
      });
  };
};

//suspense Series
export const fetchSuspenseSeriesRequest = () => ({
  type: seriesActionTypes.FETCH_SUSPENSE_SERIES_REQUEST,
});

export const fetchSuspenseSeriesSuccess = (actionSeries, isPage) => ({
  type: isPage
    ? seriesActionTypes.FETCH_SUSPENSE_SERIES_SUCCESS
    : seriesActionTypes.LOAD_MORE_SUSPENSE_SERIES_SUCCESS,
  payload: actionSeries,
});

export const fetchSuspenseSeriesFailure = (error) => ({
  type: seriesActionTypes.FETCH_SUSPENSE_SERIES_FAILURE,
  payload: error,
});

export const fetchSuspenseSeriesAsync = (baseURL, isPage) => {
  return (dispatch) => {
    dispatch(fetchSuspenseSeriesRequest());
    axios
      .get(baseURL, {
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      })
      .then((res) => {
        const suspenseSeries = res.data.map((el) => ({
          ...el,
        }));
        if (isPage) {
          dispatch(fetchSuspenseSeriesSuccess(suspenseSeries, isPage));
        } else dispatch(fetchSuspenseSeriesSuccess(suspenseSeries));
      });
  };
};

//War Series
export const fetchWarSeriesRequest = () => ({
  type: seriesActionTypes.FETCH_WAR_SERIES_REQUEST,
});

export const fetchWarSeriesSuccess = (actionSeries, isPage) => ({
  type: isPage
    ? seriesActionTypes.FETCH_WAR_SERIES_SUCCESS
    : seriesActionTypes.LOAD_MORE_WAR_SERIES_SUCCESS,
  payload: actionSeries,
});

export const fetchWarSeriesFailure = (error) => ({
  type: seriesActionTypes.FETCH_WAR_SERIES_FAILURE,
  payload: error,
});

export const fetchWarSeriesAsync = (baseURL, isPage) => {
  return (dispatch) => {
    dispatch(fetchWarSeriesRequest());
    axios
      .get(baseURL, {
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      })
      .then((res) => {
        const warSeries = res.data.map((el) => ({
          ...el,
        }));
        if (isPage) {
          dispatch(fetchWarSeriesSuccess(warSeries, isPage));
        } else dispatch(fetchWarSeriesSuccess(warSeries));
      });
  };
};

//All Series
export const fetchAllSeriesRequest = () => ({
  type: seriesActionTypes.FETCH_SERIES_REQUEST,
});

export const fetchAllSeriesSuccess = (actionSeries) => ({
  type: seriesActionTypes.FETCH_SERIES_SUCCESS,
  payload: actionSeries,
});

export const fetchAllSeriesFailure = (error) => ({
  type: seriesActionTypes.FETCH_SERIES_FAILURE,
  payload: error,
});

export const fetchAllSeriesAsync = () => {
  return (dispatch) => {
    dispatch(fetchAllSeriesRequest());
    axios
      .get("/series", {
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      })
      .then((res) => {
        const allSeries = res.data.map((el) => ({
          ...el,
        }));
        dispatch(fetchAllSeriesSuccess(allSeries));
      });
  };
};
