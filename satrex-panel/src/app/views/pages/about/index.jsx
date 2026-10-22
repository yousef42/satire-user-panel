import React, {useEffect, useState} from "react";
import SatrexCard from "../../../components/SatrexCard";
import Trans from "../../../components/lang"
import AnimatedPage from "../../../components/AnimatedPage";


export default () => {


    // function verifiedCallback(token) {
    //     console.log("Captcha token: " + token);
    // }
    // // anime({
    //   targets: '.line-drawing-demo .lines path',
    //
    // });
    return (
        <AnimatedPage>
            <div style={{marginTop: "20px"}} className="satrexLazyload">
                <SatrexCard header="Aboutsatrex">
                    <div style={{padding: "20px"}} className="footerPage">
                        <p style={{textAlign: "justify"}}>
                            <Trans>aboutusPageDescriptionLine1</Trans></p>
                        <div><Trans>aboutusPageDescriptionLine2</Trans> :</div>
                        <div><Trans>aboutusPageDescriptionLine3</Trans></div>
                        <div style={{marginTop: "6px"}}><Trans>aboutusPageDescriptionLine4</Trans></div>
                        <div>
                            <ul>
                                <li><Trans>aboutusPageDescriptionLine5</Trans></li>
                                <li><Trans>aboutusPageDescriptionLine6</Trans></li>
                                <li><Trans>aboutusPageDescriptionLine7</Trans></li>
                                <li><Trans>aboutusPageDescriptionLine8</Trans></li>
                                <li><Trans>aboutusPageDescriptionLine9</Trans></li>
                                <li><Trans>aboutusPageDescriptionLine10</Trans></li>
                                {/*<li>و.....</li>*/}
                            </ul>
                        </div>
                        <div><Trans>Cited</Trans></div>
                    </div>
                    {/*<CircleLoader color={color} loading={loading} css={override} size={50} />*/}
                    {/*<iframe src="https://platform.tgju.org/tv3/?symbol=price_dollar_rl" frameborder="0" width="100%" height="800px"/>*/}
                </SatrexCard>
            </div>

        </AnimatedPage>

    );
};
