import "./subscription.scss";

import React, { useState } from "react";

//Axios
import axios from "../../axiosInstance";

//Icons
import { BsArrowLeftShort } from "react-icons/bs";

//Request
import  {HOME_BCK_IMG } from "../../requests.js";

//Components
import Loader from "../../components/Loader/Loader";

//Form
import { useForm } from "react-hook-form";

//Router
import { Link } from "react-router-dom";

//Motion
import { motion } from "framer-motion";
import {
  staggerOne,
  authFadeInUpVariants,
  modalVariants,
  authPageFadeInVariants,
} from "../../utils/motionUtils";

//Stripe
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

//Redux;
import CardInput from "../../components/CardInput/CardInput";
import HomepageNavbar from "../../components/HomepageNavbar/HomepageNavbar";

const Subscription = () => {
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState("");

  // Initialize an instance of stripe.
  const stripe = useStripe();
  const elements = useElements();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });


  const onSubmit = async (data) => {
    setLoading(true);

    //Coger valores del input de la tarjeta
    const cardElement = elements.getElement(CardElement);

    //Obtener la validación del token
    const accessData = await axios.get("/subscription/token-validation", {
      headers: {
        token:
          "Bearer " +
          JSON.parse(localStorage.getItem("tmpSubToken")).subscriptionToken,
      },
    });
    //Si es correcto
    if (accessData.data.secret) {
      // Realizamos el pago
      let { error, paymentIntent } = await stripe.confirmCardPayment(
        accessData.data.secret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              email: data.email,
            },
          },
          receipt_email: data.email,
        }
      );

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      if (paymentIntent && paymentIntent.status === "succeeded") {
        localStorage.removeItem("tmpSubToken");
        localStorage.setItem("user",JSON.stringify(accessData.data.accessToken));
        window.location.assign("/");
        setLoading(false);
      }
    }
  };

  return (
    <motion.div
      className="Signup wrapper"
      variants={authPageFadeInVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{
        backgroundImage: `url(${HOME_BCK_IMG})`,
        backgroundSize: "100% 100%",
        backgroundColor: "#3a0032",
        zIndex: "1",
      }}
    >
      <div className="wrap-layer"></div>

      <HomepageNavbar/>

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
            Suscribirme
          </motion.h2>
          <motion.small
            variants={authFadeInUpVariants}
            className="Signup__content--disclaimer"
          >
            La suscripción posee un valor de 5,99 euros todos los meses
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

            <CardInput />

            <motion.button
              type="submit"
              variants={authFadeInUpVariants}
              className={`SignIn__form--buttonContainer--button button__submit`}
            >
              {loading ? <Loader /> : "Suscríbeme"}
            </motion.button>
          </motion.form>

          {error && (
            <motion.p
              variants={authFadeInUpVariants}
              className="Signup__content--errors"
            >
              {error}
            </motion.p>
          )}
        </motion.div>
        <motion.small
          variants={authFadeInUpVariants}
          className="Signup__content--goBack"
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

export default Subscription;
