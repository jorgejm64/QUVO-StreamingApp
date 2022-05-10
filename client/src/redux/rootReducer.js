import { combineReducers } from "redux"
import persistReducer from "redux-persist/es/persistReducer";
import storage from 'redux-persist/lib/storage';

import movies from "./movies";
import detailModal from "./modal";
import auth from "./auth";
import search from "./search";
import favourites from "./favourites";
import user from "./user";
import series from "./series"
import videoModal from "./VideoModal"

const persistConfig = {
    key: 'root',
    storage,
    //Persistimos la lista de favoritos
    //Estos datos se almacenarán en una cookie.
    whitelist: ['favourites']
}

const rootReducer = combineReducers({
    movies,
    series,
    detailModal,
    auth,
    search,
    favourites,
    user,
    videoModal
})

export default persistReducer(persistConfig, rootReducer);