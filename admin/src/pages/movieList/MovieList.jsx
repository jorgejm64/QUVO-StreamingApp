import "./movieList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { deleteMovie, getMovies } from "../../context/movieContext/apiCalls";
import CreateMediaButton from "../../components/createMediaButton/CreateMediaButton";

export default function ProductList() {
  const { movies, dispatchMovies } = useContext(MovieContext);

  useEffect(() => {
    getMovies(dispatchMovies);
  }, [dispatchMovies]);

  const handleDelete = (id) => {
    deleteMovie(id, dispatchMovies);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 200 },
    {
      field: "movie",
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
    { field: "runtime", headerName: "Duración", width: 140, align: "center" },

    {
      field: "action",
      headerName: "Funciones",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={{ pathname: "/movie/" + params.row._id, movie: params.row }}
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
      <DataGrid
        rows={movies}
        disableSelectionOnClick
        className="dataList"
        columns={columns}
        pageSize={10}
        checkboxSelection
        getRowId={(r) => r._id}
      />

      <CreateMediaButton data={"/newMovie"} />
    </div>
  );
}
