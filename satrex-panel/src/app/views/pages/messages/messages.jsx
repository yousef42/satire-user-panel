import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import jmoment from 'jalali-moment';
import { useQuery } from 'react-query';
import { useTour } from '@reactour/tour';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import moment from 'moment';
import { useSelector } from 'react-redux';
import Trans from '../../../components/lang';
import { satrexApi } from '../../../components/api';

import satrexModal from '../../../components/satrexModal';

import Replies from './replies';
import convertTz from '../../../components/convertTz';
import SatrexTable from '../../../components/Table/SatrexTable';
import tourLoader from '../../../../utils/helpers/tourLoader';
import TableRowPlaceholder from '../../../components/Table/TableRowPlaceholder';

const useStyles = makeStyles({
    detailsButton: {
        width: '100% !important',
        height: '34px !important',
        marginTop: '3px !important',
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
});

export default function CustomizedTables(props) {
    // const [rows, setRows] = useState([]);
    const { setIsOpen, setSteps } = useTour();
    const location = useLocation();
    const [openModal, setOpenModal] = useState(false);
    const [messageDetail, setMessageDetail] = useState(false);
    const lang = useSelector((state) => state.user.language);
    const satrexTheme = useSelector((state) => state.layout.theme);
    const classes = useStyles({ satrexTheme });
    const isEn = lang === 'EN' || lang === 'gr' || lang === 'fr';
    const getRows = async () => {
        const { data } = await satrexApi()
            .post('/Ticket/GetList', {});
        return data.data.reverse();
    };

    const { data: rows, isLoading } = useQuery('messagesList', getRows);

    useEffect(() => {
        let isMounted = true;
        if (isMounted && rows) tourLoader(setIsOpen, setSteps, (location.pathname).split('/')[1]);
        return () => {
            isMounted = false;
        };
    }, [rows]);

    const closeModal = () => {
        setOpenModal(false);
    };

    const getMessageDetail = (id) => {
        satrexApi()
            .post('/Ticket/GetDetails', {
                startTicketId: id,
            })
            .then(({ data }) => {
                setMessageDetail(data.data);
            });
        setOpenModal(true);
    };

    return (
        <div style={{ padding: '20px', width: '100%' }} data-tut="messageList">
            <AnimatePresence exitBeforeEnter>
                {
                    isLoading
                    && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={{ marginTop: 15 }}
                        >
                            <TableRowPlaceholder
                                rowsCount={3}
                                columnsCount={5}
                            />
                        </motion.div>
                    )
                }
            </AnimatePresence>
            <AnimatePresence exitBeforeEnter>
                {
                    rows
                    && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={{ marginTop: 15 }}
                        >
                            <SatrexTable
                                headerData={[
                                    { Header: <Trans>id</Trans>, accessor: 'id' },
                                    { Header: <Trans>topic</Trans>, accessor: 'title' },
                                    { Header: <Trans>sendDate</Trans>, accessor: 'sendDate' },
                                    { Header: <Trans>LastReplyDate</Trans>, accessor: 'LastReplyDate' },
                                    { Header: <Trans>status</Trans>, accessor: 'status' },
                                    { Header: <Trans>activities</Trans>, accessor: 'activities' },

                                ]}
                                asset={rows.map((item, index) => ({
                                    ...item,
                                    id: item.id,
                                    status: <Trans>{item.status}</Trans>,
                                    sendDate: <span>
                                            {
                                                `${(isEn ? moment(item.createdAtUtc).format('HH:mm:ss') : jmoment(convertTz(item.createdAtUtc, 'Asia/Tehran').getTime()).format('HH:mm:ss'))
                                                } ${
                                                    (isEn ? moment(item.createdAtUtc).format('YYYY/MM/DD') : jmoment(item.createdAtUtc).format('jYYYY/jMM/jDD'))
                                                    }`
                                            }
                                              </span>,
                                    LastReplyDate: item.lastReplyAtUtc !== '0001-01-01T00:00:00'
                                        && `${
                                            (isEn ? moment(item.lastReplyAtUtc).format('HH:mm:ss') : jmoment(convertTz(item.lastReplyAtUtc, 'Asia/Tehran').getTime()).format('HH:mm:ss'))
                                        } ${
                                            (isEn ? moment(item.lastReplyAtUtc).format('YYYY/MM/DD') : jmoment(item.lastReplyAtUtc).format('jYYYY/jMM/jDD'))}`,
                                    activities: <Button
                                        variant="contained"
                                        color="primary"
                                        disableElevation
                                        className={classes.detailsButton}
                                        type="submit"
                                        onClick={() => {
                                            getMessageDetail(item.id);
                                        }}
                                    >
                                        <Trans>details</Trans>
                                                </Button>,

                                }))}
                            />
                        </motion.div>
                    )
                }
            </AnimatePresence>
            {messageDetail && (
                <satrexModal
                    modalOpen={openModal}
                    handleClose={closeModal}
                    title={<Trans>MessageDetails</Trans>}
                >
                    <Replies messageDetail={messageDetail} />
                </satrexModal>
            )}
        </div>
    );
}
