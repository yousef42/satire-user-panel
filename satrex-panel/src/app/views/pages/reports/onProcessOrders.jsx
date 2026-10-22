import React, { useEffect, useState } from 'react';
import {
    makeStyles,
} from '@mui/styles';

import { useDispatch, useSelector } from 'react-redux';

import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, useMediaQuery,
} from '@mui/material';
import { Button } from '@mui/material';
import { DialogContentText } from '@mui/material';
import { useQueryClient } from 'react-query';
import moment from 'moment';
import jmoment from 'jalali-moment';
import {
    satrexGray,
    satrexGreen,
    satrexRed,
    satrexSemiGray,
} from '../../../../styles/colors';
import Trans from '../../../components/lang';
import SatrexTable from '../../../components/Table/SatrexTable';
import SatrexNumFormat from '../../../components/satrexNumFormat';
import { useOrderList } from '../../../../utils/queries';
import TableLoader from '../../../components/Table/TableLoader';
import { cancelLimitOrder } from '../../../../utils/apis';
import { setTopbarValues } from '../../../redux/actions/LayoutActions';
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
    cancelButton: {
        fontSize: '11px !important',
        fontWeight: '700 !important',
        whiteSpace: 'nowrap',
    },
    cancelOrderButton: {
        minWidth: 110,
        height: 34,
        borderRadius: 10,
        padding: '6px 14px !important',
        border: (props) => `1px solid ${props.satrexTheme ? 'rgba(239, 68, 68, 0.24)' : 'rgba(248, 113, 113, 0.32)'}`,
        backgroundColor: (props) => `${props.satrexTheme ? 'rgba(254, 242, 242, 0.95)' : 'rgba(127, 29, 29, 0.24)'} !important`,
        color: (props) => `${props.satrexTheme ? '#dc2626' : '#fda4af'} !important`,
        boxShadow: 'none !important',
        '&:hover': {
            backgroundColor: (props) => `${props.satrexTheme ? 'rgba(254, 226, 226, 1)' : 'rgba(127, 29, 29, 0.34)'} !important`,
        },
        '& span': {
            color: (props) => `${props.satrexTheme ? '#dc2626' : '#fda4af'} !important`,
        },
    },
    dialogCancelOrderButton: {
        minWidth: 120,
        borderRadius: 10,
        border: (props) => `1px solid ${props.satrexTheme ? 'rgba(239, 68, 68, 0.24)' : 'rgba(248, 113, 113, 0.32)'}`,
        backgroundColor: (props) => `${props.satrexTheme ? 'rgba(254, 242, 242, 0.95)' : 'rgba(127, 29, 29, 0.24)'} !important`,
        color: (props) => `${props.satrexTheme ? '#dc2626' : '#fda4af'} !important`,
        boxShadow: 'none !important',
        '& span': {
            color: (props) => `${props.satrexTheme ? '#dc2626' : '#fda4af'} !important`,
        },
    },
    dialogKeepButton: {
        minWidth: 96,
        borderRadius: 10,
        boxShadow: 'none !important',
        backgroundColor: (props) => `${props.satrexTheme ? '#eef2f7' : 'rgba(255,255,255,0.08)'} !important`,
        color: (props) => `${props.satrexTheme ? '#334155' : '#e5ecff'} !important`,
    },

    sortIcon: {
        color: satrexSemiGray,
        transform: 'rotate(90deg)',
        fontSize: '13px',
    },
}));

