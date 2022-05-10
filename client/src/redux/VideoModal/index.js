import { videoModalActionTypes } from "./videoModal.types"

//Esto inicial del modal
const initialState = {
    videoModalIsClosed: true,
    videoModalContent: []
}

//Estado posibles del modal
const videoModalReducer = (state = initialState, action) => {
    switch (action.type) {
        case videoModalActionTypes.SHOW_VIDEO_MODAL_DETAILS:
            return {
                ...state,
                videoModalIsClosed: false,
                videoModalContent: {...action.payload }
            }
        case videoModalActionTypes.HIDE_VIDEO_MODAL_DETAILS:
            return {
                ...state,
                videoModalIsClosed: true,
                videoModalContent: {}
            }
        default:
            return state
    }
}


export default videoModalReducer