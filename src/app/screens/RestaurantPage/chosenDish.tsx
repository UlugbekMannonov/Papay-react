import React, { useState } from "react";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Box, Button, Container, Rating, Stack } from "@mui/material";
import { FreeMode, Navigation, Thumbs } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import CheckBox from "@mui/material/Checkbox";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Marginer from "../../components/marginer";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

const chosen_list = Array.from(Array(3).keys());

export function ChosenDish() {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  return (
    <div className="chosen_dish_page">
      <Container className="dish_container">
        <Stack className={"chosen_dish_slider"}>
          <Swiper
            loop={true}
            spaceBetween={10}
            navigation={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="dish_swiper"
          >
            {chosen_list.map((ele) => {
              const image_path = `/others/kabob.jpeg`;
              return (
                <SwiperSlide>
                  <img
                    style={{ width: "100%", height: "100%" }}
                    src={image_path}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
          <Swiper
            loop={true}
            spaceBetween={50}
            slidesPerView={3}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            style={{ width: "450px", height: "245px", marginTop: "20px" }}
            className="mySwiper"
          >
            <SwiperSlide
              style={{
                height: "107px",
                display: "flex",
              }}
            >
              <img src="/others/kabob.jpeg" style={{ borderRadius: "15px" }} />
            </SwiperSlide>
          </Swiper>
        </Stack>
        <Stack className={"chosen_dish_info_container"}>
          <Box className={"chosen_dish_info_box"}>
            <strong className={"dish_txt"}>Sweet Kabob</strong>
            <span className={"resto_name"}>Texas De Brazil</span>
            <Box className={"rating_box"}>
              <Rating name="half-rating" defaultValue={3.5} precision={0.5} />
              <div className="evaluation_box">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: "20px",
                  }}
                >
                  <CheckBox
                    {...label}
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite style={{ color: "red" }} />}
                    checked={true}
                  />

                  <span>98 ta</span>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>

                  <RemoveRedEyeIcon sx={{ mr: "10px" }} />
                  <span>1000 ta</span>
                </div>
              </div>
            </Box>
            <p className={"dish_desc_info"}>Juda mazzali kabob</p>
            <Marginer
              direction="horizontal"
              height="1"
              width="100%"
              bg="#000000"
            />
            <div className={"dish_price_box"}>
              <span>Narx:</span>
              <span>$11</span>
            </div>
            <div className="button_box">
              <Button variant="contained">
                SAVATGA QO'SHISH
              </Button>
            </div>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}