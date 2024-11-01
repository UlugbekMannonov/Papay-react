import React, { useRef } from "react";
import { Box, Stack } from "@mui/material";
import { Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

const TViewer = (props: any) => {
  const editorRef = useRef();

  return (
    <Stack
      className={"twiever"}
      sx={{ background: "white", mt: "36px", borderRadius: "10px" }}
    >
      <Box sx={{ m: "40px" }}>
        <Viewer
          // @ts-ignore
          ref={editorRef}
          initialValue={props.chosenSingleBoArticle?.art_content}
          height={"600px"}
        />
      </Box>
    </Stack>
  );
};

export default TViewer;
