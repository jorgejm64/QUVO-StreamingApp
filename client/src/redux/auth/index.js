import { authActionTypes } from "./auth.types"

export const initialState = {
    currentUser: null,
    error: null,
    loading: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case authActionTypes.SIGN_IN_START:
        case authActionTypes.SIGN_UP_START:
        case authActionTypes.GENERATE_USER_TOKEN_START:
        case authActionTypes.RESET_USER_PASS_START:
            return {
                ...state,
                loading: true
            }
            
        case authActionTypes.SIGN_IN_SUCCESS:
        case authActionTypes.SIGN_UP_SUCCESS:
        case authActionTypes.GENERATE_USER_TOKEN_SUCCESS:
        case authActionTypes.RESET_USER_PASS_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                loading: false,
                error: null
            }
        case authActionTypes.SIGN_OUT_SUCCESS:
            return {
                ...state,
                currentUser: null,
                loading: false,
                error: null
            }
        case authActionTypes.SIGN_IN_FAILURE:
        case authActionTypes.SIGN_UP_FAILURE:
        case authActionTypes.SIGN_OUT_FAILURE:
        case authActionTypes.GENERATE_USER_TOKEN_FAILURE:
        case authActionTypes.RESET_USER_PASS_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        default:
            return state
    }
}

export default authReducer