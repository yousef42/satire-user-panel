import React from 'react';

import { IconButton, useMediaQuery } from '@mui/material';

import { useSelector } from 'react-redux';
import { useMutation, useQueryClient } from 'react-query';
import jmoment from 'jalali-moment';
import CancelIcon from '@mui/icons-material/Cancel';
import moment from 'moment';
import { satrexApi } from '../../../components/api';
import Trans, { transFn } from '../../../components/lang';
import convertTz from '../../../components/convertTz';
import SatrexTable from '../../../components/Table/SatrexTable';
import satrexNumFormat from '../../../components/satrexNumFormat';
import satrexShortText from '../../../components/satrexShortText';
import satrexToast from '../../../components/satrexToast';
import { LightTooltip } from '../../../components/LightTooltip';

export default function CustomizedTables(props) {
    const lang = useSelector((state) => state.user.language);
    const isEn = lang === 'EN' || lang === 'gr' || lang === 'fr';
    const sm = useMediaQuery('(min-width:576px)');
    const md = useMediaQuery('(min-width:768px)');
    const lg = useMediaQuery('(min-width:992px)');
    const xl = useMediaQuery('(min-width:1200px)');

    const queryCache = useQueryClient();

    const cancelRequest = async (row) => {
        if (row.destination.isInternal) {
            const { data } = await satrexApi().post('/InternalWithdraw/Cancel', {
                id: row.turnOverId.split('-')[1],
            });
            if (data.isSuccess) {
                satrexToast(transFn('The request was successfully canceled'), 'error');
            } else {
                data.Errors.forEach((err) => {
                    satrexToast(err.Description, 'error');
                });
                throw false;
            }
        } else {
            const { data } = await satrexApi().post('/ExternalWithdraw/Cancel', {
                id: row.turnOverId.split('-')[1],
            });
            if (data.isSuccess) {
                satrexToast(transFn('The request was successfully canceled'), 'error');
            } else {
                data.Errors.forEach((err) => {
                    satrexToast(err.Description, 'error');
                });
                throw false;
            }
        }
    };

    const cancelRequestMutation = useMutation((row) => cancelRequest(row), {
        onSuccess: (data, row) => {
            queryCache.setQueryData(
                'getRquestList',
                queryCache
                    .getQueryData('getRquestList')
                    .filter((item) => item.turnOverId !== row.turnOverId),
            );
        },
    });

    return (
        <div data-tut="requestList">
            {
                props.requestList
                && (
                    <SatrexTable
                        responsiveSizes={[sm, md, lg, xl]}
                        headerData={[
                            { Header: <Trans>id</Trans>, accessor: 'turnOverId', hide: !md },
                            { Header: <Trans>currency</Trans>, accessor: 'currency' },
                            { Header: <Trans>WithdrawalAmount</Trans>, accessor: 'volume' },
                            { Header: <Trans>requestDay</Trans>, accessor: 'date', hide: !lg },
                            { Header: <Trans>RequestHours</Trans>, accessor: 'time', hide: !lg },
                            { Header: <Trans>destinationWalletAddress</Trans>, accessor: 'destinationWalletAddress' },
                            { Header: <Trans>status</Trans>, accessor: 'status', hide: !xl },
                            { Header: <Trans>activities</Trans>, accessor: 'activities' },
                        ]}
                        asset={props.requestList.map((item, index) => ({
                            ...item,
                            volume: <satrexNumFormat
                                num={item.volume}
                            />,
                            date: item.createdAtUtc !== '0001-01-01T00:00:00' ? (isEn ? moment(item.createdAtUtc).format('YYYY/MM/DD') : jmoment(item.createdAtUtc).format('jYYYY/jMM/jDD')) : null,
                            time: item.createdAtUtc !== '0001-01-01T00:00:00' ? (isEn ? moment(item.createdAtUtc).format('HH:mm:ss') : jmoment(convertTz(item.createdAtUtc, 'Asia/Tehran').getTime()).format('HH:mm:ss')) : null,
                            destinationWalletAddress: <satrexShortText text={String(item.destination.address)} />,
                            currency: !isEn ? item.asset?.persianTitle : item.asset?.englishTitle,
                            status: <Trans>{item.status}</Trans>,
                            activities: item.status === 'Pending' && (
                                <LightTooltip title={transFn('cancelRequest')}>
                                    <IconButton
                                        aria-label="delete"
                                        className="topbarIcons"
                                        onClick={() => {
                                            cancelRequestMutation.mutate(item);
                                        }}
                                    >
                                        <CancelIcon
                                            style={{ fontSize: '16px', color: 'red' }}
                                        />
                                    </IconButton>
                                </LightTooltip>
                            ),
                        }))}
                    />
                )
            }
        </div>
    );
}
