import { usersActionTypes } from "./user.types";

const initialState = {
    loading: false,
    error: '',
    data: []
}

const dataUserReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case usersActionTypes.FETCH_USER_DATA_REQUEST:
            return {
                ...state,
                loading: true
            }
        case usersActionTypes.FETCH_USER_DATA_SUCCESS:
            return {
                ...state,
                data: payload,
                loading: false,
                error: ''
            }
        case usersActionTypes.FETCH_USER_DATA_FAILURE:
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

export default dataUserReducer;