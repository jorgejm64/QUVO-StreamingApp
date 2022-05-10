import axios from "../../axiosInstance";
import { moviesActionTypes } from "./movies.types";

//Action movies
export const fetchActionMoviesRequest = () => ({
  type: moviesActionTypes.FETCH_ACTION_MOVIES_REQUEST,
});

//Si todo va bien con la toma de datos desde la DB
export const fetchActionMoviesSuccess = (actionMovies, isPage) => ({
  /*  Si hay peliculas de tipo accion en la pagina y quedan en base de datos
   *   cargamos más.
   */
  type: isPage
    ? moviesActionTypes.FETCH_ACTION_MOVIES_SUCCESS
    : moviesActionTypes.LOAD_MORE_ACTION_MOVIES_SUCCESS,
  //Devolvemos
  payload: actionMovies,
});

//Si ocurre algún error en la toma de datos de DB
export const fetchActionMoviesFailure = (error) => ({
  type: moviesActionTypes.FETCH_ACTION_MOVIES_FAILURE,
  //Devolvemos
  payload: error,
});

export const fetchActionMoviesAsync = (baseURL, isPage) => {
  return (dispatch) => {
    //Disparamos la funcion
    dispatch(fetchActionMoviesRequest());
    axios
      .get(baseURL, {
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      }) //Hacemos el GET a base de datos
      .then((res) => {
        const actionMovies = res.data.map((el) => ({
          ...el,
        }));
        //Si ya hay contenido en la página
        if (isPage) {
          dispatch(fetchActionMoviesSuccess(actionMovies, isPage));
        } else dispatch(fetchActionMoviesSuccess(actionMovies));
      });
  };
};

//Adventure Movies
export const fetchAdventureMoviesRequest = () => ({
  type: moviesActionTypes.FETCH_ADVENTURE_MOVIES_REQUEST,
});

export const fetchAdventureMoviesSuccess = (actionMovies, isPage) => ({
  type: isPage
    ? moviesActionTypes.FETCH_ADVENTURE_MOVIES_SUCCESS
    : moviesActionTypes.LOAD_MORE_ADVENTURE_MOVIES_SUCCESS,
  payload: actionMovies,
});

export const fetchAdventureMoviesFailure = (error) => ({
  type: moviesActionTypes.FETCH_ADVENTURE_MOVIES_FAILURE,
  payload: error,
});

export const fetchAdventureMoviesAsync = (baseURL, isPage) => {
  return (dispatch) => {
    dispatch(fetchAdventureMoviesRequest());
    axios
      .get(baseURL, {
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      })
      .then((res) => {
        const adventureMovies = res.data.map((el) => ({
          ...el,
        }));
        if (isPage) {
          dispatch(fetchAdventureMoviesSuccess(adventureMovies, isPage));
        } else dispatch(fetchAdventureMoviesSuccess(adventureMovies));
      });
  };
};

//Comedy Movies
export const fetchComedyMoviesRequest = () => ({
  type: moviesActionTypes.FETCH_COMEDY_MOVIES_REQUEST,
});

export const fetchComedyMoviesSuccess = (actionMovies, isPage) => ({
  type: isPage
    ? moviesActionTypes.FETCH_COMEDY_MOVIES_SUCCESS
    : moviesActionTypes.LOAD_MORE_COMEDY_MOVIES_SUCCESS,
  payload: actionMovies,
});

export const fetchComedyMoviesFailure = (error) => ({
  type: moviesActionTypes.FETCH_COMEDY_MOVIES_FAILURE,
  payload: error,
});

export const fetchComedyMoviesAsync = (baseURL, isPage) => {
  return (dispatch) => {
    dispatch(fetchComedyMoviesRequest());
    axios
      .get(baseURL, {
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      })
      .then((res) => {
        const comedyMovies = res.data.map((el) => ({
          ...el,
        }));
        if (isPage) {
          dispatch(fetchComedyMoviesSuccess(comedyMovies, isPage));
        } else dispatch(fetchComedyMoviesSuccess(comedyMovies));
      });
  };
};

//Crime Movies
export const fetchCrimeMoviesRequest = () => ({
  type: moviesActionTypes.FETCH_CRIME_MOVIES_REQUEST,
});

export const fetchCrimeMoviesSuccess = (actionMovies, isPage) => ({
  type: isPage
    ? moviesActionTypes.FETCH_CRIME_MOVIES_SUCCESS
    : moviesActionTypes.LOAD_MORE_CRIME_MOVIES_SUCCESS,
  payload: actionMovies,
});

