import React, { useContext } from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import { AuthContext } from "../../context/authContext/AuthContext";
import { logoutUser } from "../../context/authContext/logout";
import { useHistory } from "react-router-dom";

import ExitToAppIcon from '@material-ui/icons/ExitToApp';

export default function Topbar() {
  const { dispatch } = useContext(AuthContext);
  //Para redirigir se usa este hook
  const history = useHistory()

  const handleLogout = (e)=> {
    e.preventDefault();
    logoutUser(dispatch);
    history.push("/login")
  }

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <img className="logo" src="/QUVO-logo.png" alt="logo"/>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
          </div>
          <div className="topbarIconContainer">
            <Language />
          </div>
          <div className="profile">
            <img src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="topAvatar" />
            <div className="options">
              <span><Settings/> Ajustes</span>
              <span onClick={handleLogout}><ExitToAppIcon/>Cerrar Sesión</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
