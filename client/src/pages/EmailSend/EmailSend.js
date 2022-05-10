import "./emailSend.scss";

//Motion
import { motion } from "framer-motion";
import {
  staggerOne,
  authFadeInUpVariants,
  modalVariants,
  authPageFadeInVariants,
} from "../../utils/motionUtils";

//Router
import { Link, useParams } from "react-router-dom";

const EmailSend = () => {
  const { email } = useParams();
  console.log(email);
  return (
    <motion.div
      className="EmailSend wrapper"
      variants={authPageFadeInVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
    <motion.div
        className="Auth__svg"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 373.61 418.84">
          <g id="Capa_2" data-name="Capa 2">
            <g id="Capa_1-2" data-name="Capa 1">
              <path
                className="cls-1"
                d="M178.56,405.82,19.24,317.31a16,16,0,0,1-8.24-14L11.22,121a16,16,0,0,1,7.9-13.78l160-94A16,16,0,0,1,195,13l159.33,88.51a16,16,0,0,1,8.24,14l-.22,182.26a16,16,0,0,1-7.9,13.79l-160,94A16,16,0,0,1,178.56,405.82Z"
              />
            </g>
          </g>
        </svg>
      </motion.div>
      <div className="EmailSend__container">
        <div className="EmailSend__container--box">
          <span>Se ha enviado un email a su correo para recuperar la contraseña: {email}</span>
          <Link to="/">¡Perfecto!</Link>
        </div>
      </div>
    </motion.div>
  );
};

export default EmailSend;
