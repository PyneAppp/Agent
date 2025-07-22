import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";

import "swiper/css";

import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default () => {
  return (
    <Swiper
      style={{ overflow: "visible" }}
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      pagination={{ clickable: true }}
      autoplay={{ delay: 5000 }}
      spaceBetween={50}
      slidesPerView={1}
      loops={true}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide
        style={{
          display: "flex",

          boxShadow: "3px 3px 3px black",
          justifyContent: "center",
          width: "100%",
          height: "300px",
          borderRadius: "10px",
          backgroundColor: "green",
          gap: "500px",
        }}
      >
        <h1 style={{ color: "black", paddingLeft: "40px" }}>Rent houses</h1>
        <img
          src="https://tse3.mm.bing.net/th/id/OIP.t9cp_It1qJHKHLE2ak9MhgHaE7?rs=1&pid=ImgDetMain&o=7&rm=3"
          style={{ width: "48%", borderRadius: "10px", height: "99%" }}
        />
      </SwiperSlide>
      <SwiperSlide
        style={{
          marginTop: "5px",
          display: "flex",
          borderRadius: "20px",
          justifyContent: "center",
          width: "100%",
          height: "300px",
          backgroundColor: "yellow",
        }}
      >
        Slide 2
      </SwiperSlide>
      <SwiperSlide
        style={{
          display: "flex",
          borderRadius: "10px",
          justifyContent: "center",
          width: "100%",
          height: "300px",
          backgroundColor: "blue",
        }}
      >
        Slide 3
      </SwiperSlide>
      <SwiperSlide
        style={{
          display: "flex",
          borderRadius: "10px",
          justifyContent: "center",
          width: "100%",
          height: "300px",
          backgroundColor: "grey",
        }}
      >
        Slide 4
      </SwiperSlide>
    </Swiper>
  );
};
