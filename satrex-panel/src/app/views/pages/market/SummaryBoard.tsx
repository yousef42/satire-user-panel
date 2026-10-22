import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import SatrexNumFormat from '../../../components/SatrexNumFormat';
import { satrexGray, satrexRed } from '../../../../styles/colors';
import Trans from '../../../components/lang';
import { useHighAndLowPriceForPairInLast24Hours } from '../../../../utils/queries';
import { summaryBoardProps } from '../../../../utils/interfaces';
import PercentageFormater from '../../../components/PercentageFormater';

const SummaryBoard: React.FC<summaryBoardProps> = ({ cryptoPair, lastPriceColor, lastPrice }) => {
    const [choosedMarket, setChoosedMarket] = useState({
        color: satrexGray,
    });
    const coinList = useSelector((state: any) => state.coin.coinPaprikaList);
    useEffect(() => {
        setChoosedMarket(
            coinList.filter((item: any) => item.symbol === cryptoPair.sourceAssetSymbol)[0],
        );
    }, []);
    const lang = useSelector((state: any) => state.user.language);
    const satrexTheme = useSelector((state: any) => state.layout.theme);
    const { data: pairUpDownPrice } = useHighAndLowPriceForPairInLast24Hours({ pairId: cryptoPair.pairId });
    const titleColor = satrexTheme ? '#111827' : '#eef2ff';
    const valueColor = satrexTheme ? '#94a3b8' : '#c7d2fe';

    return (
        <Grid container data-tut="totalCryptoInfo">
            <Grid className="row column center middle" size={1}>
                <img
                    src={cryptoPair.sourceAssetImageAddress}
                    alt="coin logo"
                    style={{ width: '50%' }}
                />
            </Grid>
            <Grid size={11}>
                <Grid
                    container

                    style={{ maxHeight: '73px' }}
                >
                    <Grid size={3}>
                        <div
                            className="marketHeadItem"
                            style={{ color: choosedMarket?.color || titleColor }}
                        >
                                                                <span className="bold">
                                                                        {lang === 'EN' ? cryptoPair.sourceAssetEnglishTitle : cryptoPair.sourceAssetPersianTitle}
                                                                    {' '}
                                                                    /
                                                                    {' '}
                                                                    {lang === 'EN' ? cryptoPair.destinationAssetEnglishTitle : cryptoPair.destinationAssetPersianTitle}
                                                                    {' '}
                                                                </span>
                            {cryptoPair.lastPriceInToman
                                && (
                                    <span style={{
                                        fontWeight: 'bold',
                                        fontSize: 15,
                                        color: lastPriceColor,
                                    }}
                                    >
                                                                                     <SatrexNumFormat
                                                                                         num={lastPrice}
                                                                                     />
                                    </span>
                                )}
                        </div>
                    </Grid>

                    <Grid size={3}>
                        <div className="marketHeadItem ">
                                                                   <span className="bold" style={{ color: titleColor }}>
                                                                    <Trans>theLowestPrice</Trans>
                                                                   </span>
                            {
                                pairUpDownPrice && (
                                    <span style={{ color: valueColor }}>
                                        <SatrexNumFormat
                                            num={pairUpDownPrice.lowPrice}
                                        />
                                    </span>
                                )
                            }
                        </div>
                    </Grid>
                    <Grid size={3}>
                        <div className="marketHeadItem ">
                                                                <span className="bold" style={{ color: titleColor }}>
                                                                    <Trans>theHighestPrice</Trans>
                                                                </span>
                            {
                                pairUpDownPrice && (
                                    <span style={{ color: valueColor }}>
                                        <SatrexNumFormat
                                            num={pairUpDownPrice.highPrice}
                                        />
                                    </span>
                                )
                            }
                        </div>
                    </Grid>

                    <Grid size={3}>
                        <div
                            className="marketHeadItem"
                            style={{ fontWeight: 'bold', color: titleColor }}
                        >
                            <Trans>24Change</Trans>
                            {cryptoPair
                                && (
                                    <PercentageFormater
                                        style={{
                                            color: satrexRed,
                                            fontSize: '15px',
                                            fontWeight: 'bold',
                                            justifyContent: 'center',
                                        }}
                                        value={cryptoPair.changeForLastIn24HoursInPercent}
                                    />
                                )}
                        </div>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default SummaryBoard;
