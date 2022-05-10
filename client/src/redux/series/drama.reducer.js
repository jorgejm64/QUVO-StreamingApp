import { seriesActionTypes } from './series.types';

const initialState = {
    loading: false,
    error: '',
    data: []
}

const dramaSeriesReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case seriesActionTypes.FETCH_DRAMA_SERIES_REQUEST:
            return {
                ...state,
                loading: true
            }
        case seriesActionTypes.FETCH_DRAMA_SERIES_SUCCESS:
            return {
                ...state,
                data: payload,
                loading: false,
                error: ''
            }
        case seriesActionTypes.LOAD_MORE_DRAMA_SERIES_SUCCESS:
            return {
                ...state,
                data: [...state.data, ...payload],
                loading: false,
                error: ''
            }
        case seriesActionTypes.FETCH_DRAMA_SERIES_FAILURE:
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

export default dramaSeriesReducer;