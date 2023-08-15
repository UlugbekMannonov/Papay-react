import React from "react";
import { Favorite, RemoveRedEye, Visibility } from "@mui/icons-material";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import { Box, Checkbox, Link, Stack } from "@mui/material";
import moment from "moment";
import { CssVarsProvider, Typography } from "@mui/joy";
import { BoArticle } from "../../../types/boArticle";
import { serverApi } from "../../../lib/config";

const current_time = moment().format("YYYY-MM-DD HH:mm");

export function TargetArticles(props: any) {
  return (
    <Stack>
      {props.targetBoArticles?.map((article: BoArticle) => {
        const art_image_url = article?.art_image
          ? `${serverApi}/${article.art_image}`
          : "/community/default_article.svg";

        return (
          <Link
            className="all_article_box"
            sx={{ textDecoration: "none" }}
            href=""
          >
            <Box
              className="all_article_img"
              sx={{ backgroundImage: `url(  ${art_image_url})` }}
            ></Box>
            <Box className="all_article_container">
              <Box alignItems={"center"} display={"flex"} marginBottom={"25px"}>
                <img
                  src="/icons/user_icon.svg"
                  alt=""
                  width={"35px"}
                  style={{
                    borderRadius: "50%",
                    backgroundSize: "cover",
                    marginRight: "10px",
                  }}
                />
                <span className="all_article_author_user">
                  {article?.member_data?.mb_nick}
                </span>
              </Box>
              <Box
                display={"flex"}
                flexDirection={"column"}
                sx={{ mt: "15px" }}
              >
                <span className="all_article_title">{article?.bo_id}</span>
                <p className="all_article_desc">{article?.art_subject}</p>
              </Box>
            </Box>
            <Box
              style={{ display: "flex", alignItems: "end", marginLeft: "60px" }}
            >
              <Box className="target_favorite_icons">
                <Box
                  className="article_share"
                  style={{ width: "100%", height: "auto" }}
                >
                  <Box
                    className="article_share_main"
                    style={{
                      color: "#fff",
                      marginLeft: "150px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <span className="current_time">{current_time}</span>
                    <Checkbox
                      sx={{ ml: "40px" }}
                      icon={<FavoriteBorder />}
                      checkedIcon={<Favorite style={{ color: "red" }} />}
                      id={article?.bo_id}
                      // onClick={targetLikeHandler}
                      // @ts-ignore
                      checked={
                        article?.me_liked && article?.me_liked[0]?.my_favorite
                          ? true
                          : false
                      }
                    />
                    <span style={{ marginRight: "18px" }}>
                      {article?.art_likes}
                    </span>
                    <RemoveRedEye />
                    <span style={{ marginLeft: "18px" }}>
                      {article?.art_views}{" "}
                    </span>
                  </Box>
                </Box>

                {/* <CssVarsProvider>
                  <Typography
                    level="body3"
                    sx={{
                      fontWeight: "md",
                      color: "white",
                      alignItems: "center",
                      display: "flex",
                      marginRight: "18px",
                    }}
                  >
                    <FavoriteBorder
                      sx={{
                        fontSize: 20,
                        marginLeft: "5px",
                        marginRight: "16px",
                      }}
                    />
                    <div>{article.art_likes}</div>
                  </Typography>
                  <Typography
                    level="body3"
                    sx={{
                      fontWeight: "md",
                      color: "white",
                      alignItems: "center",
                      display: "flex",
                      marginRight: "18px",
                    }}
                  >
                    <Visibility
                      sx={{
                        fontSize: 20,
                        marginLeft: "5px",
                        marginRight: "16px",
                      }}
                    />
                    {article.art_views}
                  </Typography>
                </CssVarsProvider> */}
              </Box>
            </Box>
          </Link>
        );
      })}
    </Stack>
  );
}
