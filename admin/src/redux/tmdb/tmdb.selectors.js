import { createSelector } from "reselect";

export const selectTmdbMovie = (state) => state.tmdb.tmdbMovie;
export const selectTmdbCreditsMovie = (state) => state.tmdb.tmdbCreditsMovie
export const selectTmdbSerie = (state) => state.tmdb.tmdbSerie
export const selectTmdbCreditsSerie = (state) => state.tmdb.tmdbCreditsSerie
export const selectTmdbSeason = (state) => state.tmdb.tmdbSeason

export const selectTmdbMovieSelector = createSelector(
  [selectTmdbMovie],
  (tmdbMovie) => tmdbMovie.data
);

export const selectTmdbCreditsMovieSelector = createSelector(
  [selectTmdbCreditsMovie],
  (tmdbCreditsMovie) => tmdbCreditsMovie.data
);

export const selectTmdbSerieSelector = createSelector(
  [selectTmdbSerie],
  (tmdbSerie) => tmdbSerie.data
);

export const selectTmdbCreditsSerieSelector = createSelector(
  [selectTmdbCreditsSerie],
  (tmdbCreditsSerie) => tmdbCreditsSerie.data
);

export const selectTmdbSeasonSelector = createSelector(
  [selectTmdbSeason],
  (tmdbSeason) => tmdbSeason.data
);
