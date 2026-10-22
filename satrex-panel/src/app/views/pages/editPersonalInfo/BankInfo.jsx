import React, { useState } from "react";
import { Grid } from "@mui/material";
import {
  satrexDarkerBlueDarkMode,
  satrexGreen,
} from "../../../../styles/colors";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import Trans from "../../../components/lang";
import { useSelector } from "react-redux";
import BankAccountRows from "../editBankInfo/bankAccountRows";
import ThemeAtrr from "../../../MasterLayout/MasterTheme/ThemeAtrr";

export default () => {
  const lang = useSelector((state) => state.user.language);
  const satrexTheme = useSelector((state) => state.layout.theme);
    const extraTheme = useSelector((state) => state.layout.extraTheme);
  const isEn = lang === "EN" || lang === "gr" || lang === "fr";

  return (
    <Grid
      className="satrexDiv"
      style={{
        marginTop: "45px",
        paddingRight: "6%",
        paddingLeft: "2%",
        paddingBottom: "45px",
      }}
      container
      spacing={2}
      data-tut="bankInfo"
    >
      <Grid size={12}>
        <label
          style={{
              backgroundColor: !satrexTheme ? (ThemeAtrr(extraTheme).cardStyle ? ThemeAtrr(extraTheme).cardStyle.backgroundColor : satrexDarkerBlueDarkMode) : "white",
              transition:'0.3s',
            position: "relative",
            top: "-77%",
            left: !isEn ? "3%" : "auto",
            right: isEn ? "0%" : "auto",
            paddingLeft: lang === "EN" ? "0px" : "3%",
            paddingRight: lang === "EN" ? "3%" : "0px",
          }}
        >
          {" "}
          <FiberManualRecordIcon
            style={{
              width: "0.85em",
              color: satrexGreen,
              position: "relative",
              top: "6px",
            }}
          />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
          <span style={{ fontSize: "18px" }}>
            <Trans>editBankInfo</Trans>
          </span>
        </label>
      </Grid>
      <Grid size={12}>
        <BankAccountRows />
      </Grid>
    </Grid>
  );
};
