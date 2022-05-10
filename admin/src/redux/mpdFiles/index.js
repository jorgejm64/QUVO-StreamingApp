import { combineReducers } from "redux";
import mpdFilesReducer from "./mpdFiles.reducer";

export default combineReducers({
    mpdFiles: mpdFilesReducer
})