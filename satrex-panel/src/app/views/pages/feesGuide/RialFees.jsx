import React from 'react';
import { TableRow } from '@mui/material';
import { withStyles } from '@mui/styles';
import { useSelector } from 'react-redux';
import Trans, { transFn } from '../../../components/lang';
import SatrexTable from '../../../components/Table/SatrexTable';

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: 'rgba(108,108,77,0.03)',
        },
    },
}))(TableRow);

export default function () {
    const lang = useSelector((state) => state.user.language);
    const isEn = lang === 'EN';
    const feeList = [
        { RialRate: transFn('Less than 400 thousand tomans'), WithdrawalFee: transFn('One percent of withdrawal') },
        {
            RialRate: <span dir={isEn ? 'ltr' : 'rtl'}>{transFn('400 thousand tomans to 50 million tomans')}</span>,
            WithdrawalFee: <span dir={isEn ? 'ltr' : 'rtl'}>
<Trans>4000 Tomans</Trans>
                {' '}
                           </span>,
        },
        {
 RialRate: transFn('More than 50 million tomans'),
            WithdrawalFee: <span
                dir={isEn ? 'ltr' : 'rtl'}
            >
<Trans>4000 Tomans for every 50 million Tomans</Trans>
                           </span>,
        },
    ];

    return (
        <div>
            <SatrexTable
                disablePaginate
                disableSetting
                asset={feeList}
                headerData={[
                    { Header: <Trans>Rial withdrawal rate</Trans>, accessor: 'RialRate' },
                    { Header: <Trans>Withdrawal fee</Trans>, accessor: 'WithdrawalFee' },
                ]}
            />
        </div>
    );
}
