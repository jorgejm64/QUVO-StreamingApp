import "./videoPopup.scss";

import { useRef } from "react";

//ShakaPlayer
import ShakaPlayer from "shaka-player-react";

//Request
import { BASE_URL_MEDIA_SERVER } from "../../requests";

//Motion
import { motion, AnimatePresence } from "framer-motion";
import { modalOverlayVariants } from "../../utils/motionUtils";

//Redux
import { useDispatch, useSelector } from "react-redux";
import {
  selectVideoModalContent,
  selectVideoModalState,
} from "../../redux/VideoModal/videoModal.selectors";

//Hooks
import useOutsideClick from "../../hooks/useOutsideClick";
import { hideVideoModalDetail } from "../../redux/VideoModal/videoModal.actions";

//Icons
import { VscChromeClose } from "react-icons/vsc";

const VideoPopup = () => {
  const dispatch = useDispatch();
  const videoModalClosed = useSelector(selectVideoModalState);
  const videoModalContent = useSelector(selectVideoModalContent);
  console.log(videoModalClosed);
  console.log(videoModalContent);

  const handleVideoModalClose = () => dispatch(hideVideoModalDetail());

  //Si tenemos el menú abierto
  if (!videoModalClosed) {
    document.body.style.overflowY = "hidden";
  } else {
    document.body.style.overflowY = "auto";
  }

  const modalRef = useRef();

  useOutsideClick(modalRef, () => {
    if (!videoModalClosed) handleVideoModalClose();
  });

  return (
    <AnimatePresence exitBeforeEnter>
      {!videoModalClosed && (
        <>
          <motion.div
            variants={modalOverlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            key="modalOverlay"
            className={`VideoModal__overlay ${
              videoModalClosed && "VideoModal__invisible"
            }`}
          >
            <div
              key="modal"
              ref={modalRef}
              className={`VideoModal__wrp ${
                videoModalClosed && "VideoModal__invisible"
              }`}
            >
              <div className="VideoModal__btnBox">
                <button
                  className="VideoModal__btnBox--closebtn"
                  onClick={handleVideoModalClose}
                >
                  <VscChromeClose />
                </button>
              </div>

              <div className="VideoModal__video">
                <ShakaPlayer
                  id="video"
                  className="VideoModal__video--videoController"
                  src={BASE_URL_MEDIA_SERVER + videoModalContent.file}
                />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default VideoPopup;
