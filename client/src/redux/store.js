import createSagaMiddleware from "redux-saga";
import thunk from "redux-thunk";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from "redux-logger";
import { persistStore } from "redux-persist";
import rootReducer from "./rootReducer";
import { rootSaga } from "./rootSaga";


const sagaMiddleware = createSagaMiddleware();
const middlewares = [thunk, sagaMiddleware];


if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
}

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)));
sagaMiddleware.run(rootSaga);


export const persistor = persistStore(store);

const exp = { store, persistor};

export default exp;