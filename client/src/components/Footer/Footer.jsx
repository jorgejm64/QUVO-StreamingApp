import { Link } from "react-router-dom";
import "./footer.scss";


const Footer = () => {
    return (
       <div className="Footer">
           <div className="Footer__content">
                <div className="Footer__content--creator">
                    <p>Developed by <strong>Jorge Jímenez Mejías</strong><img src=""/></p>
                </div>
                <div className="Footer__content--links">
                    <Link to="/">
                        POLÍTICA DE PRIVACIDAD
                    </Link>
                    <Link to="/">
                        CENTRO DE AYUDA
                    </Link>
                    <Link to="/">
                        CONDICIONES DE USO
                    </Link>
                </div>
           </div>
       </div> 
    );
}

export default Footer;