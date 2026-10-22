import React, { useEffect, useRef, useState } from 'react';
import PeopleIcon from '@mui/icons-material/People';
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';
import { useHistoryCompat as useHistory } from '../../router/routerCompat';
import { ApexOptions } from 'apexcharts';
import { motion } from 'framer-motion';
import Trans from '../lang';
import { usePersonalInfo, useUserLevelPrecentage } from '../../../utils/queries';
import useStyles from './chartStyle';
import { layoutReducerSelectorType, userReducerSelectorType } from '../../../utils/interfaces';
import { satrexGreen, satrexSemiGray } from '../../../styles/colors';

interface LevelChartProps {
    extraBox?: React.ReactNode;
    variant?: 'default' | 'dashboard-level';
    levelCode?: string | number;
}

const Index: React.FC<LevelChartProps> = ({
    extraBox,
    variant = 'default',
    levelCode,
}) => {
    const { data: levelCompletedPrecent } = useUserLevelPrecentage();
    const classes = useStyles();
    const lang = useSelector((state: userReducerSelectorType) => state.user.language);
    const isEn = lang === 'EN' || lang === 'gr' || lang === 'fr';
    const sidebarToggle = useSelector((store: layoutReducerSelectorType) => store.layout.sidebarToggle);
    const history = useHistory();
    const satrexTheme = useSelector((state: layoutReducerSelectorType) => state.layout.theme);
    const primaryTextColor = satrexTheme ? '#334155' : '#eef4ff';
    const secondaryTextColor = satrexTheme ? '#64748b' : '#c9d7f2';
    // const [chartOptions, setChartOptions] = useState<ApexOptions>({});
    // const [mounted, setMounted] = useState<boolean>(false);
    const { data: personalInfo } = usePersonalInfo();
    const componentReady = useRef<HTMLDivElement>(null);
    const [level, setLevel] = useState(0);
    const [chartMounted, setChartMounted] = useState(false);
    // const options: ApexOptions =
    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            setChartMounted(false);
            setTimeout(() => {
                setChartMounted(true);
            }, 500);
        }
        return () => {
            isMounted = false;
        };
    }, [isEn]);
    const chartOptions: ApexOptions = {
        chart: {
            height: 280,
            type: 'radialBar',
        },
        plotOptions: {
            radialBar: {
                hollow: {
                    margin: 15,
                    size: '70%',
                },

                startAngle: -135,
                endAngle: 135,
                track: {
                    background: satrexTheme ? satrexSemiGray : 'rgba(190,190,190,0.12)',
                    startAngle: -135,
                    endAngle: 135,
                },
                dataLabels: {
                    name: {
                        show: true,
                        color: secondaryTextColor,
                    },
                    value: {
                        fontSize: '30px',
                        show: true,
                        color: primaryTextColor,
                        formatter: !isEn ? (val) => `%${val}` : (val) => `${val}%`,
                    },
                },
            },
        },
        fill: {
            type: 'color',
            colors: [satrexGreen],
        },
        stroke: {
            lineCap: 'round',
        },
        labels: [' '],
    };
    const handleChart = () => {
        setLevel(levelCompletedPrecent.percentage);
        // setChartOptions();
    };

    useEffect(() => {
        let isMounted = true;
        if (isMounted && levelCompletedPrecent) {
            handleChart();
            // setMounted(true);
        }
        return () => {
            isMounted = false;
        };
    }, [levelCompletedPrecent]);

    if (variant === 'dashboard-level') {
        return (
            <div
                data-tut="dashboardUserLevel"
                className="center column middle"
                style={{
                    minHeight: 220,
                    width: '100%',
                    padding: '20px 18px 12px',
                    justifyContent: 'space-between',
                }}
                ref={componentReady}
            >
                <div
                    style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 16,
                        flexWrap: 'wrap',
                    }}
                >
                    <div style={{ textAlign: isEn ? 'left' : 'right' }}>
                        <div
                            style={{
                                color: secondaryTextColor,
                                fontSize: 14,
                                marginBottom: 8,
                            }}
                        >
                            <Trans>YourUserlevel</Trans>
                        </div>
                        <div
                            style={{
                                color: primaryTextColor,
                                fontSize: 30,
                                fontWeight: 800,
                                lineHeight: 1.2,
                            }}
                            className={!isEn ? '' : 'enNum'}
                        >
                            <Trans>level</Trans>
                            {' '}
                            {levelCode ?? 0}
                        </div>
                    </div>

                    <div
                        style={{
                            minWidth: 104,
                            minHeight: 104,
                            borderRadius: 28,
                            background: satrexTheme
                                ? 'linear-gradient(135deg, rgba(22,163,74,0.12), rgba(59,130,246,0.08))'
                                : 'linear-gradient(135deg, rgba(15,23,42,0.9), rgba(37,99,235,0.28))',
                            border: `1px solid ${satrexTheme ? 'rgba(22,163,74,0.22)' : 'rgba(148,163,184,0.2)'}`,
                            boxShadow: satrexTheme
                                ? '0 18px 40px rgba(15,23,42,0.08)'
                                : '0 18px 40px rgba(2,6,23,0.28)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '14px 18px',
                        }}
                    >
                        <PeopleIcon
                            style={{
                                color: satrexGreen,
                                fontSize: 22,
                                marginBottom: 8,
                            }}
                        />
                        <div
                            style={{
                                color: primaryTextColor,
                                fontSize: 36,
                                fontWeight: 900,
                                lineHeight: 1,
                            }}
                            className={!isEn ? '' : 'enNum'}
                        >
                            {levelCode ?? 0}
                        </div>
                    </div>
                </div>

                <h4 style={{ marginTop: '18px', color: primaryTextColor }} className="fullName">
                    {
                        ((levelCompletedPrecent && levelCompletedPrecent.percentage === 0) && (personalInfo && !personalInfo.firstName && !personalInfo.lastName)) && (
                            <Trans>Guest user</Trans>
                        )
                    }
                    {personalInfo?.firstName}
                    &nbsp;
                    {personalInfo?.lastName}
                </h4>

                <div
                    style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 12,
                        flexWrap: 'wrap',
                        marginTop: 4,
                        padding: '14px 16px',
                        borderRadius: 18,
                        background: satrexTheme ? 'rgba(148,163,184,0.1)' : 'rgba(15,23,42,0.24)',
                        border: `1px solid ${satrexTheme ? 'rgba(148,163,184,0.18)' : 'rgba(148,163,184,0.12)'}`,
                    }}
                >
                    <span
                        style={{
                            color: secondaryTextColor,
                            fontSize: 14,
                        }}
                    >
                        <Trans>UserLevelUpgrade</Trans>
                    </span>
                    {
                        levelCompletedPrecent && levelCompletedPrecent.percentage !== 100 && (
                            <span
                                className={classes.chartTitle}
                                style={{ cursor: 'pointer', fontSize: 16, fontWeight: 700 }}
                                onClick={() => {
                                    history.push({
                                        pathname: '/edit-personal-info',
                                    });
                                }}
                            >
                                <Trans>editPersonalInfo</Trans>
                            </span>
                        )
                    }
                </div>

                {levelCompletedPrecent && extraBox}
            </div>
        );
    }

    return (

        <div
            data-tut="dashboardUserLevel"
            className="center column middle"
            style={{ minHeight: 220 }}
            ref={componentReady}
        >
            {
                levelCompletedPrecent && chartMounted
                && (
                    <motion.div
                        className={
                            !isEn ? classes.radialBarChart : classes.radialBarChartEn
                        }
                        style={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'relative',
                        }}
                    >
                        <PeopleIcon className={classes.peopleIcon} style={{ color: secondaryTextColor }} />
                        {
                            levelCompletedPrecent
                            && (
                                <ReactApexChart
                                    options={chartOptions}
                                    series={[level]}
                                    type="radialBar"
                                    height={200}
                                />
                            )
                        }
                    </motion.div>
                )
            }

            <h4 style={{ marginTop: '10px', color: primaryTextColor }} className="fullName">
                {
                    ((levelCompletedPrecent && levelCompletedPrecent.percentage === 0) && (personalInfo && !personalInfo.firstName && !personalInfo.lastName)) && (
                        <Trans>Guest user</Trans>
                    )
                }
                {personalInfo?.firstName}
                &nbsp;
                {personalInfo?.lastName}
            </h4>

            <div style={{ paddingBottom: '5px' }}>
                {' '}
                {
                    levelCompletedPrecent && levelCompletedPrecent.percentage !== 100 && (
                        <span
                            className={classes.chartTitle}
                            style={{ cursor: 'pointer', fontSize: 20 }}
                            onClick={() => {
                                history.push({
                                    pathname: '/edit-personal-info',
                                });
                            }}
                        >
                            <Trans>UserLevelUpgrade</Trans>
                        </span>
                    )
                }
            </div>
            {levelCompletedPrecent && extraBox}

        </div>
    );
};

export default Index;
