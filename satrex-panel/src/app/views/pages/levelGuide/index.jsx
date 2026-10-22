import React from "react";
import SatrexCard from "../../../components/SatrexCard";
import Liked from "../help/Liked";
import Trans from "../../../components/lang"
import {satrexGreen} from "../../../../styles/colors";
import image1 from "../../../../images/levelGuideImages/1-min.png"
import image2 from "../../../../images/levelGuideImages/2-min.png"
import image3 from "../../../../images/levelGuideImages/3-min.png"
import image4 from "../../../../images/levelGuideImages/4-min.png"
import image5 from "../../../../images/levelGuideImages/5-min.png"
import image6 from "../../../../images/levelGuideImages/6-min.png"
import image7 from "../../../../images/levelGuideImages/7-min.png"
import image8 from "../../../../images/levelGuideImages/8-min.png"
import AnimatedPage from "../../../components/AnimatedPage";

export default () => {
  return (
      <AnimatedPage>
        <div>
        <SatrexCard
          style={{marginTop: "20px"}}
          header="HelpsatrexUserLevels"
      >
        <div style={{padding: "20px"}} className="footerPage">
          <p><Trans>levelPageLine1</Trans></p>
          <h5 style={{marginTop: "30px", color: satrexGreen}}><Trans>UserLevelOne</Trans></h5>
          <p><Trans>levelPageLine2</Trans></p>
          <p><Trans>levelPageLine3</Trans></p>
          <div style={{padding:20}}><img src={image1} style={{width:'100%'}} alt=""/></div>
          <div style={{padding:20}}><img src={image2} style={{width:'100%'}} alt=""/></div>
          <div style={{padding:20}}><img src={image3} style={{width:'100%'}} alt=""/></div>
          <p><Trans>levelPageLine4</Trans></p>
          <div style={{padding:20}}><img src={image4} style={{width:'100%'}} alt=""/></div>
          <p><Trans>levelPageLine5</Trans></p>
          <div style={{padding:20}}><img src={image5} style={{width:'100%'}} alt=""/></div>
          <p><Trans>levelPageLine6</Trans></p>
          <div style={{padding:20}}><img src={image6} style={{width:'100%'}} alt=""/></div>
          <p><Trans>levelPageLine7</Trans></p>
          <p><Trans>levelPageLine8</Trans></p>
          <div style={{padding:20}}><img src={image7} style={{width:'100%'}} alt=""/></div>
          <div style={{padding:20}}><img src={image8} style={{width:'100%'}} alt=""/></div>
        </div>
        <Liked/>
      </SatrexCard></div>
      </AnimatedPage>
  );
};
