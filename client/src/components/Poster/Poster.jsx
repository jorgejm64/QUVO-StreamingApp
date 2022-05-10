import "./poster.scss";

//Motion
import { motion } from "framer-motion";
import { posterFadeInVariants } from "../../utils/motionUtils";

//Request
import { FALLBACK_IMG_URL } from "../../requests";

//Icons
import { FaChevronDown, FaPlay, FaHeart, FaRegHeart } from "react-icons/fa";

//Router
import { Link, useNavigate } from "react-router-dom";

//Redux
import { showModalDetail } from "../../redux/modal/modal.actions";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFavourites,
  removeFromFavourites,
} from "../../redux/favourites/favourites.actions";
import { selectFavouritesList } from "../../redux/favourites/favourites.selector";

const Poster = (result) => {
  const { item } = result;
  const dispatch = useDispatch();
  const favouritesList = useSelector(selectFavouritesList);
  let isFavourite = favouritesList.find((el) => el._id === item._id);

  //Handle accion del modal
  const handleModalOpening = () => {
    dispatch(showModalDetail(item));
  };

  //Añadir a favoritos
  const handleAdd = (event) => {
    event.stopPropagation();
    dispatch(addToFavourites({ ...item, isFavourite }));
  };

  //Quitar de favoritos
  const handleRemove = (event) => {
    event.stopPropagation();
    dispatch(removeFromFavourites({ ...item, isFavourite }));
  };

  return (
    <motion.div variants={posterFadeInVariants} className="Poster">
      <Link to={{ pathname: "/details/" + item._id }}>
        {item.imgWallpaper ? (
          <img src={`${item.imgWallpaper}`} alt={item.title} />
        ) : (
          <>
            <img src={FALLBACK_IMG_URL} alt={item.title} />
            <div className="Poster__fallback">
              <span>{item.title}</span>
            </div>
          </>
        )}
      </Link>
      <div className="Poster__info">
        <div className="Poster__info--iconswrp">
          <Link
            className="Poster__info--icon icon--play"
            to={{ pathname: "/details/" + item._id }}
          >
            <FaPlay />
          </Link>
          {!isFavourite ? (
            <button
              className="Poster__info--icon icon--favourite"
              onClick={handleAdd}
            >
              <FaRegHeart />
            </button>
          ) : (
            <button
              className="Poster__info--icon icon--favourite"
              onClick={handleRemove}
            >
              <FaHeart />
            </button>
          )}
          <button className="Poster__info--icon icon--toggleModal">
            <FaChevronDown onClick={handleModalOpening} />
          </button>
        </div>
        <div className="Poster__info--title">
          <h3>{item.title}</h3>
        </div>
        <div className="Poster__info--genres">
          <span key={`Genre--id_${item.genre}`} className="genre-title">
            {item.genre.join(" · ")}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default Poster;
