import "./passwordReset.scss";

//Icons
import { BsArrowLeftShort } from "react-icons/bs";

//Images
import backgroundImg from "../../assets/img/background/grad_bck.png";

//Request
import logo from "../../assets/logo/QUVO-logo_main.svg";

//Components
import Loader from "../../components/Loader/Loader";

//Form
import { useForm } from "react-hook-form";

//Yup
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

//Router
import { motion } from "framer-motion";
import { Link, useNavigate, useParams } from "react-router-dom";

//Motion
import {
  staggerOne,
  authFadeInUpVariants,
  modalVariants,
  authPageFadeInVariants,
} from "../../utils/motionUtils";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { selectResetPassStatusSelector } from "../../redux/user/user.selectors";
import { resetUserPassAsync } from "../../redux/user/user.actions";

const PasswordReset = () => {
  //Verify password
  const formSchema = Yup.object().shape({
    password: Yup.string()
      .required("Requerido")
      .min(4, "La contraseña debe tener un mínimo de 4 caracteres"),
    passwordConfirm: Yup.string()
      .required("Requerido")
      .oneOf([Yup.ref("password")], "Las contraseñas no coinciden"),
  });

  const validationOpt = { resolver: yupResolver(formSchema) };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userId, resetToken } = useParams();

  const resetStatus = useSelector(selectResetPassStatusSelector);
  console.log(resetStatus)

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm(validationOpt);

  const onSubmit = (data) => {
    dispatch(resetUserPassAsync(data, userId, resetToken, navigate));
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
        <img className="Auth__logo--img" src={logo} alt="Fakeflix_logo" />
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
            Recuperar contraseña
          </motion.h2>
          <motion.small
            variants={authFadeInUpVariants}
            className="Signup__content--disclaimer"
          >
            Introduzca su nueva contraseña y por favor, no la olvide esta vez.
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
                className={`inputField ${errors.password ? "is-invalid" : ""}`}
                type="password"
                name="password"
                autoComplete="pass"
                id="password"
                {...(resetStatus.loading ? "disabled" : "")}
                {...register("password")}
              />

              <label name="password">Contraseña</label>

              <div className="invalid-feedback">{errors.password?.message}</div>
            </motion.div>
            <motion.div
              variants={authFadeInUpVariants}
              className="SignIn__form--inputwrp"
            >
              <input
                type="password"
                name="password_repeat"
                autoComplete="pass"
                required
                {...(resetStatus.loading ? "disabled" : "")}
                {...register("passwordConfirm")}
                className={`inputField ${
                  errors.passwordConfirm ? "is-invalid" : ""
                }`}
              />

              <label name="password_repeat">Confirmación contraseña</label>

              <div className="invalid-feedback">
                {errors.passwordConfirm?.message}
              </div>
            </motion.div>
            <motion.button
              type="submit"
              variants={authFadeInUpVariants}
              className={`SignIn__form--button button__submit`}
            >
              {resetStatus.loading ? <Loader /> : "Recuperar"}
            </motion.button>
          </motion.form>

          {resetStatus.error && (
            <motion.p
              variants={authFadeInUpVariants}
              className="Auth__content--errors"
            >
              {resetStatus.error}
            </motion.p>
          )}
        </motion.div>
        <motion.small
          variants={authFadeInUpVariants}
          className="Auth__content--goBack"
        >
          <Link to="/">
            <BsArrowLeftShort />
            Volver
          </Link>
        </motion.small>
      </motion.div>
    </motion.div>
  );
};

export default PasswordReset;
