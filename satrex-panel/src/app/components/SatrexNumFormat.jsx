import React from 'react';
import { makeStyles } from '@mui/styles';
import { Tooltip } from '@mui/material';
import satrexFloatFormat from '../../utils/helpers/satrexFloatFormat';
import { numberWithCommas } from '../../utils/helpers/numberWithCommas';
import {LightTooltip} from "./LightTooltip";

const useStyles = makeStyles({
    popperStyle: {
        fontSize: 15,
    },
});

function SatrexNumFormat({ num }) {
    const hasValue = num !== null
        && num !== undefined
        && num !== ''
        && !(typeof num === 'number' && Number.isNaN(num));
    const numString = hasValue ? num.toString() : '';
    const floatPart = hasValue ? numString.split('.')[1] : null;

    const classes = useStyles();

    return (
        <>
            {
                hasValue
                && (
                    <LightTooltip
                        title={(
                            <span
                                dir="ltr"
                            >
                            {numberWithCommas(floatPart ? `${numString.split('.')[0]}.${floatPart.slice(0, 8)}` : numString)}
                            </span>
                        )}
                        classes={{
                            tooltip: classes.popperStyle,
                        }}
                    >
                        <i style={{ fontStyle: 'normal', direction: 'ltr' }}>{numberWithCommas(satrexFloatFormat(num))}</i>
                    </LightTooltip>
                )
            }
        </>
    );
}

export default SatrexNumFormat;
