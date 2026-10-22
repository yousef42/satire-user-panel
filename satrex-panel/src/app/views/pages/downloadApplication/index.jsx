import React from 'react';
import { Grid } from '@mui/material';
import AnimatedPage from '../../../components/AnimatedPage';
import SatrexCard from '../../../components/SatrexCard';
import Trans from '../../../components/lang';

export default function DownloadApplication() {
    return (
        <AnimatedPage>
            <div style={{ marginTop: '24px' }}>
                <SatrexCard header="downloadApplication">
                    <Grid container style={{ padding: '24px' }}>
                        <Grid size={12}>
                            <h4 style={{ marginBottom: '12px' }}>
                                <Trans>downloadApplication</Trans>
                            </h4>
                            <p style={{ lineHeight: 2, marginBottom: 0 }}>
                                لینک دانلود اپلیکیشن در این صفحه قرار می‌گیرد.
                            </p>
                        </Grid>
                    </Grid>
                </SatrexCard>
            </div>
        </AnimatedPage>
    );
}
