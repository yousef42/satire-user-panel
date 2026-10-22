import { makeStyles } from '@mui/styles';
import { alpha as colorFade } from '@mui/material';
import { satrexBlack, satrexGreen } from '../../../../styles/colors';

export default makeStyles((theme) => ({
    chartTitle: {
        color: `${satrexGreen}!important`,
    },

    miniCardTitle: {
        fontSize: '16px !important',
        paddingBottom: '10%',
    },
    miniCard: {
        padding: 15,
        height: '112px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    miniCardInfo: {
        fontSize: '17px !important',
        color: satrexBlack,
    },
    cryptoSymbol: {
        position: 'relative',
        top: '10px',
    },
    selectedTab: {
        backgroundColor: colorFade(satrexGreen, 0.2),
        '& span': {
            color: satrexGreen,
        },
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
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        border: 'solid 1px #ADADAD',
        borderRadius: '0.3em',

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
        border: 'solid 1px #ADADAD',
        borderRadius: '0.3em',
        [theme.breakpoints.up('sm')]: {
            width: '180px',
            '&:focus': {
                width: '200px',
            },
        },
    },
    tableHead: {
        fontSize: '11px',
    },
}));
