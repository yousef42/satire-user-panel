import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { satrexGreen } from "../../../../../styles/colors";

export default (props) => {

  return (
    <Grid
      style={{ width: "12px", opacity: 0}}
      container
      className={"candleRow" + props.index}>
      <Grid
        container
        style={{ height: "150px", position: "relative" }}
        className={"greenCandleDiv" + props.index}
      >
        <Grid
          style={{
            border: "solid 1px " + satrexGreen,
            width: "9px",
            backgroundColor: satrexGreen,
            height: "50px",
            position: "absolute",
            bottom: "0px",
            borderRadius: "2px",
          }}
          className={"candleGreen" + props.index} />
        <Grid
          style={{
            border: "solid 1px " + satrexGreen,
            backgroundColor: satrexGreen,
            width: "1px",

            left: "4px",
            position: "absolute",
            bottom: "0px",
            borderRadius: "2px",
          }}
          className={"candleGreenShadow" + props.index} />
      </Grid>
      <Grid
        container
        style={{ height: "150px", position: "relative" }}
        className={"redCandleDiv" + props.index}
      >
        <Grid
          style={{
            border: "solid 1px red",
            width: "9px",
            backgroundColor: "red",
            position: "absolute",
            top: "0px",
            borderRadius: "2px",
          }}
          className={"candle" + props.index + " candleDelay"} />
        <Grid
          style={{
            border: "solid 1px red",
            backgroundColor: "red",
            width: "1px",

            position: "relative",
            left: "4px",
            borderRadius: "2px",
          }}
          className={"candleShadow" + props.index} />
      </Grid>
    </Grid>
  );
};
