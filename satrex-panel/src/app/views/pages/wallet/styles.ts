import { makeStyles } from '@mui/styles';
import ThemeAtrr from '../../../MasterLayout/MasterTheme/ThemeAtrr';
import {
    satrexBorderDarkColor,
    satrexGray,
    satrexGreen,
    satrexRed,
    satrexSemiDarkerBlueDarkMode,
} from '../../../../styles/colors';

export default makeStyles((theme) => ({
    root: {
        width: '100%',
        marginTop: '1%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
    tableHead: {
        fontSize: '11px',
        borderBottom: 'none',
        '&:hover': {
            '& svg': {
                color: satrexGray,
            },
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,

        marginLeft: 0,
        textAlign: 'left',
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 'auto',
        },
    },
    searchEn: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        marginLeft: 0,
        textAlign: 'right',
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '39px',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        left: '-2%',
        zIndex: 10,
        color: (props) => (props.satrexTheme ? satrexGray : '#ecebef'),
    },
    searchIconEn: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        right: '-2%',
        zIndex: 10,
        color: (props) => (props.satrexTheme ? satrexGray : '#ecebef'),
    },
    inputRoot: {
        color: (props) => (props.satrexTheme ? 'inherit' : '#ecebef'),
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        border: (props) => `solid 1px ${props.satrexTheme ? '#ADADAD' : satrexBorderDarkColor}`,
        borderRadius: '0.3em',
        backgroundColor: (props) => ((props.extraTheme !== true && props.extraTheme)
            ? ThemeAtrr(props.extraTheme)?.inputStyle?.backgroundColor
            : (!props.satrexTheme ? satrexSemiDarkerBlueDarkMode : 'transparent')),
        color: (props) => (props.satrexTheme ? 'inherit' : '#ecebef'),
        [theme.breakpoints.up('sm')]: {
            width: '150px',
            '&:focus': {
                width: '180px',
            },
        },
    },
    inputInputEn: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingRight: `calc(1em + ${theme.spacing(4)}px)`,
        paddingLeft: '10px',
        transition: theme.transitions.create('width'),
        width: '100%',
        border: (props) => `solid 1px ${props.satrexTheme ? '#ADADAD' : satrexBorderDarkColor}`,
        borderRadius: '0.3em',
        backgroundColor: (props) => ((props.extraTheme !== true && props.extraTheme)
            ? ThemeAtrr(props.extraTheme)?.inputStyle?.backgroundColor
            : (!props.satrexTheme ? satrexSemiDarkerBlueDarkMode : 'transparent')),
        color: (props) => (props.satrexTheme ? 'inherit' : '#ecebef'),
        [theme.breakpoints.up('sm')]: {
            width: '180px',
            '&:focus': {
                width: '200px',
            },
        },
    },
    tableRow: {
        '&:hover': {
            '& .depositAction': {
                borderColor: 'rgba(239, 68, 68, 0.4)',
            },
            '& .withdrawalAction': {
                borderColor: 'rgba(34, 197, 94, 0.4)',
            },
            '& .update': {
                color: 'lightblue',
            },
        },
    },
    actionsWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        flexWrap: 'wrap',
        minWidth: 190,
    },
    actionButton: {
        minWidth: 86,
        height: 38,
        borderRadius: 12,
        padding: '8px 12px',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        cursor: 'pointer',
        border: (props) => `1px solid ${props.satrexTheme ? 'rgba(148, 163, 184, 0.4)' : 'rgba(148, 163, 184, 0.2)'}`,
        backgroundColor: (props) => (props.satrexTheme ? 'rgba(248, 250, 252, 0.9)' : 'rgba(15, 23, 42, 0.4)'),
        transition: 'all 160ms ease',
        '&:hover': {
            transform: 'translateY(-1px)',
        },
    },
    actionLabel: {
        fontSize: 13,
        fontWeight: 700,
        lineHeight: 1,
        whiteSpace: 'nowrap',
    },
    sortIcon: {
        marginLeft: 10,
        transform: 'rotate(90deg)',
        fontSize: '13px',
    },
}));
