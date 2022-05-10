import Chart from "../../components/chart/Chart";
import "./home.css";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import { useEffect, useState } from "react";
import axios from "axios";
import { useMemo } from "react";

export default function Home() {

  document.body.style.overflowX = "hidden";
  
    const MONTHS = useMemo(() => 
  [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic"
  ], []);

  const [userStats, setUserStats] = useState([]);

  useEffect(() => {
    const getStats = async () => {
      try {
        //Realizamos la llamada a la api para que nos devuelkva los usuarios
        const res = await axios.get("/user/stats", {
            headers: {
              token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
          });

          //Ordenar los datos por orden de mes
          const statsList = res.data.sort(function (a ,b) {
            return a._id - b._id;
          });

        //Realizamos el mapeo de los datos dentro de un array
        statsList.map((item) => 
          setUserStats((prev) => [
            ...prev, 
            {name:MONTHS[item._id - 1], "Nuevo usuario": item.total},]))
      } catch(err) {
        console.log(err);
      };
    }
    getStats();
  }, [MONTHS])

  return (
    <div className="home">

      <Chart data={userStats} 
      title="Análisis de usuarios" 
      grid 
      dataKey="Nuevo usuario"/>

      <div className="homeWidgets">
        <WidgetSm/>
      </div>
    </div>
  );
}
