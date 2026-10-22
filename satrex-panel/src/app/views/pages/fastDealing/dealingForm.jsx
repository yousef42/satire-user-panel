import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material';
import { Tabs } from '@mui/material';
import { Tab } from '@mui/material';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { useTour } from '@reactour/tour';

import BuyForm from './buyForm';
import SellForm from './sellForm';
import { transFn } from '../../../components/lang';
import { useAssetList, useTomanTotalFundAndTotalTradable, useUserQuickView } from '../../../../utils/queries';
import useStyles from './formStyles';

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
                <Box p={0}>
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

const dealingForm = () => {
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const { setIsOpen, setSteps } = useTour();
    const satrexTheme = useSelector((state) => state.layout.theme);
    const classes = useStyles({ satrexTheme });
    const lang = useSelector((state) => state.user.language);
    const isEn = lang === 'EN' || lang === 'gr' || lang === 'fr';
    const { data: userQuickView } = useUserQuickView();
    const { data: totalFund } = useTomanTotalFundAndTotalTradable();
    const { data: coinList } = useAssetList();
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    return (
        <div style={{ width: '100%' }}>
            <div className={classes.tabsShell}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                    classes={{
                        indicator:
                            value === 0 ? classes.indicatorGreen : classes.indicatorRed,
                        root: classes.tabsStyle,
                        fixed: classes.tabsFixed,
                        flexContainer: classes.tabsFlexContainer,
                    }}
                >
                    <Tab
                        label={transFn('buy')}
                        className="tabStyle"
                        classes={{
                            selected: classes.selectedTab,
                            root: classes.tabStyle,
                            wrapper: classes.tabWrapper,
                        }}
                        {...a11yProps(0)}
                    />
                    <Tab
                        label={transFn('sell')}
                        className="tabStyle"
                        classes={{
                            selected: classes.selectedSellTab,
                            root: classes.tabStyle,
                            wrapper: classes.tabWrapper,
                        }}
                        {...a11yProps(1)}
                    />
                </Tabs>
            </div>

            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0} className={classes.tabPanel} dir={isEn ? 'ltr' : 'rtl'}>
                    <div className={classes.tabPanelInner}>
                        <div className={classes.panelBox}>
                            <BuyForm
                                coinList={coinList ?? []}
                                fee={userQuickView?.userFinancialLevel?.exchangeFeePercent ?? 0}
                                tomanTotalFund={totalFund?.totalTradable}
                            />
                        </div>
                    </div>
                </TabPanel>
                <TabPanel value={value} index={1} className={classes.tabPanel} dir={isEn ? 'ltr' : 'rtl'}>
                    <div className={classes.tabPanelInner}>
                        <div className={classes.panelBox}>
                            <SellForm coinList={coinList ?? []} fee={userQuickView?.userFinancialLevel?.exchangeFeePercent ?? 0} />
                        </div>
                    </div>
                </TabPanel>
            </SwipeableViews>
        </div>
    );
};
export default dealingForm;
