import React from 'react';
import { Grid } from '@mui/material';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import moment from 'moment/moment';
import jmoment from 'jalali-moment';
import SatrexCard from '../../../components/SatrexCard';
import { satrexApi } from '../../../components/api';
import Copied from '../../../components/Copied';
import SatrexTable from '../../../components/Table/SatrexTable';
import Trans from '../../../components/lang';
import { satrexGreen } from '../../../../styles/colors';
import AnimatedPage from '../../../components/AnimatedPage';
import SuspendNotif from '../../../components/suspendNotif';
import getEnv from '../../../../utils/helpers/getEnv';
import convertTz from '../../../components/convertTz';

const index = () => {
    const getReferralCode = async () => {
        const { data } = await satrexApi().post('ReferralCode/Get');
        return data.data;
    };
    const getReferralCodeUsage = async () => {
        const { data } = await satrexApi().post('ReferralCode/GetReferralCodeUsages');

        return data.data;
    };

    const getDisplayId = async () => {
        const { data } = await satrexApi().post('User/GetDisplayUserId');
        return data.data;
    };
    const lang = useSelector((state) => state.user.language);
    const isEn = lang === 'EN' || lang === 'gr' || lang === 'fr';
    const { data: referralCode } = useQuery('getReferralCode', getReferralCode);
    const { data: userUsages } = useQuery('getReferralCodeUsage', getReferralCodeUsage);
    const { data: displayId } = useQuery('getDisplayId', getDisplayId);
    const level = useSelector((state) => state.layout.totals.qualifyLevel);
    return (
        <AnimatedPage>
            <Grid container spacing={2} style={{ marginTop: 20 }}>

                <Grid size={7}>
                    <SatrexCard header="invitePageLine2">
                        <Grid container style={{ padding: 10 }}>
                            <Grid size={12}>
                                <Grid container style={{ padding: 10 }}>
                                    <Grid
                                        style={{
                                            fontSize: 15,
                                            fontWeight: 'bold',
                                            position: 'relative',
                                            top: 7,
                                            color: satrexGreen,
                                        }}
                                        size={6}>
                                        <Trans>Your invitation code</Trans>
                                        :
                                    </Grid>
                                    <Grid style={{ textAlign: 'center' }} size={6}>
                                        <span style={{ fontSize: 15 }}>
                                        <Copied
                                            text={referralCode?.code}
                                        />
                                            &nbsp;
                                            {referralCode?.code}
                                        </span>

                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid size={12}>
                                <Grid container style={{ padding: 10 }}>
                                    <Grid
                                        style={{
                                            fontSize: 15,
                                            fontWeight: 'bold',
                                            position: 'relative',
                                            top: 7,
                                            color: satrexGreen,
                                        }}
                                        size={3}>
                                        <Trans>Your invitation link</Trans>
                                        {' '}
                                        :
                                    </Grid>
                                    <Grid style={{ textAlign: 'center' }} size={9}>
                                        <span style={{ fontSize: 15 }}>
                                        <Copied
                                            text={`https://panel.${getEnv()}.ir/register/${referralCode?.code}`}
                                        />
                                            &nbsp;https://panel.
                                            {getEnv()}
                                            .ir/register
                                            {referralCode && '/'}
                                            {referralCode?.code}
                                        </span>
                                    </Grid>
                                </Grid>
                            </Grid>

                        </Grid>
                    </SatrexCard>
                </Grid>
                <Grid size={5}>
                    <SatrexCard header="invitePageLine3">
                        <Grid container style={{ padding: 10, height: 148 }}>
                            <Grid size={12}>
                                <Grid container style={{ padding: 10 }}>
                                    <Grid
                                        style={{
                                            fontSize: 15,
                                            fontWeight: 'bold',
                                            position: 'relative',
                                            top: 7,
                                            color: satrexGreen,
                                        }}
                                        size={6}>
                                        <Trans>Number of your friends</Trans>
                                        :
                                    </Grid>
                                    <Grid
                                        style={{ textAlign: 'center', minHeight: 38 }}
                                        className="flex middle"
                                        size={6}>
<span
    style={{ fontSize: 15 }}
>
{userUsages?.length}
</span>

                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </SatrexCard>
                </Grid>
                <Grid size={12}>
                    <SatrexCard header="Invite friends">
                        <div style={{ padding: 20 }}>
                            <Trans>invitePageLine1</Trans>
                        </div>
                        <div style={{ padding: 20 }}>
                                    <span style={{ color: satrexGreen, fontSize: 15, fontWeight: 'bold' }}>
                                    {' '}
                                        <Trans>Your unique code</Trans>
                                        {' '}
                                        :
                                        {' '}
                                    </span>
                            &nbsp;&nbsp;&nbsp;
                            <span>{displayId?.userDisplayId}</span>
                        </div>
                        {
                            userUsages && userUsages.length > 0 && (
                                <div style={{ width: '100%', padding: 20 }}>

                                    <SatrexTable
                                        asset={userUsages.map((item, index) => ({
                                            ...item,
                                            id: index + 1,
                                            link: `https://panel.satrex.ir/register/${item.code}`,
                                            dateTime: `${(isEn ? moment(item.createdAtUtc).format('YYYY/MM/DD') : jmoment(item.createdAtUtc).format('jYYYY/jMM/jDD'))} ${isEn ? moment(item.createdAtUtc).format('HH:mm:ss') : jmoment(convertTz(item.createdAtUtc, 'Asia/Tehran').getTime()).format('HH:mm:ss')}`,
                                        }))}
                                        headerData={[
                                            { Header: <Trans>#</Trans>, accessor: 'id' },
                                            { Header: <Trans>Invite Code</Trans>, accessor: 'code' },
                                            { Header: <Trans>User Code</Trans>, accessor: 'invitedDisplayUserId' },
                                            { Header: <Trans>dateTime</Trans>, accessor: 'dateTime' },
                                        ]}

                                    />

                                </div>
                            )
                        }
                    </SatrexCard>
                </Grid>
            </Grid>
            {level?.code && level?.code === '0' && <SuspendNotif />}
        </AnimatedPage>
    );
};
export default index;
