import { usersActionTypes } from "./user.types";

const initialState = {
    loading: false,
    error: '',
    data: []
}

const resetPassReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case usersActionTypes.RESET_USER_PASS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case usersActionTypes.RESET_USER_PASS_SUCCESS:
            return {
                ...state,
                data: payload,
                loading: false,
                error: ''
            }
        case usersActionTypes.RESET_USER_PASS_FAILURE:
            return {
                ...state,
                data: [],
                loading: false,
                error: payload
            }
        default:
            return state;
    }
}

export default resetPassReducer;