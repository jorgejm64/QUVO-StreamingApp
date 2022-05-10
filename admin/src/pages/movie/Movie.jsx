import "./movie.css";

//React
import { useState, useEffect, useContext } from "react";

//LazyLoad

//Request
import requests from "../../request";
import { BASE_URL_MEDIA_SERVER, CREDITS_DEFAULT_IMG } from "../../request";
import { Link, useLocation } from "react-router-dom";

//Form
import Select from "react-select";
import { useForm } from "react-hook-form";

//Icons
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

//Extra components
import Loader from "../../components/Loader/Loader";

//Redux
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { selectMpdFiles } from "../../redux/mpdFiles/mpdFiles.selectors";
import { fetchMpdFilesAsync } from "../../redux/mpdFiles/mpdFiles.actions";

//Context
import { updateMovie } from "../../context/movieContext/apiCalls";
import { MovieContext } from "../../context/movieContext/MovieContext";

//Shakaplayer
import ShakaPlayer from "shaka-player-react";
import "shaka-player/dist/controls.css";
import minutesToFormat from "../../hooks/minutesToFormat";
import dateToFormat from "../../hooks/dateToFormat";

export default function Movie() {
  const { dispatchMovies } = useContext(MovieContext);
  const location = useLocation();
  const movieInfo = location.movie;
  const backgroundImage = movieInfo.imgFeatured;

  const dispatch = useDispatch();
  const mpdFiles = useSelector(selectMpdFiles);

  let [genres, setGenres] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //TMDB INPUTS VALUES DEFAULTS START
  const defaultGenres = () => {
    let genresArray = [];
    for (let i in movieInfo.genre) {
      genresArray.push({
        value: movieInfo.genre[i],
        label: movieInfo.genre[i],
      });
    }
    handleGenres(genresArray);
    return genresArray;
  };

  const optionsProductionCompanies = () => {
    let companiesArray = [];
    for (let i in movieInfo.production) {
      companiesArray.push(movieInfo.production[i]);
    }
    return companiesArray;
  };

  const companies = optionsProductionCompanies();

  ///HANDLE IMG VISTA PREVIA
  const [posterLink, setPosterLink] = useState("");
  const [featuredLink, setFeaturedLink] = useState("");
  const [wallpaperLink, setWallpaperLink] = useState("");

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

  ///GET ALL MPD FILES
  useEffect(() => {
    dispatch(fetchMpdFilesAsync(requests.fetchMpdFiles));
  }, [dispatch]);

  ///ON SUBMIT SEND DATA TO UPDATE
  const onSubmit = (data) => {
    let genresArray = [];
    genres.map((genre) => genresArray.push(genre.value));

    const sendData = {
      title: data.title,
      age_classification: data.age_classification,
      tmdb_id: movieInfo.tmdb_id,
      vote_average: data.vote_average,
      vote_count: data.vote_count,
      imgFeatured: data.imgFeatured,
      imgPoster: data.imgPoster,
      imgWallpaper: data.imgWallpaper,
      imgTitle: data.imgTitle,
      tagline: data.tagline,
      production: companies,
      overview: data.overview,
      released_date: data.released_date,
      runtime: data.runtime,
      trailer_file: data.trailer_file,
      video_file: data.video_file,
      genre: genresArray,
    };

    updateMovie(movieInfo._id, sendData, dispatchMovies);
  };

  return (
    <div className="product">
      <div
        className="background_img"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="overlay_dark"></div>
      </div>

      <div className="productTitleContainer">
        <h1 className="productTitle">Pelicula</h1>
        <Link to="/newMovie">
          <button className="productAddButton">Crear</button>
        </Link>
      </div>

      <div className="productTop">
        <div className="goBack_btn">
          <Link to="/movies" className="productGoBackBtn">
            <ArrowBackIcon size="small" /> Volver
          </Link>
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <h2 className="productName">{movieInfo.title}</h2>
            <span className="productInfoValue tagline">
              {movieInfo.tagline ? movieInfo.tagline : ""}
            </span>
            <span className="productInfoValue productId">{movieInfo._id}</span>
          </div>
          <div className="imgSample_container">
            <div className="imgSample_upperDown">
              <div className="sampleImg_box">
                <img
                  src={movieInfo.imgWallpaper}
                  alt=""
                  className="productInfoImg"
                />
                <p>Miniatura</p>
              </div>
              <div className="sampleImg_box">
                <img
                  src={movieInfo.imgFeatured}
                  alt=""
                  className="productInfoImg"
                />
                <p>Destacada</p>
              </div>
            </div>
            <div className="sampleImg_box">
              <img
                src={movieInfo.imgPoster}
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
                  {movieInfo.actors.map((person, i) => (
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
                  <strong>Director</strong>
                </span>
                <div
                  className={
                    movieInfo.director.length > 4
                      ? "contentCasting"
                      : "contentCasting littleContent "
                  }
                >
                  {movieInfo.director.map((person, i) => (
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
                    {movieInfo.genre.length > 1 ? "Generos" : "Genero"}
                  </span>
                  <span className="productInfoValue">
                    {movieInfo.genre.length > 1
                      ? movieInfo.genre.join(" - ")
                      : movieInfo.genre}
                  </span>
                </div>
                <div className="productInfoItem">
                  <span className="productInfoKey">
                    {movieInfo.production.length > 1
                      ? "Productoras"
                      : "Productora"}
                  </span>
                  <span className="productInfoValue">
                    {movieInfo.production.length > 1
                      ? movieInfo.production.join(" - ")
                      : movieInfo.production}
                  </span>
                </div>
              </div>
            </div>

            <div className="infoGroup">
              <div className="tyni_boxes_container">
                <div className="productInfoItem-tyni">
                  <span className="productInfoKey">Año</span>
                  <span className="productInfoValue">
                    {movieInfo.released_date}
                  </span>
                </div>
                <div className="productInfoItem-tyni">
                  <span className="productInfoKey">Edad</span>
                  <span className="productInfoValue">
                    {movieInfo.age_classification
                      ? movieInfo.age_classification
                      : "Desconocido"}
                  </span>
                </div>
                <div className="productInfoItem-tyni">
                  <span className="productInfoKey">Duración</span>
                  <span className="productInfoValue">
                    {movieInfo.runtime ? minutesToFormat(movieInfo.runtime) : "-"}
                  </span>
                </div>
                <div className="productInfoItem-tyni">
                  <span className="productInfoKey">TMDB ID</span>
                  <span className="productInfoValue">
                    {movieInfo.tmdb_id ? movieInfo.tmdb_id : "Desconocido"}
                  </span>
                </div>
                <div className="productInfoItem-tyni">
                  <span className="productInfoKey">Nota media</span>
                  <span className="productInfoValue">
                    {movieInfo.vote_average
                      ? movieInfo.vote_average
                      : "Desconocido"}
                  </span>
                </div>
                <div className="productInfoItem-tyni">
                  <span className="productInfoKey">Votos</span>
                  <span className="productInfoValue">
                    {movieInfo.vote_count
                      ? movieInfo.vote_count
                      : "Desconocido"}
                  </span>
                </div>
                <div className="productInfoItem-tyni">
                  <span className="productInfoKey">Votos</span>
                  <span className="productInfoValue">
                    {movieInfo.vote_count
                      ? movieInfo.vote_count
                      : "Desconocido"}
                  </span>
                </div>
                <div className="productInfoItem-tyni">
                  <span className="productInfoKey">Lanzamiento</span>
                  <span className="productInfoValue">
                    {movieInfo.released_date
                      ? dateToFormat(movieInfo.released_date)
                      : "Desconocido"}
                  </span>
                </div>
              </div>
            </div>

            <div className="medium_boxes_container">
              <div className="productInfoItem overview">
                <span className="productInfoKey">Resumen</span>
                <span className="productInfoValue">
                  {movieInfo.overview ? movieInfo.overview : "Desconocido"}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="smapleVideo_container">
          <div className="smapleVideo_item">
            <ShakaPlayer src={BASE_URL_MEDIA_SERVER + movieInfo.video_file} />
            <span>Vídeo</span>
          </div>
          <div className="smapleVideo_item">
            <ShakaPlayer src={BASE_URL_MEDIA_SERVER + movieInfo.trailer_file} />
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
                defaultValue={movieInfo.imgFeatured}
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
                defaultValue={movieInfo.imgTitle}
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
                defaultValue={movieInfo.imgPoster}
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
                defaultValue={movieInfo.imgWallpaper}
                onChange={(e) => setWallpaperLink(e.target.value)}
              />
              <span className="errorText">{errors.imgWallpaper?.message}</span>
            </div>
          </div>

          {(featuredLink || posterLink || wallpaperLink) &&
          <div className="firstGroup middle">
            <div className="imgPreview_container">
            {featuredLink &&
              <div className="imgPreview_box">
                <span>Featured</span>
                <img src={featuredLink} width={140} alt="featured" />
              </div>
            }
            {posterLink &&
              <div className="imgPreview_box">
                <span>Poster</span>
                <img src={posterLink} width={100} alt="poster" />
              </div>
            }
            {wallpaperLink &&
              <div className="imgPreview_box">
                <span>Miniatura</span>
                <img src={wallpaperLink} width={140} alt="miniatura" />
              </div>
            }
            </div>
          </div>
          }
          
          <div className="secondGroup">
            <div className="addProductItem">
              <label>Título</label>
              <input
                {...register("title", { required: "Requerido" })}
                defaultValue={movieInfo.title}
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
                defaultValue={movieInfo.tagline}
                className="inputField"
                type="text"
                name="tagline"
              />
            </div>

            <div className="addProductItem">
              <label>Fecha de lanzamiento</label>
              <input
                {...register("released_date")}
                defaultValue={movieInfo.released_date}
                className="inputField"
                type="text"
                name="released_date"
              />
            </div>

            <div className="addProductItem">
              <label>Duración</label>
              <input
                {...register("runtime", { required: "Requerido" })}
                defaultValue={movieInfo.runtime}
                className="inputField"
                type="number"
                name="duration"
              />
              <span className="errorText">{errors.runtime?.message}</span>
            </div>
            <div className="little-inputs">
              <div className="addProductItem">
                <label>Edad</label>
                <input
                  {...register("age_classification", { required: "Requerido" })}
                  defaultValue={movieInfo.age_classification}
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
                  defaultValue={movieInfo.vote_average}
                  className="inputField"
                  type="number"
                  name="vote_average"
                />
              </div>

              <div className="addProductItem">
                <label>Votos totales</label>
                <input
                  {...register("vote_count")}
                  defaultValue={movieInfo.vote_count}
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
                defaultValue={movieInfo.overview}
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
                <label>Vídeo</label>
                <select
                  className="selectInput"
                  {...register("video_file", { required: "Requerido" })}
                  defaultValue={movieInfo.video_file}
                >
                  <option disabled value={movieInfo.video_file}>
                    {movieInfo.video_file}
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
                <span className="errorText">{errors.video_file?.message}</span>
              </div>

              <div className="addProductItem">
                <label>Tráiler</label>
                <select
                  {...register("trailer_file")}
                  className="selectInput"
                  defaultValue={
                    movieInfo.trailer_file ? movieInfo.trailer_file : ""
                  }
                >
                  <option
                    disabled
                    value={
                      movieInfo.trailer_file
                        ? movieInfo.trailer_file
                        : "Sin seleccionar archivo"
                    }
                  >
                    {movieInfo.trailer_file
                      ? movieInfo.trailer_file
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
