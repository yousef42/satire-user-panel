import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Paper } from '@mui/material';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    Grid, useMediaQuery,
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import { DialogContentText } from '@mui/material';
import Draggable from 'react-draggable';
import { useSelector } from 'react-redux';
import moment from 'moment';
import jmoment from 'jalali-moment';
import starkString from 'starkstring';
import { useTour } from '@reactour/tour';
import { satrexBorderDarkColor, satrexCream } from '../../../../styles/colors';
import Trans, { transFn } from '../../../components/lang';
import SuspendNotif from '../../../components/suspendNotif';
import convertTz from '../../../components/convertTz';
import SatrexTable from '../../../components/Table/SatrexTable';
import SatrexNumFormat from '../../../components/satrexNumFormat';
import SatrexCard from '../../../components/SatrexCard';
import AnimatedPage from '../../../components/AnimatedPage';
import TableLoader from '../../../components/Table/TableLoader';
import { useTurnoverList } from '../../../../utils/queries';
import tourLoader from '../../../../utils/helpers/tourLoader';

const useStyles = makeStyles({});

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

export default function turnOver() {
    const classes = useStyles();
    const { setIsOpen, setSteps } = useTour();
    const [open, setOpen] = React.useState(false);

    const satrexTheme = useSelector((state) => state.layout.theme);
    const [selectedTransaction, setSelectedTransaction] = useState({});
    const [page, setPage] = useState(0);
    const sm = useMediaQuery('(min-width:576px)');
    const md = useMediaQuery('(min-width:768px)');
    const lg = useMediaQuery('(min-width:992px)');
    const xl = useMediaQuery('(min-width:1200px)');
    const lang = useSelector((state) => state.user.language);
    const isEn = lang === 'EN' || lang === 'gr' || lang === 'fr';
    const level = useSelector((state) => state.layout.totals.qualifyLevel);
    const { data: turnoverList, isLoading } = useTurnoverList({
        fromDateTime: starkString(moment('1995-01-01').format('YYYY-MM-DD'))
            .englishNumber()
            .toString(),
        toDateTime: starkString(moment().add(1, 'days').format('YYYY-MM-DD'))
            .englishNumber()
            .toString(),
        pageIndex: page,
    });

    useEffect(() => {
        if (turnoverList) {
            tourLoader(setIsOpen, setSteps, 'turnover');
        }
    }, [turnoverList]);

    // const { data, isLoading } = useQuery('TurnOverList', async () => {
    //     const { data } = await satrexApi().post('/TurnOver/GetList', {
    //
    //     });
    //     if (data.isSuccess) {
    //         tourLoader(setIsOpen, setSteps, 'turnover');
    //         return data;
    //     }
    //     return [];
    // });

    const handleClickOpen = (index) => {
        // setSelectedTransaction(data.data[index]);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <AnimatedPage>
            <div style={{ marginTop: '28px' }}>
                <SatrexCard header="turnover">
                    <div style={{ padding: '20px' }} data-tut="turnoverList">
                        <TableLoader
                            loading={isLoading}
                        >
                            {
                                turnoverList
                                && (
                                    <SatrexTable
                                        paginationInfo={turnoverList.paginationInfo}
                                        handlePagination={setPage}
                                        responsiveSizes={[sm, md, lg, xl]}
                                        headerData={[
                                            { Header: <Trans>id</Trans>, accessor: 'turnOverId', hide: !sm },
                                            { Header: <Trans>date</Trans>, accessor: 'date', hide: !lg },
                                            { Header: <Trans>time</Trans>, accessor: 'time', hide: !lg },
                                            { Header: <Trans>type</Trans>, accessor: 'turnOverType', hide: !md },
                                            { Header: <Trans>currency</Trans>, accessor: 'currency' },
                                            { Header: <Trans>amount</Trans>, accessor: 'volume' },
                                            { Header: <Trans>commission</Trans>, accessor: 'commission', hide: !xl },
                                            // { Header: <Trans>more</Trans>, accessor: 'more' },
                                        ]}
                                        asset={[...turnoverList].sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime)).map((item, index) => ({
                                            ...item,
                                            date: (isEn ? moment(item.dateTime).format('YYYY/MM/DD') : jmoment(item.dateTime).format('jYYYY/jMM/jDD')),
                                            time: isEn ? moment(item.dateTime).format('HH:mm:ss') : jmoment(convertTz(item.dateTime, 'Asia/Tehran').getTime()).format('HH:mm:ss'),
                                            turnOverType: (item.turnOverType === 'InternalPayment' || item.turnOverType === 'ExternalPayment')
                                                ? transFn('Deposit')
                                                : transFn('Withdrawal'),
                                            currency: !isEn ? item.asset?.persianTitle : item.asset?.englishTitle,
                                            commission: <SatrexNumFormat
                                                num={item.commission}
                                            />,
                                            volume: <SatrexNumFormat
                                                num={item.volume}
                                            />,
                                            // more: <Button
                                            //     variant="contained"
                                            //     color="primary"
                                            //     disableElevation
                                            //     style={{ color: 'white', width: '100%', whiteSpace: 'nowrap' }}
                                            //     className="whiteButton"
                                            //     type="submit"
                                            //     onClick={() => {
                                            //         handleClickOpen(index);
                                            //     }}
                                            // >
                                            //     <Trans>transactionDetails</Trans>
                                            //       </Button>,
                                        }))}
                                    />
                                )
                            }
                        </TableLoader>
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            PaperComponent={PaperComponent}
                            aria-labelledby="draggable-dialog-title"
                        >
                            <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                                <Grid
                                    container
                                    style={{
                                        paddingRight: '15px',
                                        paddingLeft: '15px',
                                        paddingTop: '15px',
                                    }}
                                >
                                    <Grid size={6}>
                                        <h4>
                                            {' '}
                                            <Trans>transactionDetails</Trans>
                                        </h4>
                                    </Grid>
                                    <Grid style={{ textAlign: 'left' }} size={6}>
                                        <CloseIcon
                                            style={{ cursor: 'pointer' }}
                                            onClick={handleClose}
                                        />
                                    </Grid>
                                </Grid>
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText
                                    style={{
                                        paddingRight: '15px',
                                        paddingLeft: '15px',
                                        direction: isEn ? 'ltr' : 'rtl',
                                    }}
                                >
                                    <Grid container style={{ width: '300px' }}>
                                        <Grid
                                            style={{
                                                backgroundColor: satrexTheme ? satrexCream : satrexBorderDarkColor,
                                                height: '35px',
                                                borderRadius: '8px',
                                            }}
                                            size={12}>
                                            <Grid container style={{ padding: '7px' }}>
                                                <Grid
                                                    style={{
                                                        textAlign: isEn ? 'left' : 'right',
                                                        fontSize: '15px',
                                                    }}
                                                    size={6}>
                                                    <Trans>id</Trans>
                                                </Grid>
                                                <Grid
                                                    style={{
                                                        textAlign: isEn ? 'right' : 'left',
                                                        fontSize: '15px',
                                                    }}
                                                    className={`${!isEn ? '' : 'enNum'}`}
                                                    size={6}>
                                                    {selectedTransaction.turnOverId}
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid style={{ height: '35px', borderRadius: '8px' }} size={12}>
                                            <Grid container style={{ padding: '7px' }}>
                                                <Grid
                                                    style={{
                                                        textAlign: isEn ? 'left' : 'right',
                                                        fontSize: '15px',
                                                    }}
                                                    size={6}>
                                                    <Trans>date</Trans>
                                                </Grid>
                                                <Grid
                                                    style={{
                                                        textAlign: isEn ? 'right' : 'left',
                                                        fontSize: '15px',
                                                    }}
                                                    className={`${!isEn ? '' : 'enNum'}`}
                                                    size={6}>
                                                    { selectedTransaction.dateTime && (isEn ? moment(selectedTransaction.dateTime).format('YYYY/MM/DD') : jmoment(selectedTransaction.dateTime).format('jYYYY/jMM/jDD'))}
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid
                                            style={{
                                                backgroundColor: satrexTheme ? satrexCream : satrexBorderDarkColor,
                                                height: '35px',
                                                borderRadius: '8px',
                                            }}
                                            size={12}>
                                            <Grid container style={{ padding: '7px' }}>
                                                <Grid
                                                    style={{
                                                        textAlign: isEn ? 'left' : 'right',
                                                        fontSize: '15px',
                                                    }}
                                                    size={6}>
                                                    <Trans>time</Trans>
                                                </Grid>
                                                <Grid
                                                    style={{
                                                        textAlign: isEn ? 'right' : 'left',
                                                        fontSize: '15px',
                                                    }}
                                                    className={`${!isEn ? '' : 'enNum'}`}
                                                    size={6}>
                                                    {selectedTransaction.dateTime
                                                        && (isEn ? moment(selectedTransaction.dateTime).format('HH:mm:ss') : jmoment(convertTz(selectedTransaction.dateTime, 'Asia/Tehran').getTime()).format('HH:mm:ss'))}
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid style={{ height: '35px', borderRadius: '8px' }} size={12}>
                                            <Grid container style={{ padding: '7px' }}>
                                                <Grid
                                                    style={{
                                                        textAlign: isEn ? 'left' : 'right',
                                                        fontSize: '15px',
                                                    }}
                                                    size={6}>
                                                    <Trans>type</Trans>
                                                </Grid>
                                                <Grid
                                                    style={{
                                                        textAlign: isEn ? 'right' : 'left',
                                                        fontSize: '15px',
                                                    }}
                                                    size={6}>
                                                    <Trans>
                                                        {(selectedTransaction.turnOverType === 'InternalPayment' || selectedTransaction.turnOverType === 'ExternalPayment')
                                                            ? 'Deposit'
                                                            : 'Withdrawal'}
                                                    </Trans>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid
                                            style={{
                                                backgroundColor: satrexTheme ? satrexCream : satrexBorderDarkColor,
                                                height: '35px',
                                                borderRadius: '8px',
                                            }}
                                            size={12}>
                                            <Grid container style={{ padding: '7px' }}>
                                                <Grid
                                                    style={{
                                                        textAlign: isEn ? 'left' : 'right',
                                                        fontSize: '15px',
                                                    }}
                                                    size={6}>
                                                    <Trans>currency</Trans>
                                                </Grid>
                                                <Grid
                                                    style={{
                                                        textAlign: isEn ? 'right' : 'left',
                                                        fontSize: '15px',
                                                    }}
                                                    size={6}>
                                                    <Trans>{!isEn ? selectedTransaction.asset?.persianTitle : selectedTransaction.asset?.englishTitle}</Trans>
                                                </Grid>
                                            </Grid>
                                        </Grid>

                                        <Grid style={{ height: '35px', borderRadius: '8px' }} size={12}>
                                            <Grid container style={{ padding: '7px' }}>
                                                <Grid
                                                    style={{
                                                        textAlign: isEn ? 'left' : 'right',
                                                        fontSize: '15px',
                                                    }}
                                                    size={6}>
                                                    <Trans>symbol</Trans>
                                                </Grid>
                                                <Grid
                                                    style={{
                                                        textAlign: isEn ? 'right' : 'left',
                                                        fontSize: '15px',
                                                    }}
                                                    className={`${!isEn ? '' : 'enNum'}`}
                                                    size={6}>
                                                    {selectedTransaction.asset?.symbol}
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid
                                            style={{
                                                backgroundColor: satrexTheme ? satrexCream : satrexBorderDarkColor,
                                                height: '35px',
                                                borderRadius: '8px',
                                            }}
                                            size={12}>
                                            <Grid container style={{ padding: '7px' }}>
                                                <Grid
                                                    style={{
                                                        textAlign: isEn ? 'left' : 'right',
                                                        fontSize: '15px',
                                                    }}
                                                    size={6}>
                                                    <Trans>amount</Trans>
                                                </Grid>
                                                <Grid
                                                    style={{
                                                        textAlign: isEn ? 'right' : 'left',
                                                        fontSize: '15px',
                                                    }}
                                                    className={`${!isEn ? '' : 'enNum'}`}
                                                    size={6}>
                                                    <SatrexNumFormat
                                                        num={selectedTransaction.volume}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid style={{ height: '35px', borderRadius: '8px' }} size={12}>
                                            <Grid container style={{ padding: '7px' }}>
                                                <Grid
                                                    style={{
                                                        textAlign: isEn ? 'left' : 'right',
                                                        fontSize: '15px',
                                                    }}
                                                    size={6}>
                                                    <Trans>fee</Trans>
                                                </Grid>
                                                <Grid
                                                    style={{
                                                        textAlign: isEn ? 'right' : 'left',
                                                        fontSize: '15px',
                                                    }}
                                                    className={`${!isEn ? '' : 'enNum'}`}
                                                    size={6}>
                                                    {selectedTransaction.commission}
                                                </Grid>
                                            </Grid>
                                        </Grid>

                                    </Grid>
                                </DialogContentText>
                            </DialogContent>
                        </Dialog>
                    </div>
                </SatrexCard>
                {level?.code && level?.code === '0' && <SuspendNotif />}
            </div>
        </AnimatedPage>
    );
}
