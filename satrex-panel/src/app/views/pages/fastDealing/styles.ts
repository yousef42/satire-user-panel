import { makeStyles } from '@mui/styles';
import { alpha } from '@mui/material';
import {
    satrexBorderDarkColor,
    satrexGreen,
    satrexSemiDarkerBlueDarkMode,
} from '../../../../styles/colors';

export default makeStyles((theme) => ({
    formRoot: {
        width: '100%',
        display: 'block !important',
    },
    formStack: {
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        width: '100%',
    },
    fieldBlock: {
        marginTop: '0 !important',
        width: '100%',
    },
    fieldLabel: {
        display: 'block',
        marginBottom: 7,
        fontSize: 13,
        fontWeight: 700,
        color: (props) => (props.satrexTheme ? '#475569' : '#d7e3ff'),
        textAlign: 'right',
    },
    countryButton: {
        borderRadius: 12,
        position: 'relative',
        border: (props) => `1px solid ${props.satrexTheme ? '#cbd5e1' : satrexBorderDarkColor}`,
        fontSize: 15,
        height: 48,
        width: '100%',
        padding: '12px 14px',
        color: (props) => `${props.satrexTheme ? '#1f2937' : '#edf2ff'} !important`,
        backgroundColor: (props) => `${props.satrexTheme ? '#ffffff' : satrexSemiDarkerBlueDarkMode} !important`,
        boxSizing: 'border-box',
        appearance: 'none',
        textAlign: 'inherit',
        '&:focus': {
            boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
            borderColor: theme.palette.primary.main,
        },
        '&:hover': {
            backgroundColor: (props) => `${props.satrexTheme ? '#ffffff' : satrexSemiDarkerBlueDarkMode} !important`,
        },
    },
    triggerContent: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        gap: 12,
    },
    selectedAsset: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        flex: 1,
        minWidth: 0,
        overflow: 'hidden',
    },
    assetPlaceholder: {
        width: 22,
        height: 22,
        borderRadius: '50%',
        backgroundColor: (props) => (props.satrexTheme ? '#e2e8f0' : 'rgba(148, 163, 184, 0.22)'),
        flexShrink: 0,
    },
    assetLabel: {
        fontSize: 15,
        fontWeight: 600,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    chevronWrap: {
        width: 28,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    },
    popoverStyle: {
        minWidth: '280px !important',
        maxHeight: '500px !important',
        backgroundColor: (props) => `${props.satrexTheme ? '#ffffff' : '#0f172a'} !important`,
        color: (props) => `${props.satrexTheme ? '#1f2937' : '#edf2ff'} !important`,
        border: (props) => `1px solid ${props.satrexTheme ? '#cbd5e1' : 'rgba(148, 163, 184, 0.18)'}`,
        borderRadius: '14px !important',
        boxShadow: (props) => (props.satrexTheme
            ? '0 18px 40px rgba(15, 23, 42, 0.12)'
            : '0 18px 40px rgba(2, 6, 23, 0.42)'),
    },
    menuItem: {
        padding: '10px 14px !important',
    },
    menuItemInner: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
    },
    menuIconWrap: {
        width: 28,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    },
    menuText: {
        fontSize: 14,
        fontWeight: 600,
    },
    infoBlock: {
        marginTop: 2,
        lineHeight: 1.9,
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
        gap: '10px 14px',
        padding: '14px 16px',
        borderRadius: 12,
        color: (props) => (props.satrexTheme ? '#334155' : '#dce6ff'),
        backgroundColor: (props) => (props.satrexTheme ? '#f8fafc' : 'rgba(18, 14, 37, 0.92)'),
        border: (props) => `1px solid ${props.satrexTheme ? '#e2e8f0' : 'rgba(148, 163, 184, 0.16)'}`,
        fontSize: 13,
        justifyItems: 'center',
        alignItems: 'center',
    },
    balanceRow: {
        gridColumn: '1 / -1',
        marginBottom: 2,
        textAlign: 'center',
        fontWeight: 'bold !important',
        fontSize: '14px !important',
    },
    infoCell: {
        textAlign: 'center',
        whiteSpace: 'nowrap',
        minWidth: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
    },
    amountInWords: {
        textAlign: 'center',
        color: (props) => (props.satrexTheme ? '#64748b' : '#9fb0d0'),
        lineHeight: 1.8,
        fontSize: 13,
        minHeight: 24,
    },
    maxAmountAction: {
        textAlign: 'center',
        marginTop: 2,
        lineHeight: 1.8,
        cursor: 'pointer',
        fontSize: 13,
        fontWeight: 600,
    },
    submitButtonWrap: {
        width: '100%',
        '& > *': {
            width: '100%',
        },
    },
    buyButton: {
        width: '100% !important',
        height: '48px !important',
        borderRadius: '12px !important',
        fontWeight: '600 !important',
        '& span': {
            fontSize: '15px !important',
        },
    },
    sellButton: {
        width: '100% !important',
        height: '48px !important',
        borderRadius: '12px !important',
        fontWeight: '600 !important',
        color: '#ffffff !important',
        '& span': {
            fontSize: '15px !important',
            color: '#ffffff !important',
        },
    },
    noteText: {
        padding: '16px 20px 22px',
        marginBottom: 0,
        lineHeight: 1.9,
        fontSize: 13,
        textAlign: 'center',
    },
    noteLink: {
        color: `${satrexGreen} !important`,
        textDecoration: 'none',
        fontWeight: '700 !important',
    },
    '@media (max-width: 600px)': {
        infoBlock: {
            gridTemplateColumns: '1fr',
        },
        balanceRow: {
            gridColumn: '1 / -1',
        },
    },
}));
