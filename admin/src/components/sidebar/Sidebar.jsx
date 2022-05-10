import "./sidebar.css";
import {
  LineStyle,
  Timeline,
  PermIdentity,
  List,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
  PlayCircleOutline,
} from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";



export default function Sidebar() {
  const {pathname} = useLocation();
  
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
            <li className={pathname === "/" ? "sidebarListItem active" : "sidebarListItem"} >
              <LineStyle className="sidebarIcon" />
              Home
            </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Menú rápido</h3>
          <ul className="sidebarList">
            <Link to="/movies" className="link">
              <li className={pathname === "/movies" ? "sidebarListItem active" : "sidebarListItem"}>
                <PlayCircleOutline className="sidebarIcon" />
                Peliculas
              </li>
            </Link>
            <Link to="/series" className="link">
              <li className={pathname === "/series" ? "sidebarListItem active" : "sidebarListItem"}>
                <PlayCircleOutline className="sidebarIcon" />
                Series
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}
