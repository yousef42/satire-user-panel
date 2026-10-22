import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material';
import { Tabs } from '@mui/material';
import { Tab } from '@mui/material';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { useHistoryCompat as useHistory } from '../../../router/routerCompat';
import { Grid } from '@mui/material';
import { useTour } from '@reactour/tour';
import {
    satrexGreen,
    satrexRed,

} from '../../../../styles/colors';
import SatrexCard from '../../../components/SatrexCard';
import CompletedOrders from './completedOrders';
import OnProcessOrders from './onProcessOrders';
import { transFn } from '../../../components/lang';
import CompletedFastOrders from './completedFastOrders';
import OnProcessFastOrders from './onProcessFastOrders';

import AnimatedPage from '../../../components/AnimatedPage';
import tourLoader from '../../../../utils/helpers/tourLoader';

function TabPanel(props) {
    const {
        children, value, index, ...other
    } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <div>{children}</div>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: 500,
    },

    reportTabLight: {
        color: 'black !important',
        '& span': {
            color: 'black !important',
        },
    },
    reportTabDark: {
        color: '#ecebef !important',
        '& span': {
            color: '#ecebef !important',
        },
    },

    indicatorGreen: {
        backgroundColor: `${satrexGreen}!important`,
    },
    indicatorRed: {
        backgroundColor: `${satrexRed}!important`,
    },

    tabStyle: {
        backgroundColor: 'transparent',
        minWidth: '0px',
        height: '43px',
    },
    tabStyleLight: {
        color: '#3a3a3a !important',
        opacity: '1 !important',
        '& span': {
            color: '#3a3a3a !important',
        },
    },
    tabStyleDark: {
        color: '#a9a7b5 !important',
        opacity: '1 !important',
        '& span': {
            color: '#a9a7b5 !important',
        },
    },
    tabWrapper: {
        color: '#c1c1c1 !important',
        height: '43px',
    },
    tabsFixed: {
        height: '43px',
    },
}));

export default function FullWidthTabs() {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(3);
    const satrexTheme = useSelector((state) => state.layout.theme);
    const lang = useSelector((state) => state.user.language);
    const isEn = lang === 'EN' || lang === 'gr' || lang === 'fr';
    const history = useHistory();
    const { setIsOpen, setSteps } = useTour();

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            tourLoader(setIsOpen, setSteps, 'reports');
            if (history.location.state?.fromFastDealing) {
                setTimeout(() => {
                    setValue(2);
                }, 500);
            } else {
                setTimeout(() => {
                    // console.log('GET_MINIMUM_TRANSACTION_PRICE');
                    setValue(0);
                }, 500);
            }
        }
        return () => {
            isMounted = false;
        };
    }, []);

    const handleChange = (event, newValue) => {
        setValue(Math.max(newValue, 0));
    };

    return (
        <AnimatedPage>
            <div
                className={`satrexMarketStyles ${satrexTheme ? 'marketThemeLight' : 'marketThemeDark'}`}
                style={{ marginTop: '28px' }}
            >
                <div className="container">
                    <div className="row">
                        <div className="col-2" />
                    </div>
                </div>

                <SatrexCard header="reports">
                    <div style={{ padding: '20px' }} data-tut="ordersList">
                        <Grid
                            container
                            style={{
                                backgroundColor: satrexTheme ? '#f9f9fc' : 'rgb(66,63,72,0.34)',
                                borderRadius: '8px',
                                paddingRight: '5%',
                                paddingLeft: '5%',
                                height: '43px',
                                marginTop: '20px',
                                width: '100%',
                            }}
                        >
                            <Grid
                                size={{
                                    xs: 12,
                                    lg: 10
                                }}>
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    indicatorColor="primary"
                                    textColor="primary"
                                    variant="fullWidth"
                                    aria-label="full width tabs example"
                                    classes={{
                                        indicator: classes.indicatorRed,
                                        fixed: classes.tabsFixed,
                                    }}

                                >
                                    <Tab
                                        label={transFn('ongoingOrders')}
                                        classes={{
                                            selected: satrexTheme
                                                ? classes.reportTabLight
                                                : classes.reportTabDark,
                                            root: `${classes.tabStyle} ${satrexTheme
                                                ? classes.tabStyleLight
                                                : classes.tabStyleDark}`,
                                            wrapper: classes.tabWrapper,
                                        }}
                                    />
                                    <Tab
                                        label={transFn('completedOrders')}
                                        classes={{
                                            selected: satrexTheme
                                                ? classes.reportTabLight
                                                : classes.reportTabDark,
                                            root: `${classes.tabStyle} ${satrexTheme
                                                ? classes.tabStyleLight
                                                : classes.tabStyleDark}`,
                                            wrapper: classes.tabWrapper,
                                        }}
                                    />
                                    <Tab
                                        label={transFn('FastOrders')}
                                        classes={{
                                            selected: satrexTheme
                                                ? classes.reportTabLight
                                                : classes.reportTabDark,
                                            root: `${classes.tabStyle} ${satrexTheme
                                                ? classes.tabStyleLight
                                                : classes.tabStyleDark}`,
                                            wrapper: classes.tabWrapper,
                                        }}
                                    />
                                    <Tab
                                        label={transFn('FastDeals')}
                                        classes={{
                                            selected: satrexTheme
                                                ? classes.reportTabLight
                                                : classes.reportTabDark,
                                            root: `${classes.tabStyle} ${satrexTheme
                                                ? classes.tabStyleLight
                                                : classes.tabStyleDark}`,
                                            wrapper: classes.tabWrapper,
                                        }}
                                    />
                                </Tabs>
                            </Grid>
                        </Grid>
                        <div>
                            <TabPanel value={value} index={0} dir={isEn ? 'ltr' : 'rtl'}>
                                <OnProcessOrders />
                            </TabPanel>
                            <TabPanel value={value} index={1} dir={isEn ? 'ltr' : 'rtl'}>
                                <CompletedOrders />
                            </TabPanel>
                            <TabPanel value={value} index={2} dir={isEn ? 'ltr' : 'rtl'}>
                                <OnProcessFastOrders />
                            </TabPanel>
                            <TabPanel value={value} index={3} dir={isEn ? 'ltr' : 'rtl'}>
                                <CompletedFastOrders />
                            </TabPanel>
                        </div>
                    </div>
                </SatrexCard>
            </div>
        </AnimatedPage>
    );
}
