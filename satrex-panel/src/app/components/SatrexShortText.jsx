import React from 'react';
import { makeStyles } from '@mui/styles';
import { truncate } from '../../utils/helpers/shortenText';
import { LightTooltip } from './LightTooltip';

const useStyles = makeStyles({
    popperStyle: {
        fontSize: 17,
    },
});

function satrexShortText({ text }) {
    const classes = useStyles();

    return (
        <LightTooltip
            title={text}
            arrow
            classes={{
                tooltip: classes.popperStyle,
            }}
        >
            <span>{truncate(text)}</span>
        </LightTooltip>
    );
}

export default satrexShortText;
