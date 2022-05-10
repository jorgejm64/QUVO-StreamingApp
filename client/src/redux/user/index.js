import { combineReducers } from "redux";
import dataUserReducer from "./data.reducer";
import resetPassReducer from "./resetPassword.reducer";
import updateUserReducer from "./update.reducer";
import subscriptionUserReducer from "./subscription.reducer";

export default combineReducers({
    dataUser: dataUserReducer,
    resetPass: resetPassReducer,
    updateUser: updateUserReducer,
    subscriptionUser: subscriptionUserReducer
})