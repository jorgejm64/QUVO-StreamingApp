import "./homepageNavbar.scss";

//Motion
import { motion } from "framer-motion";
import {
  navbarFadeInVariants,
} from "../../utils/motionUtils";


//Router 
import { Link } from "react-router-dom";

//Images
import logo from "../../assets/logo/QUVO-logo_main.svg"

//Redux
import { useDispatch } from "react-redux";
import { signOutStart } from "../../redux/auth/auth.actions";


const HomepageNavbar = () => {
    const dispatch = useDispatch();


  return (
    <motion.nav
      className={`homeNavbar`}
      variants={navbarFadeInVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <Link to="/">
        <img className="homeNavbar__logo" src={logo} alt="logo" />
      </Link>

      <motion.div
        className="homeNavbar__buttons"
        variants={navbarFadeInVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {localStorage.getItem("tmpSubToken") ? (
          <span
            onClick={() => dispatch(signOutStart())}
            className="homeNavbar__buttons--login"
          >
            Cerrar sesión
          </span>
        ) : (
          <Link to="/signin" className="homeNavbar__buttons--login">
            Iniciar Sesion
          </Link>
        )}
      </motion.div>
    </motion.nav>
  );
};

export default HomepageNavbar;
