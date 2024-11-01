import React, { useEffect, useState } from "react";
import { Container, Stack, Box } from "@mui/material";
import "../../../css/order.css";
import Tab from "@mui/material/Tab";

import TabList from "@mui/lab/TabList/TabList";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TextField from "@mui/material/TextField";
import PausedOrders from "../../components/orders/pausedOrders";
import ProcessOrders from "../../components/orders/processOrders";
import FinishedOrders from "../../components/orders/finishedOrders";
import Marginer from "../../components/marginer";
import { Order } from "../../../types/order";

// REDUX
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import {
  setPausedOrders,
  setProcessOrders,
  setFinishedOrders,
} from "../../screens/OrdersPage/slice";
import OrderApiService from "../../apiServices/orderApiService";
import { Member } from "../../../types/user";
import TabContext from "@mui/lab/TabContext";
import { verifiedMemberData } from "../../apiServices/verify";

/** REDUX SLICE */
const actionDispatch = (dispach: Dispatch) => ({
  setPausedOrders: (data: Order[]) => dispach(setPausedOrders(data)),
  setProcessOrders: (data: Order[]) => dispach(setProcessOrders(data)),
  setFinishedOrders: (data: Order[]) => dispach(setFinishedOrders(data)),
});

export function OrdersPage(props: any) {
  /* INITIALIZATIONS */
  const [value, setValue] = useState("1");
  const { setPausedOrders, setProcessOrders, setFinishedOrders } =
    actionDispatch(useDispatch());

  useEffect(() => {
    const orderService = new OrderApiService();
    orderService
      .getMyOrder("paused")
      .then((data) => setPausedOrders(data))
      .catch((err) => console.log(err));
    orderService
      .getMyOrder("process")
      .then((data) => setProcessOrders(data))
      .catch((err) => console.log(err));
    orderService
      .getMyOrder("finished")
      .then((data) => setFinishedOrders(data))
      .catch((err) => console.log(err));
  }, [props.orderRebuild]);

  /* HANDLERS */
  const handleChange = (event: any, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className={"order_page"}>
      <Container
        maxWidth="lg"
        style={{ display: "flex", flexDirection: "row" }}
        sx={{ mt: "50px", mb: "50px" }}
      >
        <Stack className={"order_left"}>
          <TabContext value={value}>
            <Box className={"order_nav_frame"}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  value={value}
                  aria-label="basic tabs example"
                >
                  <Tab label="Buyurtmalarim" value={"1"} />
                  <Tab
                    label="Jarayon"
                    value={"2"}
                    style={{ marginLeft: "100px", marginRight: "100px" }}
                  />
                  <Tab label="Yakunlangan" value={"3"} />
                </TabList>
              </Box>
            </Box>
            <Marginer direction="horizontal" height="1" width="1" bg="white" />
            <Stack className={"order_main_content"}>
              <PausedOrders setOrderRebuild={props.setOrderRebuild} />
              <ProcessOrders setOrderRebuild={props.setOrderRebuild} />
              <FinishedOrders setOrderRebuild={props.setOrderRebuild} />
            </Stack>
          </TabContext>
        </Stack>

        <Stack className={"order_right"}>
          <Box className={"order_info_box"}>
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
              rowGap={"10px"}
            >
              <div className={"order_user_img"}>
                <img
                  src={
                    verifiedMemberData?.mb_image
                      ? verifiedMemberData?.mb_image
                      : "/auth/default_user.svg"
                  }
                  style={{
                    width: "117px",
                    height: "112px",
                    borderRadius: "37px",
                  }}
                  className={"order_user_avatar"}
                />
                <div className={"order_user_abs"}>
                  <img src="/icons/User.svg" />
                </div>
              </div>
              <span className={"order_user_name"}>
                {verifiedMemberData?.mb_nick}
              </span>
              <span className="order_user_nick">
                {verifiedMemberData?.mb_type ?? "Foydalanuvchi"}
              </span>
            </Box>
            <Box display={"flex"} flexDirection={"column"} sx={{ mt: "40px" }}>
              <Marginer
                direction="horizontal"
                height="2"
                width="333"
                bg="#A1A1A1"
              />
              <Box className={"order_user_location"}>
                <div style={{ display: "flex", gap: "10px" }}>
                  <LocationOnIcon />
                  <div style={{ color: "#a1a1a1" }}>
                    {verifiedMemberData?.mb_address ?? "manzil kiritilmagan"}
                  </div>
                </div>
              </Box>
            </Box>
          </Box>

          <Box className={"order_info_box_2"}>
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
              className={"box_2_start"}
            >
              <TextField
                label="Card number : 5243 4090 2002 7495"
                variant="outlined"
                type="number"
                className="input_user input_color"
                style={{ backgroundColor: "#F5F5F5" }}
              />
              <Box display={"flex"} className={"input_user"}>
                <TextField
                  label="07 / 24"
                  variant="outlined"
                  type="number"
                  style={{ backgroundColor: "#F5F5F5" }}
                />
                <TextField
                  label="CVV : 010"
                  variant="outlined"
                  type="number"
                  style={{ backgroundColor: "#F5F5F5" }}
                />
              </Box>
              <TextField
                className="input_user input_color"
                label="Username"
                variant="outlined"
                style={{ backgroundColor: "#F5F5F5" }}
              />
            </Box>

            <Box sx={{ mt: "20px" }}>
              <Box display={"flex"} alignItems={"center"} columnGap={"20px"}>
                {/* <div>
                  <img src="/icons/Western_union.svg" />
                </div>
                <div>
                  <img src="/icons/mastercart.svg" />
                </div>
                <div>
                  <img src="/icons/Paypal.svg" />
                </div>
                <div>
                  <img src="/icons/visa.svg" />
                </div> */}
              </Box>
            </Box>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
