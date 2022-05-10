import { videoModalActionTypes } from "./videoModal.types";

export const showVideoModalDetail = videoModalContent => ({
    type: videoModalActionTypes.SHOW_VIDEO_MODAL_DETAILS,
    payload: videoModalContent
});

export const hideVideoModalDetail = () =>  ({
    type: videoModalActionTypes.HIDE_VIDEO_MODAL_DETAILS
})