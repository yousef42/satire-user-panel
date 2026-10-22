import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles } from '@mui/styles';
import { Tabs } from '@mui/material';
import { Tab } from '@mui/material';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { Divider } from '@mui/material';
import { Grid } from '@mui/material';
import {
    satrexGreen,
    satrexRed,
    satrexDarkBlueDarkMode,
} from '../../../../../styles/colors';
import Orders from './orders';
import Requests from './requests';
import Turnover from './turnover';

import Trans, { transFn } from '../../../../components/lang';

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
        '& span': {
            color: 'black !important',
        },
    },
    reportTabDark: {
        '& span': {
            color: 'white !important',
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
    tabWrapper: {
        color: '#c1c1c1 !important',
        height: '43px',
        whiteSpace: 'nowrap',
    },
    tabsFixed: {
        height: '43px',
    },
}));

export default function FullWidthTabs(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const satrexTheme = useSelector((state) => state.layout.theme);
    const lang = useSelector((state) => state.user.language);
    const isEn = lang === 'EN' || lang === 'gr' || lang === 'fr';
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // const getOrderList = async () => {
    //     const { data } = await satrexApi().post('/Order/GetOrderListByDate', {
    //         fromDateUtc: props.fromTo.from,
    //         toDateUtc: props.fromTo.to,
    //     });
    //     return data.data;
    // };
    //
    // const { data: orders } = useQuery(
    //     ['orders', props.fromTo.from],
    //     getOrderList,
    // );

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    return (
        <div>
            <span style={{ fontSize: 20, padding: '2px' }}><Trans>FinancialReports</Trans></span>
            <Divider style={{ marginTop: '13px' }} />
            <div style={{ padding: '20px' }}>
                <Grid
                    container
                    style={{
                        backgroundColor: satrexTheme ? '#f9f9fc' : satrexDarkBlueDarkMode,
                        borderRadius: '14px',
                        paddingRight: '5%',
                        paddingLeft: '5%',
                        height: '43px',
                        marginTop: '20px',
                        direction: isEn ? 'ltr' : 'rtl',
                    }}
                >
                    <Grid
                        size={{
                            xs: 12,
                            lg: 9
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
                                label={transFn('orders')}
                                classes={{
                                    selected: satrexTheme
                                        ? classes.reportTabLight
                                        : classes.reportTabDark,
                                    root: classes.tabStyle,
                                    wrapper: classes.tabWrapper,
                                }}
                                {...a11yProps(0)}
                            />
                            <Tab
                                label={transFn('requests')}
                                classes={{
                                    selected: satrexTheme
                                        ? classes.reportTabLight
                                        : classes.reportTabDark,
                                    root: classes.tabStyle,
                                    wrapper: classes.tabWrapper,
                                }}
                                {...a11yProps(1)}
                            />
                            <Tab
                                label={transFn('turnover')}
                                classes={{
                                    selected: satrexTheme
                                        ? classes.reportTabLight
                                        : classes.reportTabDark,
                                    root: classes.tabStyle,
                                    wrapper: classes.tabWrapper,
                                }}
                                {...a11yProps(2)}
                            />
                        </Tabs>
                    </Grid>
                </Grid>
                <SwipeableViews
                    index={value}
                    onChangeIndex={handleChangeIndex}
                >
                    <TabPanel value={value} index={0} dir={isEn ? 'ltr' : 'rtl'}>
                        <Orders
                            fromDateTime={props.fromTo.from}
                            toDateTime={props.fromTo.to}
                        />
                    </TabPanel>
                    <TabPanel value={value} index={1} dir={isEn ? 'ltr' : 'rtl'}>
                        <Requests
                            fromDateTime={props.fromTo.from}
                            toDateTime={props.fromTo.to}
                        />
                    </TabPanel>
                    <TabPanel value={value} index={2} dir={isEn ? 'ltr' : 'rtl'}>
                        <Turnover
                            fromDateTime={props.fromTo.from}
                            toDateTime={props.fromTo.to}
                        />
                    </TabPanel>
                </SwipeableViews>
            </div>
        </div>
    );
}
