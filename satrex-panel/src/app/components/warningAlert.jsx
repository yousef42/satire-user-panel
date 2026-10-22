import React from "react";
import { Grid } from "@mui/material";
import { satrexRed } from "../../styles/colors";
import Trans from "./lang";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import { useSelector } from "react-redux";

const warningAlert = ({ children }) => {
  const satrexTheme = useSelector((state) => state.layout.theme);

  return (
    <div
      style={{
        width: "100%",
        backgroundColor: satrexTheme ? "rgba(255,218,0,0.09)" : "transparent",
        padding: "10px",
        border: "solid 1px",
        borderColor: !satrexTheme ? "rgba(255,218,0,0.44)" : "transparent",
        borderRadius: "8px",
        marginBottom: "10px",
      }}
    >
      <Grid container>
        <Grid size={1}>
            <ReportProblemOutlinedIcon style={{ color: "#c28109",fontSize:77,position:'relative',top:12 }} />{" "}
        </Grid>
        <Grid style={{ padding: "2px", paddingTop: "3px" }} size={10}>
          {children}
        </Grid>
      </Grid>
    </div>
  );
};
export default warningAlert;
