import React, { useEffect } from 'react';
import { useTour } from '@reactour/tour';
import { useLocation } from 'react-router-dom';
import SatrexCard from '../../../components/SatrexCard';
import BankAccountRows from './bankAccountRows';
import tourLoader from '../../../../utils/helpers/tourLoader';
import AnimatedPage from '../../../components/AnimatedPage';

export default function () {
    const { setIsOpen, setSteps } = useTour();
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;
        if (isMounted) tourLoader(setIsOpen, setSteps, (location.pathname).split('/')[1]);
        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <AnimatedPage>
            <div style={{ width: '100%', marginTop: '28px' }}>
                    <SatrexCard header="editBankInfo">
                        <BankAccountRows />
                    </SatrexCard>
            </div>
        </AnimatedPage>
    );
}
