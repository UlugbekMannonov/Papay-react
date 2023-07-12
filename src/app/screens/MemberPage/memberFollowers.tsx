import React, { useState } from "react";
import { Box, Button, Container, Link, Stack } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VisibilityIcon from "@mui/icons-material/Visibility";

// const followers = [
//   {mb_nick: "Botir", following: true},
//   {mb_nick: "Jonibek", following: false},
//   {mb_nick: "Justin", following: true},
// ];

export function MemberFollowers(props: any) {
  return (
    <Stack>
      <Stack className={"following_list"}>
        <div className={"member_img"}>
          <img className={"member_avatar"} src={"/icons/profile.svg"} />
        </div>
        <Box
          style={{
            marginLeft: "25px",
            width: "400px",
            height: "50px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span className={"mb_username"}>Jason</span>
          <span className={"mb_name"}>STAS</span>
        </Box>
        <Button variant="contained" className={"follow_btn"}>
          Following
        </Button>
      </Stack>
    </Stack>
  );
}