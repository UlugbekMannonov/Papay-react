import React from "react";
import { Box, Stack } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import { Order } from "../../../types/order";
// REDUX
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveFinishedOrders } from "../../screens/OrdersPage/selector";
import { Product } from "../../../types/product";
import { serverApi } from "../../../lib/config";

/** REDUX SELECTOR */
const finishedOrdersRetriever = createSelector(
  retrieveFinishedOrders,
  (finishedOrders) => ({
    finishedOrders,
  })
);

export default function FinishedOrders(props: any) {
  /** INITIALIZATIONS */
  const { finishedOrders } = useSelector(finishedOrdersRetriever);

  return (
    <TabPanel value="3">
      <Stack>
        {finishedOrders?.map((order: Order) => {
          return (
            <Box className="order_main_box">
              <Box className="order_box_scroll">
                {order.order_items.map((item) => {
                  const product: Product = order.product_data.filter(
                    (ele) => ele._id === item.product_id
                  )[0];
                  const image_path = `${serverApi}/${product?.product_images[0].replace(
                    /\\/g,
                    "/"
                  )}`;
                  return (
                    <Box className="ordersName_price">
                      <img src={image_path} className="orderDishing" />
                      <p className="titleDish">{product.product_name}</p>
                      <Box className="priceBox">
                        <p>${item.item_price}</p>
                        <img src="/icons/close.svg" />
                        <p>{item.item_quantity}</p>
                        <img src="/icons/pause.svg" />
                        <p>${item.item_price * item.item_quantity}</p>
                      </Box>
                    </Box>
                  );
                })}
              </Box>

              <Box className="total_price_box red_solid">
                <Box className={"boxTotal"}>
                  <p>Mahsulot Narxi</p>
                  <p>${order.order_total_amount - order.order_delivery_cost}</p>
                  <img
                    src="/icons/plus.svg"
                    style={{ marginLeft: "10px", marginRight: "10px" }}
                  />
                  <p>Yetkazish Xizmati</p>
                  <p>${order.order_delivery_cost}</p>
                  <img
                    src="/icons/pause.svg"
                    style={{ marginLeft: "10px", marginRight: "10px" }}
                  />
                  <p>Jami Narx</p>
                  <p>${order.order_total_amount}</p>
                </Box>
              </Box>
            </Box>
          );
        })}
      </Stack>
    </TabPanel>
  );
}
