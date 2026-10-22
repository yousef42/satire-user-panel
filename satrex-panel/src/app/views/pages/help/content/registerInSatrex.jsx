import React, { useState } from "react";
import registerPic from "../../../../../images/helpPhotos/1.png";
import codePic from "../../../../../images/helpPhotos/2.png";
import Liked from "../Liked";
import Trans,{transFn} from "../../../../components/lang";

export default () => {
  return (
    <div style={{width:'100%'}}>
      <div style={{ padding: "20px" }}>
        <p><Trans>helpPageDescriptionLine27</Trans></p>
        <p><Trans>helpPageDescriptionLine28</Trans></p>
        <center>
          <img
            src={registerPic}
            style={{ width: "1200px", height: "600px" }}
            alt=""
          />
        </center>
        <p><Trans>helpPageDescriptionLine29</Trans></p>
        <center>
          <img
            src={codePic}
            style={{ width: "1200px", height: "600px" }}
            alt=""
          />
        </center>
        <p><Trans>helpPageDescriptionLine30</Trans></p>
      </div>
      <Liked />
    </div>
  );
};
