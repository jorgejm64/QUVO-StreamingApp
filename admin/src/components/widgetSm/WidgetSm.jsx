import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL_CONTENT } from "../../request"
import userImg from "../../assets/img/user/defaultProfilePic.jpg"

export default function WidgetSm() {
  console.log(BASE_URL_CONTENT)
  const [newUsers, setNewUsers] = useState([]);

  useEffect(() => {
    const getNewUsers = async () => {
      try {
        const res = await axios.get("/user?new=true", {
          headers: {
            token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
      setNewUsers(res.data);
      } catch(err) {
        console.log(err);
      }
    };
    getNewUsers();
  }, [])
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">Nuevos usuarios</span>
      <ul className="widgetSmList">
        
        {newUsers.map((user) =>(
          <li className="widgetSmListItem" key={user._id}>
            <img
              src={user.profilePic ? BASE_URL_CONTENT+user.profilePic : userImg}
              alt=""
              className="widgetSmImg"
            />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{user.name}</span>
              <span className="widgetSmUsername">{user.surname}</span>
              <span className="widgetSmUsername">{user.email}</span>
            </div>
            <button className="widgetSmButton">
              <Visibility className="widgetSmIcon" />
              Ver
            </button>
          </li>
        ))}
        
      </ul>
    </div>
  );
}
