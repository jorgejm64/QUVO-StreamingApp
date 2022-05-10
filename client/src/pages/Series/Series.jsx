import "./series.scss";
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
import { fetchAllSeriesAsync } from "../../redux/series/series.actions";

const Series = () => {
  const rows = useRetrieveData("series");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllSeriesAsync());
  }, [dispatch]);


  return (
    <motion.div
      variants={defaultPageFadeInVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="Series"
    >
      <Banner type="series" />

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

export default Series;
