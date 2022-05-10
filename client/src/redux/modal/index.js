import { modalActionTypes } from "./modal.types"

//Esto inicial del modal
const initialState = {
    modalIsClosed: true,
    modalContent: []
}

//Estado posibles del modal
const modalReducer = (state = initialState, action) => {
    switch (action.type) {
        case modalActionTypes.SHOW_MODAL_DETAILS:
            return {
                ...state,
                modalIsClosed: false,
                modalContent: {...action.payload }
            }
        case modalActionTypes.HIDE_MODAL_DETAILS:
            return {
                ...state,
                modalIsClosed: true,
                modalContent: {}
            }
        default:
            return state
    }
}


export default modalReducer