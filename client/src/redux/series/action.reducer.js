import { seriesActionTypes } from './series.types';

const initialState = {
    loading: false,
    error: '',
    data: []
}

const actionSeriesReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case seriesActionTypes.FETCH_ACTION_SERIES_REQUEST:
            return {
                ...state,
                loading: true
            }
        case seriesActionTypes.FETCH_ACTION_SERIES_SUCCESS:
            return {
                ...state,
                data: payload,
                loading: false,
                error: ''
            }
        case seriesActionTypes.LOAD_MORE_ACTION_SERIES_SUCCESS:
            return {
                ...state,
                data: [...state.data, ...payload],
                loading: false,
                error: ''
            }
        case seriesActionTypes.FETCH_ACTION_SERIES_FAILURE:
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

export default actionSeriesReducer;