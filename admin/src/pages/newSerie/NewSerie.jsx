import "./newSerie.css";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

//Redux
import { fetchTmdbSerieAsync } from "../../redux/tmdb/tmdb.actions";
import { selectTmdbSerie } from "../../redux/tmdb/tmdb.selectors";

//Extra components
import Loader from "../../components/Loader/Loader";
import SerieForm from "../../components/serieForm/SerieForm";

export default function NewSerie() {
  const dispatch = useDispatch();
  const serieData = useSelector(selectTmdbSerie);
  const { register, handleSubmit, errors } = useForm();
  console.log(serieData)

  const onSubmit = (data) => {
    const { tmdb_id } = data;
    dispatch(fetchTmdbSerieAsync(tmdb_id));
  };
  
  return (
    <div className="newMovie">
      <h1 className="addProductTitle">Añadir serie</h1>
        {serieData.data.length === 0 && 
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
          <button className="tmdbButton" disabled={serieData.loading}>
            Buscar
          </button>
        </form>
        }
      {serieData.loading && !serieData.error && (
        <div className="loaderBox">
          <Loader />
        </div>
      )}

      {!(serieData.data.length === 0) && <SerieForm data={serieData.data} />}
      {!serieData.loading && serieData.error && <span>Ha habido un error cargando los datos...</span>}
    </div>
  );
}
