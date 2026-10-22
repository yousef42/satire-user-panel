import React, { useEffect, useRef, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Divider } from '@mui/material';
import { Grid } from '@mui/material';
import { Card } from '@mui/material';
import { useSelector } from 'react-redux';
import { useTour } from '@reactour/tour';
import { useQueryClient } from 'react-query';
import {
    HubConnectionBuilder,
    HttpTransportType,
} from '@microsoft/signalr';
import Trans from '../../../components/lang';
import { numberWithCommas } from '../../../../utils/helpers/numberWithCommas';
import {
    satrexBorderDarkColor,
    satrexDarkerBlueDarkMode,
    satrexGreen,
    satrexLightGray,
    satrexRed,
} from '../../../../styles/colors';
import SatrexNumFormat from '../../../components/SatrexNumFormat';
import { useSpotLimitBoardPressure } from '../../../../utils/queries';
import PercentageFormater from '../../../components/PercentageFormater';
import socketResponseAdaptor from '../../../../utils/helpers/socketResponseAdaptor';
import { baseUrl } from '../../../components/api';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100%',
        minHeight: 0,
        display: 'flex',
        flexDirection: 'column',
        paddingBottom: '5px',
        paddingRight: '5px',
        paddingLeft: '5px',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
        border: 'none',
    },
    table: {
        minWidth: '100%',
        fontSize: '12px',
        tr: {
            th: {
                fontSize: 10,
            },
        },
        direction: 'ltr',
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
    tbCell: {
        fontSize: 12,
        width: '30%',
    },
    tbContainer: {
        height: '100%',
        direction: 'rtl',
    },
}));

