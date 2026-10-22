import React from 'react';
import { Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SatrexCard from '../../../components/SatrexCard';
import DealingForm from './dealingForm';
import { satrexGreen } from '../../../../styles/colors';
import SuspendNotif from '../../../components/suspendNotif';
import AnimatedPage from '../../../components/AnimatedPage';

export default function () {
    const level = useSelector((state) => state.layout.totals.qualifyLevel);
    const lang = useSelector((state) => state.user.language);
    const isEn = lang === 'EN' || lang === 'gr' || lang === 'fr';
    return (
        <AnimatedPage>
            <div style={{ marginTop: '28px' }}>
                <SatrexCard header="quickDealing">
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Grid
                            style={{ padding: '5px' }}
                            size={{
                                xs: 12,
                                md: 6
                            }}>
                            <DealingForm />
                        </Grid>
                    </div>

                    {
                        isEn
                            ? (
                                <div
                                    style={{ padding: '15px', textAlign: 'center', marginBottom: '23px' }}
                                >
                                    <span style={{ color: 'red' }}>Note: </span>
                                    {' '}
                                    To view your quick order list, you can refer
                                    to the
                                    {' '}
                                    <Link
                                        to={{
                                            pathname: '/reports',
                                            state: { fromFastDealing: true },
                                        }}
                                        style={{ color: satrexGreen }}
                                    >
                                        reports
                                    </Link>
                                    {' '}
                                    section.
                                </div>
                            )
                            : (
                                <div
                                    style={{ padding: '15px', textAlign: 'center', marginBottom: '23px' }}
                                >
                                    <span style={{ color: 'red' }}>نکته: </span>
                                    {' '}
                                    برای مشاهده لیست سفارشات سریع خود میتوانید به بخش
                                    &nbsp;
                                    <Link
                                        to={{
                                            pathname: '/reports',
                                            state: { fromFastDealing: true },
                                        }}
                                        style={{ color: satrexGreen }}
                                    >
                                        گزارشات
                                    </Link>
                                    &nbsp;
                                    مراجعه کنید.
                                </div>
                            )
                    }
                </SatrexCard>
                {level?.code && level?.code === '0' && <SuspendNotif />}
            </div>
        </AnimatedPage>
    );
}
