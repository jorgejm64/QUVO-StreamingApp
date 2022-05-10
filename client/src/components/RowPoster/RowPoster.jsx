import "./rowPoster.scss";
//Request
import { BASE_IMG_URL, FALLBACK_IMG_URL } from "../../requests";

//Icons
import { FaPlay, FaChevronDown, FaHeart, FaRegHeart } from "react-icons/fa";

//Router
import { Link, useParams } from "react-router-dom";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { showModalDetail } from "../../redux/modal/modal.actions";
import {
  addToFavourites,
  removeFromFavourites,
} from "../../redux/favourites/favourites.actions";
import { selectFavouritesList } from "../../redux/favourites/favourites.selector";

const RowPoster = (result) => {
  const { item, isLarge } = result;
  const favouritesList = useSelector(selectFavouritesList);
  let isFavourite = favouritesList.find((el) => el._id === item._id);

  let fallbackTitle = item.title;
  const dispatch = useDispatch();

  //Añadir a favoritos
  const handleAdd = (event) => {
    event.stopPropagation();
    dispatch(addToFavourites({ ...item, isFavourite }));
  };

  //Eliminar de favoritos
  const handleRemove = (event) => {
    event.stopPropagation();
    dispatch(removeFromFavourites({ ...item, isFavourite }));
  };

  //Handle del opening del modal
  const handleModalOpening = () => {
    dispatch(showModalDetail({ ...item, fallbackTitle }));
  };

  return (
    <div className={`Row__poster ${isLarge && "Row__poster--big"}`}>
      <Link to={{ pathname: "/details/" + item._id }}>
        {isLarge ? (
          item.imgPoster ? (
            <img src={`${item.imgPoster}`} alt={fallbackTitle} />
          ) : (
            ""
          )
        ) : item.imgWallpaper ? (
          <img src={`${item.imgWallpaper}`} alt={fallbackTitle} />
        ) : (
          <>
            <img src={FALLBACK_IMG_URL} alt={fallbackTitle} />
            <div className="Row__poster__fallback">
              <span>{fallbackTitle}</span>
            </div>
          </>
        )}
      </Link>
      
      <div className="Row__poster-info">
        <div className="Row__poster-info--iconswrp">
          <Link
            className="Row__poster-info--icon icon--play"
            to={{ pathname: "/details/" + item._id }}
          >
            <FaPlay />
          </Link>
          {!isFavourite ? (
            <button
              className="Row__poster-info--icon icon--favourite"
              onClick={handleAdd}
            >
              <FaRegHeart />
            </button>
          ) : (
            <button
              className="Row__poster-info--icon icon--favourite"
              onClick={handleRemove}
            >
              <FaHeart />
            </button>
          )}
          <button className="Row__poster-info--icon icon--toggleModal">
            <FaChevronDown onClick={handleModalOpening} />
          </button>
        </div>
        <div className="Row__poster-info--title">
          <h3>{fallbackTitle}</h3>
        </div>
        <div className="Row__poster-info--genres">
          <span key={`Genre--id_${item.genre}`} className="genre-title">
            {item.genre.join(" · ")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RowPoster;
