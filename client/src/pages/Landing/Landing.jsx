import "./landing.scss";
import { useEffect } from "react";

//Components
import Banner from "../../components/Banner/Banner";
import Row from "../../components/Row/Row";

//Motion
import { motion } from "framer-motion";
import {
  defaultPageFadeInVariants
} from "../../utils/motionUtils"

//Hook
import { useRetrieveData } from "../../hooks/useRetrieveData";

//Images
import backgroundImg from "../../assets/img/background/background_1.png";

//Redux
import { useDispatch } from "react-redux";
import { fetchAllMoviesAsync } from "../../redux/movies/movies.actions";
import { fetchAllSeriesAsync } from "../../redux/series/series.actions";

const Landing = () => {
  const rows = useRetrieveData("movies");
  const rowsSeries = useRetrieveData("series");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllMoviesAsync());
    dispatch(fetchAllSeriesAsync());
  }, [dispatch]);

  return (
    <motion.div
      variants={defaultPageFadeInVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="Landing"
    >
      <Banner />

      <section
        className="content"
        style={{ backgroundImage: `url(${backgroundImg})` }}
      >
        <div className="top-shadow" />
        {rows && rows.map((props) => <Row key={props.id} {...props} />)}
        {rowsSeries &&
          rowsSeries.map((props) => <Row key={props.id} {...props} />)}
      </section>
    </motion.div>
  );
};

export default Landing;
