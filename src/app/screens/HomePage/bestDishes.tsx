import { MonetizationOn } from "@mui/icons-material";
import { Box, Container, Stack } from "@mui/material";
import React from "react";

export function BestDishes() {
  return (
    <div className="best_dishes_frame">
      <Container>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Box className="category_title">Trenddagi Ovqatlar</Box>
          <Stack sx={{ mt: "43px" }} flexDirection={"row"}>
            <Box className="dish_box">
              <Stack
                className="dish_img"
                sx={{
                  backgroundImage: `url(
                    "https://www.lacademie.com/wp-content/uploads/2022/03/uzbek-foods.jpg"
                  )`,
                }}
              >
                <div className={"dish_sale"}>normal size</div>
                <div className={"view_btn"}>
                  Batfsil Ko'rish{" "}
                  <img
                    src={"/icons/arrow_right.svg"}
                    style={{ marginLeft: "9px" }}
                  />
                </div>
              </Stack>
              <Stack className={"dish_desc"}>
                <span className={"dish_title_text"}>Chicken Mayo</span>
                <span className={"dish_desc_text"}>
                  <MonetizationOn />
                  11
                </span>
              </Stack>
            </Box>

            <Box className="dish_box">
              <Stack
                className="dish_img"
                sx={{
                  backgroundImage: `url(
                    "https://www.lacademie.com/wp-content/uploads/2022/03/uzbek-foods.jpg"
                  )`,
                }}
              >
                <div className={"dish_sale"}>normal size</div>
                <div className={"view_btn"}>
                  Batfsil Ko'rish{" "}
                  <img
                    src={"/icons/arrow_right.svg"}
                    style={{ marginLeft: "9px" }}
                  />
                </div>
              </Stack>
              <Stack className={"dish_desc"}>
                <span className={"dish_title_text"}>Chicken Mayo</span>
                <span className={"dish_desc_text"}>
                  <MonetizationOn />
                  11
                </span>
              </Stack>
            </Box>

            <Box className="dish_box">
              <Stack
                className="dish_img"
                sx={{
                  backgroundImage: `url(
                    "https://www.lacademie.com/wp-content/uploads/2022/03/uzbek-foods.jpg"
                  )`,
                }}
              >
                <div className={"dish_sale"}>normal size</div>
                <div className={"view_btn"}>
                  Batfsil Ko'rish{" "}
                  <img
                    src={"/icons/arrow_right.svg"}
                    style={{ marginLeft: "9px" }}
                  />
                </div>
              </Stack>
              <Stack className={"dish_desc"}>
                <span className={"dish_title_text"}>Chicken Mayo</span>
                <span className={"dish_desc_text"}>
                  <MonetizationOn />
                  11
                </span>
              </Stack>
            </Box>

            <Box className="dish_box">
              <Stack
                className="dish_img"
                sx={{
                  backgroundImage: `url(
                    "https://www.lacademie.com/wp-content/uploads/2022/03/uzbek-foods.jpg"
                  )`,
                }}
              >
                <div className={"dish_sale"}>normal size</div>
                <div className={"view_btn"}>
                  Batfsil Ko'rish{" "}
                  <img
                    src={"/icons/arrow_right.svg"}
                    style={{ marginLeft: "9px" }}
                  />
                </div>
              </Stack>
              <Stack className={"dish_desc"}>
                <span className={"dish_title_text"}>Chicken Mayo</span>
                <span className={"dish_desc_text"}>
                  <MonetizationOn />
                  11
                </span>
              </Stack>
            </Box>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}