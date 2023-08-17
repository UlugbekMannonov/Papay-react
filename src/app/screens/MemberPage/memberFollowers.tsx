import React, { useState } from "react";
import { Box, Button, Container, Link, Stack } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VisibilityIcon from "@mui/icons-material/Visibility";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { Dispatch } from "@reduxjs/toolkit";
import { setMemberFollowers } from "./slice";
import { retrieveMemberFollowers } from "./selector";
import { Follower } from "../../../types/follow";

/** REDUX SLICE */
const actionDispatch = (dispach: Dispatch) => ({
  setMemberFollowers: (data: Follower[]) => dispach(setMemberFollowers(data)),
});

/** REDUX SELECTOR */
const memberFollowersRetriever = createSelector(
  retrieveMemberFollowers,
  (memberFollowers) => ({
    memberFollowers,
  })
);

// const followers = [
//   {mb_nick: "Botir", following: true},
//   {mb_nick: "Jonibek", following: false},
//   {mb_nick: "Justin", following: true},
// ];

export function MemberFollowers(props: any) {
  /** INITIALIZATIONS */
  const { setMemberFollowers } = actionDispatch(useDispatch());
  const { memberFollowers } = useSelector(memberFollowersRetriever);

  // setMemberFollowers

  /** HANDLERS */
  // subscribeHandler

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