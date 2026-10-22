import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { lighten } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Table } from '@mui/material';
import { TableBody } from '@mui/material';
import { TableCell } from '@mui/material';
import { TableContainer } from '@mui/material';
import { TableHead } from '@mui/material';
import { TableRow } from '@mui/material';
import parser from 'persian-date-parser';
import { Divider } from '@mui/material';
import { useSelector } from 'react-redux';
import { Grid } from '@mui/material';
import jmoment from 'jalali-moment';
import { Card } from '@mui/material';
import starkString from 'starkstring';
import convertTz from '../../../components/convertTz';
import Trans from '../../../components/lang';
import { satrexBorderDarkColor, satrexDarkerBlueDarkMode, satrexLightGray } from '../../../../styles/colors';
import satrexApi from '../../../components/api';
import SatrexNumFormat from '../../../components/SatrexNumFormat';

function EnhancedTableHead(props) {
    const { classes } = props;
    const satrexTheme = useSelector((state) => state.layout.theme);
    return (
        <TableHead>
            <TableRow>
                <TableCell
                    className={classes.tbCell}
                    align="left"
                    padding="none"
                    style={{
                        backgroundColor: !satrexTheme ? '#12121e' : satrexLightGray,
                        padding: '6px',
                    }}
                >
                    <span />
                </TableCell>

                <TableCell
                    className={classes.tbCell}
                    align="center"
                    padding="none"
                    style={{
                        backgroundColor: !satrexTheme ? '#12121e' : satrexLightGray,
                        padding: '6px',
                    }}
                >
                    <span />
                </TableCell>
                <TableCell
                    className={classes.tbCell}
                    align="right"
                    padding="none"
                    style={{
                        backgroundColor: !satrexTheme ? '#12121e' : satrexLightGray,
                        padding: '6px',
                    }}
                >
                    <span />
                </TableCell>
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.mode === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
    },
}));

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxHeight: '48%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: '100%',
        fontSize: '12px',
        tr: {
            th: {
                fontSize: 10,
            },
        },
        direction: 'ltr',
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
    tbCell: {
        '& i': {
            fontSize: 13,
        },
        width: '30%',
        paddingRight: 3,
    },
    tbContainer: {
        height: '100%',
        direction: 'rtl',
    },
}));

export default function (props) {
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [matchedOrders, setMatchedOrders] = React.useState([]);
    const [rows, setRows] = useState([]);
    const satrexTheme = useSelector((state) => state.layout.theme);
    const parse = parser();
    const lang = useSelector((state) => state.user.language);
    const isEn = lang === 'EN' || lang === 'gr' || lang === 'fr';
    const cardStyle = satrexTheme
        ? { width: '100%', height: props.maxTableHeight ? (props.maxTableHeight - 2) : 'unset', backgroundColor: '#ffffff', border: '1px solid #ececec' }
        : { width: '100%', height: props.maxTableHeight ? (props.maxTableHeight - 2) : 'unset', backgroundColor: satrexDarkerBlueDarkMode, border: `1px solid ${satrexBorderDarkColor}` };
    const headerTextColor = satrexTheme ? '#111827' : '#eef2ff';

    useEffect(() => {
        let isMounted = true;
        let refreshBoard;
        if (isMounted) {
            refreshBoard = setInterval(() => {
                satrexApi
                    .post('/Board/GetSpotLimitLastCompletedOrders', {
                        count: 30,
                        pairId: props.pair,
                    })
                    .then(({ data }) => {
                        setMatchedOrders(data.data.lastCompletedOrders.reverse());
                    });
            }, 1000);
        }
        return () => {
            clearInterval(refreshBoard);
            isMounted = false;
        };
    }, [props.orderType, props.maxTableHeight]);

    return (
        <Card
            className="contentCard"
            style={cardStyle}
            data-tut="matchedOrdersPart"
        >
            <div className="cardHeader">
                <h4
                    style={{
                        textAlign: lang === 'EN' ? 'left' : 'right',
                        color: headerTextColor,
                    }}
                >
                    <Trans>BoardOfCompletedTransaction</Trans>
                </h4>
            </div>
            <div style={{ paddingRight: '5px', paddingLeft: '5px', width: '100%' }} className="scrollLight">
                <Divider />
                <Grid
                    container
                    style={{
                        backgroundColor: !satrexTheme ? '#12121e' : '#ecebef',
                        borderRadius: '7px',
                        padding: 7,
                        marginTop: 6,
                        direction: 'rtl',
                        color: !satrexTheme ? '#eef2ff' : '#111827',
                    }}
                >
                    <Grid style={{ textAlign: 'right' }} size={4}>
                        <Trans>amount</Trans>
                    </Grid>
                    <Grid size={4}>
                        <Trans>price</Trans>
                    </Grid>
                    <Grid style={{ textAlign: 'left' }} size={4}>

                        <Trans>time</Trans>
                    </Grid>
                </Grid>
                <div style={{
                    direction: isEn ? 'ltr' : 'rtl',
                    maxHeight: props.maxTableHeight ? props.maxTableHeight - 103 : 'unset',
                    overflow: 'auto',
                }}
                >
                    <TableContainer
                        className={` ${classes.tbContainer}`}
                    >
                        <Table
                            stickyHeader
                            classes={{
                                root: classes.table,
                            }}
                            aria-labelledby="tableTitle"
                            size="small"
                            aria-label="enhanced table"
                        >

                            <TableBody>
                                {matchedOrders.map((row, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow hover tabIndex={-1} key={index} className="displayTableCell">
                                            <TableCell
                                                className={` ${classes.tbCell} persianNum`}
                                                style={{ borderBottom: 'none', fontSize: 13, color: !satrexTheme ? '#d9e2ff' : '#111827' }}
                                                align="left"
                                                id={labelId}
                                                scope="row"
                                                padding="none"

                                            >
                                                {
                                                    isEn ? starkString(jmoment(convertTz(row.createdAtUtc, 'Asia/Tehran').getTime()).format('HH:mm:ss')).englishNumber().toString()
                                                        : jmoment(convertTz(row.createdAtUtc, 'Asia/Tehran').getTime()).format('HH:mm:ss')
                                                }
                                            </TableCell>
                                            <TableCell
                                                className={`${classes.tbCell}  ${
                                                    row.orderType === 'Buy' ? 'grc' : 'rrc'
                                                } persianNum`}
                                                style={{ borderBottom: 'none', fontSize: 13 }}
                                                align="center"
                                            >
                                                {/* {new Intl.NumberFormat().format(row.price)} */}
                                                <SatrexNumFormat
                                                    num={row.price}
                                                />
                                            </TableCell>
                                            <TableCell
                                                className={`${classes.tbCell} volumeCol persianNum`}
                                                style={{ borderBottom: 'none', color: !satrexTheme ? '#d9e2ff' : '#111827' }}
                                                align="right"
                                            >
                                                <SatrexNumFormat
                                                    num={row.volume}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </Card>
    );
}
