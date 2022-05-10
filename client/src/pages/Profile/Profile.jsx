import "./profile.scss";

//Axios
import axios from "../../axiosInstance";

//React
import { useState } from "react";

//Images
import backgroundImg from "../../assets/img/background/background_1.png";

//Form
import { useForm } from "react-hook-form";

//Icons
import { BsArrowLeftShort } from "react-icons/bs";

//Components
import Loader from "../../components/Loader/Loader";
import Spinner from "../../components/Spinner/Spinner";

//Request
import { BASE_URL_CONTENT } from "../../requests";
import default_pic from "../../assets/img/user/defaultProfilePic.jpg";

//Motion
import { motion } from "framer-motion";
import {
  defaultPageFadeInVariants,
  authFadeInUpVariants,
} from "../../utils/motionUtils";

//Router
import { useNavigate } from "react-router-dom";

//Redux
import { useDispatch, useSelector } from "react-redux";
import {
  selectSubscriptionUserSelector,
  selectUpdateUserStatusSelector,
  selectUserDataSelector,
} from "../../redux/user/user.selectors";
import {
  cancelSubscriptionUserAsync,
  updateUserDataAsync,
} from "../../redux/user/user.actions";

const Profile = () => {
  const userData = useSelector(selectUserDataSelector);
  const dispatch = useDispatch();
  const userSubscription = useSelector(selectSubscriptionUserSelector);
  const navigate = useNavigate();

  const [ updateError, setUpdateError ] = useState("");
  const [ updateLoading, setUpdateLoading ] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setUpdateLoading(true);

    if (data.name === "") {
      data.name = userData.name;
    }
    if (data.surname === "") {
      data.surname = userData.surname;
    }
    if (data.username === "") {
      data.username = userData.username;
    }
    if (data.email === "") {
      data.email = userData.email;
    }

    const config = {
      headers: {
        token: `Bearer ${JSON.parse(localStorage.getItem("user")).accessToken}`,
      },
    };

    await axios
      .put("/user/update", data, config)
      .then((res) => {
        const results = res.data;
        document.location.reload();
        setUpdateLoading(false);
      })
      .catch((err) => {
        setUpdateLoading(false);
        setUpdateError(err.response.data.message);
        console.log(updateError)
      });

    dispatch(updateUserDataAsync(data));
  };

  const handleCancelSubscription = () => {
    console.log("cancelada");
    dispatch(cancelSubscriptionUserAsync());
  };

  return (
    <motion.div
      variants={defaultPageFadeInVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="Profile"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      {userData.loading ? (
        <div className="loader">
          {" "}
          <Loader />{" "}
        </div>
      ) : (
        <div className="Profile__container">
          <div className="Profile__container--goBack">
            <a onClick={() => navigate(-1)}>
              <BsArrowLeftShort /> Volver
            </a>
          </div>
          <div className="Profile__container--header">
            <img
              className="profilePic"
              src={
                userData.profilePic
                  ? BASE_URL_CONTENT + userData.profilePic
                  : default_pic
              }
              alt="profilePic"
            />
            <h2 className="username">{userData.username}</h2>
          </div>
          <form
            className="SignIn__form profileForm"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="input50">
              <div className="SignIn__form--inputwrp">
                <input
                  {...register("name", {
                    pattern: /^([^0-9.!#$%&'*+/=?¿)(·"¡@ªº^`{|}~'Ç¨-]*)$/,
                  })}
                  className="inputField"
                  type="text"
                  name="name"
                  defaultValue={userData.name}
                  required
                />
                {errors.name && (
                  <span className="input--error">El nombre no cumple</span>
                )}

                <label name="name">Nombre</label>
              </div>

              <div className="SignIn__form--inputwrp">
                <input
                  {...register("surname", {
                    pattern: /^([^0-9.!#$%&'*+/=?¿)(·"¡@ªº^`{|}~'Ç¨-]*)$/,
                  })}
                  className="inputField"
                  type="text"
                  name="surname"
                  defaultValue={userData.surname}
                  required
                />
                {errors.surname && (
                  <span className="input--error">Los apellidos no cumplen</span>
                )}

                <label name="name">Apellidos</label>
              </div>
            </div>

            <div className="SignIn__form--inputwrp">
              <input
                {...register("username", {
                  pattern: /^([^.!#$%&'*+/=?¿)(·"¡@ªº^`{|}~'Ç¨]*)$/,
                })}
                className="inputField"
                type="text"
                name="username"
                defaultValue={userData.username}
                required
              />
              {errors.username && (
                <span className="input--error">
                  El nombre de usuario no cumple
                </span>
              )}

              <label name="name">Nombre de usuario</label>
            </div>

            <div className="SignIn__form--inputwrp">
              <input
                {...register("email", {
                  pattern:
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                })}
                className="inputField"
                type="text"
                name="email"
                defaultValue={userData.email}
                required
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
                {...register("password")}
              />

              <label name="email">Contraseña</label>
            </div>

            <motion.button
              type="submit"
              className={`SignIn__form--button button__submit`}
            >
              {updateLoading ? <Loader /> : "Actualizar"}
            </motion.button>
          </form>

          {updateError && (
            <motion.p
              variants={authFadeInUpVariants}
              className="Auth__content--errors"
            >
              {updateError}
            </motion.p>
          )}

          <div
            onClick={handleCancelSubscription}
            className="cancel-subscriptionBtn"
          >
            {userSubscription.loading ? (
              <div className="cancel-subscriptionBtn--spinner">
                <Spinner />
              </div>
            ) : (
              <span>Cancelar suscripción</span>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Profile;
