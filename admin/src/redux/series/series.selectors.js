import { createSelector } from "reselect";

export const selectSerie = (state) => state.series.seriesData;
export const selectGetSerie = (state) => state.series.serieData;

export const selectSeriesSelector = createSelector(
    [selectSerie],
    (seriesData) => seriesData.data
)

export const selectSerieSelector = createSelector(
    [selectGetSerie],
    (serieData) => serieData.data
)