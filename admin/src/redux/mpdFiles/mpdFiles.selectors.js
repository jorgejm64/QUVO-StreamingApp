import { createSelector } from "reselect";

export const selectMpdFiles = (state) => state.mpdFiles.mpdFiles;

export const selectMpdFilesSelector = createSelector(
  [selectMpdFiles],
  (mpdFiles) => mpdFiles.data
);