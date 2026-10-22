import React from 'react';
import { TableRow } from '@mui/material';
import { withStyles } from '@mui/styles';
import { useQuery } from 'react-query';
import Trans, { transFn } from '../../../components/lang';
import { satrexApi } from '../../../components/api';
import SatrexTable from '../../../components/Table/SatrexTable';

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: 'rgba(108,108,77,0.03)',
        },
    },
}))(TableRow);

export default function () {
    const getFeeList = async () => {
        const { data } = await satrexApi().post('/NetworkAsset/Get', {});
        if (data.isSuccess) return data.data;
        return [];
    };
    const { data: feeList } = useQuery('getFeeList', getFeeList);
    return (
        <div style={{ marginTop: 10 }}>
            {
                feeList && (
                    <SatrexTable
                        disablePaginate
                        disableSetting
                        asset={
                            feeList.filter((item) => (item.asset.symbol).toLowerCase() !== 'toman').map((item) => ({
                                title: item.asset.symbol,
                                fee: item.constantNetworkFee === -1 ? transFn('Depending on network traffic') : item.constantNetworkFee,
                                network: item.network,
                            }))
                        }
                        headerData={[
                            { Header: <Trans>type</Trans>, accessor: 'title' },
                            { Header: <Trans>fee</Trans>, accessor: 'fee' },
                            { Header: <Trans>network</Trans>, accessor: 'network' },
                        ]}
                    />
                )
            }
        </div>
    );
}
