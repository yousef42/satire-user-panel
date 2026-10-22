import { makeStyles } from '@mui/styles';
import { alpha } from '@mui/material';
import {
    satrexBorderDarkColor,
    satrexGreen,
    satrexRed,
    satrexSemiDarkerBlueDarkMode,
} from '../../../../styles/colors';

export default makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: 500,
    },
    tabsShell: {
        width: '100%',
        minHeight: 48,
        backgroundColor: (props) => (props.satrexTheme ? '#f8fafc' : 'rgba(8, 2, 28, 0.85)'),
        borderRadius: 12,
        border: (props) => `1px solid ${props.satrexTheme ? '#e2e8f0' : satrexBorderDarkColor}`,
        padding: 4,
        marginBottom: 14,
        overflow: 'hidden',
    },
    selectedTab: {
        backgroundColor: (props) => `${props.satrexTheme ? '#ffffff' : '#161129'} !important`,
        borderRadius: '10px !important',
        boxShadow: (props) => (props.satrexTheme
            ? '0 1px 3px rgba(15, 23, 42, 0.08)'
            : '0 10px 24px rgba(2, 6, 23, 0.28)'),
        '& span': {
            color: `${satrexGreen}!important`,
        },
    },
    selectedSellTab: {
        backgroundColor: (props) => `${props.satrexTheme ? '#ffffff' : '#161129'} !important`,
        borderRadius: '10px !important',
        boxShadow: (props) => (props.satrexTheme
            ? '0 1px 3px rgba(15, 23, 42, 0.08)'
            : '0 10px 24px rgba(2, 6, 23, 0.28)'),
        '& span': {
            color: `${satrexRed}!important`,
        },
    },
    indicatorGreen: {
        display: 'none',
    },
    indicatorRed: {
        display: 'none',
    },
    tabsRoot: {
        minHeight: '40px !important',
        display: 'flex',
        alignItems: 'center',
    },
    tabsFlexContainer: {
        gap: 3,
        alignItems: 'stretch',
    },
    tabsStyle: {
        width: '100%',
        minHeight: '40px !important',
    },
    tabStyle: {
        minWidth: '0px !important',
        minHeight: '40px !important',
        height: '40px !important',
        padding: '0 12px !important',
        backgroundColor: 'transparent',
        color: (props) => `${props.satrexTheme ? '#475569' : '#d9e4ff'} !important`,
        fontWeight: '700 !important',
        opacity: '1 !important',
        borderRadius: '10px !important',
        transition: 'all 0.2s ease !important',
        display: 'flex !important',
        alignItems: 'center !important',
        justifyContent: 'center !important',
        lineHeight: '1.2 !important',
        '&:hover': {
            backgroundColor: (props) => `${props.satrexTheme ? '#ffffff' : alpha(satrexSemiDarkerBlueDarkMode, 0.9)} !important`,
        },
    },
    tabWrapper: {
        position: 'relative',
        top: '0 !important',
        display: 'flex !important',
        alignItems: 'center !important',
        justifyContent: 'center !important',
        minHeight: '100%',
        lineHeight: '1.2 !important',
    },
    tabsFixed: {
        minHeight: '40px !important',
    },
    panelBox: {
        padding: '20px 22px',
        borderRadius: 16,
        backgroundColor: (props) => (props.satrexTheme ? '#ffffff' : '#0b0820'),
        border: (props) => `1px solid ${props.satrexTheme ? '#eceff5' : 'rgba(150, 107, 237, 0.24)'}`,
        boxShadow: (props) => (props.satrexTheme
            ? '0 1px 2px rgba(15, 23, 42, 0.04)'
            : '0 12px 30px rgba(2, 6, 23, 0.18)'),
    },
    tabPanel: {
        margin: 0,
    },
    tabPanelInner: {
        padding: 0,
    },
}));
