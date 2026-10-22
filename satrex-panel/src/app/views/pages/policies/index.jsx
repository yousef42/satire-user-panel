import React, { useState } from "react";
import SatrexCard from "../../../components/SatrexCard";
import { satrexGreen } from "../../../../styles/colors";
import { css } from "@emotion/react";
import Trans from "../../../components/lang"
import AnimatedPage from "../../../components/AnimatedPage";


export default () => {


  return (
      <AnimatedPage>
          <div style={{ marginTop: "20px" }}>
      <SatrexCard header="policiesPageDescriptionLine1">
        <div style={{ padding: "20px" }}   className="footerPage">
          <p style={{ textAlign: "justify", textJustify: "inter-word" }}><Trans>policiesPageDescriptionLine2</Trans></p>
          <h4 style={{color:satrexGreen}}><Trans>policiesPageDescriptionLine3</Trans></h4>
          <div style={{marginTop: "20px" }}><Trans>policiesPageDescriptionLine4</Trans></div>
          <div>
            <ul>
              <li style={{ marginTop: "8px" }}><Trans>policiesPageDescriptionLine5</Trans></li>
              <li style={{ marginTop: "8px" }}><Trans>policiesPageDescriptionLine6</Trans> </li>
              <li style={{ marginTop: "8px" }}><Trans>policiesPageDescriptionLine7</Trans></li>
              <li style={{ marginTop: "8px" }}><Trans>policiesPageDescriptionLine7</Trans></li>
              <li style={{ marginTop: "8px" }}><Trans>policiesPageDescriptionLine8</Trans></li>
              <li style={{ marginTop: "8px" }}><Trans>policiesPageDescriptionLine9</Trans> </li>
              <li style={{ marginTop: "8px" }}><Trans>policiesPageDescriptionLine10</Trans></li>
              <li style={{ marginTop: "8px" }}><Trans>policiesPageDescriptionLine11</Trans></li>
              <li style={{ marginTop: "8px" }}><Trans>policiesPageDescriptionLine12</Trans></li>
              <li style={{ marginTop: "8px" }}><Trans>policiesPageDescriptionLine13</Trans></li>
              <li style={{ marginTop: "8px" }}><Trans>policiesPageDescriptionLine13a</Trans></li>
              <li style={{ marginTop: "8px" }}><Trans>policiesPageDescriptionLine14</Trans></li>
              <li style={{ marginTop: "8px" }}><Trans>policiesPageDescriptionLine15</Trans></li>
              <li style={{ marginTop: "8px" }}><Trans>policiesPageDescriptionLine16</Trans></li>
              <li style={{ marginTop: "8px" }}><Trans>policiesPageDescriptionLine17</Trans></li>
            </ul>
          </div>
          <h4 style={{color:satrexGreen}}><Trans>policiesPageDescriptionLine18</Trans></h4>
          <div><Trans>policiesPageDescriptionLine19</Trans></div>
        </div>
        {/*<CircleLoader color={color} loading={loading} css={override} size={50} />*/}
        {/*<iframe src="https://platform.tgju.org/tv3/?symbol=price_dollar_rl" frameborder="0" width="100%" height="800px"/>*/}
      </SatrexCard>
    </div>
      </AnimatedPage>
  );
};
