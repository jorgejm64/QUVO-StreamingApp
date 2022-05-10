import { takeLatest, all, put, call } from "redux-saga/effects";
import axios from "axios";
import { authActionTypes } from "./auth.types";

import {
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
  signUpSuccess,
  signUpFailure,
} from "./auth.actions";


//Get Snapshot
export function* getSnapshotFromUserAuth(userAuth, additionalData) {
	try {
		const userSnapshot = yield JSON.parse(userAuth);
		yield put(signInSuccess({ accessToken: userSnapshot.accessToken, ...userSnapshot }));
	} catch (e) {
		yield put(signInFailure(e.message));
	}
}

//Sign up
export function* signUpAsync({
  payload: { email, password, username, history },
}) {
  try {
    const response = yield axios({
      method: "post",
      url: "/signup",
      data: {
        username,
        email,
        password,
      },
      withCredentials: true,
    });

    yield put(signUpSuccess(response.data.user));
  } catch (error) {
    yield put(signUpFailure(error.response.data.error));
  }
}

//Sign in
export function* signInAsync({ payload: { email, password } }) {
  console.log("Email "+email +" "+ password);
  try {
    const response = yield axios({
      method: "post",
      url: "auth/admin/signin",
      data: {
        email,
        password,
      }
    });

    
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
      window.location.assign("/");
      yield put(signInSuccess(response.data));
    }
  } catch (error) {
      yield put(signInFailure(error.response.data));
  }
}

//Sign out
export function* signOutAsync() {
  try {
    const response = yield localStorage.removeItem("user");
    yield put(signOutSuccess(response));
  } catch (error) {
    console.log(error)
    yield put(signOutFailure(error));
  }
}


//Check user session (JWT)
export function* checkIfSession() {
  try {
    const userAuth = yield localStorage.getItem('user'); 
    if (!userAuth) return;
		yield getSnapshotFromUserAuth(userAuth);

  } catch (error) {
    yield put(signInFailure(error.message));
  }

}


//-----Watcher-----//

export function* onSignInStart() {
    yield takeLatest(authActionTypes.SIGN_IN_START, signInAsync);
}

export function* onSignOutStart() {
    yield takeLatest(authActionTypes.SIGN_OUT_START, signOutAsync);
}

export function* onSignUpStart() {
    yield takeLatest(authActionTypes.SIGN_UP_START, signUpAsync);
}

export function* onCheckIfSession() {
    yield takeLatest(authActionTypes.CHECK_USER_SESSION, checkIfSession);
}

export function* authSagas() {
    yield all([
        call(onSignInStart),
        call(onSignOutStart),
        call(onSignUpStart),
        call(onCheckIfSession)
    ])
}