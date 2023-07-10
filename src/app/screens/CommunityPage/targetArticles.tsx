import React, { useState } from "react";
import { Box, Container, Link, Stack } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VisibilityIcon from "@mui/icons-material/Visibility";

export function TargetArticles(props: any) {
  return (
    <Stack>
      {props.targetBoArticles?.map((article: any, index: string) => {
        const art_image_url = "/community/cute_girl.jpeg";
        return (
          <Link
            className={"all_article_box"}
            sx={{ textDecoration: "none" }}
            href={""}
          >
            <Box
              className={"all_article_img"}
              sx={{ backgroundImage: `url(${art_image_url})` }}
            ></Box>
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
                <span className={"all_article_title"}>Evaluation</span>
                <span className={"all_article_desc"}>
                  Dean akani qolidan bir zo'r ovqat yemabsiz bu dunyoga kelmabsiz!
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
                    <span style={{ marginRight: "18px" }}>23-07-11 05:00</span>
                    <FavoriteBorderIcon style={{ marginRight: "18px" }} />
                    <span style={{ marginRight: "18px" }}>100</span>
                    <VisibilityIcon />
                    <span style={{ marginLeft: "18px" }}>100</span>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Link>
        );
      })}
    </Stack>
  );
}