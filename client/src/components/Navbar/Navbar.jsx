import "./navbar.scss";
import { useState, useRef, useEffect } from "react";

//Request
import {
  BASE_URL_CONTENT,
} from "../../requests";

//Images
import logo from "../../assets/logo/QUVO-logo_main.svg"
import miniLogo from "../../assets/logo/mini-logo.png"
import default_pic from "../../assets/img/user/defaultProfilePic.jpg"

//Hooks
import useScroll from "../../hooks/useScroll";
import useOutsideClick from "../../hooks/useOutsideClick";
import useViewport from "../../hooks/useViewport";

//Motion
import { motion } from "framer-motion";
import { navbarFadeInVariants } from "../../utils/motionUtils";

//Router
import { Link } from "react-router-dom";

//Icons
import { IoIosNotificationsOutline } from "react-icons/io";
import { BiUserCircle } from "react-icons/bi"
import {IoIosLogOut} from "react-icons/io"

//Redux
import { useDispatch, useSelector } from "react-redux";
import { signOutStart } from "../../redux/auth/auth.actions";
import { selectUserDataSelector } from "../../redux/user/user.selectors";
import { fetchUserDataAsync } from "../../redux/user/user.actions";

//Components
import Searchbar from "../Searchbar/Searchbar";
import Sidebar from "../Sidebar/Sidebar";
import Burger from "../Burger/Burger";

const Navbar = () => {
  const dispatch = useDispatch();

  const { width } = useViewport();
  const isScrolled = useScroll(20);
  const [open, setOpen] = useState(false);

  const [profileNav, setProfileNav] = useState(false);
  const profileNavRef = useRef();


  const userData = useSelector(selectUserDataSelector);

  useEffect(() => {
    dispatch(fetchUserDataAsync());
  }, [dispatch]);

  //Si tenemos el menú abierto
  if (open) {
    document.body.style.overflowY = "hidden";
  } else {
    document.body.style.overflowY = "auto";
  }

  useOutsideClick(profileNavRef, () => {
    if (profileNav) setProfileNav(false);
  });

  return (
    <>
      <motion.nav
        className={`Navbar ${isScrolled && "Navbar__fixed"}`}
        variants={navbarFadeInVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <div className="Sidebar__content">
          <Burger open={open} setOpen={setOpen} />
          <div>
            <Sidebar open={open} setOpen={setOpen} />
          </div>
        </div>

        <Link
          to="/landing"
          className={width >= 600 ? "Navbar__logo" : "Navbar__minilogo"}
        >
          <img
            className={width >= 600 ? "Navbar__logo" : "Navbar__minilogo"}
            src={width >= 600 ? logo : miniLogo}
            alt=""
          />
        </Link>

        <div className="Navbar__primarynav">
          <div className="Navbar__navitem">{<Searchbar />}</div>

          <div className="Navbar__navitem">
            <div className="Navbar__notifications">
              <IoIosNotificationsOutline size={25} />
              <span className="Navbar__notifications--number">1</span>
            </div>
          </div>

          <div className="Navbar__navitem">
            <div
              className={`Navbar__navprofile ${profileNav && "active"}`}
              onClick={() => setProfileNav(!profileNav)}
            >
              <img
                className="Navbar__navprofile--avatar Navbar__navprofile--toggler"
                src={
                  userData.profilePic
                    ? BASE_URL_CONTENT + userData.profilePic
                    : default_pic
                }
                alt="profile"
              />
              <span className="Navbar__navprofile--name">{userData.name}</span>
              <div
                className={`Navbar__navprofile--content ${
                  profileNav ? "active" : ""
                }`}
              >
                <ul
                  className="Navbar__navprofile--content-wrp"
                  ref={profileNavRef}
                >
                  {localStorage.getItem("user") && (
                    <>
                      <li className="Navbar__navlinks--link">
                        <Link to="/profile"><BiUserCircle /> Mi perfil</Link>
                      </li>
                      <li
                        className="Navbar__navlinks--link"
                        onClick={() => dispatch(signOutStart())}
                      >
                         <Link to="/"><IoIosLogOut/> Cerrar sesión</Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>
    </>
  );
};

export default Navbar;
