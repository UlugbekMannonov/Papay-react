import React, { useEffect, useState } from "react";
import { Box, Container, Stack } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import "../../../css/community.css";
import { TargetArticles } from "./targetArticles";
import { CommunityChats } from "./communityChats";
import Tab from "@material-ui/core/Tab";
import TabContext from '@material-ui/lab/TabContext';
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CommunityApiService from "../../apiServices/communityApiService";
import { BoArticle, SearchArticlesObj } from "../../../types/boArticle";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { Dispatch } from "@reduxjs/toolkit";
import { setTargetBoArticles } from "./slice";
import { retrieveTargetBoArticles } from "./selector";

// REDUX SLICE
const actionDispatch = (dispach: Dispatch) => ({
  setTargetBoArticles: (data: BoArticle[]) =>
    dispach(setTargetBoArticles(data)),
});

// REDUX SELECTOR
const targetBoArticlesRetriever = createSelector(
  retrieveTargetBoArticles,
  (targetBoArticles) => ({
    targetBoArticles,
  })
);

const targetBoArticles = [1, 2, 3, 4, 5];

export function CommunityPage(props: any) {
  /** INITIALIZATIONS **/
  const { setTargetBoArticles } = actionDispatch(useDispatch());
  const { targetBoArticles } = useSelector(targetBoArticlesRetriever);
  const [value, setValue] = React.useState("1");
  const [searchArticleSObj, setSearchArticlesObj] = useState<SearchArticlesObj>(
    {
      bo_id: "all",
      page: 1,
      limit: 5,
    }
  );

  useEffect(() => {
    const communityService = new CommunityApiService();
    communityService
      .getTargetArticles(searchArticleSObj)
      .then((data) => setTargetBoArticles(data))
      .catch((err) => console.log(err));
  }, [searchArticleSObj]);

  /** HANDLERS **/
  const handleChange = (event: any, newValue: string) => {
    searchArticleSObj.page = 1;
    switch (newValue) {
      case "1":
        searchArticleSObj.bo_id = "all";
        break;
      case "2":
        searchArticleSObj.bo_id = "celebrity";
        break;
      case "3":
        searchArticleSObj.bo_id = "evaluation";
        break;
      case "4":
        searchArticleSObj.bo_id = "story";
        break;
    }
    setSearchArticlesObj({ ...searchArticleSObj });
    setValue(newValue);
  };
  
  const handlePaginationChange = (event: any, value: number) => {
    searchArticleSObj.page = value;
    setSearchArticlesObj({ ...searchArticleSObj });
  };

  return (
    <div className={"community_page"}>
      <div className={"community_frame"}>
        <Container sx={{ mt: "50px", mb: "50px" }}>
          <Stack flexDirection={"row"} justifyContent={"space-between"}>
            <CommunityChats />
            <Stack
              className={"community_all_frame"}
              inputMode={"text"}
              style={{ border: "1px solid #fff" }}
            >
              <TabContext value={value}>
                <Box className={"article_tabs"}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList
                      value={value}
                      TabIndicatorProps={{ style: { background: "#1976d2" } }}
                      onChange={handleChange}
                      aria-label="lab API tabs example"
                      style={{ borderColor: "blue" }}
                    >
                      <Tab
                        label="Barcha Maqolalar"
                        value="1"
                        style={{ color: "#1976d2" }}
                      />
                      <Tab
                        label="Mashxurlar"
                        value="2"
                        style={{ color: "#ffffff" }}
                      />
                      <Tab
                        label="Oshxonaga baho"
                        value="3"
                        style={{ color: "#ffffff" }}
                      />
                      <Tab
                        label="Hikoyalar"
                        value="4"
                        style={{ color: "#ffffff" }}
                      />
                    </TabList>
                  </Box>
                </Box>

                <Box className={"article_main"}>
                  <TabPanel value="1">
                    <TargetArticles targetBoArticles={targetBoArticles} />
                  </TabPanel>
                  <TabPanel value="2">
                    <TargetArticles targetBoArticles={targetBoArticles} />
                  </TabPanel>
                  <TabPanel value="3">
                    <TargetArticles targetBoArticles={targetBoArticles} />
                  </TabPanel>
                  <TabPanel value="4">
                    <TargetArticles targetBoArticles={targetBoArticles} />
                  </TabPanel>
                </Box>

                <Box className={"article_bott"}>
                  <Pagination
                    count={5}
                    page={1}
                    renderItem={(item) => (
                      <PaginationItem
                        components={{
                          previous: ArrowBackIcon,
                          next: ArrowForwardIcon,
                        }}
                        {...item}
                        color={"secondary"}
                      />
                    )}
                    onChange={handlePaginationChange}
                  />
                </Box>
              </TabContext>
            </Stack>
          </Stack>
        </Container>
      </div>
    </div>
  );
}
