import "./details.scss";

//Router
import { useNavigate, useParams, Link } from "react-router-dom";

//Request
import { CREDITS_DEFAULT_IMG, BASE_URL_MEDIA_SERVER } from "../../requests";

//Motion
import { motion } from "framer-motion";
import {
  defaultPageFadeInVariants
} from "../../utils/motionUtils"

//Icons
import { BsArrowLeftShort } from "react-icons/bs";
import { FaPlay, FaHeart, FaRegHeart } from "react-icons/fa";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { selectAllMovies } from "../../redux/movies/movies.selectors";

//Hooks
import minutesToFormat from "../../hooks/minutesToFormat";
import dateToFormat from "../../hooks/dateToFormat";
import { selectAllSeries } from "../../redux/series/series.selectors";
import { showVideoModalDetail } from "../../redux/VideoModal/videoModal.actions";
import { useEffect } from "react";
import { hideModalDetail } from "../../redux/modal/modal.actions";

const Details = () => {
  const dispatch = useDispatch();
  //Tomar id de la cabecera
  const { id } = useParams();
  //Alacenar todos los media de la base de datos
  const allMovies = useSelector(selectAllMovies);
  const allSeries = useSelector(selectAllSeries);

  useEffect(() => {
    dispatch(hideModalDetail());
  }, [dispatch]);

  //Router
  const navigate = useNavigate();

  //Buscar el media indicado por la id
  const mediaInfo = () => {
    if (allMovies.data.find((el) => el._id === id)) {
      return allMovies.data.find((el) => el._id === id);
    } else if (allSeries.data.find((el) => el._id === id)) {
      return allSeries.data.find((el) => el._id === id);
    } else {
      window.location.assign("/landing");
    }
  };

  //Set el valor de la imagen de fondo de la página
  const backgroundImage = mediaInfo().imgFeatured;

  //Handle del opening del modal
  const handleVideoModalOpening = (file) => {
    dispatch(showVideoModalDetail({ file }));
  };

  return (
    <motion.div
      variants={defaultPageFadeInVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="Details"
    >
      {allMovies.error ? (
        <div className="Details__errorMsg">
          <span>Parece que no se ha podido conseguir la información...</span>
        </div>
      ) : (
        <>
          <div
            className="Details__backgroundImg"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          >
            <div className="overlayDark"></div>
          </div>

          <div

            className="Details__container"
          >
            <div className="Details__container--goBack">
              <a onClick={() => navigate(-1)}>
                <BsArrowLeftShort /> Volver
              </a>
            </div>
            <div className="Details__container--content">
              <div className="header">
                <div className="header--shadow" />
                <div className="header--wallpaper">
                  <div>
                    <img src={mediaInfo().imgFeatured} alt="Featured" />
                  </div>
                  {!mediaInfo().series_media && (
                    <div className="header--buttonswrp scale-up-center">
                      <a
                        onClick={() =>
                          handleVideoModalOpening(mediaInfo().video_file)
                        }
                      >
                        <FaPlay />
                      </a>
                    </div>
                  )}
                </div>
              </div>

              <div className="info">
                <div className="info--shadow" />
                <div className="title">
                  <h2>{mediaInfo().title}</h2>
                  <span className="tagline">
                    {mediaInfo().tagline ? mediaInfo().tagline : ""}
                  </span>
                </div>

                <div className="info__btnwrap">
                  {mediaInfo().trailer_file && (
                    <div className="info__btnwrap--playBtn">
                      <a
                        onClick={() =>
                          handleVideoModalOpening(mediaInfo().trailer_file)
                        }
                      >
                        Tráiler <FaPlay />
                      </a>
                    </div>
                  )}
                  {mediaInfo().video_file && (
                    <div className="info__btnwrap--playBtn btnFilm">
                      <a
                        onClick={() =>
                          handleVideoModalOpening(mediaInfo().video_file)
                        }
                      >
                        Ver <FaPlay />
                      </a>
                    </div>
                  )}
                </div>
                <div className="info__top">
                  <div className="full_boxes_container">
                    <div className="overview">
                      <span className="productInfoValue">
                        {mediaInfo().overview
                          ? mediaInfo().overview
                          : "Desconocido"}
                      </span>
                    </div>
                  </div>
                  <div className="infoGroup">
                    <div className="medium_boxes_container">
                      <div className="productInfoItem">
                        <span className="productInfoKey">
                          {mediaInfo().genre.length > 1 ? "Generos" : "Genero"}
                        </span>
                        <span className="productInfoValue">
                          {mediaInfo().genre.length > 1
                            ? mediaInfo().genre.join(" - ")
                            : mediaInfo().genre}
                        </span>
                      </div>
                      <div className="productInfoItem">
                        <span className="productInfoKey">
                          {mediaInfo().production.length > 1
                            ? "Productoras"
                            : "Productora"}
                        </span>
                        <span className="productInfoValue">
                          {mediaInfo().production.length > 1
                            ? mediaInfo().production.join(" - ")
                            : mediaInfo().production}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="infoGroup">
                    <div className="tyni_boxes_container">
                      <div className="productInfoItem-tyni">
                        <span className="productInfoKey">Edad</span>
                        <span className="productInfoValue">
                          {mediaInfo().age_classification
                            ? mediaInfo().age_classification
                            : "Desconocido"}
                        </span>
                      </div>
                      <div className="productInfoItem-tyni">
                        <span className="productInfoKey">TMDB ID</span>
                        <span className="productInfoValue">
                          {mediaInfo().tmdb_id
                            ? mediaInfo().tmdb_id
                            : "Desconocido"}
                        </span>
                      </div>
                      <div className="productInfoItem-tyni">
                        <span className="productInfoKey">Nota media</span>
                        <span className="productInfoValue">
                          {mediaInfo().vote_average
                            ? mediaInfo().vote_average
                            : "Desconocido"}
                        </span>
                      </div>
                      <div className="productInfoItem-tyni">
                        <span className="productInfoKey">Votos</span>
                        <span className="productInfoValue">
                          {mediaInfo().vote_count
                            ? mediaInfo().vote_count
                            : "Desconocido"}
                        </span>
                      </div>
                      <div className="productInfoItem-tyni">
                        <span className="productInfoKey">Canal</span>
                        <span className="productInfoValue">
                          {mediaInfo().channel
                            ? mediaInfo().channel
                            : "Desconocido"}
                        </span>
                      </div>
                      <div className="productInfoItem-tyni">
                        <span className="productInfoKey">
                          Fecha de lanzamiento
                        </span>
                        <span className="productInfoValue">
                          {mediaInfo().released_date
                            ? dateToFormat(mediaInfo().released_date)
                            : "Desconocido"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="info__bottom">
                  <div className="info__top--credits">
                    <span>
                      <strong>Casting</strong>
                    </span>
                    <div className="contentCasting">
                      {mediaInfo().actors.map((person, i) => (
                        <div className="eachPerson" key={i}>
                          <div className="personImg">
                            <img
                              src={
                                person.image === null
                                  ? CREDITS_DEFAULT_IMG
                                  : person.image
                              }
                              alt="creator"
                            />
                          </div>
                          <span key={i}>{person.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {mediaInfo().series_media ? (
                    <div className="info__top--credits">
                      <span>
                        <strong>Creador</strong>
                      </span>
                      <div
                        className={
                          mediaInfo().creator.length > 4
                            ? "contentCasting"
                            : "contentCasting littleContent"
                        }
                      >
                        {mediaInfo().creator.map((person, i) => (
                          <div className="eachPerson" key={i}>
                            <div className="personImg">
                              <img
                                src={
                                  person.image === null
                                    ? CREDITS_DEFAULT_IMG
                                    : person.image
                                }
                                alt="creator"
                              />
                            </div>
                            <span key={i}>{person.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="info__top--credits">
                      <span>
                        <strong>Director</strong>
                      </span>
                      <div
                        className={
                          mediaInfo().director.length > 4
                            ? "contentCasting"
                            : "contentCasting littleContent "
                        }
                      >
                        {mediaInfo().director.map((person, i) => (
                          <div className="eachPerson" key={i}>
                            <div className="personImg">
                              <img
                                src={
                                  person.image === null
                                    ? CREDITS_DEFAULT_IMG
                                    : person.image
                                }
                                alt="creator"
                              />
                            </div>
                            <span key={i}>{person.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {mediaInfo().series_media && (
              <div className="serieMedia_container">
                <h2>
                  {mediaInfo().series_media.length > 1
                    ? "Episodios"
                    : "Episodio"}
                </h2>
                {mediaInfo().series_media.map((episode, i) => {
                  return (
                    <div className="serieMedia_box" key={i}>
                      <div
                        className="episodeTop"
                        onClick={() =>
                          handleVideoModalOpening(episode.video_file)
                        }
                      >
                        <div className="episodeInfoItem-img">
                          <img
                            src={episode.imgMiniature}
                            alt="episodeMiniature"
                          />
                          <div className="episodeInfoItem-img--play">
                            <FaPlay />
                          </div>
                        </div>
                        <div className="episodeInfo">
                          <div className="title">
                            <div className="episodeInfoItem-tyni">
                              <span className="episodeInfoValue">
                                {episode.number}&nbsp;-&nbsp;{episode.title}
                              </span>
                            </div>
                            <div className="episodeInfoItem-tyni">
                              <span className="episodeInfoValue-season">
                                {episode.season}
                              </span>
                            </div>
                            <div className="episodeTime">
                              <div className="episodeInfoItem-tyni">
                                <span className="episodeInfoValue">
                                  {episode.released_date
                                    ? dateToFormat(episode.released_date)
                                    : "-"}
                                </span>
                              </div>
                              <div className="episodeInfoItem-tyni">
                                <span className="episodeInfoValue">
                                  {episode.runtime
                                    ? minutesToFormat(parseInt(episode.runtime))
                                    : "-"}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="overview">
                            <div className="episodeInfoItem-overview">
                              <span className="episodeInfoValue">
                                {episode.overview}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </>
      )}
    </motion.div>
  );
};

export default Details;
