import { Link } from "react-router-dom";
import "./createMediaButton.css";
import AddIcon from "@mui/icons-material/Add";

export default function CreateMediaButton(path) {
  return (
    <div className="floating-btn">
      <Link to={path.data}>
        <AddIcon fontSize="large"/>
      </Link>
    </div>
  );
};

