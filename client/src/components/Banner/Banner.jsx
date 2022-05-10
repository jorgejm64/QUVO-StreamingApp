import "./banner.scss";
import React, { useEffect, useRef, useState } from "react";

//Motion
import { motion } from "framer-motion";
import {
  staggerOne,
  bannerFadeInUpVariants,
  bannerFadeInVariants,
  bannerFadeInLoadSectionVariants,
} from "../../utils/motionUtils";
//Sekeleton
import SkeletonBanner from "../SkeletonBanner/SkeletonBanner";

//Icons
import { IoPlayOutline } from "react-icons/io5";
import { BiPlus } from "react-icons/bi";
import { BsStarFill } from "react-icons/bs";

//Utilities
import { randomize, truncate } from "../../utils/utilities";

//Request
import { BASE_URL_MEDIA_SERVER } from "../../requests";

//Router
import { Link } from "react-router-dom";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { showModalDetail } from "../../redux/modal/modal.actions";
import { selectAllMovies } from "../../redux/movies/movies.selectors";

//Hooks
import minutesToFormat from "../../hooks/minutesToFormat";
import { selectAllSeries } from "../../redux/series/series.selectors";

//ShakaPlayer
import VideoPlayer from "../VideoPlayer/VideoPlayer";

const Banner = ({ type }) => {
  console.log("RENDERED BANNER");
  let dataSelector;

  switch (type) {
    case "movies":
      dataSelector = selectAllMovies;
      break;
    case "series":
      dataSelector = selectAllSeries;
      break;
    default:
      dataSelector = selectAllMovies;
      break;
  }

  const myData = useSelector(dataSelector);

  const { loading, error, data: results } = myData;
  const finalData = results[randomize(results)];
  const fallbackTitle = finalData?.title;
  const description = truncate(finalData?.desc, 150);
  const dispatch = useDispatch();

  //Manejamos la animacion del botón play
  const handlePlayAnimation = (event) => {
    event.stopPropagation();
  };

  //Manejamos el modal
  const handleModalOpening = () => {
    dispatch(showModalDetail({ ...finalData, fallbackTitle }));
  };

  console.log(finalData);
  console.log(loading);
  return (
    <>
      <motion.section
        variants={bannerFadeInLoadSectionVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="Banner__loadsection"
      >
        {loading && <SkeletonBanner />}
        {error && <div className="errored">Oops, ha ocurrido un error.</div>}
      </motion.section>

      {!loading && finalData && (
        <motion.header
          variants={bannerFadeInVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="Banner"
          style={{ backgroundImage: `url(${finalData?.imgFeatured})` }}
        >
          {finalData.trailer_file && (
            <div className="Banner__video">
              <VideoPlayer
                data={{
                  manifest: `${BASE_URL_MEDIA_SERVER}${finalData.trailer_file}`,
                  muted: true,
                  chromeless: true,
                }}
              />
            </div>
          )}

          <motion.div
            className="Banner__content"
            variants={staggerOne}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {finalData.series_media ? (
              <motion.span
                variants={bannerFadeInUpVariants}
                className="Banner__content--duration"
              >
                Canal <strong>{finalData.channel}</strong>
              </motion.span>
            ) : (
              <motion.span
                variants={bannerFadeInUpVariants}
                className="Banner__content--duration"
              >
                Duración{" "}
                {finalData.runtime
                  ? minutesToFormat(parseInt(finalData.runtime))
                  : "-"}
              </motion.span>
            )}

            <motion.div
              variants={bannerFadeInUpVariants}
              className="Banner__content--info"
            >
              <span className="Banner__content--mark">
                <BsStarFill fill="#FFC107" /> {finalData.vote_average}
              </span>
              <span className="Banner__content--genres">
                {finalData.genre ? finalData.genre.join(" · ") : "Desconocido"}
              </span>
            </motion.div>

            <motion.h1
              variants={bannerFadeInUpVariants}
              className="Banner__content--title"
            >
              {fallbackTitle}
            </motion.h1>

            <motion.div
              variants={bannerFadeInUpVariants}
              className="Banner__buttons"
            >
              <Link
                className="Banner__button"
                onClick={handlePlayAnimation}
                to={{ pathname: "/details/" + finalData._id }}
              >
                <IoPlayOutline size="3em" />
              </Link>
              <button className="Banner__button" onClick={handleModalOpening}>
                <BiPlus size="1.8em" />
                <span>más info</span>
              </button>
            </motion.div>
            <motion.p
              variants={bannerFadeInUpVariants}
              className="Banner__content--description"
            >
              {description}
            </motion.p>
          </motion.div>
          <div className="Banner__panel" />
          <div className="Banner__bottom-shadow" />
        </motion.header>
      )}
    </>
  );
};

export default React.memo(Banner);
