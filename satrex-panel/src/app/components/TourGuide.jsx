import React, { useEffect } from 'react';
import { HelpOutline } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useTour } from '@reactour/tour';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import RootTourConfig from '../RootTourConfig';
import { bannedPages } from '../views/PagesRoutes';
import { setTourGuideStatus } from '../redux/actions/LayoutActions';

function TourGuide() {
    const { setIsOpen, setSteps, setCurrentStep } = useTour();
    const levelPrecentage = useSelector((state) => state.user.levelPrecentage);
    const tourGuideStatus = useSelector((state) => state.layout.tourGuideReady);
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        let isMounted = true;
        if (isMounted) dispatch(setTourGuideStatus(false));
        return () => { isMounted = false; };
    }, [location]);

    const openTour = () => {
        const loadedPages = localStorage.getItem('loadedPages');
        if (loadedPages && (!bannedPages.includes(JSON.parse(loadedPages).active) || levelPrecentage > 0)) {
            setTimeout(() => {
                setSteps(RootTourConfig[JSON.parse(loadedPages).active]);
                setCurrentStep(0);
                setIsOpen(true);
            }, 500);
        }
    };

    //
    // useEffect(()=>{
    //     let tourStepper
    //
    //     console.log('isOpen : ',isOpen)
    //     if(isOpen)
    //     {
    //             tourStepper =  setInterval(
    //                 () => {
    //                     setCurrentStep(s => (s === steps.length - 1 ? 0 : s + 1))
    //                     console.log('step is going forward')
    //                 },
    //                 5000
    //             )
    //
    //     }else{
    //         clearInterval(tourStepper)
    //     }
    //
    //     return ()=>{
    //         clearInterval(tourStepper)
    //     }
    // },[isOpen])
    // console.log('is open is : ',isOpen)
    return (
        <>
            {
                tourGuideStatus
                && (
                    <IconButton onClick={openTour} data-tut="activateGuide">
                                        <HelpOutline style={{ fontSize: 19 }} />
                    </IconButton>
                    )
            }
            {/* /!*<Button  className={`guideButton ${cssClass}`} >show tour</Button>*!/ */}
            {/* <Tour */}
            {/*    styles={{ */}
            {/*        popover: base => ({ */}
            {/*            ...base, */}
            {/*            '--reactour-accent': '#ef5a3d', */}
            {/*            borderRadius: radius, */}
            {/*        }), */}
            {/*        maskArea: base => ({...base, rx: radius}), */}
            {/*        maskWrapper: base => ({...base, color: '#ef5a3d'}), */}
            {/*        badge: base => ({...base, left: 'auto', right: '-0.8125em'}), */}
            {/*        controls: base => ({...base, marginTop: 100}), */}
            {/*        close: base => ({...base, right: 'auto', left: 8, top: 8}), */}
            {/*        dot: base => ({ */}
            {/*            ...base, */}
            {/*            animationDuration: '1s', */}
            {/*            animationName: keyframesRotate, */}
            {/*            animationIterationCount: 'infinite', */}
            {/*            '&:nth-of-type(1)': { */}
            {/*                animationDelay: '.3s', */}
            {/*            }, */}
            {/*            '&:nth-of-type(2)': { */}
            {/*                animationDelay: '.6s', */}
            {/*            }, */}
            {/*        }), */}
            {/*    }} */}

            {/*    startAt={0} */}
            {/*    onRequestClose={closeTour} */}
            {/*    steps={tourConfig} */}
            {/*    isOpen={isTourOpen} */}
            {/*    maskClassName="mask" */}
            {/*    scrollSmooth */}
            {/*    onClickMask={({setCurrentStep, currentStep, setIsOpen}) => { */}
            {/*        if (currentStep === steps.length - 1) { */}
            {/*            setIsOpen(false) */}
            {/*        } */}
            {/*        setCurrentStep(s => (s === steps.length - 1 ? 0 : s + 1)) */}
            {/*    }} */}
            {/*    className="helper" */}
            {/*    rounded={5} */}
            {/*    accentColor="#5cb7b7" */}
            {/*    disableKeyboardNavigation={lockTour} */}
            {/*    disableDotsNavigation={lockTour} */}

            {/* /> */}
        </>
    );
}

export default TourGuide;
