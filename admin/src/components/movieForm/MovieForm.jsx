import "./movieForm.css";

//React
import { useState, useEffect, useContext } from "react";

//Request
import requests from "../../request";
import { CREDITS_DEFAULT_IMG } from "../../request";

//Form
import Select from "react-select";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

//Extra components
import Loader from "../../components/Loader/Loader";

//Redux
import { useDispatch } from "react-redux";
import { selectMpdFiles } from "../../redux/mpdFiles/mpdFiles.selectors";
import { fetchMpdFilesAsync } from "../../redux/mpdFiles/mpdFiles.actions";

import { selectTmdbCreditsMovie } from "../../redux/tmdb/tmdb.selectors";
import { fetchTmdbCreditsMovieAsync } from "../../redux/tmdb/tmdb.actions";

//Context
import { createMovie } from "../../context/movieContext/apiCalls";
import { MovieContext } from "../../context/movieContext/MovieContext";

export default function MovieForm(movieInfo) {
  const { dispatchMovies } = useContext(MovieContext);

  const dispatch = useDispatch();
  const mpdFiles = useSelector(selectMpdFiles);
  const credits = useSelector(selectTmdbCreditsMovie);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let [genres, setGenres] = useState("");

  //TMDB INPUTS VALUES DEFAULTS START
  const defaultGenres = () => {
    let genresArray = [];
    for (let i in movieInfo.data.genres) {
      genresArray.push({
        value: movieInfo.data.genres[i].name,
        label: movieInfo.data.genres[i].name,
      });
    }
    handleGenres(genresArray);
    return genresArray;
  };

  const optionsProductionCompanies = () => {
    let companiesArray = [];
    for (let i in movieInfo.data.production_companies) {
      companiesArray.push(movieInfo.data.production_companies[i].name);
    }
    return companiesArray;
  };

  const optionsCasting = () => {
    let castingArray = [];
    for (let i in credits.data.cast) {
      if (credits.data.cast[i].profile_path !== null) {
        castingArray.push({
          name: credits.data.cast[i].name,
          image:
            "https://www.themoviedb.org/t/p/w600_and_h900_bestv2" +
            credits.data.cast[i].profile_path,
        });
      } else {
        castingArray.push({
          name: credits.data.cast[i].name,
          image: null,
        });
      }
    }
    return castingArray;
  };

  const optionsDirector = () => {
    let directorArray = [];
    for (let i in credits.data.crew) {
      if (credits.data.crew[i].job === "Director") {
        if (credits.data.crew[i].profile_path !== null) {
          directorArray.push({
            name: credits.data.crew[i].name,
            image:
              "https://www.themoviedb.org/t/p/w600_and_h900_bestv2" +
              credits.data.crew[i].profile_path,
          });
        } else {
          directorArray.push({
            name: credits.data.crew[i].name,
            image: null,
          });
        }
      }
    }
    return directorArray;
  };

  const companies = optionsProductionCompanies();
  const casting = optionsCasting();
  const director = optionsDirector();

  ///HANDLE IMG VISTA PREVIA
  const [posterLink, setPosterLink] = useState("");
  const [featuredLink, setFeaturedLink] = useState("");
  const [wallpaperLink, setWallpaperLink] = useState("");

  ///GENRES MULTISELECT
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

  ///GET DATA FROM APIS AND DB
  useEffect(() => {
    dispatch(fetchTmdbCreditsMovieAsync(movieInfo.data.id));
    dispatch(fetchMpdFilesAsync(requests.fetchMpdFiles));
  }, [dispatch]);

  ///SEND DATA TO DATABASE (CREATE SCHEMA)
  const onSubmit = (data) => {
    let genresArray = [];
    genres.map((genre) => genresArray.push(genre.value));

    const sendData = {
      title: data.title,
      actors: casting,
      director: director,
      age_classification: data.age_classification,
      tmdb_id: movieInfo.data.id,
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

    createMovie(sendData, dispatchMovies);
  };

  return (
    <div className="formContainer">
      <div className="uneditable_info">
        <div className="tmdb_id">
          <span>
            <strong>TMDB ID: </strong>
          </span>
          <p>{movieInfo.data.id}</p>
        </div>
        <div className="productionCompanies">
          <span>
            <strong>Compañias productoras:</strong>
          </span>
          <div className="contentCompanies">
            {companies.map((company, i) =>
              companies.length === i + 1 ? (
                <span key={i}>{company}</span>
              ) : (
                <span key={i}>{company} - </span>
              )
            )}
          </div>
        </div>

        <div className="credits">
          <span>
            <strong>Director</strong>
          </span>
          {casting.error && (
            <div className="Row__not-loaded">
              Oops, ha ocurrido un error al cargar a los directores
            </div>
          )}
          {casting.loading ? (
            <div className="Row__not-loaded">
              <Loader />
            </div>
          ) : (
            <div
              className={
                director.length > 4
                  ? "contentCasting"
                  : "contentCasting littleContent "
              }
            >
              {director.map((person, i) => (
                <div className="eachPerson">
                  <div className="personImg">
                    <img src={person.image === null ? CREDITS_DEFAULT_IMG : person.image} alt="director" />
                  </div>
                  <span key={i}>{person.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="credits">
          <span>
            <strong>Casting</strong>
          </span>
          {casting.error && (
            <div className="Row__not-loaded">
              Oops, ha ocurrido un error al cargar a los actores
            </div>
          )}
          {casting.loading ? (
            <div className="Row__not-loaded">
              <Loader />
            </div>
          ) : (
            <div className="contentCasting">
              {casting.map((person, i) => (
                <div className="eachPerson">
                  <div className="personImg">
                    <img src={person.image === null ? CREDITS_DEFAULT_IMG : person.image} alt="actor" />
                  </div>
                  <span key={i}>{person.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

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
              defaultValue={movieInfo.data.title}
              className="inputField"
              type="text"
              placeholder=""
              name="title"
            />
            <span className="errorText">{errors.title?.message}</span>
          </div>

          <div className="addProductItem">
            <label>Tag</label>
            <input
              {...register("tagline")}
              defaultValue={movieInfo.data.tagline}
              className="inputField"
              type="text"
              placeholder=""
              name="tagline"
            />
          </div>

          <div className="addProductItem">
            <label>Fecha de lanzamiento</label>
            <input
              {...register("released_date")}
              defaultValue={movieInfo.data.release_date}
              className="inputField"
              type="text"
              placeholder="9999-99-99"
              name="released_date"
            />
          </div>

          <div className="addProductItem">
            <label>Duración</label>
            <input
              {...register("runtime", { required: true })}
              defaultValue={movieInfo.data.runtime}
              className="inputField"
              type="number"
              placeholder=""
              name="duration"
            />
          </div>
          <div className="little-inputs">
            <div className="addProductItem">
              <label>Clasificación de Edad</label>
              <input
                {...register("age_classification", { required: true })}
                defaultValue={movieInfo.data.adult === true ? 18 : 12}
                className="inputField"
                type="number"
                placeholder="Edad"
                name="age_classification"
              />
            </div>

            <div className="addProductItem">
              <label>Nota media</label>
              <input
                {...register("vote_average")}
                defaultValue={movieInfo.data.vote_average}
                className="inputField"
                type="number"
                placeholder="Nota"
                name="vote_average"
              />
            </div>

            <div className="addProductItem">
              <label>Votos totales</label>
              <input
                {...register("vote_count")}
                defaultValue={movieInfo.data.vote_count}
                className="inputField"
                type="number"
                placeholder="Votos"
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
              Value={genres.selectedOption}
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
              placeholder="Descripción"
              name="overview"
              defaultValue={movieInfo.data.overview}
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
                defaultValue={""}
              >
                <option disabled defaultValue="">
                  Selecciona una opción
                </option>
                <option value="">Sin fichero</option>
                {mpdFiles.data.map((item, i) => {
                  return (
                    <option key={i} defaultValue={item}>
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
                className="selectInput"
                {...register("trailer_file")}
                defaultValue={""}
              >
                <option disabled defaultValue="">
                  Selecciona una opción
                </option>
                <option value="">Sin fichero</option>
                {mpdFiles.data.map((item, i) => {
                  return (
                    <option key={i} defaultValue={item}>
                      {item}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        )}
        <button className="addProductButton create" onClick={handleSubmit}>
          Crear
        </button>
      </form>
    </div>
  );
}
