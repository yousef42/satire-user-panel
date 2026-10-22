import React, { useEffect } from 'react';
import { TourProvider } from '@reactour/tour';
import { keyframes } from '@emotion/react';
import { useMediaQuery } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { changeSidebarToggle } from '../../redux/actions/LayoutActions';
import rootTourConfig from '../../RootTourConfig';
import { satrexGreen } from '../../../styles/colors';

const keyframesRotate = keyframes`
  50% {
    transform: translateY(-5px);
  }
`;

const radius = 10;

function TourContainer({ children }) {
    const xl = useMediaQuery('(max-width:1200px)');
    const theme = useSelector((state) => state.layout.theme);
    const dispatch = useDispatch();
    const loadedPages = localStorage.getItem('loadedPages');
    let steps = [];
    if (loadedPages) steps = rootTourConfig[JSON.parse(loadedPages).active];

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            if (xl) dispatch(changeSidebarToggle(false));
        }
        return () => { isMounted = false; };
    }, [xl]);

    return (
        <TourProvider
                steps={steps}
                // disableKeyboardNavigation={['esc']}
                disableInteraction
                currentStep={0}
                maskClassName={theme ? 'tourMaskLight' : 'tourMaskDark'}
                padding={{ mask: 3, popover: [1, 5] }}
                scrollSmooth
                onClickMask={({
                     setCurrentStep, currentStep, setIsOpen, steps: currentSteps,
                    }) => {
                    if (currentStep === currentSteps.length - 1) {
                        setIsOpen(false);
                    }
                    setCurrentStep((s) => (s === currentSteps.length - 1 ? 0 : s + 1));
                }}
                styles={{
                    popover: (base) => ({
                        ...base,
                        '--reactour-accent': satrexGreen,
                        borderRadius: radius,
                    }),
                    maskArea: (base) => ({ ...base, rx: radius }),
                    maskWrapper: (base) => ({ ...base, color: '#000000' }),
                    badge: (base) => ({ ...base, left: 'auto', right: '-0.8125em' }),
                    controls: (base) => ({ ...base, marginTop: 100 }),
                    close: (base) => ({
                         ...base, right: 'auto', left: 8, top: 8,
                        }),
                    dot: (base) => ({
                        ...base,
                        animationDuration: '1s',
                        animationName: keyframesRotate,
                        animationIterationCount: 'infinite',
                        '&:nth-of-type(1)': {
                            animationDelay: '.3s',
                        },
                        '&:nth-of-type(2)': {
                            animationDelay: '.6s',
                        },
                    }),
                }}
        >
                {
                    children
                }
        </TourProvider>
    );
}

export default TourContainer;
