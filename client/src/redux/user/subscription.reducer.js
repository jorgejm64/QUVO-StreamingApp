import { usersActionTypes } from "./user.types";

const initialState = {
    loading: false,
    error: '',
    data: []
}

const subscriptionUserReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case usersActionTypes.CANCEL_USER_SUBSCRIPTION_REQUEST:
            return {
                ...state,
                loading: true
            }
        case usersActionTypes.CANCEL_USER_SUBSCRIPTION_SUCCESS:
            return {
                ...state,
                data: payload,
                loading: false,
                error: ''
            }
        case usersActionTypes.CANCEL_USER_SUBSCRIPTION_FAILURE:
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

export default subscriptionUserReducer;