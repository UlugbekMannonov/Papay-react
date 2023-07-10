import React from "react";
import TabPanel from "@material-ui/lab/TabPanel";
import { Box, Button, Stack } from "@mui/material";

const pausedOrders = [
    [1, 2, 3],
    [1, 2, 3],
    [1, 2, 3],
  ];
  
  export default function PausedOrders(props: any) {
    return (
      <TabPanel value={"1"}>
        <Stack>
          {pausedOrders?.map((order) => {
            return (
              <Box className={"order_main_box"}>
                <Box className={"order_box_scroll"}>
                  {order.map((item) => {
                    const image_path = `/others/kabob.jpeg`;
                    return (
                      <Box className={"ordersName_price"}>
                        <img src={image_path} className={"orderDishImg"} />
                        <p className={"titleDish"}>Kabob</p>
                        <Box className={"priceBox"}>
                          <p>5$</p>
                          <img src={"/icons/Close.svg"} />
                          <p>3</p>
                          <img src={"/icons/pause.svg"} />
                          <p style={{ marginLeft: "15px" }}>15$</p>
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
  
                <Box className={"total_price_box black_solid"}>
                  <Box className={"boxTotal"}>
                    <p>Mahsulot Narxi</p>
                    <p>$15</p>
                    <img src={"/icons/plus.svg"} style={{ marginLeft: "20px" }} />
                    <p>Yetkazish Xizmati</p>
                    <p>$2</p>
                    <img
                      src={"/icons/pause.svg"}
                      style={{ marginLeft: "20px" }}
                    />
                    <p>Jami Narx</p>
                    <p>$47</p>
                  </Box>
                  <Button
                  variant="contained"
                  style={{ backgroundColor: "#c40909", borderRadius: "10px" }}
                >
                  Bekor qilish
                </Button>
                <Button variant="contained" style={{ borderRadius: "10px" }}>
                  To'lash
                </Button>
                </Box>
              </Box>
            );
          })}
        </Stack>
      </TabPanel>
    );
}
