import "./newMovie.css";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

//Redux
import { fetchTmdbMovieAsync } from "../../redux/tmdb/tmdb.actions";
import { selectTmdbMovie } from "../../redux/tmdb/tmdb.selectors";

//Extra components
import Loader from "../../components/Loader/Loader";
import MovieForm from "../../components/movieForm/MovieForm";

export default function NewMovie() {
  const dispatch = useDispatch();
  const movieData = useSelector(selectTmdbMovie);
  const { loading, error, data: movieInfo } = movieData;
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    const { tmdb_id } = data;
    dispatch(fetchTmdbMovieAsync(tmdb_id));
  };

  return (
    <div className="newMovie">
      <h1 className="addProductTitle">Añadir película</h1>

      {movieInfo.length === 0 && (
        <form className="addProductForm" onSubmit={handleSubmit(onSubmit)}>
          <div className="tmdbGroup">
            <div className="addProductItem">
              <label>TMDB ID</label>
              <input
                {...register("tmdb_id", { required: true })}
                className="inputField"
                type="number"
                placeholder=""
                name="tmdb_id"
                
              />
            </div>
          </div>
          <button className="tmdbButton" disabled={loading}>
            Buscar
          </button>
        </form>
      )}

      {loading && !error && (
        <div className="loaderBox">
          <Loader />
        </div>
      )}

      {!(movieInfo.length === 0) && <MovieForm data={movieInfo} />}
      {!loading && error && <span>Ha habido un error cargando los datos...</span>}
    </div>
  );
}
