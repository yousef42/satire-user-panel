import React from 'react';
import { makeStyles } from '@mui/styles';
import { useSelector } from 'react-redux';
import SatrexCard from '../../../components/SatrexCard';
import Messages from './messages';
import AnimatedPage from '../../../components/AnimatedPage';

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

export default function CustomizedTables() {
    const classes = useStyles();
    const lang = useSelector((state) => state.user.language);
    const isEn = lang === 'EN' || lang === 'gr' || lang === 'fr';

    return (
        <AnimatedPage>

            <div style={{ marginTop: '28px' }}>
                <SatrexCard header="messages">
                    <Messages
                        refresh={false}
                        setListMustBeUpdated={() => {
                        }}
                    />
                </SatrexCard>
            </div>
        </AnimatedPage>
    );
}
