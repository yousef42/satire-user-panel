import React from 'react';
import { Divider } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import moment from 'moment';
import jmoment from 'jalali-moment';
import { useSelector } from 'react-redux';
import { satrexGreen, satrexRed } from '../../../../../styles/colors';
import Trans from '../../../../components/lang';
import SatrexTable from '../../../../components/Table/SatrexTable';
import SatrexNumFormat from '../../../../components/satrexNumFormat';
import { useSubCompletedOrders } from '../../../../../utils/queries';
import TableLoader from '../../../../components/Table/TableLoader';
import convertTz from '../../../../components/convertTz';

export default function (props) {
    const sm = useMediaQuery('(min-width:576px)');
    const md = useMediaQuery('(min-width:768px)');
    const { data: detailOrderList, isLoading } = useSubCompletedOrders({ id: props.selectedOrder.id });
    const lang = useSelector((state) => state.user.language);
    const isEn = lang === 'EN' || lang === 'gr' || lang === 'fr';
    // console.log('detailOrderList : ', detailOrderList);

    return (
        <div>

            <Divider />
            <div style={{ marginTop: '13px' }}>
                <TableLoader
                    loading={isLoading}
                >
                    {
                        detailOrderList
                        && (
                            <SatrexTable
                                responsiveSizes={[sm, md]}
                                disableDraggable
                                disablePaginate
                                headerData={[
                                    { Header: <Trans>id</Trans>, accessor: 'id' },
                                    { Header: <Trans>OrderType</Trans>, accessor: 'orderType' },
                                    { Header: <Trans>Matching time</Trans>, accessor: 'matchingTime' },
                                    { Header: <Trans>amount</Trans>, accessor: 'amount' },
                                    { Header: <Trans>price</Trans>, accessor: 'price' },
                                    { Header: <Trans>totalAmount</Trans>, accessor: 'totalAmount', hide: !md },
                                ]}
                                asset={detailOrderList.map((item, index) => ({
                                    ...item,
                                    orderType: <span
                                        style={{ color: item.orderType === 'Buy' ? satrexGreen : satrexRed }}
                                    >
                                            <Trans>{item.orderType}</Trans>
                                               </span>,
                                    amount: <SatrexNumFormat
                                        num={item.volume}
                                    />,
                                    matchingTime: <span>
                                            {
                                                (isEn ? moment(item.createdAtUtc).format('YYYY/MM/DD') : jmoment(item.createdAtUtc).format('jYYYY/jMM/jDD'))
                                            }
                                        &nbsp;
                                        {' '}
                                        {isEn ? moment(item.createdAtUtc).format('HH:mm:ss') : jmoment(convertTz(item.createdAtUtc, 'Asia/Tehran').getTime()).format('HH:mm:ss')}
                                                  </span>,
                                    price: <SatrexNumFormat
                                        num={item.price}
                                    />,
                                    totalAmount: <SatrexNumFormat
                                        num={item.volume * item.price}
                                    />,
                                }))}
                            />
                        )
                    }
                </TableLoader>
            </div>

        </div>
    );
}
