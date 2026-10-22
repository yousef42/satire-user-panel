import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import jMoment from 'jalali-moment';
import { useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { satrexGray } from '../../../../styles/colors';
import { transFn } from '../../../components/lang';
import { numberWithCommas } from '../../../../utils/helpers/numberWithCommas';
import _ from "lodash"
export default function (props) {
    const satrexTheme = useSelector((state) => state.layout.theme);
    const lang = useSelector((state) => state.user.language);
    const sidebarToggle = useSelector((state) => state.layout.sidebarToggle);
    const [sidebartoggle, setSidebartoggle] = useState();
    const [lineChartConfig, setLineChartConfig] = useState(null);
    const [loadChart, setLoadChart] = useState(false);
    const isEn = lang === 'EN' || lang === 'gr' || lang === 'fr';
    // const [userBalances, setUserBalances] = useState([]);
    const chartConfig = {
        chart: {
            height: 350,
            type: 'line',
            zoom: {
                enabled: false,
            },
            toolbar: {
                show: false,
            },
            fontFamily: isEn ? 'enNum' : '',
        },
        colors: ['#ffcb4e'],
        stroke: {
            curve: 'straight',
            width: 2,
        },
        fill: {
            type: 'gradient' / 'solid' / 'pattern' / 'image',
        },
        markers: {
            size: 5,
            colors: satrexTheme ? 'black' : 'white',
            strokeColors: satrexTheme ? '#fff' : '#000000',
            strokeWidth: 2,
            strokeOpacity: 0.9,
            strokeDashArray: 0,
            fillOpacity: 1,
            discrete: [],
            shape: 'circle',
            radius: 2,
            offsetX: 0,
            offsetY: 0,
            onClick: undefined,
            onDblClick: undefined,
            showNullDataPoints: true,
            hover: {
                size: 7,
                colors: ['red'],
                sizeOffset: 3,
                fillColor: '#000',
                strokeColor: satrexTheme ? '#eee' : '#000000',
                fill: {
                    colors: ['red'],
                },
            },
        },

        grid: {
            strokeDashArray: 2,
            borderColor: satrexTheme ? '#d2d2d2' : '#444444',
            row: {
                // takes an array which will be repeated on columns
                opacity: 0.5,
            },
        },
        yaxis: {

            labels: {
                offsetX: isEn ? 0 : _.maxBy(props.balances, 'balance') / 100000,
                show: true,
                formatter(value) {
                    return numberWithCommas((value).toFixed(0));
                },
            },
        },
        xaxis: {
            categories: props.balances
                .sort((a, b) => {
                    const dateA = new Date(a.dateTime);
                    const dateB = new Date(b.dateTime);
                    return dateA - dateB;
                })
                .map((item) => jMoment(item.dateTime).format('jYYYY/jMM/jDD')),
            tickAmount: undefined,
            tickPlacement: 'between',
            min: undefined,
            max: undefined,
            range: 12,
            floating: false,
            fill: {
                color: '#fff',
            },
            decimalsInFloat: undefined,
            position: 'bottom',
            labels: {
                show: true,
                rotate: -45,
                rotateAlways: false,
                hideOverlappingLabels: true,
                showDuplicates: false,
                trim: false,
                minHeight: 'unset',
                maxHeight: 120,
                style: {
                    colors: !satrexTheme
                        ? [
                            '#bebebe',
                            '#bebebe',
                            '#bebebe',
                            '#bebebe',
                            '#bebebe',
                            '#bebebe',
                            '#bebebe',
                            '#bebebe',
                            '#bebebe',
                            '#bebebe',
                            '#bebebe',
                            '#bebebe',
                        ]
                        : [
                            satrexGray,
                            satrexGray,
                            satrexGray,
                            satrexGray,
                            satrexGray,
                            satrexGray,
                            satrexGray,
                            satrexGray,
                            satrexGray,
                            satrexGray,
                            satrexGray,
                            satrexGray,
                        ],
                    fontSize: '12px',
                    fontWeight: 400,
                },
                offsetX: 0,
                offsetY: 0,
                format: undefined,
                formatter: undefined,
                datetimeUTC: true,
                type: 'numeric',
            },
        },
        tooltip: {
            enabled: true,
            enabledOnSeries: undefined,
            shared: true,
            followCursor: false,
            intersect: false,
            inverseOrder: false,
            custom: undefined,
            fillSeriesColor: false,
            theme: false,
            style: {
                fontSize: '20px',
                color: satrexGray,
                backgroundColor: 'red',
            },
            onDatasetHover: {
                highlightDataSeries: false,
            },
            x: {
                show: true,
                formatter: undefined,
            },
            y: {
                show: true,
                formatter: undefined,
            },
            z: {
                show: true,
                formatter: undefined,
            },
            marker: {
                show: true,
            },
            fixed: {
                enabled: false,
                position: 'topRight',
                offsetX: 0,
                offsetY: 0,
            },
        },
    };
    const chartSeries = [
        {
            name: transFn('Total Fund'),
            data: props.balances
                .sort((a, b) => {
                    const dateA = new Date(a.dateTime);
                    const dateB = new Date(b.dateTime);
                    return dateA - dateB;
                })
                .map((item) => item.balance),
        },
    ];

    // const resetConfig = () => {
    //     setTimeout(() => {
    //
    //       document
    //           .getElementsByClassName("apexcharts-yaxis")[0]
    //           ?.setAttribute("transform",   !isEn ? "translate(10,0)" : "translate(50,0)")
    //       // document.getElementsByClassName('apexcharts-yaxis')[0].children[0].children.style.backgroundColor = 'red'
    //       let childElements =
    //           document.getElementsByClassName("apexcharts-yaxis")[0]?.children[0]
    //               .children;
    //
    //       if(childElements)
    //         for (const [key, value] of Object.entries(childElements)) {
    //           value.children[0].innerHTML = new Intl.NumberFormat().format(
    //               parseInt((value.children[0].innerHTML).replace(/,/g, ""))
    //           );
    //         }
    //     }, 100);
    //
    // };
    const divRef = React.useRef();

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            setLoadChart(false);
            setTimeout(() => {
                setLoadChart(true);
            }, 1500);
        }
        return () => {
            isMounted = false;
        };
        // console.log('sidebartoggle : ', sidebarToggle);
    }, [sidebarToggle, isEn]);

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            setTimeout(() => {
                if (window.screen.availWidth > 1300) {
                    // resetConfig();
                    setSidebartoggle(sidebarToggle);
                }
                setLoadChart(true);
                // console.log(divRef.current.clientWidth)
                // document.getElementsByClassName('apexcharts-canvas')[1].children[0].setAttribute("width", divRef.current.clientWidth)
            }, 500);
        }
        return () => {
            isMounted = false;
        };
    }, [isEn]);

    // console.log('props.balances : ', props.balances);
    return (
        <div style={props.style} ref={divRef} className="dashboardWalletChart">
            <AnimatePresence exitBeforeEnter>
                {loadChart && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        // style={{ marginTop: 15 }}
                    >
                        <ReactApexChart
                            options={chartConfig}
                            series={chartSeries}
                            type="line"
                            height={220}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
