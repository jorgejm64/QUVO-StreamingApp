import { mpdFilesActionTypes } from './mpdFiles.types';

const initialState = {
    loading: false,
    error: '',
    data: []
}

const mpdFilesReducer = (state = initialState, {type, payload}) => {
    switch(type) {
        case mpdFilesActionTypes.FETCH_MPD_FILES_REQUEST:
            return {
                ...state,
                loading: true
            }
        case mpdFilesActionTypes.FETCH_MPD_FILES_SUCCESS:
            return {
                ...state,
                data: payload,
                loading: false,
                error: ''
            }
        case mpdFilesActionTypes.FETCH_MPD_FILES_FAILURE:
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

export default mpdFilesReducer