import { createSelector } from "reselect";

export const selectActionSeries = (state) => state.series.actionSeries;
export const selectAdventureSeries = (state) => state.series.adventureSeries;
export const selectComedySeries = (state) => state.series.comedySeries;
export const selectCrimeSeries = (state) => state.series.crimeSeries;
export const selectDocumentarySeries = (state) => state.series.documentarySeries;
export const selectDramaSeries = (state) => state.series.dramaSeries;
export const selectHistorySeries = (state) => state.series.historySeries;
export const selectHorrorSeries = (state) => state.series.horrorSeries;
export const selectMusicSeries = (state) => state.series.musicSeries;
export const selectMysterySeries = (state) => state.series.mysterySeries;
export const selectRomanceSeries = (state) => state.series.romanceSeries;
export const selectScifySeries = (state) => state.series.scifySeries;
export const selectSuspenseSeries = (state) => state.series.suspenseSeries;
export const selectAllSeries = (state) => state.series.allSeries;

export const selectAllSeriesSelector = createSelector(
  [selectAllSeries],
  (allSeries) => allSeries.data
)

export const selectActionSeriesSelector = createSelector(
  [selectActionSeries],
  (actionSeries) => actionSeries.data
);

export const selectAdventureSeriesSelector = createSelector(
  [selectAdventureSeries],
  (adventureSeries) => adventureSeries.data
);

export const selectComedySeriesSelector = createSelector(
  [selectComedySeries],
  (comedySeries) => comedySeries.data
);

export const selecCrimeSeriesSelector = createSelector(
  [selectCrimeSeries],
  (crimeSeries) => crimeSeries.data
);

export const selectDramaSeriesSelector = createSelector(
  [selectDramaSeries],
  (dramaSeries) => dramaSeries.data
);

export const selectDocumentarySeriesSelector = createSelector(
  [selectDocumentarySeries],
  (documentarySeries) => documentarySeries.data
);

export const selectHistorySeriesSelector = createSelector(
  [selectHistorySeries],
  (historySeries) => historySeries.data
);

export const selectHorrorSeriesSelector = createSelector(
  [selectHorrorSeries],
  (horrorSeries) => horrorSeries.data
);

export const selectMusicSeriesSelector = createSelector(
  [selectMusicSeries],
  (musicSeries) => musicSeries.data
);

export const selectMysterySeriesSelector = createSelector(
  [selectMysterySeries],
  (mysterySeries) => mysterySeries.data
);

export const selectRomanceSeriesSelector = createSelector(
  [selectRomanceSeries],
  (romanceSeries) => romanceSeries.data
);

export const selectScifySeriesSelector = createSelector(
  [selectScifySeries],
  (scifySeries) => scifySeries.data
);

export const selectSuspenseSeriesSelector = createSelector(
  [selectSuspenseSeries],
  (suspenseSeries) => suspenseSeries.data
);