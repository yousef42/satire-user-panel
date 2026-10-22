import React, { useEffect, useState } from 'react';
import {
    makeStyles,
} from '@mui/styles';

import { useSelector } from 'react-redux';
import { Visibility } from '@mui/icons-material';
import {
    Button, Dialog, DialogContent, DialogTitle, Grid,

    Paper, useMediaQuery,
} from '@mui/material';
import Draggable from 'react-draggable';
import { useQueryClient } from 'react-query';
import CloseIcon from '@mui/icons-material/Close';
import { useTour } from '@reactour/tour';
import moment from 'moment';
import jmoment from 'jalali-moment';
import SatrexTable from '../../../../components/Table/SatrexTable';
import SatrexNumFormat from '../../../../components/satrexNumFormat';
import {
    satrexGray,
    satrexGreen,
    satrexRed,
    satrexSemiGray,
} from '../../../../../styles/colors';
import Trans, { transFn } from '../../../../components/lang';
import OrderDetails from './OrderDetails';
import tourLoader from '../../../../../utils/helpers/tourLoader';
import { useOrderList } from '../../../../../utils/queries';
import TableLoader from '../../../../components/Table/TableLoader';
import convertTz from '../../../../components/convertTz';

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
    detailsButton: {
        minWidth: '10px !important',
        width: '40px !important',
        height: '34px !important',
        padding: '0 !important',
        marginTop: '3px !important',
        borderRadius: '10px !important',
        boxShadow: 'none !important',
        border: (props) => `1px solid ${props.satrexTheme ? 'rgba(148, 163, 184, 0.35)' : 'rgba(255,255,255,0.12)'}`,
        backgroundColor: (props) => `${props.satrexTheme ? '#f8fafc' : 'rgba(255,255,255,0.06)'} !important`,
        color: (props) => `${props.satrexTheme ? '#334155' : '#e5ecff'} !important`,
        '& svg': {
            color: (props) => `${props.satrexTheme ? '#334155' : '#e5ecff'} !important`,
            fontSize: '20px !important',
        },
        '&:hover': {
            backgroundColor: (props) => `${props.satrexTheme ? '#eef2f7' : 'rgba(255,255,255,0.12)'} !important`,
        },
    },
}));

function PaperComponent(props) {
    return (
        <Draggable
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper {...props} />
        </Draggable>
    );
}

