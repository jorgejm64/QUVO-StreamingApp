import requests from "./requests";
import * as movieSelectors from "./redux/movies/movies.selectors";
import * as serieSelectors from "./redux/series/series.selectors";

import {
	fetchActionMoviesAsync,
	fetchAdventureMoviesAsync,
  fetchComedyMoviesAsync,
  /*fetchCrimeMoviesAsync,
  fetchDocumentaryMoviesAsync,*/
  fetchDramaMoviesAsync,
  /*fetchHistoryMoviesAsync,
  fetchHorrorMoviesAsync,
  fetchMusicMoviesAsync,
  fetchMysteryMoviesAsync,
  fetchRomanceMoviesAsync,*/
  fetchScifyMoviesAsync,
  fetchSuspenseMoviesAsync,
  fetchWarMoviesAsync
} from "./redux/movies/movies.actions";

import {
  fetchActionSeriesAsync,
  fetchAdventureSeriesAsync,
  fetchComedySeriesAsync,
  //fetchCrimeSeriesAsync,
  //fetchDocumentarySeriesAsync,
  fetchDramaSeriesAsync,
  //fetchHistorySeriesAsync,
  //fetchHorrorSeriesAsync,
  //fetchMusicSeriesAsync,
  //fetchMysterySeriesAsync,
  //fetchRomanceSeriesAsync,
  fetchScifySeriesAsync,
  fetchSuspenseSeriesAsync,
  fetchWarSeriesAsync
} from "./redux/series/series.actions";

const { 
  fetchActionMovies,
  fetchAdventureMovies,
  fetchComedyMovies,
  //fetchCrimeMovies,
  //fetchDocumentaryMovies,
  fetchDramaMovies,
  //fetchHistoryMovies,
  //fetchHorrorMovies,
  //fetchMusicMovies,
  //fetchRomanceMovies,
  fetchScifyMovies,
  fetchSuspenseMovies,
  fetchWarMovies,

  //SERIES
  fetchActionSeries,
  fetchAdventureSeries,
  fetchComedySeries,
  //fetchCrimeSeries,
  //fetchDocumentarySeries,
  fetchDramaSeries,
  //fetchHistorySeries,
  //fetchHorrorSeries,
  //fetchMusicSeries,
  //fetchRomanceSeries,
  fetchScifySeries,
  fetchSuspenseSeries,
  fetchWarSeries,
} = requests;

export const fetchMovieDataConfig = [
  {
    id: 0,
    thunk: fetchActionMoviesAsync,
    url: fetchActionMovies,
    title: "Las mejores de acción",
    genre: "Acción",
    selector: movieSelectors.selectActionMovies
  },
  {
    id: 1,
    thunk: fetchAdventureMoviesAsync,
    url: fetchAdventureMovies,
    title: "Más vistas de aventuras",
    genre: "Aventura",
    selector: movieSelectors.selectAdventureMovies
  },
  {
    id: 11,
    thunk: fetchScifyMoviesAsync,
    url: fetchScifyMovies,
    title: "¿Algo de Ciencia ficción?",
    genre: "Ciencia ficción",
    selector: movieSelectors.selectScifyMovies,
    isLarge: true
  },
  {
    id: 2,
    thunk: fetchComedyMoviesAsync,
    url: fetchComedyMovies,
    title: "¿Unas risas con la familia?",
    genre: "Comedia",
    selector: movieSelectors.selectComedyMovies
  },
  /*
  {
    id: 3,
    thunk: fetchCrimeMoviesAsync,
    url: fetchCrimeMovies,
    title: "Crimen",
    genre: "Crimen",
    selector: movieSelectors.selectCrimeMovies
  },
  
  {
    id: 4,
    thunk: fetchDocumentaryMoviesAsync,
    url: fetchDocumentaryMovies,
    title: "Documental",
    genre: "Documental",
    selector: movieSelectors.selectDocumentaryMovies
  },
  */
  {
    id: 5,
    thunk: fetchDramaMoviesAsync,
    url: fetchDramaMovies,
    title: "Peliculas de drama",
    genre: "Drama",
    selector: movieSelectors.selectDramaMovies
  },
  /*
  {
    id: 6,
    thunk: fetchHistoryMoviesAsync,
    url: fetchHistoryMovies,
    title: "Historia",
    genre: "Historia",
    selector: movieSelectors.selectHistoryMovies
  },
  {
    id: 7,
    thunk: fetchHorrorMoviesAsync,
    url: fetchHorrorMovies,
    title: "Horror",
    genre: "Horror",
    selector: movieSelectors.selectHorrorMovies
  },
  */
  /*
  {
    id: 8,
    thunk: fetchMusicMoviesAsync,
    url: fetchMusicMovies,
    title: "Música",
    genre: "Música",
    selector: movieSelectors.selectMusicMovies
  },
  {
    id: 9,
    thunk: fetchMysteryMoviesAsync,
    url: fetchHistoryMovies,
    title: "Misterio",
    genre: "Misterio",
    selector: movieSelectors.selectMysteryMovies
  },
  
  {
    id: 10,
    thunk: fetchRomanceMoviesAsync,
    url: fetchRomanceMovies,
    title: "Romance",
    genre: "Romance",
    selector: movieSelectors.selectRomanceMovies
  },
  */
  {
    id: 12,
    thunk: fetchSuspenseMoviesAsync,
    url: fetchSuspenseMovies,
    title: "Suspense",
    genre: "Suspense",
    selector: movieSelectors.selectSuspenseMovies
  },
  {
    id: 13,
    thunk: fetchWarMoviesAsync,
    url: fetchWarMovies,
    title: "Peliculas bélicas",
    genre: "Bélica",
    selector: movieSelectors.selectSuspenseMovies
  }
];

