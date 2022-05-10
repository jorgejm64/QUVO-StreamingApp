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
  generateTokenSuccess,
  generateTokenFailure,
  resetPassSuccess,
  resetPassFailure,
} from "./auth.actions";

//Get Snapshot
export function* getSnapshotFromUserAuth(userAuth, additionalData) {
  try {
    const userSnapshot = yield JSON.parse(userAuth);
    yield put(
      signInSuccess({ accessToken: userSnapshot.accessToken, ...userSnapshot })
    );
  } catch (e) {
    yield put(signInFailure(e.message));
  }
}

//Sign up
export function* signUpAsync(userInfo) {
  try {
    const response = yield axios({
      method: "post",
      url: "auth/signup",
      data: userInfo.payload,
    });
    if (response) {
      localStorage.setItem("tmpSubToken", JSON.stringify(response.data));
      window.location.assign("/subscription")
      yield put(signUpSuccess(response.data));
    }
  } catch (error) {
    yield put(signUpFailure(error.response.data));
  }
}

//Sign in
export function* signInAsync({ payload: { email, password } }) {
  try {
    const response = yield axios({
      method: "post",
      url: "auth/signin",
      data: {
        email,
        password,
      },
    });

    if (response.data) {
      if (response.data.subscriptionToken){
        localStorage.setItem("tmpSubToken", JSON.stringify(response.data));
        window.location.assign("/subscription")
        yield put(signInSuccess(response.data));
      } else {
        localStorage.setItem("user", JSON.stringify(response.data));
        window.location.assign("/subscription")
        yield put(signInSuccess(response.data));
      }
    }
  } catch (error) {
    yield put(signInFailure(error.response.data));
  }
}

//Reset password (Generate Link)
export function* generateTokenAsync({ payload: { email } }) {
  try {
    const response = yield axios({
      method: "post",
      url: "password-reset/",
      data: {
        email,
      },
    }).catch(err => {
      if (err.response.data.status === "FAILED") {
        throw new Error(err.response.data.message);
      }
      throw err;
    });
    if (response) {
      if (response.data.status === "SUCCESS") {
        window.location.assign(response.data.url);
        yield put(generateTokenSuccess(response));
      }
    }
  } catch (err) {
    console.log("ERROR" +err)
    yield put(generateTokenFailure(err));
  }
}

//Reset password (Change password)
export function* resetPassAsync({ payload: { data, userId, resetToken } }) {
  try {
    const response = yield axios({
      method: "post",
      url: "",
      data: data.password,
    });

    if (response.data) {
      yield put(resetPassSuccess(response.data));
    }
  } catch (error) {
    if (error.response.data.includes("!DOCTYPE")) {
      yield put(resetPassFailure("Ha habido un error con el servidor"));
    } else {
      yield put(resetPassFailure(error.response.data));
    }
  }
}

//Sign out
export function* signOutAsync() {
  try {
    if (localStorage.getItem("user")) {
      const response = yield localStorage.removeItem("user");
      window.location.assign("/");
      yield put(signOutSuccess(response));
    } else if (localStorage.getItem("tmpSubToken")) {
      const response = yield localStorage.removeItem("tmpSubToken");
      window.location.assign("/");
      yield put(signOutSuccess(response));
    } else {
      yield put(signOutFailure("Hubo un error al cerrar la sesión"));
    }
    
  } catch (error) {
    yield put(signOutFailure(error));
  }
}

//Check user session (JWT)
export function* checkIfSession() {
  try {
    const userAuth = yield localStorage.getItem("user");
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

export function* onGenerateTokenStart() {
  yield takeLatest(
    authActionTypes.GENERATE_USER_TOKEN_START,
    generateTokenAsync
  );
}

export function* onResetPassStart() {
  yield takeLatest(authActionTypes.RESET_USER_PASS_START, resetPassAsync);
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
    call(onCheckIfSession),
    call(onGenerateTokenStart),
    call(onResetPassStart),
  ]);
}