export default function (props) {
    const classes = useStyles();
    const hubBaseUrl = baseUrl.replace('enduserapi.', 'hubs.');
    const queryClient = useQueryClient();
    const [sellPresure, setSellPresure] = useState(0);
    const satrexTheme = useSelector((state) => state.layout.theme);
    const lang = useSelector((state) => state.user.language);
    const isEn = lang === 'EN' || lang === 'gr' || lang === 'fr';
    const { setIsOpen, setSteps } = useTour();
    const connectionRef = useRef(null);
    const reconnectTimerRef = useRef(null);
    const [orderList, setOrderList] = useState({
        buyOrders: [],
        sellOrders: [],
        lastCompletedOrderPrice: [],
    });
    const pressureBoxHeight = 86;
    const containerHeight = props.containerHeight || null;
    const queueCardHeight = containerHeight
        ? Math.max(containerHeight - pressureBoxHeight, 320)
        : (props.maxTableHeight ? props.maxTableHeight + 368 : 400);
    const orderRowsLimit = containerHeight
        ? 50
        : (props.maxTableHeight > 500 ? 18 : 15);
    const cardStyle = satrexTheme
        ? {
            height: queueCardHeight,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            backgroundColor: '#ffffff',
            border: '1px solid #ececec',
        }
        : {
            height: queueCardHeight,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            backgroundColor: satrexDarkerBlueDarkMode,
            border: `1px solid ${satrexBorderDarkColor}`,
        };
    const headerTextColor = satrexTheme ? '#111827' : '#eef2ff';

    const { data: boardPressure } = useSpotLimitBoardPressure({
        pairId: props.pair,
    });

    const applyBoardUpdate = (payload) => {
        if (!payload) return;
        const normalizedPayload = socketResponseAdaptor(payload);
        const list = normalizedPayload?.buyOrders && normalizedPayload?.sellOrders
            ? normalizedPayload
            : (normalizedPayload?.data?.buyOrders && normalizedPayload?.data?.sellOrders
                ? normalizedPayload.data
                : null);
        if (!list) return;

        setOrderList(list);
        props.setLastPrice((prevState) => {
            if (prevState > list.lastCompletedOrderPrice) props.setLastPriceColor(satrexRed);
            else props.setLastPriceColor(satrexGreen);
            return list.lastCompletedOrderPrice;
        });
    };

    useEffect(() => {
        let isActive = true;

        const connect = async () => {
            if (!isActive || !props.pair) return;

            const connection = new HubConnectionBuilder()
                .withUrl(`${hubBaseUrl}/Hub/1/2/${props.pair}/1`, {
                    skipNegotiation: true,
                    transport: HttpTransportType.WebSockets,
                })
                .withAutomaticReconnect()
                .build();

            connectionRef.current = connection;

            connection.on('UpdateBoard', (data) => {
                try {
                    const parsedData = typeof data === 'string' ? JSON.parse(data) : data;
                    applyBoardUpdate(parsedData);
                } catch (_) {
                    // Ignore malformed payloads to keep the board alive.
                }
            });

            connection.onclose(() => {
                if (!isActive) return;
                reconnectTimerRef.current = setTimeout(() => {
                    connect();
                }, 1500);
            });

            try {
                await connection.start();
            } catch (_) {
                if (!isActive) return;
                reconnectTimerRef.current = setTimeout(() => {
                    connect();
                }, 1500);
            }
        };

        connect();

        return () => {
            isActive = false;
            if (reconnectTimerRef.current) clearTimeout(reconnectTimerRef.current);
            if (connectionRef.current) connectionRef.current.stop();
        };
    }, [props.pair]);

    // useEffect(() => {
    //     const isMounted = true;
    //     let refreshBoard;
    //     let ordersPresure;
    //     if (isMounted) {
    //         refreshBoard = setInterval(async () => {
    //             await queryClient.invalidateQueries('getSpotLimitBoardAccumulative');
    //         }, 1000);
    //         ordersPresure = setInterval(async () => {
    //             await queryClient.invalidateQueries('getSpotLimitBoardPressureType');
    //         }, 10000);
    //     }
    //     return () => {
    //         clearInterval(refreshBoard);
    //         clearInterval(ordersPresure);
    //     };
    // }, [props.pair]);

    return (
        <div style={containerHeight ? { height: containerHeight, display: 'flex', flexDirection: 'column' } : undefined}>
            <Grid container spacing={1} data-tut="buySellPresure">
                <Grid size={6}>
                    <div className="mb-8 cardContent satrexDiv marketHeadItem satrexDashedButton" style={{ height: 78 }}>
                        <span
                            style={{
                                color: satrexGreen,
                                fontSize: '15px',
                                fontWeight: 'bold',
                            }}
                        >
                            <Trans>buy</Trans>
                        </span>

                        {
                            boardPressure
                            && (
                                <PercentageFormater
                                    style={{
                                        color: satrexGreen,
                                        fontSize: '15px',
                                        fontWeight: 'bold',
                                        justifyContent: 'center',
                                    }}
                                    value={((boardPressure.buyTotalVolume * 100) / ((boardPressure.buyTotalVolume + boardPressure.sellTotalVolume) !== 0 ? (boardPressure.buyTotalVolume + boardPressure.sellTotalVolume) : 1)).toFixed(2)}
                                />
                            )
                        }

                    </div>
                </Grid>
                <Grid size={6}>
                    <div
                        className="mb-8 cardContent satrexRedDiv marketHeadItem satrexDashedButton"
                        style={{ height: 78 }}
                    >
                        <span
                            style={{ color: satrexRed, fontSize: '15px', fontWeight: 'bold' }}
                        >
                            <Trans>sell</Trans>
                        </span>
                        {
                            boardPressure
                            && (
                                <PercentageFormater
                                    style={{
                                        color: satrexRed,
                                        fontSize: '15px',
                                        fontWeight: 'bold',
                                        justifyContent: 'center',
                                    }}
                                    value={((boardPressure.sellTotalVolume * 100) / ((boardPressure.buyTotalVolume + boardPressure.sellTotalVolume) !== 0 ? (boardPressure.buyTotalVolume + boardPressure.sellTotalVolume) : 1)).toFixed(2)}
                                />
                            )
                        }

                    </div>
                </Grid>
            </Grid>
            <Card
                className="contentCard"
                style={cardStyle}
                data-tut="buySellQueue"
            >
                <div className="cardHeader">
                    <h4 style={{ textAlign: lang === 'EN' ? 'left' : 'right', color: headerTextColor }}>
                        <Trans>BuyAndSellOrders</Trans>
                    </h4>
                </div>
                <Divider />
                <Grid container style={{ height: '100%', minHeight: 0, marginTop: '5px' }}>
                    <div className={classes.root}>
                        <Grid
                            container
                            style={{
                                backgroundColor: !satrexTheme ? '#12121e' : satrexLightGray,
                                padding: '8px',
                                color: !satrexTheme ? '#eef2ff' : '#111827',
                            }}
                        >
                            <Grid style={{ textAlign: isEn ? 'left' : 'right' }} size={4}>
                <span>
                  <Trans>price</Trans>
                </span>
                            </Grid>
                            <Grid style={{ textAlign: 'center' }} size={4}>
                <span>
                  <Trans>amount</Trans>
                </span>
                            </Grid>
                            <Grid style={{ textAlign: isEn ? 'right' : 'left' }} size={4}>
                <span>
                  <Trans>Number</Trans>
                </span>
                                </Grid>
                            </Grid>
                        <div style={{ flex: 1, minHeight: 0, overflowY: containerHeight ? 'auto' : 'visible' }} className={containerHeight ? 'scrollLight' : ''}>
                            {orderList && orderList.sellOrders.length > 0 && orderList.sellOrders.slice(0, orderRowsLimit).reverse().map((row, index) => (
                                <Grid container key={index} className="orderRow" dir={isEn ? 'rtl' : 'ltr'}>
                                    <Grid className="front" dir={isEn ? 'ltr' : 'rtl'} style={{ top: 2 }} size={12}>
                                        <Grid container>
                                            <Grid style={{ textAlign: !isEn ? 'right' : 'left' }} size={4}>
                            <span
                                className="rrc persianNum"
                                style={{ fontSize: 12, cursor: 'pointer' }}
                                onClick={() => props.setPrice(row.price)}
                            >
                              <SatrexNumFormat
                                  num={row.price}
                              />
                            </span>
                                            </Grid>
                                            <Grid style={{ textAlign: 'center' }} size={4}>
                            <span
                                className="persianNum"
                                style={{ fontSize: 12, cursor: 'pointer' }}
                                onClick={() => props.setVolume(row.volume)}
                            >
                              <SatrexNumFormat
                                  num={row.volume}
                              />
                            </span>
                                            </Grid>
                                            <Grid style={{ textAlign: isEn ? 'right' : 'left' }} size={4}>
                            <span className="persianNum" style={{ fontSize: 12 }}>
                              <SatrexNumFormat
                                  num={row.count}
                              />
                            </span>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    {
                                        orderList
                                        && (
                                            <div
                                                className="volumeContainer"
                                                style={{
                                                    width: `${(row.volume * 100) / Math.max.apply(
                                                        Math,
                                                        orderList.sellOrders.map((item) => item.volume),
                                                    )}%`,
                                                }}
                                            >
                                                <div className="volume" />
                                            </div>
                                        )
                                    }
                                </Grid>
                            ))}
                            <div style={{ paddingTop: 10, paddingBottom: 10 }}>
                                <Divider light />
                                <center style={{ height: '8%', paddingTop: 10, paddingBottom: 10 }}>
                                    {
                                        orderList && (
                                            <span
                                                className="grc"
                                                style={{ fontSize: '17px !important', cursor: 'pointer' }}
                                                onClick={() => props.setPrice(orderList.lastCompletedOrderPrice)}
                                            >
                                                {numberWithCommas(orderList.lastCompletedOrderPrice)}

                                            </span>
                                        )
                                    }
                                </center>
                                <Divider light />
                            </div>
                            <div style={{ marginTop: 12 }}>
                                {(orderList && orderList.buyOrders.length > 0) && orderList.buyOrders.slice(0, orderRowsLimit).map((row, index) => (
                                    <Grid
                                        key={index}
                                        container
                                        className="orderRow"
                                        dir={isEn ? 'rtl' : 'ltr'}
                                    >
                                        <Grid className="front" dir={isEn ? 'ltr' : 'rtl'} style={{ top: 4 }} size={12}>
                                            <Grid container>
                                                <Grid style={{ textAlign: !isEn ? 'right' : 'left' }} size={4}>
                              <span
                                  style={{ color: satrexGreen, fontSize: 12, cursor: 'pointer' }}
                                  className="persianNum"

                                  onClick={() => props.setPrice(row.price)}
                              >
                                  <SatrexNumFormat
                                      num={row.price}
                                  />
                              </span>
                                                </Grid>
                                                <Grid style={{ textAlign: 'center' }} size={4}>
                              <span
                                  style={{ fontSize: 12, cursor: 'pointer' }}
                                  className="persianNum"

                                  onClick={() => props.setVolume(row.volume)}
                              >
                                  <SatrexNumFormat
                                      num={row.volume}
                                  />
                              </span>
                                                </Grid>
                                                <Grid
                                                    style={{
                                                        textAlign: isEn ? 'right' : 'left',
                                                        paddingRight: 2,
                                                        paddingLeft: 2,
                                                    }}
                                                    size={4}>
                              <span
                                  style={{ fontSize: 12 }}
                                  className="persianNum"
                              >
                                  <SatrexNumFormat
                                      num={row.count}
                                  />
                              </span>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        {
                                            orderList
                                            && (
                                                <div
                                                    className="volumeBuyContainer"
                                                    style={{
                                                        width: `${(row.volume * 100) / Math.max.apply(
                                                            Math,
                                                            orderList.buyOrders.map((item) => item.volume),
                                                        )}%`,
                                                    }}
                                                >
                                                    <div className="volume" />
                                                </div>
                                            )
                                        }
                                    </Grid>
                                ))}
                            </div>
                        </div>
                    </div>
                </Grid>
            </Card>
        </div>
    );
}