export const fetchCrimeMoviesFailure = (error) => ({
  type: moviesActionTypes.FETCH_CRIME_MOVIES_FAILURE,
  payload: error,
});

export const fetchCrimeMoviesAsync = (baseURL, isPage) => {
  return (dispatch) => {
    dispatch(fetchCrimeMoviesRequest());
    axios
      .get(baseURL, {
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      })
      .then((res) => {
        const crimeMovies = res.data.map((el) => ({
          ...el,
        }));
        if (isPage) {
          dispatch(fetchCrimeMoviesSuccess(crimeMovies, isPage));
        } else dispatch(fetchCrimeMoviesSuccess(crimeMovies));
      });
  };
};

//Documentary Movies
export const fetchDocumentaryMoviesRequest = () => ({
  type: moviesActionTypes.FETCH_DOCUMENTARY_MOVIES_REQUEST,
});

export const fetchDocumentaryMoviesSuccess = (actionMovies, isPage) => ({
  type: isPage
    ? moviesActionTypes.FETCH_DOCUMENTARY_MOVIES_SUCCESS
    : moviesActionTypes.LOAD_MORE_DOCUMENTARY_MOVIES_SUCCESS,
  payload: actionMovies,
});

export const fetchDocumentaryMoviesFailure = (error) => ({
  type: moviesActionTypes.FETCH_DOCUMENTARY_MOVIES_FAILURE,
  payload: error,
});

export const fetchDocumentaryMoviesAsync = (baseURL, isPage) => {
  return (dispatch) => {
    dispatch(fetchDocumentaryMoviesRequest());
    axios
      .get(baseURL, {
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      })
      .then((res) => {
        const documentaryMovies = res.data.map((el) => ({
          ...el,
        }));
        if (isPage) {
          dispatch(fetchDocumentaryMoviesSuccess(documentaryMovies, isPage));
        } else dispatch(fetchDocumentaryMoviesSuccess(documentaryMovies));
      });
  };
};

//Drama Movies
export const fetchDramaMoviesRequest = () => ({
  type: moviesActionTypes.FETCH_DRAMA_MOVIES_REQUEST,
});

export const fetchDramaMoviesSuccess = (actionMovies, isPage) => ({
  type: isPage
    ? moviesActionTypes.FETCH_DRAMA_MOVIES_SUCCESS
    : moviesActionTypes.LOAD_MORE_DRAMA_MOVIES_SUCCESS,
  payload: actionMovies,
});

export const fetchDramaMoviesFailure = (error) => ({
  type: moviesActionTypes.FETCH_DRAMA_MOVIES_FAILURE,
  payload: error,
});

export const fetchDramaMoviesAsync = (baseURL, isPage) => {
  return (dispatch) => {
    dispatch(fetchDramaMoviesRequest());
    axios
      .get(baseURL, {
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      })
      .then((res) => {
        const dramaMovies = res.data.map((el) => ({
          ...el,
        }));
        if (isPage) {
          dispatch(fetchDramaMoviesSuccess(dramaMovies, isPage));
        } else dispatch(fetchDramaMoviesSuccess(dramaMovies));
      });
  };
};

//History Movies
export const fetchHistoryMoviesRequest = () => ({
  type: moviesActionTypes.FETCH_HISTORY_MOVIES_REQUEST,
});

export const fetchHistoryMoviesSuccess = (actionMovies, isPage) => ({
  type: isPage
    ? moviesActionTypes.FETCH_HISTORY_MOVIES_SUCCESS
    : moviesActionTypes.LOAD_MORE_HISTORY_MOVIES_SUCCESS,
  payload: actionMovies,
});

export const fetchHistoryMoviesFailure = (error) => ({
  type: moviesActionTypes.FETCH_HISTORY_MOVIES_FAILURE,
  payload: error,
});

export const fetchHistoryMoviesAsync = (baseURL, isPage) => {
  return (dispatch) => {
    dispatch(fetchHistoryMoviesRequest());
    axios
      .get(baseURL, {
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      })
      .then((res) => {
        const historyMovies = res.data.map((el) => ({
          ...el,
        }));
        if (isPage) {
          dispatch(fetchHistoryMoviesSuccess(historyMovies, isPage));
        } else dispatch(fetchHistoryMoviesSuccess(historyMovies));
      });
  };
};

//Horror Movies
export const fetchHorrorMoviesRequest = () => ({
  type: moviesActionTypes.FETCH_HORROR_MOVIES_REQUEST,
});

