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
import { useMutation, useQueryClient } from 'react-query';
import { satrexApi } from '../../../components/api';
import {

    satrexGray,
    satrexGreen,
    satrexRed,
    satrexSemiGray,
} from '../../../../styles/colors';
import Trans, { transFn } from '../../../components/lang';
import { setTopbarValues } from '../../../redux/actions/LayoutActions';
import SatrexTable from '../../../components/Table/SatrexTable';
import SatrexNumFormat from '../../../components/satrexNumFormat';
import { useFastOrder } from '../../../../utils/queries';
import TableLoader from '../../../components/Table/TableLoader';
import satrexToast from '../../../components/satrexToast';

const useStyles = makeStyles((theme) => ({
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
    const [mounted, setMounted] = useState(false);
    const dispatch = useDispatch();
    const lang = useSelector((state) => state.user.language);
    const satrexTheme = useSelector((state) => state.layout.theme);
    const isEn = lang === 'EN' || lang === 'gr' || lang === 'fr';
    const [page, setPage] = useState(0);
    const classes = useStyles({ satrexTheme });
    const [cancelOrderId, setCancelOrderId] = React.useState({});
    const { data: orderFastOrders, isLoading } = useFastOrder({
        pageIndex: page,
        lastTransactionConfirmationType: 'Pending',
    });
    const [modalOpen, setModalOpen] = useState(false);
    const queryClient = useQueryClient();
    const sm = useMediaQuery('(min-width:576px)');
    const md = useMediaQuery('(min-width:768px)');
    const lg = useMediaQuery('(min-width:992px)');
    const xl = useMediaQuery('(min-width:1200px)');
    const askforCancel = (row) => {
        setCancelOrderId(row);
        // console.log('reportFastOrderList : ',queryCache.setQueryData('reportFastOrderList'))
        setModalOpen(true);
    };

    const cancelRequest = async () => {
        const { data } = await satrexApi().post('/FastExchange/Cancel', {
            id: cancelOrderId.id,
        });

        if (data.isSuccess) {
            satrexToast(transFn('Order canceled successfully'), 'error');
        } else {
            data.Errors.forEach((err) => {
                satrexToast(err.Description, 'error');
            });
        }

        setModalOpen(false);
        return data;
    };

    const requestMutation = useMutation(() => cancelRequest(), {
        onSuccess: () => {
            queryClient.invalidateQueries(['reportFastOrderList', page, 'Pending']);
            dispatch(setTopbarValues());
            // queryCache.setQueryData('reportFastOrderList',)
        },
    });
    const handlePagination = (value) => {
        setPage(value);
    };

    useEffect(() => {
        let isMounted = true;
        if (isMounted) setMounted(true);
        return () => { isMounted = false; };
    }, []);

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
                                disableDraggable
                                paginationInfo={orderFastOrders.paginationInfo}
                                handlePagination={handlePagination}
                                headerData={[
                                    { Header: <Trans>id</Trans>, accessor: 'id', hide: !md },
                                    { Header: <Trans>cryptocurrency</Trans>, accessor: 'cryptocurrency' },
                                    { Header: <Trans>symbol</Trans>, accessor: 'symbol', hide: !lg },
                                    { Header: <Trans>OrderType</Trans>, accessor: 'OrderType', hide: !md },
                                    { Header: <Trans>amount</Trans>, accessor: 'amount' },
                                    { Header: <Trans>price</Trans>, accessor: 'price', hide: !sm },
                                    { Header: <Trans>totalAmount</Trans>, accessor: 'totalAmount', hide: !xl },
                                    { Header: <Trans>...</Trans>, accessor: 'more' },

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
                                    more: <Button
                                        classes={{
                                            label: classes.cancelButton,
                                        }}
                                        className={classes.cancelOrderButton}
                                        onClick={() => {
                                            askforCancel(item);
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
                            onClick={() => setModalOpen(false)}
                            className={classes.dialogKeepButton}
                        >
                            <Trans>cancel</Trans>
                        </Button>
                        <Button
                            color="default"
                            className={classes.dialogCancelOrderButton}
                            onClick={() => {
                                requestMutation.mutate();
                            }}
                        >
                            <Trans>cancelOrder</Trans>
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </center>
    );
}