export default function (props) {
    const [mounted, setMounted] = useState(false);
    const dispatch = useDispatch();
    const [page, setPage] = useState(0);
    const { data: openOrderList, isLoading } = useOrderList({
        pageIndex: page,
        orderStatus: 'Open',
    });
    const satrexTheme = useSelector((state) => state.layout.theme);
    const classes = useStyles({ satrexTheme });
    const [cancelOrderId, setCancelOrderId] = React.useState({});
    const [modalOpen, setModalOpen] = useState(false);
    const sm = useMediaQuery('(min-width:576px)');
    const md = useMediaQuery('(min-width:768px)');
    const lg = useMediaQuery('(min-width:992px)');
    const xl = useMediaQuery('(min-width:1200px)');
    const queryClient = useQueryClient();
    const lang = useSelector((state) => state.user.language);
    const isEn = lang === 'EN' || lang === 'gr' || lang === 'fr';
    const cancelRequest = async () => {
        const result = await cancelLimitOrder({
                id: cancelOrderId.id,
                orderType: cancelOrderId.orderType,
        });
        if (result) {
            dispatch(setTopbarValues());
           await queryClient.invalidateQueries(['reportOrderList', page, 'Open']);
        }
        setModalOpen(false);
    };

    const handlePagination = (value) => {
        setPage(value);
    };

    const askforCancel = (id, orderType) => {
        setCancelOrderId({ id, orderType });
        setModalOpen(true);
    };

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            setMounted(true);
        }
        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <>

            <TableLoader
                loading={isLoading}
            >
                {
                    openOrderList
                    && (
                        <SatrexTable
                            responsiveSizes={[sm, md, lg, xl]}
                            paginationInfo={openOrderList.paginationInfo}
                            handlePagination={handlePagination}
                            disableDraggable
                            headerData={[
                                { Header: <Trans>id</Trans>, accessor: 'id', hide: !lg },
                                { Header: <Trans>market</Trans>, accessor: 'market' },
                                { Header: <Trans>date</Trans>, accessor: 'date', hide: !md },
                                { Header: <Trans>time</Trans>, accessor: 'time', hide: !md },
                                { Header: <Trans>OrderType</Trans>, accessor: 'OrderType', hide: !md },
                                { Header: <Trans>amount</Trans>, accessor: 'amount' },
                                { Header: <Trans>price</Trans>, accessor: 'price', hide: !sm },
                                { Header: <Trans>totalAmount</Trans>, accessor: 'totalAmount', hide: !xl },
                                { Header: <Trans>TheAmountFilled</Trans>, accessor: 'TheAmountFilled', hide: !xl },
                                { Header: <Trans>...</Trans>, accessor: 'more' },

                            ]}
                            asset={openOrderList.orders.map((item, index) => ({
                                ...item,
                                id: item.id,
                                cryptocurrency: item.pair?.source.englishTitle,
                                date: (isEn ? moment(item.createdAtUtc).format('YYYY/MM/DD') : jmoment(item.createdAtUtc).format('jYYYY/jMM/jDD')),
                                time: isEn ? moment(item.createdAtUtc).format('HH:mm:ss') : jmoment(convertTz(item.createdAtUtc, 'Asia/Tehran').getTime()).format('HH:mm:ss'),
                                OrderType: <span
                                    style={{ color: item.orderType === 'Buy' ? satrexGreen : satrexRed }}
                                >
                                <Trans>{item.orderType}</Trans>
                                           </span>,
                                amount: <SatrexNumFormat
                                    num={item.totalVolume}
                                />,
                                market: <span style={{ fontSize: 12 }}>
                                        {item.pair.symbol}
                                        </span>,
                                price: <SatrexNumFormat
                                    num={item.price}
                                />,
                                totalAmount: <SatrexNumFormat
                                    num={item.totalVolume * item.price}
                                />,
                                TheAmountFilled: <SatrexNumFormat
                                    num={item.totalVolume - item.remainVolume}
                                />,
                                more: <Button
                                    className={classes.cancelOrderButton}
                                    classes={{
                                        label: classes.cancelButton,
                                    }}
                                    onClick={() => {
                                        askforCancel(item.id, item.orderType);
                                    }}
                                >
                                    <Trans>cancelOrder</Trans>
                                      </Button>,
                            }))}
                        />
                    )
                }
            </TableLoader>
            <Dialog
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
              <span style={{ fontSize: '18px' }}>
                <Trans>cancelOrder</Trans>
              </span>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                <span>
                  <Trans>sureToCancelOrder?</Trans>
                </span>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        autoFocus
                        onClick={() => setModalOpen(false)}
                        color="default"
                        variant="contained"
                        className={classes.dialogKeepButton}
                    >
                        <Trans>cancel</Trans>
                    </Button>
                    <Button
                        color="default"
                        variant="contained"
                        className={classes.dialogCancelOrderButton}
                        onClick={cancelRequest}
                    >
                        <Trans>cancelOrder</Trans>
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
