import TabPanel from "@mui/lab/TabPanel";
import { Box, Button, Stack } from "@mui/material";
import React from "react";

// REDUX
import { createSelector } from "reselect";
import { useSelector } from "react-redux";
import { retrievePausedOrders } from "../../screens/OrdersPage/selector";
import { Order } from "../../../types/order";
import { serverApi } from "../../../lib/config";
import { Product } from "../../../types/product";
import {
  sweetErrorHandling,
  sweetFailureProvider,
} from "../../../lib/sweetAlert";
import OrderApiService from "../../apiServices/orderApiService";

/** REDUX SELECTOR **/
const pausedOrdersRetriever = createSelector(
  retrievePausedOrders,
  (pausedOrders) => ({
    pausedOrders,
  })
);

export function PausedOrders(props: any) {
  /** INITIALIZATIONS **/

  const { pausedOrders } = useSelector(pausedOrdersRetriever);

  /** HANDLERS **/
  const deleteOrderHandler = async (event: any) => {
    try {
      const order_id = event.target.value;
      const data = { order_id: order_id, order_status: "DELETED" };

      if (!localStorage.getItem("member_data")) {
        sweetFailureProvider("Please login first!", true);
      }

      let confirmation = window.confirm(
        "Buyurtmani bekor qilishni hohlaysizmi?"
      );
      if (confirmation) {
        const orderService = new OrderApiService();
        await orderService.updateOrderStatus(data);
        //refresh builder logic
        props.setOrderRebuild(new Date());
      }
    } catch (err) {
      console.log(`deleteOrderHandler, ERROR: `, err);
      sweetErrorHandling(err).then();
    }
  };

  const processOrderHandler = async (event: any) => {
    try {
      const order_id = event.target.value;
      const data = { order_id: order_id, order_status: "PROCESS" };

      if (!localStorage.getItem("member_data")) {
        sweetFailureProvider("Please login first!", true);
      }

      let confirmation = window.confirm("Buyurtmani to'lashni tasdiqlaysizmi?");
      if (confirmation) {
        const orderService = new OrderApiService();
        await orderService.updateOrderStatus(data);
        //refresh builderlogic
        props.setOrderRebuild(new Date());
      }
    } catch (err) {
      console.log(`processOrderHandler, ERROR: `, err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <TabPanel value="1">
      <Stack>
        {pausedOrders?.map((order: Order) => {
          return (
            <Box className="order_main_box">
              <Box className="order_box_scroll">
                {order.order_items.map((item) => {
                  const product: Product = order.product_data.filter(
                    (ele) => ele._id === item.product_id
                  )[0];
                  const image_path = `${serverApi}/${product.product_images[0]}`;
                  return (
                    <Box className="orderName_price">
                      <img src={image_path} alt="" className="orderDishImg" />
                      <p className="titleDish">{product.product_name}</p>
                      <Box className="priceBox">
                        <p>${item.item_price}</p>
                        <img src={"/icons/close.svg"} alt="" />
                        <p>{item.item_quantity}</p>
                        <img src={"/icons/pause.svg"} alt="" />
                        <p style={{ marginLeft: "15px" }}>
                          ${item.item_price * item.item_quantity}
                        </p>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
              <Box className="total_price_box black_solid">
                <Box className="boxTotal">
                  <p>Mahsulot Narxi</p>
                  <p>${order.order_total_amount - order.order_delivery_cost}</p>
                  <img src={`/icons/plus.svg`} alt="" />
                  <p>Yetkazish Xizmati</p>
                  <p>${order.order_delivery_cost}</p>
                  <img src={"/icons/pause.svg"} alt="" />
                  <p>Jami Narx</p>
                  <p>${order.order_total_amount}</p>
                  <Button
                    value={order._id}
                    onClick={deleteOrderHandler}
                    style={{
                      width: "126px",
                      height: "36px",
                      fontSize: "12px",
                      marginRight: "7px",
                    }}
                    variant="contained"
                    color="secondary"
                  >
                    Bekor Qilish
                  </Button>
                  <Button
                    value={order._id}
                    onClick={processOrderHandler}
                    variant="contained"
                    style={{ width: "126px", height: "36px", fontSize: "12px" }}
                  >
                    To'lash
                  </Button>
                </Box>
              </Box>
            </Box>
          );
        })}
      </Stack>
    </TabPanel>
  );
}
