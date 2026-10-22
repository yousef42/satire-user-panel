import React, { useState } from "react";
import { Grid } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import Trans from "../../../components/lang"

export default () => {
  const [liked, setLiked] = useState(false);
  const [unLiked, setUnLiked] = useState(false);
  return (
    <center>
      {/*<div style={{ marginTop: "30px", width: "25%" }}>*/}
      {/*  <Grid container>*/}
      {/*    <Grid xs={8} item>*/}
      {/*      <span><Trans>helpPageDescriptionLine67</Trans></span>*/}
      {/*    </Grid>*/}
      {/*    <Grid xs={2} item>*/}
      {/*      {liked ? (*/}
      {/*        <span*/}
      {/*          onClick={() => {*/}
      {/*            setLiked(false);*/}
      {/*          }}*/}
      {/*        >*/}
      {/*          <ThumbUpIcon*/}
      {/*            style={{*/}
      {/*              color: "blue",*/}
      {/*              cursor: "pointer",*/}
      {/*              marginTop: "-5px",*/}
      {/*            }}*/}
      {/*          />*/}
      {/*        </span>*/}
      {/*      ) : (*/}
      {/*        <span*/}
      {/*          onClick={() => {*/}
      {/*            setLiked(true);*/}
      {/*            setUnLiked(false);*/}
      {/*          }}*/}
      {/*        >*/}
      {/*          <ThumbUpAltOutlinedIcon*/}
      {/*            style={{*/}
      {/*              color: "blue",*/}
      {/*              cursor: "pointer",*/}
      {/*              marginTop: "-5px",*/}
      {/*            }}*/}
      {/*          />*/}
      {/*        </span>*/}
      {/*      )}*/}
      {/*    </Grid>*/}
      {/*    <Grid xs={2} item>*/}
      {/*      {!unLiked ? (*/}
      {/*        <span*/}
      {/*          onClick={() => {*/}
      {/*            setUnLiked(true);*/}
      {/*            setLiked(false);*/}
      {/*          }}*/}
      {/*        >*/}
      {/*          <ThumbDownAltOutlinedIcon*/}
      {/*            style={{ color: "red", cursor: "pointer" }}*/}
      {/*          />*/}
      {/*        </span>*/}
      {/*      ) : (*/}
      {/*        <span*/}
      {/*          onClick={() => {*/}
      {/*            setUnLiked(false);*/}
      {/*          }}*/}
      {/*        >*/}
      {/*          <ThumbDownIcon style={{ color: "red", cursor: "pointer" }} />*/}
      {/*        </span>*/}
      {/*      )}*/}
      {/*    </Grid>*/}
      {/*  </Grid>*/}
      {/*</div>*/}
    </center>
  );
};
