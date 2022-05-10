import "./category.scss";

import { useState } from "react";

//Components
import Poster from "../../components/Poster/Poster";
import SkeletonPage from "../../components/SkeletonPage/SkeletonPage";
import SkeletonPoster from "../../components/SkeletonPoster/SkeletonPoster";

//Motion
import { motion } from "framer-motion";
import { staggerHalf, defaultPageFadeInVariants } from "../../utils/motionUtils";

//Hooks
import { useRetrieveCategory } from "../../hooks/useRetrieveCategory";

//Router
import { useLocation, useParams } from "react-router-dom";

//Redux
import { useSelector } from "react-redux";

//Images
import backgroundImage from "../../assets/img/background/background_1.png";

const Category = () => {
  const location = useLocation();
  console.log(location);
  const [page, setPage] = useState(1);
  const slicedUrl = location.pathname.split("/");
  const { categoryName } = useParams();
  const categoryData = useRetrieveCategory(slicedUrl[1], categoryName);
  const preventUndefinedSelector = () => undefined;
  const selector = categoryData
    ? categoryData.selector
    : preventUndefinedSelector;
  const selectedGenre = useSelector(selector);

  return (
    <motion.div
      variants={defaultPageFadeInVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="Category"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "100% 100%",
        backgroundColor: "#3a0032",
        zIndex: "1",
      }}
    >
      <div className="Category__container">
        {categoryData ? (
          <>
            <h2 className="Category__title">{categoryData.title}</h2>

            <motion.div
              className="Category__wrp"
              variants={staggerHalf}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {selectedGenre.data &&
                selectedGenre.data.length > 0 &&
                selectedGenre.data.map((result, i) => (
                  <Poster key={i} item={result} {...result} />
                ))}
              {selectedGenre.loading && (
                <div className="Category__subtitle">
                  <SkeletonPoster />
                </div>
              )}
              {selectedGenre.error && (
                <div className="Category__subtitle">
                  Oops, ha ocurrido un error.
                </div>
              )}
            </motion.div>
          </>
        ) : (
          <SkeletonPage />
        )}
      </div>
    </motion.div>
  );
};

export default Category;
