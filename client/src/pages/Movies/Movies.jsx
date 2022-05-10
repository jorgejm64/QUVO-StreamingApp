import "./movies.scss";
import Banner from "../../components/Banner/Banner";
import Row from "../../components/Row/Row";
import { useRetrieveData } from "../../hooks/useRetrieveData";

//Motion
import { motion } from "framer-motion";
import {
  defaultPageFadeInVariants
} from "../../utils/motionUtils"

//Images
import backgroundImg from "../../assets/img/background/background_1.png";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchAllMoviesAsync } from "../../redux/movies/movies.actions";

const Movies = () => {
  const rows = useRetrieveData("movies");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllMoviesAsync());
  }, [dispatch]);

  return (
    <motion.div
      variants={defaultPageFadeInVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="Movies"
    >
      <Banner type="movies" />

      <section
        className="content"
        style={{ backgroundImage: `url(${backgroundImg})` }}
      >
        <div className="top-shadow" />
        {rows && rows.map((props) => <Row key={props.id} {...props} />)}
      </section>
    </motion.div>
  );
};

export default Movies;
