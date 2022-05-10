import "./detailModal.scss";
import { useRef } from "react";

//Images
import backgroundImg from "../../assets/img/background/background_2_darker.jpg";

//Route
import { Link } from "react-router-dom";

//Motion
import { motion, AnimatePresence } from "framer-motion";
import { modalOverlayVariants } from "../../utils/motionUtils";

//Hooks
import dateToFormat from "../../hooks/dateToFormat";
import minutesToFormat from "../../hooks/minutesToFormat";

//Redux
import { hideModalDetail } from "../../redux/modal/modal.actions";
import { useDispatch, useSelector } from "react-redux";
import {
  selectModalContent,
  selectModalState,
} from "../../redux/modal/modal.selectors";
import {
  addToFavourites,
  removeFromFavourites,
} from "../../redux/favourites/favourites.actions";
import { selectFavouritesList } from "../../redux/favourites/favourites.selector";

//Request
import { FALLBACK_IMG_URL } from "../../requests";

//Icons
import { VscChromeClose } from "react-icons/vsc";
import { FaPlay, FaHeart, FaRegHeart } from "react-icons/fa";

//Hooks
import useOutsideClick from "../../hooks/useOutsideClick";

const DetailModal = () => {
  const dispatch = useDispatch();
  const modalClosed = useSelector(selectModalState);
  const modalContent = useSelector(selectModalContent);

  const favouritesList = useSelector(selectFavouritesList);
  let isFavourite = favouritesList.find(el => el._id === modalContent._id);
  const handleModalClose = () => dispatch(hideModalDetail());

  const modalRef = useRef();

  const handleAdd = (event) => {
    event.stopPropagation();
    dispatch(addToFavourites({ ...modalContent, isFavourite }));
  };

  const handleRemove = (event) => {
    event.stopPropagation();
    dispatch(removeFromFavourites({ ...modalContent, isFavourite }));
  };

  const handlePlayAnimation = (event) => {
    event.stopPropagation();
    handleModalClose();
  };

  useOutsideClick(modalRef, () => {
    if (!modalClosed) handleModalClose();
  });

    //Si tenemos el menú abierto
    if (!modalClosed) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }

  return (
    <AnimatePresence exitBeforeEnter>
      {!modalClosed && (
        <>
          <motion.div
            variants={modalOverlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            key="modalOverlay"
            className={`Modal__overlay ${modalClosed && "Modal__invisible"}`}
          >
            <div
              key="modal"
              ref={modalRef}
              className={`Modal__wrp ${modalClosed && "Modal__invisible"}`}
            >
              <div className="Modal__btnBox">
                <button
                  className="Modal__btnBox--closebtn"
                  onClick={handleModalClose}
                >
                  <VscChromeClose />
                </button>
                {!isFavourite ? (
                  <button
                    className="Modal__btnBox--favourite icon--favourite"
                    onClick={handleAdd}
                  >
                    <FaRegHeart />
                  </button>
                ) : (
                  <button
                    className="Modal__btnBox--favourite icon--favourite"
                    onClick={handleRemove}
                  >
                    <FaHeart />
                  </button>
                )}
              </div>

              <div className="Modal__image--wrp">
                <div className="Modal__image--shadow" />
                <img
                  className="Modal__image--img"
                  src={
                    modalContent.imgFeatured
                      ? `${modalContent.imgFeatured}`
                      : FALLBACK_IMG_URL
                  }
                  alt={modalContent.title}
                />
                <div className="Modal__image--buttonswrp">
                  <Link
                    className="Modal__image--button"
                    onClick={handlePlayAnimation}
                    to={{ pathname: "/details/" + modalContent._id }}
                  >
                    <FaPlay />
                  </Link>
                </div>
              </div>
              <div
                className="Modal__info--wrp"
                style={{ backgroundImage: `url(${backgroundImg})` }}
              >
                <div className="Modal__info--topShadow" />
                <h3 className="Modal__info--title">{modalContent.title}</h3>
                <p className="Modal__info--description">
                  {modalContent.overview}
                </p>
                <hr className="Modal__info--line" />
                <div className="Modal__info--row">
                  <span className="Modal__info--row-label">Géneros: </span>
                  <span className="Modal__info--row-description">
                    {modalContent.genre.join(" · ")}
                  </span>
                </div>
                <div className="Modal__info--row">
                <span className="Modal__info--row-label">Lanzamiento: </span>
                  <span className="Modal__info--row-description">
                    {modalContent.released_date ? dateToFormat(modalContent.released_date) : "Desconocido"}
                  </span>
                </div>
                <div className="Modal__info--row">
                <span className="Modal__info--row-label">Duración: </span>
                  <span className="Modal__info--row-description">
                    {modalContent.runtime ? minutesToFormat(modalContent.runtime) : "Desconocido"}
                  </span>
                </div>
                <div className="Modal__info--row">
                  <span className="Modal__info--row-label">Nota media: </span>
                  <span className="Modal__info--row-description">
                    {modalContent.vote_average}
                  </span>
                </div>
                <div className="Modal__info--row"></div>
                <div className="Modal__info--row">
                  <span className="Modal__info--row-label">Edad: </span>
                  <span className="Modal__info--row-description">
                    {modalContent.age_classification}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DetailModal;
