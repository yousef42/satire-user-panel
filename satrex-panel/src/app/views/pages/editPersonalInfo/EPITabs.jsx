import React from "react";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/material";

import {
  satrexDarkBlueDarkMode, satrexGray,
  satrexGreen,
  satrexLightGray,

} from "../../../../styles/colors";

import Trans from "../../../components/lang";
import { useSelector } from "react-redux";
import {Grid} from "@mui/material";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

const useStyles = makeStyles({
  progressTrack: {
    position: "relative",
    width: "100%",
    height: 4,
    borderRadius: 999,
    overflow: "visible",
  },
  progressFill: {
    position: "absolute",
    top: 0,
    bottom: 0,
    borderRadius: 999,
    transition: "width 180ms ease",
  },
  stepsRow: {
    position: "relative",
    marginTop: -18,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  stepDiv: {
    width: "40px",
    height: "40px",
    borderRadius: "20px",
  },
  stepLabel: {
    position: "relative",
    color: "white",
    top: "25%",
    fontSize: "20px !important",
  },
})

export default (props) => {
  const lang = useSelector((state) => state.user.language);
  const satrexTheme = useSelector((state) => state.layout.theme);
  const isEn = lang === "EN" || lang === "gr" || lang === "fr";
  const classes = useStyles();
  const progressPercent = props.value === 0 ? 100 : 0;

  const steps = [
      ({ accomplished }) => (
          <div
              className={classes.stepDiv}
              style={{
                textAlign: "center",
                position: "relative",
                transform: isEn ? "" : "rotate(180deg)",
                backgroundColor: accomplished
                    ? satrexGreen
                    : satrexTheme
                        ? satrexLightGray
                        : satrexDarkBlueDarkMode,
              }}
          >
                        <span
                            style={{ color: accomplished ? "white" : "initial" }}
                            className={`${!isEn ? "" : "enNum"} ${
                                classes.stepLabel
                            }`}
                        >
                          1
                        </span>
            <span
                style={{ color: accomplished ? satrexGreen : "initial" ,position:'absolute',top:'50px',whiteSpace:'nowrap',left:'-10px',fontSize:16,fontWeight:'bold' }}
            ><Trans>firstLevel</Trans></span>
          </div>
      ), ({ accomplished }) => (
          <div
              className={classes.stepDiv}
              style={{
                textAlign: "center",
                position: "relative",
                transform: isEn ? "" : "rotate(180deg)",
                backgroundColor: accomplished
                    ? satrexGreen
                    : satrexTheme
                        ? satrexLightGray
                        : satrexDarkBlueDarkMode,
              }}
          >
                        <span
                            style={{ color: accomplished ? "white" : "initial" }}
                            className={` ${
                                classes.stepLabel
                            }`}
                        >
                          2
                        </span>
            <span
                style={{ color: accomplished ? satrexGreen : satrexTheme ? satrexGray : 'white' ,position:'absolute',top:'50px',whiteSpace:'nowrap',left:isEn ? '-20px' :'-10px',fontSize:16,fontWeight:'bold'}}
            ><Trans>secondLevel</Trans></span>
          </div>
      )
  ]

  return (
    <div style={{width:'100%'}}>
      <center >
       <Grid
         style={{padding:'35px 20px 35px',transform: isEn ? "" : "rotate(180deg)",}}
         data-tut="persoanlInfoLevels"
         size={{
           xs: 10,
           md: 6
         }}>
         <div
             className={classes.progressTrack}
             style={{
               backgroundColor: !satrexTheme ? satrexDarkBlueDarkMode : satrexLightGray,
             }}
         >
           <div
               className={classes.progressFill}
               style={{
                 width: `${progressPercent}%`,
                 backgroundColor: satrexGreen,
               }}
           />
         </div>
         <div className={classes.stepsRow}>
           {steps.map((item, index) => (
               <div key={index}>
                 {item({ accomplished: props.value === 0 ? index <= 1 : index === 0 })}
               </div>
           ))}
         </div>
       </Grid>
      </center>
        <TabPanel
          value={props.value}
          index={0}
          dir={lang === "EN" ? "ltr" : "rtl"}
        >


          <div style={{ padding: "16px" }}>{props.secondTab}</div>
        </TabPanel>
        <TabPanel
          value={props.value}
          index={1}
          dir={lang === "EN" ? "ltr" : "rtl"}
        >

          <div style={{ padding: "16px" }}>{props.firstTab}</div>
        </TabPanel>
    </div>
  );
};
