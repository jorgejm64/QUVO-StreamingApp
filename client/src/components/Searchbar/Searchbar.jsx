import "./searchbar.scss";

//React
import { useRef, useState } from "react";

//Router
import { useNavigate } from "react-router-dom";

//Redux
import { useDispatch } from "react-redux";
import {
  changeSearchInputValue,
  clearSearchInputValue,
  fetchSearchResultsAsync,
} from "../../redux/search/search.actions";

//Icons
import { FiSearch } from "react-icons/fi";
import { RiCloseFill } from "react-icons/ri";

//Hooks
import useOutsideClick from "../../hooks/useOutsideClick";

const Searchbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchInputToggle, setSearchInputToggle] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const searchbarRef = useRef();
  const searchInputRef = useRef();

  //Si el usuario clica por fuera de este componente actualizaremos los estados
  useOutsideClick(searchbarRef, () => {
    if (searchInputToggle) {
      setSearchInput("");
      setSearchInputToggle(false);
    }
  });

  const handleSearchInputToggle = () => {
    //Obtener valor de search
    searchInputRef.current.focus();
    setSearchInputToggle(!searchInputToggle);
  };

  //Limpiar barra de busqueda
  const clearSearchInputToggle = () => {
    //Establecemos los estados
    setSearchInput("");
    dispatch(clearSearchInputValue());
    //Redirigimos al landing
    navigate("/");
  };

  const handleSearchInput = (event) => {
    const { value } = event.target;
    setSearchInput(value);
    //Para mandar la info tenemos dos variables
    //Una hace referencia al value y otra al tipo de media
    dispatch(changeSearchInputValue(value));

    if (value.length > 0) {
      navigate(`/search?q=${value}`);
      dispatch(fetchSearchResultsAsync(value, ""));
    } else navigate("/");
  };

  return (
    <div className="Searchbar" ref={searchbarRef}>
      <input
        type="text"
        placeholder="Buscar peliculas o series..."
        value={searchInput}
        onChange={handleSearchInput}
        ref={searchInputRef}
        className={`Searchbar--search ${
          searchInputToggle && "Searchbar--active"
        }`}
      />

      <div className="Searchbar--toggler" onClick={handleSearchInputToggle}>
        <FiSearch size={"1.5em"} />
      </div>

      <div
        className={`Searchbar--clear ${
          searchInputToggle && searchInput.length && "typing"
        }`}
        onClick={clearSearchInputToggle}
      >
        <RiCloseFill />
      </div>

    </div>
  );
};

export default Searchbar;
