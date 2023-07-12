import React, { useState } from "react";
import { Box, Container, Link, Stack } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VisibilityIcon from "@mui/icons-material/Visibility";

export function MemberPosts(props: any) {
  return (
    <Box>
      <Link
        className={"all_article_box"}
        sx={{ textDecoration: "none" }}
        href={""}
      >
        <img
          className={"all_article_img"}
          src="/auth/default_user.svg"
          width={"35px"}
          style={{ borderRadius: "50%", backgroundSize: "cover" }}
        />
        <Box className={"all_article_container"}>
          <Box alignItems={"center"} display={"flex"}>
            <img
              src="/auth/default_user.svg"
              width={"35px"}
              style={{ borderRadius: "50%", backgroundSize: "cover" }}
            />
            <span className={"all_article_author_user"}>STAS</span>
          </Box>
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "15px",
            }}
          >
            <span className={"all_article_title"}>Mashhurlar</span>
            <span className={"all_article_desc"}>
              Kim oladiyo shuginaniyo
            </span>
          </Box>
          <Box>
            <Box
              className={"article_share"}
              style={{ width: "100%", height: "auto" }}
            >
              <Box
                className={"article_share_main"}
                style={{
                  color: "rgb(255, 255, 255)",
                  marginLeft: "150px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span style={{ marginRight: "18px" }}>23-07-11 13:00</span>
                <FavoriteBorderIcon style={{ marginRight: "18px" }} />
                <span style={{ marginRight: "18px" }}>10</span>
                <VisibilityIcon />
                <span style={{ marginLeft: "18px" }}>10</span>
              </Box>
            </Box>
          </Box>
        </Box>
      </Link>
      );
    </Box>
  );
}