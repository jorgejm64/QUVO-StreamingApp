import "./sidebar.scss";

import { NavLink } from "react-router-dom";
import { bool } from "prop-types";

const Sidebar = ({ open, setOpen }) => {
  return (
    <div className={open ? "Sidebar open" : "Sidebar closed"}>
      <div className="Sidebar__firstGroup">
        <ul>
          <li>
            <NavLink to="/landing" activeclassname="activeNavLink" onClick={() => setOpen(!open)}>
              Inicio
            </NavLink>
          </li>
          <li>
            <NavLink to="/series" activeclassname="activeNavLink" onClick={() => setOpen(!open)}>
              Series
            </NavLink>
          </li>
          <li>
            <NavLink to="/movies" activeclassname="activeNavLink" onClick={() => setOpen(!open)}>
              Películas
            </NavLink>
          </li>
          <li>
            <NavLink to="/mylist" activeclassname="activeNavLink" onClick={() => setOpen(!open)}>
              Mis favoritos
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  open: bool.isRequired,
};

export default Sidebar;
