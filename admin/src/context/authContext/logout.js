import { logout } from "./AuthActions";

//Eliminamos la localStorage
export const logoutUser = (dispatch) => {
    dispatch(logout());
};