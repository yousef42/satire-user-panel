import React, { useState } from "react";
import Trans from "../../../../components/lang"
import Liked from "../Liked";
import {satrexGreen} from "../../../../../styles/colors";

export default () => {
  return (
    <div style={{width:'100%'}}>
      <div style={{ padding: "20px" }}>
        <p><Trans>helpPageDescriptionLine23</Trans> </p>
        <p><Trans>1.LimitedOrdering</Trans> Limit</p>
        <p><Trans>2.MarketOrdering</Trans> Market</p>
        <h5 style={{ marginTop: "30px",color:satrexGreen }}><Trans>Limited ordering</Trans></h5>
        <p><Trans>helpPageDescriptionLine24</Trans></p>
        <h5 style={{ marginTop: "30px",color:satrexGreen }}><Trans>Market ordering</Trans></h5>
        <p><Trans>helpPageDescriptionLine25</Trans></p>
        <h5 style={{ marginTop: "30px",color:satrexGreen }}><Trans>FastOrdering</Trans></h5>
        <p><Trans>helpPageDescriptionLine26</Trans></p>
      </div>
      <Liked />
    </div>
  );
};
