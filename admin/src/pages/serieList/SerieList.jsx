import "./serieList.css";

//React
import { useContext, useEffect } from "react";

//Icons
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";

//Router
import { Link } from "react-router-dom";

//Components
import CreateMediaButton from "../../components/createMediaButton/CreateMediaButton";

//Redux
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSeriesAsync,
  deleteSeriesAsync,
} from "../../redux/series/series.actions";
import { selectSerie } from "../../redux/series/series.selectors";
import Spinner from "../../components/Spinner/Spinner";
import ErrorText from "../../components/ErrorText/ErrorText";

export default function SerieList() {
  const dispatch = useDispatch();
  const seriesState = useSelector(selectSerie);
  const { loading, error, data: series } = seriesState;

  useEffect(() => {
    dispatch(fetchSeriesAsync());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteSeriesAsync(id));
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 200 },
    {
      field: "serie",
      headerName: "Nombre",
      width: 220,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img
              className="productListImg"
              src={params.row.imgFeatured}
              alt=""
            />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "genre", headerName: "Genero", width: 200, align: "center" },
    {
      field: "production",
      headerName: "Productora",
      width: 150,
      align: "center",
    },
    {
      field: "released_date",
      headerName: "Fecha",
      width: 120,
      align: "center",
    },
    {
      field: "age_classification",
      headerName: "Edad",
      width: 110,
      align: "center",
    },
    {
      field: "action",
      headerName: "Funciones",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={{ pathname: "/serie/" + params.row._id, serie: params.row }}
            >
              <button className="productListEdit">Editar</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      {(!loading && series.length > 0) && (
        <DataGrid
          rows={series}
          disableSelectionOnClick
          className="dataList"
          columns={columns}
          pageSize={10}
          checkboxSelection
          getRowId={(r) => r._id}
        />
      )}

      {(loading && !error) && (
        <div className="loading_container">
          <Spinner/>
        </div>
      )}
      
      {(!loading && error) && <ErrorText /> }
      
      <CreateMediaButton data={"/newSerie"} />
    </div>
  );
}
