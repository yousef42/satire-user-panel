import React, { useState } from 'react';

import { useSelector } from 'react-redux';
import { useMediaQuery } from '@mui/material';
import Trans from '../../../../components/lang';

import {
    satrexGreen,
    satrexRed,
} from '../../../../../styles/colors';

import SatrexTable from '../../../../components/Table/SatrexTable';
import SatrexNumFormat from '../../../../components/satrexNumFormat';
import useStyles from './styles';
import { useOrderList } from '../../../../../utils/queries';
import TableLoader from '../../../../components/Table/TableLoader';

export default function ({ fromDateTime, toDateTime }) {
    const sm = useMediaQuery('(min-width:576px)');
    const md = useMediaQuery('(min-width:768px)');
    const lg = useMediaQuery('(min-width:992px)');
    const xl = useMediaQuery('(min-width:1200px)');
    const [page, setPage] = useState(0);
    const lang = useSelector((state) => state.user.language);
    const isEn = lang === 'EN' || lang === 'gr' || lang === 'fr';
    const classes = useStyles();

    const { data: reportOrderList, isLoading } = useOrderList({
        FromDateUtc: fromDateTime,
        ToDateUtc: toDateTime,
        pageIndex: page,
    });

    return (
        <center>
            <div className={classes.root}>
                <TableLoader
                    loading={isLoading}
                >
                    {
                        reportOrderList
                        && (
                            <SatrexTable
                                headerData={[
                                    { Header: <Trans>id</Trans>, accessor: 'id', hide: !md },
                                    { Header: <Trans>cryptocurrency</Trans>, accessor: 'cryptocurrency' },
                                    { Header: <Trans>symbol</Trans>, accessor: 'symbol', hide: !md },
                                    { Header: <Trans>requestedCurrency</Trans>, accessor: 'requestedCurrency', hide: !sm },
                                    { Header: <Trans>OrderType</Trans>, accessor: 'OrderType' },
                                    { Header: <Trans>amount</Trans>, accessor: 'amount' },
                                    { Header: <Trans>price</Trans>, accessor: 'price', hide: !sm },
                                    { Header: <Trans>totalAmount</Trans>, accessor: 'totalAmount', hide: !xl },
                                    { Header: <Trans>TheAmountFilled</Trans>, accessor: 'TheAmountFilled', hide: !lg },
                                    { Header: <Trans>status</Trans>, accessor: 'orderStatus', hide: !md },

                                ]}
                                paginationInfo={reportOrderList.paginationInfo}
                                handlePagination={setPage}
                                asset={reportOrderList.orders.map((item, index) => ({
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
                                    amount: item.totalVolume,
                                    price: <SatrexNumFormat
                                        num={item.price}
                                    />,
                                    totalAmount: <SatrexNumFormat
                                        num={item.totalVolume * item.price}
                                    />,
                                    TheAmountFilled: item.totalVolume - item.remainVolume,
                                    orderStatus: <Trans>{item.orderStatus}</Trans>,
                                }))}
                            />
                        )
                    }
                </TableLoader>
            </div>
        </center>
    );
}
