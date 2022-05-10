import { createSelector } from "reselect";

export const selectActionMovies = (state) => state.movies.actionMovies;
export const selectAdventureMovies = (state) => state.movies.adventureMovies;
export const selectComedyMovies = (state) => state.movies.comedyMovies;
export const selectCrimeMovies = (state) => state.movies.crimeMovies;
export const selectDocumentaryMovies = (state) => state.movies.documentaryMovies;
export const selectDramaMovies = (state) => state.movies.dramaMovies;
export const selectHistoryMovies = (state) => state.movies.historyMovies;
export const selectHorrorMovies = (state) => state.movies.horrorMovies;
export const selectMusicMovies = (state) => state.movies.musicMovies;
export const selectMysteryMovies = (state) => state.movies.mysteryMovies;
export const selectRomanceMovies = (state) => state.movies.romanceMovies;
export const selectScifyMovies = (state) => state.movies.scifyMovies;
export const selectSuspenseMovies = (state) => state.movies.suspenseMovies;
export const selectAllMovies = (state) => state.movies.allMovies;

export const selectAllMoviesSelector = createSelector(
  [selectAllMovies],
  (allMovies) => allMovies.data
)

export const selectActionMoviesSelector = createSelector(
  [selectActionMovies],
  (actionMovies) => actionMovies.data
);

export const selectAdventureMoviesSelector = createSelector(
  [selectAdventureMovies],
  (adventureMovies) => adventureMovies.data
);

export const selectComedyMoviesSelector = createSelector(
  [selectComedyMovies],
  (comedyMovies) => comedyMovies.data
);

export const selecCrimeMoviesSelector = createSelector(
  [selectCrimeMovies],
  (crimeMovies) => crimeMovies.data
);

export const selectDramaMoviesSelector = createSelector(
  [selectDramaMovies],
  (dramaMovies) => dramaMovies.data
);

export const selectDocumentaryMoviesSelector = createSelector(
  [selectDocumentaryMovies],
  (documentaryMovies) => documentaryMovies.data
);

export const selectHistoryMoviesSelector = createSelector(
  [selectHistoryMovies],
  (historyMovies) => historyMovies.data
);

export const selectHorrorMoviesSelector = createSelector(
  [selectHorrorMovies],
  (horrorMovies) => horrorMovies.data
);

export const selectMusicMoviesSelector = createSelector(
  [selectMusicMovies],
  (musicMovies) => musicMovies.data
);

export const selectMysteryMoviesSelector = createSelector(
  [selectMysteryMovies],
  (mysteryMovies) => mysteryMovies.data
);

export const selectRomanceMoviesSelector = createSelector(
  [selectRomanceMovies],
  (romanceMovies) => romanceMovies.data
);

export const selectScifyMoviesSelector = createSelector(
  [selectScifyMovies],
  (scifyMovies) => scifyMovies.data
);

export const selectSuspenseMoviesSelector = createSelector(
  [selectSuspenseMovies],
  (suspenseMovies) => suspenseMovies.data
);