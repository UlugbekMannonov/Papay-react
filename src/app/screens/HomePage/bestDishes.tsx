import React, { useEffect } from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import { MonetizationOn } from "@mui/icons-material";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { setTrendProducts } from "../../screens/HomePage/slice";
import { Product } from "../../../types/product";
import ProductApiService from "../../apiServices/productApiService";
import { retrieveTrendProducts } from "./selector";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";
/** REDUX SLICE */
const actionDispatch = (dispach: Dispatch) => ({
  setTrendProducts: (data: Product[]) => dispach(setTrendProducts(data)),
});
/** REDUX SELECTOR */
const trendProductsRetriever = createSelector(
  retrieveTrendProducts,
  (trendProducts) => ({
    trendProducts,
  })
);

export function BestDishes() {
  /** INITIALIZATIONS */
  const history = useHistory();
  const { setTrendProducts } = actionDispatch(useDispatch());
  const { trendProducts } = useSelector(trendProductsRetriever);

  useEffect(() => {
    const productService = new ProductApiService();
    productService
      .getTargetProducts({ order: "product_likes", page: 1, limit: 4 })
      .then((data) => {
        setTrendProducts(data);
      })
      .catch((err) => console.log(err));
  }, []);

  /** HANDLERS */
  const chosenDishHandler = (id: string) => {
    history.push(`/restaurant/dish/${id}`);
  };

  return (
    <div className="best_dishes_frame">
      <Container>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Box className="category_title">Trendagi Ovqatlar</Box>
          <Stack sx={{ mt: "43px" }} flexDirection={"row"}>
            {trendProducts.map((product: Product) => {
              const updatedData = JSON.parse(
                JSON.stringify(product.product_images[0]).replace(/\\/g, "/")
              );
              const image_path = `${serverApi}/${updatedData}`;
              const size_volume =
                product.product_collection === "drink"
                  ? product.product_volume + "l"
                  : product.product_size + "size";
              return (
                <Box className="dish_box">
                  <Stack
                    className="dish_img"
                    sx={{
                      backgroundImage: `url(${image_path})`,
                    }}
                  >
                    <div className={"dish_sale"}>{size_volume}</div>
                    <div className={"view_btn"}>
                      <div onClick={() => chosenDishHandler(product._id)}>
                        Batafsil ko'rish
                      </div>
                      <img
                        src={"/icons/arrow_right.svg"}
                        style={{ marginLeft: "9px" }}
                      />
                    </div>
                  </Stack>
                  <Stack className={"dish_desc"}>
                    <span className={"dish_title_text"}>
                      {product.product_name}
                    </span>
                    <span className={"dish_desc_text"}>
                      <MonetizationOn />
                      {product.product_price}
                    </span>
                  </Stack>
                </Box>
              );
            })}
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