//SERIES
export const fetchSerieDataConfig = [
  {
    id: 0,
    thunk: fetchActionSeriesAsync,
    url: fetchActionSeries,
    title: "Series recientes",
    genre: "Acción",
    selector: serieSelectors.selectActionSeries
  },
  {
    id: 11,
    thunk: fetchScifySeriesAsync,
    url: fetchScifySeries,
    title: "Series Ciencia ficción",
    genre: "Ciencia ficción",
    selector: serieSelectors.selectScifySeries,
    isLarge: true
  },
  {
    id: 1,
    thunk: fetchAdventureSeriesAsync,
    url: fetchAdventureSeries,
    title: "¡Nos vamos de aventura!",
    genre: "Aventura",
    selector: serieSelectors.selectAdventureSeries
  },
  /*{
    id: 2,
    thunk: fetchComedySeriesAsync,
    url: fetchComedySeries,
    title: "Comedia",
    genre: "Comedia",
    selector: serieSelectors.selectComedySeries
  },
  
  {
    id: 3,
    thunk: fetchCrimeSeriesAsync,
    url: fetchCrimeSeries,
    title: "Crimen",
    genre: "Crimen",
    selector: serieSelectors.selectCrimeSeries
  },
  
  {
    id: 4,
    thunk: fetchDocumentarySeriesAsync,
    url: fetchDocumentarySeries,
    title: "Documental",
    genre: "Documental",
    selector: serieSelectors.selectDocumentarySeries
  },
  */
  {
    id: 5,
    thunk: fetchDramaSeriesAsync,
    url: fetchDramaSeries,
    title: "Drama",
    genre: "Drama",
    selector: serieSelectors.selectDramaSeries
  },
  /*
  {
    id: 6,
    thunk: fetchHistorySeriesAsync,
    url: fetchHistorySeries,
    title: "Historia",
    genre: "Historia",
    selector: serieSelectors.selectHistorySeries
  },
  {
    id: 7,
    thunk: fetchHorrorSeriesAsync,
    url: fetchHorrorSeries,
    title: "Horror",
    genre: "Horror",
    selector: serieSelectors.selectHorrorSeries
  },
  */
  /*
  {
    id: 8,
    thunk: fetchMusicSeriesAsync,
    url: fetchMusicSeries,
    title: "Música",
    genre: "Música",
    selector: serieSelectors.selectMusicSeries
  },
  {
    id: 9,
    thunk: fetchMysterySeriesAsync,
    url: fetchHistorySeries,
    title: "Misterio",
    genre: "Misterio",
    selector: serieSelectors.selectMysterySeries
  },
  
  {
    id: 10,
    thunk: fetchRomanceSeriesAsync,
    url: fetchRomanceSeries,
    title: "Romance",
    genre: "Romance",
    selector: serieSelectors.selectRomanceSeries
  },
  */
  /*{
    id: 12,
    thunk: fetchSuspenseSeriesAsync,
    url: fetchSuspenseSeries,
    title: "Suspense",
    genre: "Suspense",
    selector: serieSelectors.selectSuspenseSeries
  },
  {
    id: 13,
    thunk: fetchWarSeriesAsync,
    url: fetchWarSeries,
    title: "Bélica",
    genre: "Bélica",
    selector: serieSelectors.selectSuspenseSeries
  }*/
];
