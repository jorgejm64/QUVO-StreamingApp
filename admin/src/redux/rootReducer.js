import { combineReducers } from "redux"
import persistReducer from "redux-persist/es/persistReducer";
import storage from 'redux-persist/lib/storage';

import mpdFiles from "./mpdFiles";
import tmdb from "./tmdb";
import series from "./series";
import auth from "./auth";


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['']
}

const rootReducer = combineReducers({
    mpdFiles,
    tmdb,
    series,
    auth,
})

export default persistReducer(persistConfig, rootReducer);;