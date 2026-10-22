import React, { useEffect, useState } from "react";
import Trans from "../../../../components/lang";
import InputMask from "reactMask";
import LoadingButton from "../../../../components/LoadingButton";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { withStyles } from "@mui/styles";
import { alpha } from "@mui/material"; import { makeStyles } from "@mui/styles";
import { InputBase } from "@mui/material";
import { satrexSemiGray } from "../../../../../styles/colors";
import { setSelector } from "../../../../MasterLayout/Layout1/SidenavContainer";
const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 8,
    position: "relative",
    border: "1px solid #d6d6d6",
    fontSize: 16,
    height: 24,
    width: "100%",
    padding: "10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  smsCodeInput: {
    "& input": {
      textAlign: "center",
      letterSpacing: "3px",
    },
  },
  buttonDisabled: {
    backgroundColor: satrexSemiGray + " !important",
  },
}));
export default (props) => {
  const lang = useSelector((state) => state.user.language);
  const isEn = lang === "EN" || lang === "gr" || lang === "fr";
  const [smsSecretCode, setSmsSecretCode] = useState(false);
  const [enableButton, setEnableButton] = useState(true);
  const [timer, setTimer] = useState();
  const classes = useStyles({ isEn });

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      var countDownDate = new Date(new Date().getTime() + 3 * 60000).getTime();
      var x = setInterval(function () {
        var now = new Date().getTime();

        var distance = countDownDate - now;

        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        // (minutes + "m " + seconds + "s ")
        setTimer(minutes + ":" + seconds);
        if (distance < 0) {
          setEnableButton(false);
          clearInterval(x);
        }
      }, 1000);
    }
    return () => { isMounted = false }
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <div style={{ fontSize: "14px", marginTop: "1%" }}>
        <span><Trans>The login code was sent to your email number</Trans></span>
      </div>
      <InputMask
        mask={`9-9-9-9-9-9`}
        disabled={false}
        maskChar=" "
        onChange={(e) => {
          props.setValue(e.target.value);
        }}
      >
        {() => (
          <BootstrapInput
            id="bootstrap-input"
            style={{ direction: "ltr", width: "90%" }}
            className={classes.smsCodeInput}
          />
        )}
      </InputMask>
      {enableButton && (
        <p>
          <Trans>ResendCodeUp</Trans>{" "}
          <span className={isEn ? "enNum" : "faNum"}>{timer}</span>
        </p>
      )}
      {!enableButton && (
        <p
          onClick={props.tryAgain}
          style={{ color: "blue", cursor: "pointer" }}
        >
          <Trans>resend</Trans>
        </p>
      )}
      <LoadingButton loading={props.loading}>
        <Button
          variant="contained"
          color="primary"
          disableElevation
          style={{ color: "white" }}
          className="submitButton"
          type="submit"
          onClick={props.action}
          classes={{
            disabled: classes.buttonDisabled,
          }}
          disabled={props.loading}
        >
          <Trans>continue</Trans>
        </Button>
      </LoadingButton>
    </div>
  );
};
