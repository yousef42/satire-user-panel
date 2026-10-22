import React, { useState } from "react";
import Liked from "../Liked";
import Trans,{transFn} from "../../../../components/lang";

export default () => {
  return (
    <div style={{width:'100%'}}>
      <div style={{ padding: "20px" }}>
        <p>
          <Trans>helpPageDescriptionLine17</Trans>
        </p>
        <p>
          <Trans>helpPageDescriptionLine18</Trans>
        </p>
        <p>
         <Trans>helpPageDescriptionLine19</Trans>
        </p>
        <p>
          <Trans>helpPageDescriptionLine20</Trans>
        </p>
        <p>
          <Trans>helpPageDescriptionLine21</Trans>
        </p>
        <p>
          <Trans>helpPageDescriptionLine22</Trans>
        </p>
      </div>
      <Liked />
    </div>
  );
};
