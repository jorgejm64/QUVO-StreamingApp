import "./signIn.scss";
import Loader from "../../components/Loader/Loader";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  staggerOne,
  authFadeInUpVariants,
  modalVariants,
  authPageFadeInVariants,
} from "../../utils/motionUtils";
import {
  selectAuthLoadingState,
  selectAuthErrors,
} from "../../redux/auth/auth.selectors";
import { BsArrowLeftShort } from "react-icons/bs";
import { LOGO_URL } from "../../requests.js";

import backgroundImg from "../../assets/img/background/grad_bck.png";

import { emailSignInStart } from "../../redux/auth/auth.actions";
import { useEffect } from "react";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authError = useSelector(selectAuthErrors);
  const isLoading = useSelector(selectAuthLoadingState);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const onSubmit = (data) => {
    dispatch(emailSignInStart(data));
  };

  return (
    <motion.div
      className="Auth wrapper"
      variants={authPageFadeInVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ backgroundImage: `url(${backgroundImg})`, backgroundSize: "100% 100%", backgroundColor: "#3a0032" }}
    >
      <Link to="/" className="Auth__logo">
        <img className="Auth__logo--img" src={LOGO_URL} alt="Fakeflix_logo" />
      </Link>
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
      <motion.div
        className="Auth__content"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <motion.div
          variants={staggerOne}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <motion.h2
            variants={authFadeInUpVariants}
            className="Auth__content--title"
          >
            Iniciar sesión
          </motion.h2>
          <motion.small
            variants={authFadeInUpVariants}
            className="Signup__content--disclaimer"
          >
            Hola de vuelta, esperemos que pases un buen rato
          </motion.small>
          <motion.small
            variants={authFadeInUpVariants}
            className="Signup__content--warning"
          >
            Atención: Esta web pertenece a un proyecto de fin de ciclo.
          </motion.small>
          <motion.form
            variants={staggerOne}
            initial="initial"
            animate="animate"
            exit="exit"
            className="SignIn__form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <motion.div
              variants={authFadeInUpVariants}
              className="SignIn__form--inputwrp"
            >
              <input
                className="inputField"
                type="text"
                name="email"
                autoComplete="email"
                required
                {...(isLoading ? "disabled" : "")}
                {...register("email", {
                  pattern:
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                })}
              />
              {errors.email && (
                <span className="input--error">
                  El email introducido no cumple
                </span>
              )}

              <label name="email">E-mail</label>
            </motion.div>
            <motion.div
              variants={authFadeInUpVariants}
              className="SignIn__form--inputwrp"
            >
              <input
                className="inputField"
                type="password"
                name="password"
                autoComplete="pass"
                required
                {...(isLoading ? "disabled" : "")}
                {...register("password")}
              />

              <label name="email">Contraseña</label>
            </motion.div>
            <motion.button
              type="submit"
              variants={authFadeInUpVariants}
              className={`SignIn__form--button button__submit`}
            >
              {isLoading ? <Loader /> : "Inicar sesión"}
            </motion.button>
          </motion.form>

          {authError && (
            <motion.p
              variants={authFadeInUpVariants}
              className="Auth__content--errors"
            >
              {authError.message}
            </motion.p>
          )}

          <motion.small
            variants={authFadeInUpVariants}
            className="Auth__content--toggleView"
          >
            ¿Todavía no te has registrado?
            <a onClick={()=> navigate("/signup")} href="/signup" className="toggler">
              &nbsp; Registrarme
            </a>
          </motion.small>
          <motion.small
            variants={authFadeInUpVariants}
            className="Auth__content--toggleView"
          >
            ¿No recuerdas tu contraseña?
            <Link to="/forgotPassword" className="toggler">
              &nbsp; Recuperar contraseña
            </Link>
          </motion.small>
        </motion.div>
        <motion.small
          variants={authFadeInUpVariants}
          className="Auth__content--goBack"
        >
          <a onClick={()=> navigate("/")} href="/" className="toggler">
            <BsArrowLeftShort />
            Volver
          </a>
        </motion.small>
      </motion.div>
    </motion.div>
  );
};

export default SignIn;
