import React from 'react'
import { Tooltip } from '@mui/material';
import { withStyles } from '@mui/styles';
import {satrexGray} from "../../styles/colors";


export const LightTooltip = withStyles((theme) => ({
    tooltip: {
        color: satrexGray,
        backgroundColor: 'white',
        boxShadow: '0px 0px 20px -4px #c4c4c4',
        transition: '0.3s',
        border:
            `solid 1px '#ececec'`,
        borderRadius: '8px',
    },
    arrow: {
        color: 'white',
    },
}))(Tooltip);
