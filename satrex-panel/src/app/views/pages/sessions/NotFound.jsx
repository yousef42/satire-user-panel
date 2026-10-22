import React, { Component } from "react";
import { Button } from "@mui/material";
// import notFound from "../../../../images/404.svg";
import Trans from "../../../components/lang";
import {motion} from "framer-motion";
import Lottie from 'react-lottie';
import pageNotFound from "../../../../images/pageNotFound.json"

const transition = { duration: 4, yoyo: Infinity, ease: "easeInOut" }

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: pageNotFound,

};



class NotFound extends Component {
  state = {};
  render() {
    return (
      <div className="flex flex-center flex-middle w-100 h-100vh">
        <div
          className="flex flex-column flex-center flex-middle"
          style={{ maxWidth: 400 }}
        >
            <Lottie
                options={defaultOptions}
                height={400}
                width={400}
            />
          <Button
            className="darkBlueButton"
            style={{marginTop:100,maxWidth:300}}
            onClick={() => this.props.history.push("/")}
          >
            <Trans>BackToDashboard</Trans>
          </Button>
        </div>
      </div>
    );
  }
}

export default NotFound;
