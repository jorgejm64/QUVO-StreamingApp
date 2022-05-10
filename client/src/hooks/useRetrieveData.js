import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchMovieDataConfig, fetchSerieDataConfig } from "../dataConfig";

//Recuperar datos
export const useRetrieveData = (type) => {
  const dispatch = useDispatch();
  //Almacen de datos
  const [data, setData] = useState(null);

  //Seleccionar el tipo de elemento al que se le va a tomar los datos de BD
  useEffect(() => {
    let selectedConfigArray = null;
    switch (type) {
      case "movies":
        selectedConfigArray = fetchMovieDataConfig;
        break;
      case "series":
        selectedConfigArray = fetchSerieDataConfig;
        break;
      default:
        break;
    }

    let isPage = true;
    //Recorremos el array y disparamos cada componente
    const rowsData = selectedConfigArray.map((el) => {
      //Lanzamos el thunk
      dispatch(el.thunk(el.url, isPage));
      //Devolvemos un array con los datos.
      return {
        id: el.id,
        title: el.title,
        genre: el.genre,
        selector: el.selector,
        isLarge: el.isLarge,
      };
    });
    //Actualizamos el estado con los nuevos datos
    setData(rowsData);
  }, [type, dispatch]);

  //Devolvemos los datos para ser utilizados
  return data;
};