export const fetchHorrorMoviesSuccess = (actionMovies, isPage) => ({
  type: isPage
    ? moviesActionTypes.FETCH_HORROR_MOVIES_SUCCESS
    : moviesActionTypes.LOAD_MORE_HORROR_MOVIES_SUCCESS,
  payload: actionMovies,
});

export const fetchHorrorMoviesFailure = (error) => ({
  type: moviesActionTypes.FETCH_HORROR_MOVIES_FAILURE,
  payload: error,
});

export const fetchHorrorMoviesAsync = (baseURL, isPage) => {
  return (dispatch) => {
    dispatch(fetchHorrorMoviesRequest());
    axios
      .get(baseURL, {
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      })
      .then((res) => {
        const horrorMovies = res.data.map((el) => ({
          ...el,
        }));
        if (isPage) {
          dispatch(fetchHorrorMoviesSuccess(horrorMovies, isPage));
        } else dispatch(fetchHorrorMoviesSuccess(horrorMovies));
      });
  };
};

//Music Movies
export const fetchMusicMoviesRequest = () => ({
  type: moviesActionTypes.FETCH_MUSIC_MOVIES_REQUEST,
});

export const fetchMusicMoviesSuccess = (actionMovies, isPage) => ({
  type: isPage
    ? moviesActionTypes.FETCH_MUSIC_MOVIES_SUCCESS
    : moviesActionTypes.LOAD_MORE_MUSIC_MOVIES_SUCCESS,
  payload: actionMovies,
});

export const fetchMusicMoviesFailure = (error) => ({
  type: moviesActionTypes.FETCH_MUSIC_MOVIES_FAILURE,
  payload: error,
});

export const fetchMusicMoviesAsync = (baseURL, isPage) => {
  return (dispatch) => {
    dispatch(fetchMusicMoviesRequest());
    axios
      .get(baseURL, {
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      })
      .then((res) => {
        const musicMovies = res.data.map((el) => ({
          ...el,
        }));
        if (isPage) {
          dispatch(fetchMusicMoviesSuccess(musicMovies, isPage));
        } else dispatch(fetchMusicMoviesSuccess(musicMovies));
      });
  };
};

//Mystery Movies
export const fetchMysteryMoviesRequest = () => ({
  type: moviesActionTypes.FETCH_MYSTERY_MOVIES_REQUEST,
});

export const fetchMysteryMoviesSuccess = (actionMovies, isPage) => ({
  type: isPage
    ? moviesActionTypes.FETCH_MYSTERY_MOVIES_SUCCESS
    : moviesActionTypes.LOAD_MORE_MYSTERY_MOVIES_SUCCESS,
  payload: actionMovies,
});

export const fetchMysteryMoviesFailure = (error) => ({
  type: moviesActionTypes.FETCH_MYSTERY_MOVIES_FAILURE,
  payload: error,
});

export const fetchMysteryMoviesAsync = (baseURL, isPage) => {
  return (dispatch) => {
    dispatch(fetchMysteryMoviesRequest());
    axios
      .get(baseURL, {
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      })
      .then((res) => {
        const mysteryMovies = res.data.map((el) => ({
          ...el,
        }));
        if (isPage) {
          dispatch(fetchMysteryMoviesSuccess(mysteryMovies, isPage));
        } else dispatch(fetchMysteryMoviesSuccess(mysteryMovies));
      });
  };
};

//Romance Movies
export const fetchRomanceMoviesRequest = () => ({
  type: moviesActionTypes.FETCH_ROMANCE_MOVIES_REQUEST,
});

export const fetchRomanceMoviesSuccess = (actionMovies, isPage) => ({
  type: isPage
    ? moviesActionTypes.FETCH_ROMANCE_MOVIES_SUCCESS
    : moviesActionTypes.LOAD_MORE_ROMANCE_MOVIES_SUCCESS,
  payload: actionMovies,
});

export const fetchRomanceMoviesFailure = (error) => ({
  type: moviesActionTypes.FETCH_ROMANCE_MOVIES_FAILURE,
  payload: error,
});

export const fetchRomanceMoviesAsync = (baseURL, isPage) => {
  return (dispatch) => {
    dispatch(fetchRomanceMoviesRequest());
    axios
      .get(baseURL, {
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      })
      .then((res) => {
        const romanceMovies = res.data.map((el) => ({
          ...el,
        }));
        if (isPage) {
          dispatch(fetchRomanceMoviesSuccess(romanceMovies, isPage));
        } else dispatch(fetchRomanceMoviesSuccess(romanceMovies));
      });
  };
};

