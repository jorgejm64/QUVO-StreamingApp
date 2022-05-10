import "./signUp.scss";

//Components
import Loader from "../../components/Loader/Loader";

//Motion
import { motion } from "framer-motion";
import {
  staggerOne,
  authFadeInUpVariants,
  modalVariants,
  authPageFadeInVariants,
} from "../../utils/motionUtils";

//Form
import { useForm } from "react-hook-form";

//Router
import { Link, useNavigate } from "react-router-dom";

//Icons
import { BsArrowLeftShort } from "react-icons/bs";

//Images
import backgroundImg from "../../assets/img/background/grad_bck.png";
import { LOGO_URL } from "../../requests.js";

//Redux
import {
  selectAuthLoadingState,
  selectAuthErrors,
} from "../../redux/auth/auth.selectors";
import { useDispatch, useSelector } from "react-redux";
import { signUpStart } from "../../redux/auth/auth.actions";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    dispatch(signUpStart(data));
  }

  return (
    <motion.div
      className="Signup wrapper"
      variants={authPageFadeInVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ backgroundImage: `url(${backgroundImg})`, backgroundSize: "100% 100%", backgroundColor: "#3a0032" }}
    >
      <Link to="/" className="Signup__logo">
        <img className="Signup__logo--img" src={LOGO_URL} alt="Fakeflix_logo" />
      </Link>

      <motion.div
        className="Signup__svg"
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
        className="Signup__content"
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
            className="Signup__content--title"
          >
            Crea tu cuenta
          </motion.h2>
          <motion.small
            variants={authFadeInUpVariants}
            className="Signup__content--disclaimer"
          >
            Estas a punto de entrar a un mundo lleno de entretenimiento
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
            <div className="input50">
              <motion.div
                variants={authFadeInUpVariants}
                className="SignIn__form--inputwrp"
              >
                <input
                  className="inputField"
                  type="text"
                  name="name"
                  autoComplete="name"
                  required
                  {...(isLoading ? "disabled" : "")}
                  {...register("name", {
                    pattern: /^([^0-9.!#$%&'*+/=?¿)(·"¡@ªº^`{|}~'Ç¨-]*)$/,
                  })}
                />
                {errors.name && (
                  <span className="input--error">El nombre no cumple</span>
                )}

                <label name="name">Nombre</label>
              </motion.div>

              <motion.div
                variants={authFadeInUpVariants}
                className="SignIn__form--inputwrp"
              >
                <input
                  className="inputField"
                  type="text"
                  name="surname"
                  autoComplete="surname"
                  required
                  {...(isLoading ? "disabled" : "")}
                  {...register("surname", {
                    pattern: /^([^0-9.!#$%&'*+/=?¿)(·"¡@ªº^`{|}~'Ç¨-]*)$/,
                  })}
                />
                {errors.surname && (
                  <span className="input--error">Los apellidos no cumplen</span>
                )}

                <label name="name">Apellidos</label>
              </motion.div>
            </div>

            <motion.div
              variants={authFadeInUpVariants}
              className="SignIn__form--inputwrp"
            >
              <input
                className="inputField"
                type="text"
                name="username"
                autoComplete="username"
                required
                {...(isLoading ? "disabled" : "")}
                {...register("username", {
                  pattern: /^([^.!#$%&'*+/=?¿)(·"¡@ªº^`{|}~'Ç¨]*)$/,
                })}
              />
              {errors.username && (
                <span className="input--error">
                  El nombre de usuario no cumple
                </span>
              )}

              <label name="name">Nombre de usuario</label>
            </motion.div>

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

            <motion.div className="SignIn__form--check">
              <input
                name="acceptTerms"
                required
                type="checkbox"
                {...register("acceptTerms")}
                id="acceptTerms"
                className={`form-check-input ${
                  errors.acceptTerms ? "is-invalid" : ""
                }`}
              />
              <label htmlFor="acceptTerms" className="form-check-label">
                Utilizar mi dirección de correo electrónico para enviarme
                promociones de marketing y ofertas.
              </label>
              <div className="invalid-feedback">
                {errors.acceptTerms?.message}
              </div>
            </motion.div>

            <motion.div className="SignIn__form--buttonContainer" variants={authFadeInUpVariants}>
              <p>
                Al hacer clic en Crear cuenta, usted confirma que es mayor de 18
                años, acepta las Términos de Uso y confirma haber leído nuestra
                Política de Privacidad.
              </p>
              <motion.button
                type="submit"
                variants={authFadeInUpVariants}
                className={`SignIn__form--buttonContainer--button button__submit`}
              >
                {isLoading ? <Loader /> : "Registrarme"}
              </motion.button>
            </motion.div>
          </motion.form>

          {authError && (
            <motion.p
              variants={authFadeInUpVariants}
              className="Signup__content--errors"
            >
              {authError}
            </motion.p>
          )}

          <motion.small
            variants={authFadeInUpVariants}
            className="Signup__content--toggleView"
          >
            ¿Ya estas registrado?
            <a onClick={()=> navigate("/signin")} href="/signin" className="toggler">
              &nbsp; Iniciar sesión
            </a>
          </motion.small>
        </motion.div>
        <motion.small
          variants={authFadeInUpVariants}
          className="Signup__content--goBack"
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

export default SignUp;
