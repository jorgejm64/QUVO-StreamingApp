import "./search.scss";

//Components
import Poster from "../../components/Poster/Poster";

//Motion
import { motion } from "framer-motion";
import { staggerHalf } from "../../utils/motionUtils";

//Redux
import { useSelector } from "react-redux";
import { selectSearchInputValue } from "../../redux/search/search.selector";

//Images
import backgroundImg from "../../assets/img/background/background_1.png";

const Search = (searchResults) => {
  //Tomar valores que provienen del componente
  const { results } = searchResults;
  //Tomar datos del selector
  const seleInputValue = useSelector(selectSearchInputValue);

  return (
    <div
      className="Search"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      <div className="Search__container">
        {results && results.length > 0 && (
          <h2 className="Search__title">Resultados para: {seleInputValue}</h2>
        )}
        <div
          className="Search__container__wrp"
          variants={staggerHalf}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {results && results.length > 0 ? (
            results.map((result) => (
              <Poster key={result.title} item={result} {...result} />
            ))
          ) : (
            <h2 className="Search__container__title">
              Lo sentimos, hemos búscado por todos los lados y no hemos
              encontrado nada con ese título
            </h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