//Scify Movies
export const fetchScifyMoviesRequest = () => ({
  type: moviesActionTypes.FETCH_SCIFY_MOVIES_REQUEST,
});

export const fetchScifyMoviesSuccess = (actionMovies, isPage) => ({
  type: isPage
    ? moviesActionTypes.FETCH_SCIFY_MOVIES_SUCCESS
    : moviesActionTypes.LOAD_MORE_SCIFY_MOVIES_SUCCESS,
  payload: actionMovies,
});

export const fetchScifyMoviesFailure = (error) => ({
  type: moviesActionTypes.FETCH_SCIFY_MOVIES_FAILURE,
  payload: error,
});

export const fetchScifyMoviesAsync = (baseURL, isPage) => {
  return (dispatch) => {
    dispatch(fetchScifyMoviesRequest());
    axios
      .get(baseURL, {
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      })
      .then((res) => {
        const scifyMovies = res.data.map((el) => ({
          ...el,
        }));
        if (isPage) {
          dispatch(fetchScifyMoviesSuccess(scifyMovies, isPage));
        } else { dispatch(fetchScifyMoviesSuccess(scifyMovies));};
      });
  };
};

//Suspense Movies
export const fetchSuspenseMoviesRequest = () => ({
  type: moviesActionTypes.FETCH_SUSPENSE_MOVIES_REQUEST,
});

export const fetchSuspenseMoviesSuccess = (actionMovies, isPage) => ({
  type: isPage
    ? moviesActionTypes.FETCH_SUSPENSE_MOVIES_SUCCESS
    : moviesActionTypes.LOAD_MORE_SUSPENSE_MOVIES_SUCCESS,
  payload: actionMovies,
});

export const fetchSuspenseMoviesFailure = (error) => ({
  type: moviesActionTypes.FETCH_SUSPENSE_MOVIES_FAILURE,
  payload: error,
});

export const fetchSuspenseMoviesAsync = (baseURL, isPage) => {
  return (dispatch) => {
    dispatch(fetchSuspenseMoviesRequest());
    axios
      .get(baseURL, {
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      })
      .then((res) => {
        const suspenseMovies = res.data.map((el) => ({
          ...el,
        }));
        if (isPage) {
          dispatch(fetchSuspenseMoviesSuccess(suspenseMovies, isPage));
        } else dispatch(fetchSuspenseMoviesSuccess(suspenseMovies));
      });
  };
};

//War Movies
export const fetchWarMoviesRequest = () => ({
  type: moviesActionTypes.FETCH_WAR_MOVIES_REQUEST,
});

export const fetchWarMoviesSuccess = (actionMovies, isPage) => ({
  type: isPage
    ? moviesActionTypes.FETCH_WAR_MOVIES_SUCCESS
    : moviesActionTypes.LOAD_MORE_WAR_MOVIES_SUCCESS,
  payload: actionMovies,
});

export const fetchWarMoviesFailure = (error) => ({
  type: moviesActionTypes.FETCH_WAR_MOVIES_FAILURE,
  payload: error,
});

export const fetchWarMoviesAsync = (baseURL, isPage) => {
  return (dispatch) => {
    dispatch(fetchWarMoviesRequest());
    axios
      .get(baseURL, {
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      })
      .then((res) => {
        const warMovies = res.data.map((el) => ({
          ...el,
        }));
        if (isPage) {
          dispatch(fetchWarMoviesSuccess(warMovies, isPage));
        } else dispatch(fetchWarMoviesSuccess(warMovies));
      });
  };
};

//All Movies
export const fetchAllMoviesRequest = () => ({
  type: moviesActionTypes.FETCH_MOVIES_REQUEST,
});

export const fetchAllMoviesSuccess = (actionMovies) => ({
  type: moviesActionTypes.FETCH_MOVIES_SUCCESS,
  payload: actionMovies,
});

export const fetchAllMoviesFailure = (error) => ({
  type: moviesActionTypes.FETCH_MOVIES_FAILURE,
  payload: error,
});

export const fetchAllMoviesAsync = () => {
  return (dispatch) => {
    dispatch(fetchAllMoviesRequest());
    axios
      .get("/movies", {
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      })
      .then((res) => {
        const allMovies = res.data.map((el) => ({
          ...el,
        }));
        dispatch(fetchAllMoviesSuccess(allMovies));
      });
  };
};
