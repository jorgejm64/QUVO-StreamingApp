import { authActionTypes } from "./auth.types"

export const checkUserSession = () => ({
    type: authActionTypes.CHECK_USER_SESSION
})

export const emailSignInStart = (data) => ({
    type: authActionTypes.SIGN_IN_START,
    payload: data
})


export const signInSuccess = user => ({
    type: authActionTypes.SIGN_IN_SUCCESS,
    payload: user,
})

export const signInFailure = error => ({
    type: authActionTypes.SIGN_IN_FAILURE,
    payload: error
})

export const signOutStart = (navigate) => ({
    type: authActionTypes.SIGN_OUT_START,
    payload: navigate
})

export const signOutSuccess = () => ({
    type: authActionTypes.SIGN_OUT_SUCCESS
})

export const signOutFailure = error => ({
    type: authActionTypes.SIGN_OUT_FAILURE,
    payload: error
})

export const signUpStart = userCredentials => ({
    type: authActionTypes.SIGN_UP_START,
    payload: userCredentials
})

export const signUpSuccess = (user) => ({
    type: authActionTypes.SIGN_UP_SUCCESS,
    payload: user
})

export const signUpFailure = error => ({
    type: authActionTypes.SIGN_UP_FAILURE,
    payload: error
})

export const generateTokenStart = userCredentials => ({
    type: authActionTypes.GENERATE_USER_TOKEN_START,
    payload: userCredentials
})

export const generateTokenSuccess = (token) => ({
    type: authActionTypes.GENERATE_USER_TOKEN_SUCCESS,
    payload: token
})

export const generateTokenFailure = error => ({
    type: authActionTypes.GENERATE_USER_TOKEN_FAILURE,
    payload: error
})

export const resetPassStart = userPass => ({
    type: authActionTypes.RESET_USER_PASS_START,
    payload: userPass
})

export const resetPassSuccess = (confirmation) => ({
    type: authActionTypes.RESET_USER_PASS_SUCCESS,
    payload: confirmation
})

export const resetPassFailure = error => ({
    type: authActionTypes.RESET_USER_PASS_FAILURE,
    payload: error
})