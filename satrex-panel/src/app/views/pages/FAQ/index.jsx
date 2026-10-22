import React, {useEffect, useState} from "react";
import SatrexCard from "../../../components/SatrexCard";
import { Grid } from "@mui/material";
import {satrexGreen} from "../../../../styles/colors";
import CircleLoader from "react-spinners/CircleLoader";
import {css} from "@emotion/react";
import QuestionList from "../FAQ/questionsList";
import {transFn} from "../../../components/lang";
import AnimatedPage from "../../../components/AnimatedPage";

export default () => {


    return (
        <AnimatedPage>
            <div style={{marginTop: "20px"}}>
                <SatrexCard header={transFn('FAQ')}>
                    <div style={{padding: "20px"}}>
                        <Grid container>
                            <Grid size={2} />
                            <Grid size={8}>
                                <QuestionList/>
                            </Grid>
                            <Grid size={2} />
                        </Grid>
                    </div>
                </SatrexCard>
            </div>
        </AnimatedPage>
    );
};
