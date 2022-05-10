import "./serieForm.css";

//React
import { useState, useEffect } from "react";

//Request
import requests from "../../request";
import { CREDITS_DEFAULT_IMG } from "../../request";

//Form
import Select from "react-select";
import { useForm } from "react-hook-form";

//Extra components
import Loader from "../Loader/Loader";
import Spinner from "../Spinner/Spinner"

//Icons
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

//Redux
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { selectSerie } from "../../redux/series/series.selectors";
import { createSeriesAsync } from "../../redux/series/series.actions";

import { selectMpdFiles } from "../../redux/mpdFiles/mpdFiles.selectors";
import { fetchMpdFilesAsync } from "../../redux/mpdFiles/mpdFiles.actions";

import { selectTmdbSeason } from "../../redux/tmdb/tmdb.selectors";
import { fetchTmdbSeasonAsync } from "../../redux/tmdb/tmdb.actions";

import { selectTmdbCreditsSerie } from "../../redux/tmdb/tmdb.selectors";
import { fetchTmdbCreditsSerieAsync } from "../../redux/tmdb/tmdb.actions";

export default function SerieForm(serieInfo) {
  console.log(serieInfo);

  const dispatch = useDispatch();
  const mpdFiles = useSelector(selectMpdFiles);
  const credits = useSelector(selectTmdbCreditsSerie);
  const seasons = useSelector(selectTmdbSeason);
  const serieStatus = useSelector(selectSerie);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let [genres, setGenres] = useState("");

  //TMDB INPUTS VALUES DEFAULTS START
  const defaultGenres = () => {
    let genresArray = [];
    for (let i in serieInfo.data.genres) {
      genresArray.push({
        value: serieInfo.data.genres[i].name,
        label: serieInfo.data.genres[i].name,
      });
    }
    handleGenres(genresArray);
    return genresArray;
  };

  const optionsProductionCompanies = () => {
    let companiesArray = [];
    for (let i in serieInfo.data.production_companies) {
      companiesArray.push(serieInfo.data.production_companies[i].name);
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

  const optionsCreator = () => {
    let creatorArray = [];
    for (let i in serieInfo.data.created_by) {
      if (serieInfo.data.created_by[i].profile_path !== null) {
        creatorArray.push({
          name: serieInfo.data.created_by[i].name,
          image:
            "https://www.themoviedb.org/t/p/w600_and_h900_bestv2" +
            serieInfo.data.created_by[i].profile_path,
        });
      } else {
        creatorArray.push({
          name: serieInfo.data.created_by[i].name,
          image: null,
        });
      }
    }
    return creatorArray;
  };

  const companies = optionsProductionCompanies();
  const casting = optionsCasting();
  const creator = optionsCreator();

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
    dispatch(fetchTmdbCreditsSerieAsync(serieInfo.data.id));
    dispatch(fetchMpdFilesAsync(requests.fetchMpdFiles));
    dispatch(fetchTmdbSeasonAsync(serieInfo.data.id, serieInfo.data.number_of_seasons));
  }, [dispatch]);

  //HANDLE SEASONS AND EPISODES
  //Ordena el array para que las temporadas esten por orden
  function compare(a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  }

  const organizeSeasons = seasons.data.sort(compare);

  const [inputList, setInputList] = useState([
    {
      number: "",
      season: "",
      title: "",
      overview: "",
      runtime: "",
      released_date: "",
      video_file: "",
      imgMiniature: "",
    },
  ]);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([
      ...inputList,
      {
        number: "",
        season: "",
        title: "",
        overview: "",
        runtime: "",
        released_date: "",
        video_file: "",
        imgMiniature: "",
      },
    ]);
  };

  console.log(inputList);

  ///SEND DATA TO DATABASE (CREATE SCHEMA)
  const onSubmit = (data) => {
    let genresArray = [];
    genres.map((genre) => genresArray.push(genre.value));

    const sendData = {
      title: data.title,
      actors: casting,
      creator: creator,
      age_classification: data.age_classification,
      tmdb_id: serieInfo.data.id,
      vote_average: data.vote_average,
      vote_count: data.vote_count,
      imgFeatured: data.imgFeatured,
      imgPoster: data.imgPoster,
      imgWallpaper: data.imgWallpaper,
      imgTitle: "",
      tagline: data.tagline,
      series_media: inputList,
      production: companies,
      overview: data.overview,
      released_date: data.released_date,
      channel: data.channel,
      trailer_file: data.trailer_file,
      genre: genresArray,
    };

    console.log(sendData);

    dispatch(createSeriesAsync(sendData));
  };

  return (
    <div className="formContainer">
      <div className="uneditable_info">
        <div className="tmdb_id">
          <span>
            <strong>TMDB ID: </strong>
          </span>
          <p>{serieInfo.data.id}</p>
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
            <strong>Creador</strong>
          </span>
          {casting.error && (
            <div className="Row__not-loaded">
              Oops, ha ocurrido un error al cargar a los creadores
            </div>
          )}
          {casting.loading ? (
            <div className="Row__not-loaded">
              <Loader />
            </div>
          ) : (
            <div
              className={
                creator.length > 4
                  ? "contentCasting"
                  : "contentCasting littleContent "
              }
            >
              {creator.map((person, i) => (
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
                  <span>{person.name}</span>
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
                <div className="eachPerson" key={i}>
                  <div className="personImg">
                    <img
                      src={
                        person.image === null
                          ? CREDITS_DEFAULT_IMG
                          : person.image
                      }
                      alt="actor"
                    />
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
              placeholder="Disabled"
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
              defaultValue={serieInfo.data.name}
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
              defaultValue={serieInfo.data.tagline}
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
              defaultValue={serieInfo.data.first_air_date}
              className="inputField"
              type="text"
              placeholder="9999-99-99"
              name="released_date"
            />
          </div>

          <div className="addProductItem">
            <label>Canal original</label>
            <input
              {...register("channel", { required: "Requerido" })}
              defaultValue={serieInfo.data.networks[0].name}
              className="inputField"
              type="text"
              placeholder="Canal"
              name="duration"
            />
            <span className="errorText">{errors.channel?.message}</span>
          </div>
          <div className="little-inputs">
            <div className="addProductItem">
              <label>Clasificación de Edad</label>
              <input
                {...register("age_classification")}
                defaultValue={serieInfo.data.adult === true ? 18 : 12}
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
                defaultValue={serieInfo.data.vote_average}
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
                defaultValue={serieInfo.data.vote_count}
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
              placeholder="Descripción"
              name="overview"
              defaultValue={serieInfo.data.overview}
            />
            <span className="errorText">{errors.overview?.message}</span>
          </div>
        </div>
        <div className="seasons-handler_container">
          {inputList.map((x, i) => {
            return (
              <div className="episodes-data_box" key={i}>
                <div className="addProductItem">
                  <input
                    name="number"
                    className="inputField"
                    placeholder="Número de episodio"
                    type="number"
                    value={x.number}
                    onChange={(e) => handleInputChange(e, i)}
                  />
                </div>

                <div className="addProductItem">
                  <input
                    className="inputField"
                    name="title"
                    type="text"
                    placeholder="Título"
                    value={x.title}
                    onChange={(e) => handleInputChange(e, i)}
                  />
                </div>

                <div className="addProductItem">
                  <textarea
                    className="inputField"
                    name="overview"
                    type="text"
                    placeholder="Resumen"
                    value={x.overview}
                    onChange={(e) => handleInputChange(e, i)}
                  />
                </div>

                <div className="addProductItem">
                  <input
                    className="inputField"
                    name="imgMiniature"
                    type="text"
                    placeholder="Imagen de miniatura"
                    value={x.imgMiniature}
                    onChange={(e) => handleInputChange(e, i)}
                  />
                </div>

                <div className="addProductItem">
                  <input
                    className="inputField"
                    name="runtime"
                    type="number"
                    placeholder="Duración en m"
                    value={x.runtime}
                    onChange={(e) => handleInputChange(e, i)}
                  />
                </div>

                <div className="addProductItem">
                  <input
                    className="inputField"
                    name="released_date"
                    type="text"
                    placeholder="2022-1-2"
                    value={x.released_date}
                    onChange={(e) => handleInputChange(e, i)}
                  />
                </div>

                {!seasons.loading && !seasons.error && (
                  <div className="addProductItem">
                    <label>Temporada</label>
                    <select
                      className="selectInput"
                      name="season"
                      onChange={(e) => handleInputChange(e, i)}
                      value={x.season}
                    >
                      <option disabled value="">
                        Selecciona una opción
                      </option>
                      {organizeSeasons.map((season, i) => {
                        return (
                          <option key={i} value={season.name}>
                            {season.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                )}

                {!mpdFiles.loading && !mpdFiles.error && (
                  <div className="addProductItem">
                    <label>Vídeo</label>
                    <select
                      className="selectInput"
                      name="video_file"
                      onChange={(e) => handleInputChange(e, i)}
                      value={x.video_file}
                    >
                      <option disabled vlue="">
                        Selecciona una opción
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
                  </div>
                )}

                <div className="controls-btn_container">
                  <div className="remove-button">
                    {inputList.length !== 1 && (
                      <button
                        className="mr10"
                        onClick={() => handleRemoveClick(i)}
                      >
                        <RemoveCircleOutlineIcon />
                      </button>
                    )}
                  </div>
                  <div className="add-button">
                    {inputList.length - 1 === i && (
                      <button className="mr11" onClick={handleAddClick}>
                        <AddCircleOutlineIcon />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
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
          <h1 className="addGroupTitle betweenBoxes">Elegir tráiler</h1>
        )}

        {!mpdFiles.loading && !mpdFiles.error && (
          <div className="thirdGroup">
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
          {!serieStatus.loading  ? "Crear" : document.location.href="/series"}
        </button>
      </form>
      {serieStatus.error && <span>{serieStatus.error}</span>}
    </div>
  );
}
