import { combineReducers } from "redux";
import actionSeriesReducer from "./action.reducer";
import adventureSeriesReducer from "./adventure.reducer";
import comedySeriesReducer from "./comedy.reducer";
import crimeSeriesReducer from "./crime.reducer";
import documentarySeriesReducer from "./documentary.reducer";
import dramaSeriesReducer from "./drama.reducer";
import historySeriesReducer from "./history.reducer";
import horrorSeriesReducer from "./horror.reducer";
import musicSeriesReducer from "./music.reducer";
import mysterySeriesReducer from "./mystery.reducer";
import romanceSeriesReducer from "./romance.reducer";
import scifySeriesReducer from "./scify.reducer";
import suspenseSeriesReducer from "./suspense.reducer";
import warSeriesReducer from "./war.reducer";
import allSeriesReducer from "./series.reducer";


export default combineReducers({
    actionSeries: actionSeriesReducer,
    adventureSeries: adventureSeriesReducer,
    comedySeries: comedySeriesReducer,
    crimeSeries: crimeSeriesReducer,
    documentarySeries: documentarySeriesReducer,
    dramaSeries: dramaSeriesReducer,
    historySeries: historySeriesReducer,
    horrorSeries: horrorSeriesReducer,
    musicSeries: musicSeriesReducer,
    mysterySeries: mysterySeriesReducer,
    romanceSeries: romanceSeriesReducer,
    scifySeries: scifySeriesReducer,
    suspenseSeries: suspenseSeriesReducer,
    warSeries: warSeriesReducer,
    allSeries: allSeriesReducer,
})