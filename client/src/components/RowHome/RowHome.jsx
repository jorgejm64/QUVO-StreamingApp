import { motion } from "framer-motion";
import "./rowHome.scss";
import { bannerFadeInUpVariants } from "../../utils/motionUtils";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/scss";
import "swiper/scss/free-mode";

// import required modules
import { Autoplay, FreeMode } from "swiper";

const reqWallpaper_1 = require.context(
  "../../assets/img/home/wallpapers_1",
  true,
  /.jpg$/
);

const reqWallpaper_2 = require.context(
  "../../assets/img/home/wallpapers_2",
  true,
  /.jpg$/
);
const paths_1 = reqWallpaper_1.keys();
const paths_2 = reqWallpaper_2.keys();

const images_1 = paths_1.map((path) => reqWallpaper_1(path));
const images_2 = paths_2.map((path) => reqWallpaper_2(path));

const RowHome = () => {
  return (
    <motion.section
      variants={bannerFadeInUpVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="homeSlide__content"
    >
      <div>
        <div className="noDrag__layer"></div>
        <Swiper
          slidesPerView="auto"
          spaceBetween={30}
          loop={true}
          autoplay={{
            delay: 1,
            disableOnInteraction: false,
          }}
          freeMode={true}
          allowTouchMove={true}
          speed={4000}
          modules={[Autoplay, FreeMode]}
          className="homeSlide__content--slide1"
        >
          {images_1.map((images, i) => (
            <SwiperSlide className="highway-car" key={i}>
              <img src={images} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div>
        <div className="noDrag__layer"></div>
        <Swiper
          slidesPerView="auto"
          spaceBetween={30}
          loop={true}
          autoplay={{
            delay: 1,
            disableOnInteraction: false,
          }}
          freeMode={true}
          allowTouchMove={true}
          speed={3000}
          modules={[Autoplay, FreeMode]}
          className="homeSlide__content--slide1"
        >
          {images_2.map((images, i) => (
            <SwiperSlide className="highway-car" key={i}>
              <img src={images} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </motion.section>
  );
};

export default RowHome;
