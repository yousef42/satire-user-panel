import React, { useState } from 'react';
import {
    makeStyles,
} from '@mui/styles';

import { useSelector } from 'react-redux';
import { Grid } from '@mui/material';
import {
    Card, useMediaQuery,

} from '@mui/material';
import { Divider } from '@mui/material';
import { useQueryClient } from 'react-query';
import moment from 'moment';
import starkString from 'starkstring';
import jmoment from 'jalali-moment';
import {
    satrexBorderDarkColor,
    satrexDarkerBlueDarkMode,
    satrexGray,
    satrexGreen,
    satrexRed,
    satrexSemiGray,
} from '../../../../styles/colors';

import Trans from '../../../components/lang';
import SatrexTable from '../../../components/Table/SatrexTable';
import SatrexNumFormat from '../../../components/SatrexNumFormat';
import { useOrderList } from '../../../../utils/queries';
import TableLoader from '../../../components/Table/TableLoader';
import convertTz from '../../../components/convertTz';

const useStyles = makeStyles((theme) => ({
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
        paddingLeft: '10px',
        '&:hover': {
            '& svg': {
                color: satrexGray,
            },
        },
    },
    tableRow: {
        '&:hover': {
            '& .depositIcon': {
                color: satrexRed,
            },
            '& .withdrawalIcon': {
                color: satrexGreen,
            },
        },
    },
    sortIcon: {
        color: satrexSemiGray,
        transform: 'rotate(90deg)',
        fontSize: '13px',
    },
}));

export default function () {
    const queryClient = useQueryClient();
    const [mounted, setMounted] = useState(false);
    const [page, setPage] = useState(0);
    const sm = useMediaQuery('(min-width:576px)');
    const md = useMediaQuery('(min-width:768px)');
    const lg = useMediaQuery('(min-width:992px)');
    const xl = useMediaQuery('(min-width:1200px)');
    const { data: todayOrderList, isLoading } = useOrderList({
        FromDateUtc: starkString(moment().format('YYYY-MM-DD'))
            .englishNumber()
            .toString(),
        ToDateUtc: starkString(moment().add(1, 'days').format('YYYY-MM-DD'))
            .englishNumber()
            .toString(),
        pageIndex: page,
    });
    const classes = useStyles();

    const lang = useSelector((state) => state.user.language);
    const satrexTheme = useSelector((state) => state.layout.theme);
    const isEn = lang === 'EN' || lang === 'gr' || lang === 'fr';
    const cardStyle = satrexTheme
        ? { marginTop: '1%', backgroundColor: '#ffffff', border: '1px solid #ececec' }
        : { marginTop: '1%', backgroundColor: satrexDarkerBlueDarkMode, border: `1px solid ${satrexBorderDarkColor}` };
    const headerTextColor = satrexTheme ? '#111827' : '#eef2ff';

    const handlePagination = (value) => {
        setPage(value);
    };

    // console.log('todayOrderList : ', todayOrderList);

    return (
        <Card style={cardStyle} className="contentCard" data-tut="todaysOrdersPart">
            <Grid container className="cardHeader" style={{ height: '20%' }}>
                <Grid style={{ textAlign: isEn ? 'left' : 'right' }} size={12}>
          <span style={{ fontSize: '17px', color: headerTextColor }}>
            <Trans>todayOrders</Trans>
          </span>
                </Grid>

            </Grid>
            <Divider />
            <center>
                <div className={classes.root}>
                    <TableLoader
                        loading={isLoading}
                    >
                        {
                            todayOrderList
                            && (
                                <SatrexTable
                                    responsiveSizes={[sm, md, lg, xl]}
                                    paginationInfo={todayOrderList.paginationInfo}
                                    handlePagination={handlePagination}
                                    disableDraggable
                                    headerData={[
                                        { Header: <Trans>id</Trans>, accessor: 'id', hide: !md },
                                        { Header: <Trans>cryptocurrency</Trans>, accessor: 'cryptocurrency' },
                                        { Header: <Trans>symbol</Trans>, accessor: 'symbol', hide: !lg },
                                        {
                                            Header: <Trans>requestedCurrency</Trans>,
                                            accessor: 'requestedCurrency',
                                            hide: !md,
                                        },
                                        { Header: <Trans>OrderType</Trans>, accessor: 'OrderType', hide: !sm },
                                        { Header: <Trans>amount</Trans>, accessor: 'amount' },
                                        { Header: <Trans>price</Trans>, accessor: 'price' },
                                        { Header: <Trans>totalAmount</Trans>, accessor: 'totalAmount', hide: !xl },
                                        { Header: <Trans>TheAmountFilled</Trans>, accessor: 'TheAmountFilled', hide: !lg },
                                        { Header: <Trans>date</Trans>, accessor: 'date', hide: !md },
                                        { Header: <Trans>time</Trans>, accessor: 'time', hide: !md },
                                        { Header: <Trans>status</Trans>, accessor: 'orderStatus', hide: !sm },

                                    ]}
                                    asset={todayOrderList.orders.map((item, index) => ({
                                        ...item,
                                        id: item.id,
                                        cryptocurrency: item.pair.source.englishTitle,
                                        symbol: item.pair.source.symbol,
                                        requestedCurrency: item.pair.destination.englishTitle,
                                        OrderType: <span
                                            style={{ color: item.orderType === 'Buy' ? satrexGreen : satrexRed }}
                                        >
                                                <Trans>{item.orderType}</Trans>
                                                   </span>,
                                        amount: <SatrexNumFormat num={item.totalVolume} />,
                                        price: <SatrexNumFormat num={item.price} />,
                                        totalAmount: <SatrexNumFormat num={item.totalVolume * item.price} />,
                                        TheAmountFilled: <SatrexNumFormat num={item.totalVolume - item.remainVolume} />,
                                        date: (isEn ? moment(item.createdAtUtc).format('YYYY/MM/DD') : jmoment(item.createdAtUtc).format('jYYYY/jMM/jDD')),
                                        time: isEn ? moment(item.createdAtUtc).format('HH:mm') : jmoment(convertTz(item.createdAtUtc, 'Asia/Tehran').getTime()).format('HH:mm'),
                                        orderStatus: <Trans>{item.orderStatus}</Trans>,
                                    }))}
                                />
                            )
                        }
                    </TableLoader>
                </div>
            </center>
        </Card>
    );
}
