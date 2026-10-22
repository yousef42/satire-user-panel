import React, { useState } from "react";
import personalPhoto from "../../../../../images/helpPhotos/نمونه تصویر شخصی.png";
import Liked from "../Liked";
import Trans,{transFn} from "../../../../components/lang";

export default () => {
  return (
    <div style={{width:'100%'}}>
      <div style={{ padding: "20px" }}>
        <p><Trans>helpPageDescriptionLine59</Trans></p>
        <p>نمونه قابل قبول تصویر شخصی</p>
        <center>
          <img
            src={personalPhoto}
            style={{ width: "1200px", height: "600px" }}
            alt=""
          />
        </center>
        <p><Trans>helpPageDescriptionLine60</Trans></p>
        <p><Trans>helpPageDescriptionLine61</Trans></p>
        <p><Trans>helpPageDescriptionLine62</Trans></p>
        <p><Trans>helpPageDescriptionLine63</Trans></p>
        <p><Trans>helpPageDescriptionLine64</Trans></p>
        <center>
          <div style={{ width: "80%", textAlign: "right" }}>
            <p style={{ color: "#0e88af" }}><Trans>helpPageDescriptionLine65</Trans></p>
            <p style={{ color: "#0e88af" }}><Trans>helpPageDescriptionLine66</Trans></p>
          </div>
        </center>
      </div>
      <Liked />
    </div>
  );
};
