import React from "react";
import Liked from "../Liked";
import Trans from "../../../../components/lang"
import {satrexGreen} from "../../../../../styles/colors";
export default () => {
  return (
    <div style={{width:'100%'}}>
      <div style={{ padding: "20px" }}>
        <p><Trans>helpPageDescriptionLine55</Trans></p>

        <h5 style={{ marginTop: "30px",color:satrexGreen }}><Trans>UserLevel1</Trans></h5>
        <p><Trans>helpPageDescriptionLine56</Trans></p>
        <h5 style={{ marginTop: "30px",color:satrexGreen }}><Trans>UserLevel2</Trans></h5>
        <p><Trans>helpPageDescriptionLine57</Trans></p>
        <p><Trans>helpPageDescriptionLine58</Trans></p>
      </div>
      <Liked />
    </div>
  );
};
