import React, { useState } from 'react';

import { useSelector } from 'react-redux';
import jmoment from 'jalali-moment';
import { useMediaQuery } from '@mui/material';
import Trans, { transFn } from '../../../../components/lang';

import SatrexTable from '../../../../components/Table/SatrexTable';
import convertTz from '../../../../components/convertTz';
import { numberWithCommas } from '../../../../../utils/helpers/numberWithCommas';
import SatrexNumFormat from '../../../../components/satrexNumFormat';
import useStyles from './styles';
import { useTurnoverList } from '../../../../../utils/queries';
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
    const [page, setPage] = useState(0);

    const { data: turnoverList, isLoading } = useTurnoverList({
        fromDateTime,
        toDateTime,
        pageIndex: page,
    });

    return (
        <center>
            <div className={classes.root}>
                <TableLoader
                    loading={isLoading}
                >
                    {
                        turnoverList
                        && (
                            <SatrexTable
                                responsiveSizes={[sm, md, lg, xl]}
                                headerData={[
                                    { Header: <Trans>id</Trans>, accessor: 'turnOverId', hide: !lg },
                                    { Header: <Trans>currency</Trans>, accessor: 'currency' },
                                    { Header: <Trans>date</Trans>, accessor: 'date' },
                                    { Header: <Trans>time</Trans>, accessor: 'time', hide: !sm },
                                    { Header: <Trans>type</Trans>, accessor: 'turnOverType', hide: !md },
                                    { Header: <Trans>amount</Trans>, accessor: 'volume' },
                                    { Header: <Trans>commission</Trans>, accessor: 'commission', hide: !xl },
                                ]}
                                paginationInfo={turnoverList.paginationInfo}
                                handlePagination={setPage}
                                asset={turnoverList.map((item, index) => ({
                                    ...item,
                                    volume: <SatrexNumFormat
                                        num={item.volume}
                                    />,
                                    date: jmoment(item.dateTime).format('jYYYY/jMM/jDD'),
                                    time: jmoment(convertTz(item.dateTime, 'Asia/Tehran').getTime()).format('HH:mm:ss'),
                                    turnOverType: (item.turnOverType === 'InternalPayment' || item.turnOverType === 'ExternalPayment')
                                        ? transFn('Deposit')
                                        : transFn('Withdrawal'),
                                    currency: !isEn ? item.asset?.persianTitle : item.asset?.englishTitle,
                                    commission: numberWithCommas(item.commission),
                                }))}
                            />
                        )
                    }
                </TableLoader>
            </div>
        </center>
);
}
