import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { useSelector } from 'react-redux';
import { ScaleLoader } from 'react-spinners';
import { satrexGray, satrexGreen, satrexSemiDarkerBlueDarkMode } from '../../../../styles/colors';
import { numberWithCommas } from '../../../../utils/helpers/numberWithCommas';
import { transFn } from '../../../components/lang';
import { useWalletList } from '../../../../utils/queries';

export default function ({ walletStatusHeight }) {
    const { data: walletList, isLoading } = useWalletList();
    const lang = useSelector((state) => state.user.language);
    const theme = useSelector((state) => state.layout.theme);
    const isEn = lang === 'EN' || lang === 'gr' || lang === 'fr';
    const chartTextColor = theme ? '#475569' : '#e6eeff';
    const chartMutedColor = theme ? '#cbd5e1' : '#5a6887';
    const tooltipBackgroundColor = theme ? '#ffffff' : '#0f1730';
    const tooltipBorderColor = theme ? 'rgba(148, 163, 184, 0.28)' : 'rgba(144, 169, 215, 0.2)';
    const [series, setSeries] = useState(
        {
            type: 'pie',
            height: 350,
            radius: ['34%', '58%'],
            center: ['50%', '62%'],
            avoidLabelOverlap: true,
            minShowLabelAngle: 4,
            label: {
                padding: [0, 0, 0, 0],
                color: chartTextColor,
            },
            labelLine: {
                length: 12,
                length2: 10,
                lineStyle: {
                    color: chartMutedColor,
                },
            },
            itemStyle: {
                borderRadius: '10px !important',
            },
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                },
            },
            formatter(value) {
                return numberWithCommas((value).toFixed(0));
            },
            name: transFn('List of currencies in your wallet'),
        },
    );

    const chartConfig = {
        tooltip: {
            trigger: 'item',
            backgroundColor: tooltipBackgroundColor,
            borderColor: tooltipBorderColor,
            textStyle: {
                fontFamily: 'faNum !important',
                color: chartTextColor,
            },
        },
        textStyle: {
            fontFamily: 'faNum !important',
            fontSize: 15,
            color: chartTextColor,
        },
        toolbox: {
            show: true,
            iconStyle: {
                borderColor: chartTextColor,
            },
            emphasis: {
                iconStyle: {
                    borderColor: satrexGreen,
                },
            },
            feature: {
                mark: false,
                dataView: {
                    show: true,
                    readOnly: true,
                    title: transFn('List view'),
                    lang: [transFn('satrex wallet'), transFn('close')],
                    buttonColor: satrexGreen,
                    backgroundColor: theme ? 'white' : satrexSemiDarkerBlueDarkMode,
                    textareaColor: theme ? 'white' : satrexSemiDarkerBlueDarkMode,
                    textColor: theme ? satrexGray : 'white',
                    optionToContent(opt) {
                        let table = '<table style="width:100%;text-align:center"><tbody><tr class="flex space-between table" style="padding:0 5% ">'
                            + `<td>${transFn('wallet')}</td>`
                            + `<td>${transFn('amount')}</td>`
                            + '</tr>';
                        for (let i = 0; i < opt.series[0].data.length; i++) {
                            table += '<tr class="flex space-between"  style="padding:0 5% ">'
                                + `<td>${opt.series[0].data[i].name}</td>`
                                + `<td>${(opt.series[0].data[i].name === 'Toman' || opt.series[0].data[i].name === 'تومان') ? numberWithCommas((opt.series[0].data[i].value).toFixed(0)) : numberWithCommas(opt.series[0].data[i].value)}</td>`
                                + '</tr>';
                        }
                        table += '</tbody></table>';
                        return table;
                    },
                },
                saveAsImage: {
                    show: true,
                    title: 'ذخیره',
                    name: 'satrex Wallet',
                },
            },
            padding: 10,
            top: -5,
            borderRadius: 20,
        },

        legend: {
            left: 'center',
            textStyle: {
                fontFamily: 'faNum !important',
                color: chartTextColor,
            },
            top: 12,
            itemGap: 14,
        },
        height: 600,
    };

    const handleSeries = () => {
        setSeries((prevSeries) => ({
            ...prevSeries,
            top: Math.max(72, (walletStatusHeight / 7.5) * 1.7),
            label: {
                ...prevSeries.label,
                color: chartTextColor,
            },
            labelLine: {
                ...prevSeries.labelLine,
                lineStyle: {
                    color: chartMutedColor,
                },
            },
            data: walletList.filter((item) => item.assetEnglishTitle === 'Toman' || item.totalFund > 0).map((item) => ({
                name: isEn ? item.assetEnglishTitle : item.assetPersianTitle,
                value: item.totalFundPriceInToman,
            })),

        }));
    };

    useEffect(() => {
        let isMounted = true;
        if (isMounted && walletList) {
            handleSeries();
        }
        return () => {
            isMounted = false;
        };
    }, [walletList, walletStatusHeight, isEn, theme]);

    return (
        <>
            {walletList && <ReactECharts option={{ ...chartConfig, series }} />}

            {
                isLoading
                && (
                    <div className="flex center middle " style={{ height: '100%' }}>
                        <ScaleLoader
                            color={satrexGreen}
                            loading
                            height={15}
                            width={3}
                        />
                    </div>
                )
            }
        </>
    );
}
