import React, { useState } from 'react';

import {
    makeStyles,
} from '@mui/styles';

import { useMediaQuery } from '@mui/material';
import Trans from '../../../components/lang';

import {
    satrexGray,
    satrexGreen,
    satrexRed,
    satrexSemiGray,
} from '../../../../styles/colors';
import SatrexTable from '../../../components/Table/SatrexTable';
import SatrexNumFormat from '../../../components/satrexNumFormat';
import { useFastOrder } from '../../../../utils/queries';
import TableLoader from '../../../components/Table/TableLoader';

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

export default function (props) {
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const sm = useMediaQuery('(min-width:576px)');
    const md = useMediaQuery('(min-width:768px)');
    const lg = useMediaQuery('(min-width:992px)');
    const xl = useMediaQuery('(min-width:1200px)');
    const { data: orderFastOrders, isLoading } = useFastOrder({
        pageIndex: page,
        excludeLastTransactionConfirmationType: 'Pending',
    });

    return (
        <center>
            <div className={classes.root}>
                <TableLoader
                    loading={isLoading}
                >
                    {
                        orderFastOrders
                        && (
                            <SatrexTable
                                responsiveSizes={[sm, md, lg, xl]}
                                paginationInfo={orderFastOrders.paginationInfo}
                                handlePagination={setPage}
                                disableDraggable
                                headerData={[
                                    { Header: <Trans>id</Trans>, accessor: 'id', hide: !lg },
                                    { Header: <Trans>cryptocurrency</Trans>, accessor: 'cryptocurrency' },
                                    { Header: <Trans>symbol</Trans>, accessor: 'symbol', hide: !lg },
                                    { Header: <Trans>OrderType</Trans>, accessor: 'OrderType', hide: !sm },
                                    { Header: <Trans>amount</Trans>, accessor: 'amount' },
                                    { Header: <Trans>price</Trans>, accessor: 'price' },
                                    { Header: <Trans>totalAmount</Trans>, accessor: 'totalAmount', hide: !xl },
                                    { Header: <Trans>status</Trans>, accessor: 'status', hide: !md },

                                ]}
                                asset={orderFastOrders.requests.map((item) => ({
                                    ...item,
                                    id: item.id,
                                    cryptocurrency: item.asset.englishTitle,
                                    symbol: item.asset.symbol,
                                    OrderType: <span
                                        style={{ color: item.orderType === 'Buy' ? satrexGreen : satrexRed }}
                                    >
                                        <Trans>{item.orderType}</Trans>
                                               </span>,
                                    amount: <SatrexNumFormat
                                        num={item.volume}
                                    />,

                                    price: <SatrexNumFormat
                                        num={item.price}
                                    />,
                                    totalAmount: <SatrexNumFormat
                                        num={item.volume * item.price}
                                    />,
                                    status: <Trans>{item.lastTransactionConfirmationType}</Trans>,
                                }))}
                            />
                        )
                    }
                </TableLoader>
            </div>
        </center>
    );
}
