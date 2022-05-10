import "./serie.css";

//React
import { useState, useEffect, useContext } from "react";

//Router
import { Link, useLocation, useParams } from "react-router-dom";

//Request
import requests from "../../request";
import { BASE_URL_MEDIA_SERVER, CREDITS_DEFAULT_IMG } from "../../request";

//Form
import Select from "react-select";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

//Icons
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

//Extra components
import Loader from "../../components/Loader/Loader";
import Spinner from "../../components/Spinner/Spinner";

//Redux
import { useDispatch } from "react-redux";
import { selectMpdFiles } from "../../redux/mpdFiles/mpdFiles.selectors";
import { fetchMpdFilesAsync } from "../../redux/mpdFiles/mpdFiles.actions";

import { selectGetSerie } from "../../redux/series/series.selectors";
import {
  getSeriesAsync,
  updateSeriesAsync,
} from "../../redux/series/series.actions";

//Context

//Shakaplayer
import ShakaPlayer from "shaka-player-react";
import "shaka-player/dist/controls.css";
import minutesToFormat from "../../hooks/minutesToFormat";
import dateToFormat from "../../hooks/dateToFormat";

export default function Serie() {
  const dispatch = useDispatch();

  const location = useLocation();
  const serieInfo = location.serie;

  ///HANDLE IMG VISTA PREVIA
  const [posterLink, setPosterLink] = useState("");
  const [featuredLink, setFeaturedLink] = useState("");
  const [wallpaperLink, setWallpaperLink] = useState("");
  let [genres, setGenres] = useState("");

  //const serieInfo = useSelector(selectGetSerie);
  const mpdFiles = useSelector(selectMpdFiles);
  const backgroundImage = serieInfo.imgFeatured;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  
  ///GET DATA
  useEffect(() => {
    dispatch(fetchMpdFilesAsync(requests.fetchMpdFiles));
    reset();
  }, [dispatch, reset]);





  //TMDB INPUTS VALUES DEFAULTS START
  const defaultGenres = () => {
    let genresArray = [];
    for (let i in serieInfo.genre) {
      genresArray.push({
        value: serieInfo.genre[i],
        label: serieInfo.genre[i],
      });
    }
    handleGenres(genresArray);
    return genresArray;
  };

  const optionsProductionCompanies = () => {
    let companiesArray = [];
    for (let i in serieInfo.production) {
      companiesArray.push(serieInfo.production[i]);
    }
    return companiesArray;
  };

  const companies = optionsProductionCompanies();

  ///GENRES HANDLE SELECT
  const optionsGenres = [
    { value: "Acción", label: "Acción" },
    { value: "Aventura", label: "Aventura" },
    { value: "Bélica", label: "Bélica" },
    { value: "Ciencia ficción", label: "Ciencia ficción" },
    { value: "Comedia", label: "Comedia" },
    { value: "Crimen", label: "Crimen" },
    { value: "Documental", label: "Documental" },
    { value: "Drama", label: "Drama" },
    { value: "Familia", label: "Familia" },
    { value: "Fantasía", label: "Fantasía" },
    { value: "Historia", label: "Historia" },
    { value: "Misterio", label: "Misterio" },
    { value: "Música", label: "Música" },
    { value: "Romance", label: "Romance" },
    { value: "Suspense", label: "Suspense" },
    { value: "Terror", label: "Terror" },
  ];

  function handleGenres(selectedOption) {
    setGenres(selectedOption);
  }

  ///ON SUBMIT SEND DATA TO UPDATE
  const onSubmit = (data) => {
    let genresArray = [];
    genres.map((genre) => genresArray.push(genre.value));

    const sendData = {
      title: data.title,
      actors: serieInfo.actors,
      creator: serieInfo.creator,
      age_classification: data.age_classification,
      tmdb_id: serieInfo.id,
      vote_average: data.vote_average,
      vote_count: data.vote_count,
      imgFeatured: data.imgFeatured,
      imgPoster: data.imgPoster,
      imgWallpaper: data.imgWallpaper,
      imgTitle: "",
      tagline: data.tagline,
      series_media: serieInfo.series_media,
      production: companies,
      overview: data.overview,
      released_date: data.released_date,
      channel: data.channel,
      trailer_file: data.trailer_file,
      genre: genresArray,
    };
    dispatch(updateSeriesAsync(serieInfo._id, sendData));
  };

  return (serieInfo.loading) ? (
    <div className="spinner_container">
      <Spinner />
    </div>
  ) : (
    <div className="product">
      <div
        className="background_img"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="overlay_dark"></div>
      </div>

      <div className="productTitleContainer">
        <h1 className="productTitle">Serie</h1>
        <Link to="/newMovie">
          <button className="productAddButton">Crear</button>
        </Link>
      </div>

      <div className="productTop">
        <div className="goBack_btn">
          <Link to="/series" className="productGoBackBtn">
            <ArrowBackIcon size="small" /> Volver
          </Link>
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <h2 className="productName">{serieInfo.title}</h2>
            <span className="productInfoValue tagline">
              {serieInfo.tagline ? serieInfo.tagline : ""}
            </span>
            <span className="productInfoValue productId">
              {serieInfo._id}
            </span>
          </div>
          <div className="imgSample_container">
            <div className="imgSample_upperDown">
              <div className="sampleImg_box">
                <img
                  src={serieInfo.imgWallpaper}
                  alt=""
                  className="productInfoImg"
                />
                <p>Miniatura</p>
              </div>
              <div className="sampleImg_box">
                <img
                  src={serieInfo.imgFeatured}
                  alt=""
                  className="productInfoImg"
                />
                <p>Destacada</p>
              </div>
            </div>
            <div className="sampleImg_box">
              <img
                src={serieInfo.imgPoster}
                alt=""
                className="productInfoImg"
              />
              <p>Poster</p>
            </div>
          </div>

          <div className="productInfoMid">
            <div className="productInfoItem">
              <div className="credits">
                <span>
                  <strong>Casting</strong>
                </span>
                <div className="contentCasting">
                  {serieInfo.actors.map((person, i) => (
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
              <div className="credits">
                <span>
                  <strong>Creador</strong>
                </span>
                <div
                  className={
                    serieInfo.creator.length > 4
                      ? "contentCasting"
                      : "contentCasting littleContent "
                  }
                >
                  {serieInfo.creator.map((person, i) => (
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
            </div>
          </div>
          <div className="productInfoBottom">
            <div className="infoGroup">
              <div className="medium_boxes_container">
                <div className="productInfoItem">
                  <span className="productInfoKey">
                    {serieInfo.genre.length > 1 ? "Generos" : "Genero"}
                  </span>
                  <span className="productInfoValue">
                    {serieInfo.genre.length > 1
                      ? serieInfo.genre.join(" - ")
                      : serieInfo.genre}
                  </span>
                </div>
                <div className="productInfoItem">
                  <span className="productInfoKey">
                    {serieInfo.production.length > 1
                      ? "Productoras"
                      : "Productora"}
                  </span>
                  <span className="productInfoValue">
                    {serieInfo.production.length > 1
                      ? serieInfo.production.join(" - ")
                      : serieInfo.production}
                  </span>
                </div>
              </div>
            </div>

            <div className="infoGroup">
              <div className="tyni_boxes_container">
                <div className="productInfoItem-tyni">
                  <span className="productInfoKey">Edad</span>
                  <span className="productInfoValue">
                    {serieInfo.age_classification
                      ? serieInfo.age_classification
                      : "Desconocido"}
                  </span>
                </div>
                <div className="productInfoItem-tyni">
                  <span className="productInfoKey">TMDB ID</span>
                  <span className="productInfoValue">
                    {serieInfo.tmdb_id
                      ? serieInfo.tmdb_id
                      : "Desconocido"}
                  </span>
                </div>
                <div className="productInfoItem-tyni">
                  <span className="productInfoKey">Nota media</span>
                  <span className="productInfoValue">
                    {serieInfo.vote_average
                      ? serieInfo.vote_average
                      : "Desconocido"}
                  </span>
                </div>
                <div className="productInfoItem-tyni">
                  <span className="productInfoKey">Votos</span>
                  <span className="productInfoValue">
                    {serieInfo.vote_count
                      ? serieInfo.vote_count
                      : "Desconocido"}
                  </span>
                </div>
                <div className="productInfoItem-tyni">
                  <span className="productInfoKey">Canal</span>
                  <span className="productInfoValue">
                    {serieInfo.channel
                      ? serieInfo.channel
                      : "Desconocido"}
                  </span>
                </div>
                <div className="productInfoItem-tyni">
                  <span className="productInfoKey">Fecha de lanzamiento</span>
                  <span className="productInfoValue">
                    {serieInfo.released_date
                      ? dateToFormat(serieInfo.released_date)
                      : "Desconocido"}
                  </span>
                </div>
              </div>
            </div>

            <div className="medium_boxes_container">
              <div className="productInfoItem overview">
                <span className="productInfoKey">Resumen</span>
                <span className="productInfoValue">
                  {serieInfo.overview
                    ? serieInfo.overview
                    : "Desconocido"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="serieMedia_container">
          {serieInfo.series_media.map((episode, i) => {
            return (
              <div className="serieMedia_box" key={i}>
                <div className="episodeTop">
                  <div className="episodeInfoItem-img">
                    <img src={episode.imgMiniature} alt="episodeMiniature" />
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
                <div className="episodeSampleVideo_container">
                  <div className="smapleVideo_item">
                    <ShakaPlayer
                      src={BASE_URL_MEDIA_SERVER + episode.video_file}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="smapleVideo_container">
          <div className="smapleVideo_item">
            <ShakaPlayer
              src={BASE_URL_MEDIA_SERVER + serieInfo.trailer_file}
            />
            <span>Tráiler</span>
          </div>
        </div>
      </div>

      <div className="productBottom">
        <form className="addProductForm" onSubmit={handleSubmit(onSubmit)}>
          <div className="firstGroup">
            <div className="addProductItem">
              <label>Imagen destacada</label>
              <input
                {...register("imgFeatured", { required: "Requerido" })}
                className="inputField"
                type="text"
                id="imgFeatured"
                name="imgFeatured"
                defaultValue={serieInfo.imgFeatured}
                onChange={(e) => setFeaturedLink(e.target.value)}
              />
              <span className="errorText">{errors.imgFeatured?.message}</span>
            </div>

            <div className="addProductItem">
              <label>Imagen de título</label>
              <input
                {...register("imgTitle")}
                className="inputField"
                type="text"
                id="imgTitle"
                name="imgTitle"
                defaultValue={serieInfo.imgTitle}
                disabled
              />
            </div>

            <div className="addProductItem">
              <label>Imagen poster</label>
              <input
                {...register("imgPoster", { required: "Requerido" })}
                className="inputField"
                type="text"
                id="imgPoster"
                name="imgPoster"
                defaultValue={serieInfo.imgPoster}
                onChange={(e) => setPosterLink(e.target.value)}
              />
              <span className="errorText">{errors.imgPoster?.message}</span>
            </div>

            <div className="addProductItem">
              <label>Imagen de miniatura</label>
              <input
                {...register("imgWallpaper", { required: "Requerido" })}
                className="inputField"
                type="text"
                id="imgWallpaper"
                name="imgWallpaper"
                defaultValue={serieInfo.imgWallpaper}
                onChange={(e) => setWallpaperLink(e.target.value)}
              />
              <span className="errorText">{errors.imgWallpaper?.message}</span>
            </div>
          </div>

          {(featuredLink || posterLink || wallpaperLink) && (
            <div className="firstGroup middle">
              <div className="imgPreview_container">
                {featuredLink && (
                  <div className="imgPreview_box">
                    <span>Featured</span>
                    <img src={featuredLink} width={140} alt="featured" />
                  </div>
                )}
                {posterLink && (
                  <div className="imgPreview_box">
                    <span>Poster</span>
                    <img src={posterLink} width={100} alt="poster" />
                  </div>
                )}
                {wallpaperLink && (
                  <div className="imgPreview_box">
                    <span>Miniatura</span>
                    <img src={wallpaperLink} width={140} alt="miniatura" />
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="secondGroup">
            <div className="addProductItem">
              <label>Título</label>
              <input
                {...register("title", { required: "Requerido" })}
                defaultValue={serieInfo.title}
                className="inputField"
                type="text"
                name="title"
              />
              <span className="errorText">{errors.title?.message}</span>
            </div>

            <div className="addProductItem">
              <label>Tag</label>
              <input
                {...register("tagline")}
                defaultValue={serieInfo.tagline}
                className="inputField"
                type="text"
                name="tagline"
              />
            </div>

            <div className="addProductItem">
              <label>Fecha de lanzamiento</label>
              <input
                {...register("released_date")}
                defaultValue={serieInfo.released_date}
                className="inputField"
                type="text"
                name="released_date"
              />
            </div>
            <div className="little-inputs">
              <div className="addProductItem">
                <label>Edad</label>
                <input
                  {...register("age_classification", { required: "Requerido" })}
                  defaultValue={serieInfo.age_classification}
                  className="inputField"
                  type="number"
                  name="age_classification"
                />
                <span className="errorText">
                  {errors.age_classification?.message}
                </span>
              </div>

              <div className="addProductItem">
                <label>Nota media</label>
                <input
                  {...register("vote_average")}
                  defaultValue={serieInfo.vote_average}
                  className="inputField"
                  type="number"
                  name="vote_average"
                />
              </div>

              <div className="addProductItem">
                <label>Votos totales</label>
                <input
                  {...register("vote_count")}
                  defaultValue={serieInfo.vote_count}
                  className="inputField"
                  type="number"
                  name="vote_count"
                />
              </div>
            </div>

            <div className="addProductItem_multiselect">
              <label htmlFor="genre">Géneros</label>
              <Select
                defaultValue={defaultGenres}
                className="multiSelectField"
                isMulti
                placeholder="Seleccionar géneros"
                options={optionsGenres}
                value={genres.selectedOption}
                onChange={handleGenres}
                closeMenuOnSelect={false}
                required
              />
            </div>

            <div className="addProductItem_textArea">
              <label>Descripción</label>
              <textarea
                className="textareaField"
                {...register("overview", { required: "Requerido" })}
                name="overview"
                defaultValue={serieInfo.overview}
              />
              <span className="errorText">{errors.overview?.message}</span>
            </div>
          </div>

          {mpdFiles.error && (
            <div className="Row__not-loaded">
              Oops, ha ocurrido un error al cargar los ficheros de video
            </div>
          )}
          {mpdFiles.loading ? (
            <div className="Row__not-loaded">
              <Loader />
            </div>
          ) : (
            <h1 className="addGroupTitle betweenBoxes">
              Elegir fichero de video
            </h1>
          )}

          {!mpdFiles.loading && !mpdFiles.error && (
            <div className="thirdGroup">
              <div className="addProductItem">
                <label>Tráiler</label>
                <select
                  {...register("trailer_file")}
                  className="selectInput"
                  defaultValue={
                    serieInfo.trailer_file
                      ? serieInfo.trailer_file
                      : ""
                  }
                >
                  <option
                    disabled
                    value={
                      serieInfo.trailer_file
                        ? serieInfo.trailer_file
                        : "Sin seleccionar archivo"
                    }
                  >
                    {serieInfo.trailer_file
                      ? serieInfo.trailer_file
                      : "Sin seleccionar archivo"}
                  </option>
                  <option value="">Sin fichero</option>
                  {mpdFiles.data.map((item, i) => {
                    return (
                      <option key={i} value={item}>
                        {item}
                      </option>
                    );
                  })}
                </select>
                <span className="errorText">
                  {errors.trailer_file?.message}
                </span>
              </div>
            </div>
          )}
          <button className="addProductButton create" onClick={handleSubmit}>
            Actualizar
          </button>
        </form>
      </div>
    </div>
  );
}
