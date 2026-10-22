import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { TradeChartProps } from '../../../../utils/interfaces';

const TradeChart: React.FC<TradeChartProps> = ({ cryptoPair, tradingViewWidth }) => {
    const satrexTheme = useSelector((state:any) => state.layout.theme);

    const chartAddress = useMemo(() => {
        if (!cryptoPair?.pairSymbol) return '';
        const url = new URL('https://charting.satrex.net/');
        url.searchParams.set('symbol', `${cryptoPair.pairSymbol}-Spot`);
        url.searchParams.set('theme', satrexTheme ? 'light' : 'dark');
        return url.toString();
    }, [cryptoPair?.pairSymbol, satrexTheme]);

    return (
        <div data-tut="marketChart">
            {
                tradingViewWidth && chartAddress
                && (
                    <iframe
                        title={`${cryptoPair?.pairSymbol || 'Market'} chart`}
                        src={chartAddress}
                        width={tradingViewWidth}
                        height={350}
                        style={{ border: 0, display: 'block' }}
                    />
                )
            }
        </div>
    );
};

export default TradeChart;
