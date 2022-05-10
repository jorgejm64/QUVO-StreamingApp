import "./homepage.scss";

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  defaultPageFadeInVariants,
  staggerOne,
  bannerFadeInVariants,
  bannerFadeInUpVariants,
} from "../../utils/motionUtils";

import { HOME_BCK_IMG } from "../../requests";

//Components
import RowHome from "../../components/RowHome/RowHome";
import Footer from "../../components/Footer/Footer";
import HomepageNavbar from "../../components/HomepageNavbar/HomepageNavbar";

const Homepage = () => {

  
  return (
    <motion.div
      className="Homepage"
      variants={defaultPageFadeInVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <HomepageNavbar/>

      <motion.header
        variants={bannerFadeInVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="homeBanner"
        style={{ backgroundImage: `url(${HOME_BCK_IMG})` }}
      >
        <motion.div
          className="homeBanner__content"
          variants={staggerOne}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <motion.h1
            variants={bannerFadeInUpVariants}
            className="homeBanner__content--title"
          >
            PELÍCULAS Y SERIES ILIMITADAS
          </motion.h1>

          <motion.div
            variants={bannerFadeInUpVariants}
            className="homeBanner__content--subscribe"
          >
            <motion.div variants={bannerFadeInUpVariants} className="prices">
              <motion.p variants={bannerFadeInUpVariants} className="price">
                <strong>5,99 €</strong>
                <motion.span
                  variants={bannerFadeInUpVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="absolu"
                >
                  /mes
                </motion.span>
              </motion.p>
              <motion.span
                variants={bannerFadeInUpVariants}
                className="miniDesc"
              >
                Cancela en cualquier momento
              </motion.span>
            </motion.div>

            <Link className="subsButton" to={"/signup"}>
              <span>SUSCRÍBETE YA MISMO</span>
            </Link>
          </motion.div>
        </motion.div>
        <div className="homeBanner__panel" />
        <div className="homeBanner__bottom-shadow" />
      </motion.header>

      <motion.section
        variants={bannerFadeInUpVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="AllPlans"
      >
        <motion.div
          variants={bannerFadeInUpVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="AllPlans__content"
        >
          <motion.h3
            variants={bannerFadeInUpVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="AllPlans__content--miniTlt"
          >
            Incluido en todos los planes
          </motion.h3>
          <motion.h2
            variants={bannerFadeInUpVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="AllPlans__content--Tlt"
          >
            Tus películas y series favoritas en un mismo lugar
            <motion.hr
              variants={bannerFadeInUpVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            ></motion.hr>
          </motion.h2>
          <motion.p
            variants={bannerFadeInUpVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            Encuentra los mayores éxitos de taquilla, las historias mas
            emocinantes y los clásicos inolvidables. Te esperan esas noches de
            series y películas que más disfrutas desde cualquier lugar.
          </motion.p>
        </motion.div>
      </motion.section>

      <RowHome />
      <Footer />
    </motion.div>
  );
};

export default Homepage;
