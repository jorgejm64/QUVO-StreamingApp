import "./mylist.scss";

//Components
import Poster from "../../components/Poster/Poster";

//Motion
import { motion } from "framer-motion";
import { staggerHalf, defaultPageFadeInVariants } from "../../utils/motionUtils";

//Redux
import { useSelector } from "react-redux";
import { selectFavouritesList } from "../../redux/favourites/favourites.selector";


//Images
import backgroundImg from "../../assets/img/background/background_1.png";

const Mylist = () => {
  const favs = useSelector(selectFavouritesList);

  return (
    <motion.div
      className="MyList"
      variants={defaultPageFadeInVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
    <div className="MyList__container">
      {favs && favs.length > 0 && <h2 className="MyList__container--title">Mis favoritos</h2>}
      <motion.div
        className="MyList__container--wrp"
        variants={staggerHalf}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {favs && favs.length > 0 ? (
          favs.map((result) => (
            <Poster key={result._id} item={result} {...result} />
          ))
        ) : (
          <h2 className="MyList__container--title">
            ¡Vaya! Parece que todavia no tienes favoritos...
          </h2>
        )}
      </motion.div>
    </div>
    </motion.div>
  );
};


export default Mylist