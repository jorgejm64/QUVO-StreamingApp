import axios from "axios";
import { loginFailure, loginStart, loginSucces } from "./AuthActions";

//Realizamos la llamada a la BD. Para buscar al usuario (Login.jsx)
export const login = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("auth/signin", user);
    res.data.isAdmin && dispatch(loginSucces(res.data));
  } catch(err) {
    dispatch(loginFailure());
  }
};