export default function (props) {
    const [mounted, setMounted] = useState(false);
    const [orderList, setOrderList] = useState([]);
    const [page, setPage] = useState(0);
    const { setIsOpen, setSteps } = useTour();
    const [selectedOrder, setSelectedOrder] = React.useState(null);
    const satrexTheme = useSelector((state) => state.layout.theme);
    const classes = useStyles({ satrexTheme });
    const { data: reportOrderList, isLoading } = useOrderList({
        pageIndex: page,
        excludeOrderStatus: 'Open',
    });

    const lang = useSelector((state) => state.user.language);
    const isEn = lang === 'EN' || lang === 'gr' || lang === 'fr';
    const [modalOpen, setModalOpen] = useState(false);
    const sm = useMediaQuery('(min-width:576px)');
    const md = useMediaQuery('(min-width:768px)');
    const lg = useMediaQuery('(min-width:992px)');
    const xl = useMediaQuery('(min-width:1200px)');

    const queryCache = useQueryClient();
    // console.log(reportOrderList);
    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            setMounted(true);
            // tourLoader(setIsOpen, setSteps, 'completedOrdersReportDetail');
            if (reportOrderList) {
                setOrderList(reportOrderList.orders.filter((item) => item.status !== 'Open'));
            }
        }
        return () => {
            tourLoader(setIsOpen, setSteps, 'reports');
            // setOrderList(orderList.map(item => {
            //   return {...item,subOpen:false}
            // } ))
            if (reportOrderList) {
            queryCache.setQueryData('reportOrderList', reportOrderList.orders.map((item) => ({
                ...item,
                subOpen: false,
            })));
}
            // console.log('component did unmounted : ',props.orderList.map(item => {
            //   return {...item,subOpen:false}
            // } ))
            isMounted = false;
        };
    }, [reportOrderList]);

    const getOrderDetail = async (row, index) => {
        setSelectedOrder(row);
        setModalOpen(true);
    };

    const handlePagination = (value) => {
        setPage(value);
    };

    // console.log('reportOrderList : ', reportOrderList);

    return (
        <center>
            <div className={`${classes.root} completedOrdersTable`}>
                <TableLoader
                    loading={isLoading}
                >
                    {
                        reportOrderList
                        && (
                            <SatrexTable
                                responsiveSizes={[sm, md, lg, xl]}
                                paginationInfo={reportOrderList.paginationInfo}
                                handlePagination={handlePagination}
                                disableDraggable
                                headerData={[
                                    { Header: <Trans>id</Trans>, accessor: 'id' },
                                    { Header: <Trans>market</Trans>, accessor: 'market' },
                                    { Header: <Trans>type</Trans>, accessor: 'OrderType', hide: !md },
                                    { Header: <Trans>dateTime</Trans>, accessor: 'dateTime', hide: !md },
                                    { Header: <Trans>amount</Trans>, accessor: 'amount' },
                                    { Header: <Trans>price</Trans>, accessor: 'price', hide: !sm },
                                    { Header: <Trans>totalAmount</Trans>, accessor: 'totalAmount', hide: !xl },
                                    { Header: <Trans>Average price</Trans>, accessor: 'averagePrice', hide: !lg },
                                    { Header: <Trans>TheAmountFilled</Trans>, accessor: 'TheAmountFilled', hide: !xl },
                                    { Header: <Trans>the last situation</Trans>, accessor: 'status', hide: !md },
                                    { Header: <Trans>...</Trans>, accessor: 'more' },
                                ]}
                                asset={orderList.map((item, index) => {
                                    const effectivePrice = item.averagePrice ?? item.price;
                                    const filledVolume = item.totalVolume - item.remainVolume;

                                    return {
                                        ...item,
                                        id: item.id,
                                        dateTime: <div style={{ fontSize: 12 }}>
{
                                            `${(isEn ? moment(item.createdAtUtc).format('YYYY/MM/DD') : jmoment(item.createdAtUtc).format('jYYYY/jMM/jDD'))}
                                     ${isEn ? moment(item.createdAtUtc).format('HH:mm') : jmoment(convertTz(item.createdAtUtc, 'Asia/Tehran').getTime()).format('HH:mm')} `
                                        }
                                              </div>,
                                        market: <span style={{ fontSize: 12 }}>
                                            {item.pair.destination.symbol}
                                            /
                                            {item.pair.source.symbol}
                                                </span>,
                                        requestedCurrency: item.pair.destination.englishTitle,
                                        OrderType: <span
                                            style={{ color: item.orderType === 'Buy' ? satrexGreen : satrexRed }}
                                        >
<Trans>{item.orderType}</Trans>
                                                   </span>,
                                        amount: <SatrexNumFormat
                                            num={item.totalVolume}
                                        />,
                                        averagePrice: <SatrexNumFormat
                                            num={item.averagePrice}
                                        />,
                                        status: transFn(item.orderStatus),
                                        price: <SatrexNumFormat
                                            num={effectivePrice}
                                        />,
                                        totalAmount: <SatrexNumFormat
                                            num={item.totalVolume * effectivePrice}
                                        />,
                                        TheAmountFilled: <SatrexNumFormat
                                            num={filledVolume}
                                        />,
                                        more: <Button
                                            variant="contained"
                                            color="primary"
                                            disableElevation
                                            data-tut="orderDetail"
                                            className={`${classes.detailsButton} completedOrderDetailsButton`}
                                            onClick={() => {
                                                getOrderDetail(item);
                                            }}

                                        >
                                            <Visibility />
                                              </Button>,

                                    };
                                })}
                            />
                        )
                    }
                </TableLoader>
                <Dialog
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    PaperComponent={PaperComponent}
                    aria-labelledby="draggable-dialog-title"
                    maxWidth="lg"
                    fullWidth
                    className={satrexTheme ? 'appContent' : 'appContentDark'}
                >
                    <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                        <Grid
                            container
                        >
                            <Grid size={6}>
                                    <span style={{ fontSize: 20, padding: '2px' }}>
                                        <Trans>Matching details of your order with ID</Trans>
                                        {selectedOrder?.id}
                                    </span>
                            </Grid>
                            <Grid style={{ textAlign: 'left' }} size={6}>
                                <CloseIcon
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => {
                                        setModalOpen(false);
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </DialogTitle>

                    <DialogContent style={{ paddingTop: 0 }}>
                        {selectedOrder
                            && (
                                <OrderDetails
                                    selectedOrder={selectedOrder}
                                />
                            )}
                    </DialogContent>
                </Dialog>
            </div>
        </center>
    );
}
