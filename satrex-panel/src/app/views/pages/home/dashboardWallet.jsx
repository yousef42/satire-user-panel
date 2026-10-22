import React from 'react';
import { useSelector } from 'react-redux';
import { KeyboardArrowDown } from '@mui/icons-material';
import { useQuery } from 'react-query';
import { useMediaQuery } from '@mui/material';
import Trans from '../../../components/lang';
import SatrexTable from '../../../components/Table/SatrexTable';

import { satrexApi } from '../../../components/api';
import SatrexNumFormat from '../../../components/SatrexNumFormat';
import TableLoader from '../../../components/Table/TableLoader';
import PercentageFormater from '../../../components/PercentageFormater';

export default function (props) {
    const lang = useSelector((state) => state.user.language);
    const isEn = lang === 'EN' || lang === 'gr' || lang === 'fr';
    const md = useMediaQuery('(min-width:768px)');
    const [showFull, setShowFull] = React.useState(true);

    const GetAllSpotAssetsWithDetailsList = async () => {
        try {
            const { data } = await satrexApi()
                .post('/Dashboard/GetAllSpotAssetsWithDetailsList');
            if (data.isSuccess) {
                const result = data.data.filter((item) => item.totalFund > 0);
                // console.log(result);
                if (result.length > 3) setShowFull(false);
                // return false;
                return result;
            }
        } catch (err) {

        }
    };
    const {
        data: coinList,
        isLoading: loading,
    } = useQuery('GetAllSpotAssetsWithDetailsList', GetAllSpotAssetsWithDetailsList);
    const visibleWalletItems = Array.isArray(coinList)
        ? coinList.filter((item) => Number(item?.totalFund || 0) > 0)
        : [];

    return (
        <div
            style={{
                display: 'flex', justifyContent: 'center', height: '100%', flexDirection: 'column',
            }}
            data-tut="walletTable"
        >
            <TableLoader
                loading={loading}
                placeholderOptions={{
                    coinIcon: true,
                    columnsCount: 3,
                }}
            >
                {visibleWalletItems.length > 0
                    && (
                        <SatrexTable
                            responsiveSizes={[md]}
                            disablePaginate
                            asset={visibleWalletItems.slice(0, !showFull ? 3 : visibleWalletItems.length).map((item, index) => ({
                                ...item,
                                rowClass: `${showFull && 'fadeIn'} dashboardWalletRow walletRow`,
                                coinName: <div
                                    className=" coinRow"
                                    style={{
                                        padding: 10,
                                        textAlign: isEn ? 'left' : 'right',
                                        direction: isEn ? 'ltr' : 'rtl',
                                        width: '100%',
                                    }}
                                >
                                    <img
                                        src={item.assetImageAddress}
                                        style={{ width: 30, height: 30 }}
                                        alt="sourceAssetBase64Image"
                                    />
                                    &nbsp;&nbsp;
                                    <span
                                        className="colorWhite"
                                        style={{ whiteSpace: 'nowrap' }}
                                    >
<Trans>
                            {isEn
                                ? item.assetEnglishTitle
                                : item.assetPersianTitle}
</Trans>
                                    </span>
                                          </div>,
                                totalFund: <SatrexNumFormat
                                    num={item.assetPersianTitle !== 'تومان' ? item.totalFund : (item.totalFund).toFixed(0)}
                                />,
                                changeForLastIn24HoursInPercent: <PercentageFormater
                                    value={item.changeForLastIn24HoursInPercent}
                                />,
                                totalTradablePriceInToman: <SatrexNumFormat
                                    num={(item.totalTradablePriceInToman).toFixed(0)}
                                />,
                            }))}

                            headerData={[
                                { Header: <Trans>cryptocurrency</Trans>, accessor: 'coinName' },
                                { Header: <Trans>inventory</Trans>, accessor: 'totalFund' },
                                {
                                    Header: <Trans>ChangesIn24Hours</Trans>,
                                    accessor: 'changeForLastIn24HoursInPercent',
                                    hide: !md,
                                },
                                {
                                    Header: <>
                                        <Trans>inventory</Trans>
                                        &nbsp;/&nbsp;
                                        <Trans>toman</Trans>
                                            </>,
                                    accessor: 'totalTradablePriceInToman',
                                },
                            ]}
                        />
                    )}
            </TableLoader>

            {/* {loading && ( */}
            {/*    <center style={{ marginTop: '108px', marginBottom: '3%' }}> */}
            {/*        <Loader loading={loading} /> */}
            {/*    </center> */}
            {/* )} */}
            {!loading && visibleWalletItems.length <= 0 && (
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    position: 'relative',
                    top: 4,
                    width: '100%',
                    alignItems: 'center',
                    flexGrow: 1,
                }}
                >
                    <h5><Trans>cryptoNotFoundInWallet</Trans></h5>
                </div>
            )}
            {!loading && visibleWalletItems.length > 3
                && (
                    <KeyboardArrowDown
                        style={{
                            position: 'absolute',
                            bottom: 8,
                            left: '50%',
                            cursor: 'pointer',
                            transform: showFull ? 'rotate(180deg)' : 'unset',
                            transition: '0.3s',
                        }}
                        onClick={() => {
                            props.setExtraHeight(!showFull ? (visibleWalletItems.length - 3) * 35 + 45 : 0);
                            setShowFull(!showFull);
                        }}
                    />
                )}
        </div>
    );
}
