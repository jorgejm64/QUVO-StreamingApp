import { combineReducers } from "redux";
import seriesReducer from "./series.reducer";
import seriesGetReducer from "./seriesGet.reducer";

export default combineReducers({
    seriesData: seriesReducer,
    serieData: seriesGetReducer,
})

