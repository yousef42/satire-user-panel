import React, { Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import TopBarProgress from 'react-topbar-progress-indicator';
import { ProgressSwitchPropTypes } from '../../utils/interfaces';
import { satrexGreen, satrexRed } from '../../styles/colors';
import SatrexLoader from './satrexLoader';

TopBarProgress.config({
                          barColors: {
                              0: satrexRed,
                              '1.0': satrexGreen,
                          },
                          shadowBlur: 0,
                          shadowColor: 'transparent',
                      });

const ProgressSwitch: React.FC<ProgressSwitchPropTypes> = ({ children }) => {
    const location = useLocation();

    return (
        <Suspense
            fallback={(
                <div>
                    <TopBarProgress />
                    <SatrexLoader />
                </div>
            )}
        >
            <div key={location.pathname}>
                {children}
            </div>
        </Suspense>
    );
};

export default ProgressSwitch;
