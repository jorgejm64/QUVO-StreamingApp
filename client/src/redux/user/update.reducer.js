import { usersActionTypes } from "./user.types";

const initialState = {
    loading: false,
    error: '',
    data: []
}

const updateUserReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case usersActionTypes.UPDATE_USER_DATA_REQUEST:
            return {
                ...state,
                loading: true
            }
        case usersActionTypes.UPDATE_USER_DATA_SUCCESS:
            return {
                ...state,
                data: payload,
                loading: false,
                error: ''
            }
        case usersActionTypes.UPDATE_USER_DATA_FAILURE:
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

export default updateUserReducer;