import React, { useEffect, useState } from 'react';
import { withStyles, makeStyles } from '@mui/styles';
import { TableCell } from '@mui/material';
import { TableRow } from '@mui/material';
import { useSelector } from 'react-redux';
import moment from 'moment';

import { Grid } from '@mui/material';
import { Button } from '@mui/material';

import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import starkString from 'starkstring';
import { useTour } from '@reactour/tour';
import SuspendNotif from '../../../components/suspendNotif';
import Requests from './requests';
import Trans from '../../../components/lang';
import SatrexCard from '../../../components/SatrexCard';
import AnimatedPage from '../../../components/AnimatedPage';
import TableLoader from '../../../components/Table/TableLoader';
import { useRequestsList } from '../../../../utils/queries';
import tourLoader from '../../../../utils/helpers/tourLoader';

const StyledTableCell = withStyles((theme) => ({
    head: {
        color: 'black',
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);
const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: 'transparent',
        },
        height: '72px',
    },
}))(TableRow);

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

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

export default function index() {
    // const { setIsOpen, setSteps } = useTour();
    const lang = useSelector((state) => state.user.language);
    const [value, setValue] = useState(0);
    const isEn = lang === 'EN' || lang === 'gr' || lang === 'fr';
    const level = useSelector((state) => state.layout.totals.qualifyLevel);
    const { setIsOpen, setSteps } = useTour();
    // const getRequestList = async () => {
    //     const { data } = await satrexApi().post('/TurnOver/GetRequestsList', {
    //         fromDateTime: starkString(moment('1995-01-01').format('YYYY-MM-DD'))
    //             .englishNumber()
    //             .toString(),
    //         toDateTime: starkString(moment().add(1, 'days').format('YYYY-MM-DD'))
    //             .englishNumber()
    //             .toString(),
    //     });
    //     if (data.isSuccess) {
    //         tourLoader(setIsOpen, setSteps, 'requests');
    //         return data.data;
    //     }
    //     return [];
    // };
    //
    // const { data, isLoading } = useQuery('getRquestList', getRequestList);
    const { data: requestsList, isLoading } = useRequestsList({

        fromDateTime: starkString(moment('1995-01-01').format('YYYY-MM-DD'))
            .englishNumber()
            .toString(),
        toDateTime: starkString(moment().add(1, 'days').format('YYYY-MM-DD'))
            .englishNumber()
            .toString(),

    });

    useEffect(() => {
        if (requestsList) {
            tourLoader(setIsOpen, setSteps, 'requests');
        }
    }, [requestsList]);

    return (
        <AnimatedPage>
            <div style={{ marginTop: '28px' }}>
                <SatrexCard header="requests">
                    <div style={{ padding: '20px' }}>
                        <Grid container>
                            <Grid
                                size={{
                                    xs: 3,
                                    lg: 2
                                }}>
                                <Button
                                    disableElevation
                                    onClick={() => setValue(0)}
                                    className={`grayButton ${
                                        value === 0 ? 'selectedMarketTab' : ''
                                    }`}
                                    type="button"
                                >
                                    <Trans>All</Trans>
                                </Button>
                            </Grid>
                            <Grid
                                size={{
                                    xs: 3,
                                    lg: 2
                                }}>
                                <Button
                                    disableElevation
                                    onClick={() => setValue(1)}
                                    className={`grayButton ${
                                        value === 1 ? 'selectedMarketTab' : ''
                                    }`}
                                    type="button"
                                >
                                    <Trans>Daily</Trans>
                                </Button>
                            </Grid>
                            <Grid
                                size={{
                                    xs: 3,
                                    lg: 2
                                }}>
                                <Button
                                    disableElevation
                                    onClick={() => setValue(2)}
                                    className={`grayButton ${
                                        value === 2 ? 'selectedMarketTab' : ''
                                    }`}
                                    type="button"
                                >
                                    <Trans>Weekly</Trans>
                                </Button>
                            </Grid>
                            <Grid
                                size={{
                                    xs: 3,
                                    lg: 2
                                }}>
                                <Button
                                    disableElevation
                                    onClick={() => setValue(3)}
                                    className={`grayButton ${
                                        value === 3 ? 'selectedMarketTab' : ''
                                    }`}
                                    type="button"
                                >
                                    <Trans>monthly</Trans>
                                </Button>
                            </Grid>
                        </Grid>

                        <TableLoader
                            loading={isLoading}
                        >
                            {
                                requestsList
                                && (
                                    <div style={{ marginTop: '20px' }}>
                                        <TabPanel value={value} index={0} dir={!isEn ? 'rtl' : 'ltr'}>
                                            <Requests
                                                requestList={requestsList.sort((a, b) => new Date(b.createdAtUtc) - new Date(a.createdAtUtc))}
                                            />
                                        </TabPanel>
                                        <TabPanel value={value} index={1} dir={!isEn ? 'rtl' : 'ltr'}>
                                            <Requests
                                                requestList={requestsList.sort((a, b) => new Date(b.createdAtUtc) - new Date(a.createdAtUtc)).filter(
                                                    (item) => item.createdAtUtc
                                                        >= starkString(moment().subtract(1, 'day').format('YYYY-MM-DDTHH:mm:ss')).englishNumber().toString(),
                                                )}
                                            />
                                        </TabPanel>
                                        <TabPanel value={value} index={2} dir={!isEn ? 'rtl' : 'ltr'}>
                                            <Requests
                                                requestList={requestsList.sort((a, b) => new Date(b.createdAtUtc) - new Date(a.createdAtUtc)).filter(
                                                    (item) => item.createdAtUtc
                                                        >= starkString(moment().subtract(1, 'week').format('YYYY-MM-DDTHH:mm:ss')).englishNumber().toString(),
                                                )}
                                            />
                                        </TabPanel>
                                        <TabPanel value={value} index={3} dir={!isEn ? 'rtl' : 'ltr'}>
                                            <Requests
                                                requestList={requestsList.sort((a, b) => new Date(b.createdAtUtc) - new Date(a.createdAtUtc)).filter(
                                                    (item) => item.createdAtUtc
                                                        >= starkString(moment().subtract(1, 'month').format('YYYY-MM-DDTHH:mm:ss')).englishNumber().toString(),
                                                )}
                                            />
                                        </TabPanel>
                                    </div>
                                )
                            }
                        </TableLoader>
                    </div>
                </SatrexCard>
                {level?.code && level?.code === '0' && <SuspendNotif />}
            </div>
        </AnimatedPage>
    );
}
