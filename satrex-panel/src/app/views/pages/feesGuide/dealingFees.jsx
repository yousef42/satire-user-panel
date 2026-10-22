import React from 'react';
import { TableRow } from '@mui/material';
import { withStyles } from '@mui/styles';
import Trans, { transFn } from '../../../components/lang';
import SatrexTable from '../../../components/Table/SatrexTable';

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: 'rgba(108,108,77,0.03)',
    },
  },
}))(TableRow);

const feeList = [
    { TradingFee: '%0.25', Trading30: transFn('Less than 10 million tomans') },
    { TradingFee: '%0.2', Trading30: transFn('Between 10 and 50 million Tomans') },
    { TradingFee: '%0.15', Trading30: transFn('Between 50 and 100 million Tomans') },
    { TradingFee: '%0.10', Trading30: transFn('More than 100 million tomans') },
];

export default function () {
  return (
    <div>
      <SatrexTable
          disablePaginate
          disableSetting
          asset={feeList}
          headerData={[
            { Header: <Trans>TradingFee</Trans>, accessor: 'TradingFee' },
            { Header: <Trans>Trading volume of the last 30 days</Trans>, accessor: 'Trading30' },
          ]}
      />
    </div>
  );
}
