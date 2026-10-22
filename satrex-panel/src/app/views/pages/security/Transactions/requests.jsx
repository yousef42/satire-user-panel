import React from 'react';

import { useSelector } from 'react-redux';
import jmoment from 'jalali-moment';
import { useMediaQuery } from '@mui/material';
import Trans from '../../../../components/lang';

import SatrexTable from '../../../../components/Table/SatrexTable';
import convertTz from '../../../../components/convertTz';
import SatrexNumFormat from '../../../../components/satrexNumFormat';
import useStyles from './styles';
import { useRequestsList } from '../../../../../utils/queries';
import TableLoader from '../../../../components/Table/TableLoader';

export default function ({
                             fromDateTime,
                             toDateTime,
                         }) {
    const sm = useMediaQuery('(min-width:576px)');
    const md = useMediaQuery('(min-width:768px)');
    const lg = useMediaQuery('(min-width:992px)');
    const xl = useMediaQuery('(min-width:1200px)');
    const lang = useSelector((state) => state.user.language);
    const isEn = lang === 'EN' || lang === 'gr' || lang === 'fr';
    const classes = useStyles();
    const { data: requestsList, isLoading } = useRequestsList({
        fromDateTime,
        toDateTime,
    });
    return (
        <center>
            <div className={classes.root}>
                <TableLoader
                    loading={isLoading}
                >
                    {
                        requestsList
                        && (
                            <SatrexTable
                                responsiveSizes={[sm, md, lg, xl]}
                                headerData={[
                                    { Header: <Trans>id</Trans>, accessor: 'turnOverId', hide: !xl },
                                    { Header: <Trans>currency</Trans>, accessor: 'currency' },
                                    { Header: <Trans>WithdrawalAmount</Trans>, accessor: 'volume' },
                                    { Header: <Trans>requestDay</Trans>, accessor: 'date', hide: !md },
                                    { Header: <Trans>RequestHours</Trans>, accessor: 'time', hide: !lg },
                                    { Header: <Trans>destinationWalletAddress</Trans>, accessor: 'destinationWalletAddress' },
                                    { Header: <Trans>status</Trans>, accessor: 'status', hide: !sm },
                                ]}
                                asset={requestsList.map((item, index) => ({
                                    ...item,
                                    volume: <SatrexNumFormat
                                        num={item.volume}
                                    />,
                                    date: item.dateTime !== '0001-01-01T00:00:00'
                                        ? jmoment(item.createdAtUtc).format('jYYYY/jMM/jDD')
                                        : null,
                                    time: item.dateTime !== '0001-01-01T00:00:00'
                                        ? jmoment(convertTz(item.createdAtUtc, 'Asia/Tehran').getTime()).format('HH:mm:ss')
                                        : null,
                                    destinationWalletAddress: item.destination.address,
                                    currency: isEn ? item.asset.persianTitle : item.asset.englishTitle,
                                    status: <Trans>{item.status}</Trans>,
                                }))}
                            />
                        )
                    }
                </TableLoader>
            </div>
        </center>
    );
}
