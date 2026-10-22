import React, { useEffect, useState } from 'react';
import { withStyles, makeStyles } from '@mui/styles';
import { TableCell } from '@mui/material';
import { TableRow } from '@mui/material';
import { Paper } from '@mui/material';
import {
    Dialog,
    DialogContent, useMediaQuery,
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import { Button } from '@mui/material';
import moment from 'moment';
import { useSelector } from 'react-redux';
import Draggable from 'react-draggable';
import jmoment from 'jalali-moment';
import { useTour } from '@reactour/tour';
import convertTz from '../../../components/convertTz';
import Transactions from './Transactions';
import Trans from '../../../components/lang';
import { satrexGray, satrexGreen } from '../../../../styles/colors';
import SatrexTable from '../../../components/Table/SatrexTable';
import { useLoginHistory } from '../../../../utils/queries';
import TableLoader from '../../../components/Table/TableLoader';
import tourLoader from '../../../../utils/helpers/tourLoader';

const StyledTableCell = withStyles((theme) => ({
    head: {
        color: 'black',
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: 'rgba(108,108,77,0.03)',
        },
    },
}))(TableRow);

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
    detailsButton: {
        minWidth: '132px !important',
        height: '34px !important',
        borderRadius: '10px !important',
        boxShadow: 'none !important',
        border: (props) => `1px solid ${props.satrexTheme ? 'rgba(148, 163, 184, 0.35)' : 'rgba(255,255,255,0.12)'}`,
        backgroundColor: (props) => `${props.satrexTheme ? '#f8fafc' : 'rgba(255,255,255,0.06)'} !important`,
        color: (props) => `${props.satrexTheme ? '#334155' : '#e5ecff'} !important`,
        '& span': {
            color: (props) => `${props.satrexTheme ? '#334155' : '#e5ecff'} !important`,
            fontWeight: '700 !important',
        },
        '&:hover': {
            backgroundColor: (props) => `${props.satrexTheme ? '#eef2f7' : 'rgba(255,255,255,0.12)'} !important`,
        },
    },
    container: {
        maxHeight: '600px !important',
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
});

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

export default function CustomizedTables() {
    // const [page, handlePagination] = useTablePaginate();
    const [page, setPage] = useState(0);
    const [mounted, setMounted] = useState(false);
    const [logList, setLogList] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [fromTo, setFromTo] = useState({
        from: null,
        to: null,
    });
    const lang = useSelector((state) => state.user.language);
    const isEn = lang === 'EN' || lang === 'gr' || lang === 'fr';
    const { setIsOpen, setSteps } = useTour();

    const sm = useMediaQuery('(min-width:576px)');
    const md = useMediaQuery('(min-width:768px)');
    const lg = useMediaQuery('(min-width:992px)');
    const xl = useMediaQuery('(min-width:1200px)');
    const { data: loginHistory, isLoading } = useLoginHistory(page);
    // console.log('loginHistory  ; ', loginHistory);
    const satrexTheme = useSelector((state) => state.layout.theme);
    const classes = useStyles({ satrexTheme });
    // fromDateTime: "2021-09-29T17:42:23.0341995"
    // toDateTime: "2021-10-02T07:34:50.5107419"
    //
    // fromDateTime: "2021-10-02T07:34:50.5107419"
    // toDateTime: "2021-10-02T08:39:53.2366482"
    useEffect(() => {
        let isMounted = true;
        if (isMounted) setMounted(true);
        return () => {
            isMounted = false;
        };
    }, []);
    useEffect(() => {
        if (loginHistory) {
            tourLoader(setIsOpen, setSteps, 'security');
        }
    }, [loginHistory]);

    const getLogDetail = (row, nextRow) => {
        const toDate = (nextRow && row.createdAtUtc === nextRow.createdAtUtc)
            ? moment().format('YYYY-MM-DDTHH:mm:ss')
            : (nextRow?.createdAtUtc ?? moment().format('YYYY-MM-DDTHH:mm:ss'));
        setFromTo({
            from: row.createdAtUtc,
            to: toDate,
        });
        setModalOpen(true);
    };

    return (
        <div>
            <div style={{ padding: '20px' }} data-tut="loginLog">
                <TableLoader
                    loading={isLoading}
                >
                    {
                        loginHistory
                        && (
                                <SatrexTable
                                    responsiveSizes={[sm, md, lg, xl]}
                                    paginationInfo={loginHistory.paginationInfo}
                                    handlePagination={setPage}
                                    headerData={[
                                        { Header: <Trans>LoginLogout</Trans>, accessor: 'actionTitle' },
                                        { Header: <Trans>date</Trans>, accessor: 'date', hide: !md },
                                        { Header: <Trans>time</Trans>, accessor: 'time', hide: !sm },
                                        { Header: <Trans>status</Trans>, accessor: 'status', hide: !xl },
                                        { Header: <Trans>Ip</Trans>, accessor: 'ipAddress', hide: !lg },
                                        { Header: <Trans>browserId</Trans>, accessor: 'browserId' },
                                        { Header: <Trans>more</Trans>, accessor: 'more' },
                                    ]}

                                    asset={(loginHistory?.loginHistories ?? []).map((item, index) => ({
                                        ...item,
                                        date: (isEn ? moment(item.createdAtUtc).format('YYYY/MM/DD') : jmoment(item.createdAtUtc).format('jYYYY/jMM/jDD')),
                                        time: isEn ? moment(item.createdAtUtc).format('HH:mm:ss') : jmoment(convertTz(item.createdAtUtc, 'Asia/Tehran').getTime()).format('HH:mm:ss'),
                                        status: item.isSucceed ? (
                                            <CheckIcon style={{ color: satrexGreen }} />
                                        ) : (
                                            <CloseIcon style={{ color: 'red' }} />
                                        ),
                                        browserId: item.browser.name,
                                        more: <Button
                                            data-tut="loginReport"
                                            variant="contained"
                                            color="primary"
                                            disableElevation
                                            className={`${classes.detailsButton} showReportBtn`}
                                            onClick={() => {
                                                getLogDetail(item, (loginHistory?.loginHistories ?? [])[Math.max(index - 1, 0)]);
                                            }}
                                        >
                                            <Trans>ViewFinancialReports</Trans>
                                              </Button>,
                                    }))}
                                />
                        )
                    }
                </TableLoader>
            </div>
            <Dialog
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
                maxWidth="lg"
                fullWidth
                className={satrexTheme ? 'appContent' : 'appContentDark'}
            >
                <DialogContent>
                    <Transactions fromTo={fromTo} />
                </DialogContent>
            </Dialog>
        </div>
    );
}
