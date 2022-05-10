import { createSelector } from "reselect";

const selectVideoModal = state => state.videoModal;

export const selectVideoModalState = createSelector(
    [selectVideoModal],
    videoModal => videoModal.videoModalIsClosed
);

export const selectVideoModalContent = createSelector(
    [selectVideoModal],
    videoModal => videoModal.videoModalContent
)
