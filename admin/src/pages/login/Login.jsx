import "./login.css";
import Loader from "../../components/Loader/Loader";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  selectAuthLoadingState,
  selectAuthErrors,
  selectCurrentUser,
} from "../../redux/auth/auth.selectors";
import { LOGO_URL } from "../../request";

import { emailSignInStart } from "../../redux/auth/auth.actions";

const Login = () => {
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
    <div className="Auth wrapper">
      <Link to="/" className="Auth__logo">
        <img className="Auth__logo--img" src={LOGO_URL} alt="Fakeflix_logo" />
      </Link>
      <div className="Auth__svg">
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
      </div>
      <div className="Auth__content">
        <div>
          <h2 className="Auth__content--title">Iniciar sesión</h2>
          <small className="Auth__content--disclaimer">
            Atención: Esta web pertenece a un proyecto de fin de ciclo.
          </small>
          <form className="SignIn__form" onSubmit={handleSubmit(onSubmit)}>
            <div className="SignIn__form--inputwrp">
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
            </div>
            <div className="SignIn__form--inputwrp">
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
            </div>
            <button
              type="submit"
              className={`SignIn__form--button button__submit`}
            >
              {isLoading ? <div className="Auth__loader"><Loader /></div> : "Sign in"}
            </button>
          </form>

          {authError && <p className="Auth__content--errors">{authError}</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;
