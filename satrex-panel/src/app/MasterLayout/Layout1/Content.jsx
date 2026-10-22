import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ErrorBoundary } from 'react-error-boundary';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import errorImg from '../../../images/error.svg';
import Trans from '../../components/lang';
import ProgressSwitch from '../../components/ProgressSwitch';
import { getSupportedCoinList } from '../../redux/actions/CoinActions';
import { satrexRed } from '../../../styles/colors';

function ErrorFallback({ error, resetErrorBoundary }) {
    return (
        <>
            <div role="alert" className="errorPageContainer">
                <div>
                    <img src={errorImg} alt="" />
                </div>
                <div style={{
                    flexDirection: 'column', width: '100%', alignItems: 'center', marginTop: 10,
                }}
                >
                    <h3><Trans>Something went wrong</Trans></h3>
                    {
                        process.env.NODE_ENV === 'development'
                        && <h5 style={{ color: satrexRed, marginTop: 10 }}>{error.message}</h5>
                    }
                    <Button
                        className="greenButton"
                        style={{ marginTop: 20, maxWidth: 300 }}
                        onClick={resetErrorBoundary}
                    >
                        <Trans>Retry</Trans>
                    </Button>
                </div>

            </div>

            {/* <button onClick={resetErrorBoundary}>Try again</button> */}
        </>
    );
}

function Content({ children }) {
    const location = useLocation();
    const [explode, setExplode] = React.useState(false);
    const dispatch = useDispatch();

    const handleBoundaryError = (error, info) => {
        console.error('[RouteCrash]', {
            pathname: location.pathname,
            error,
            componentStack: info?.componentStack,
        });
    };

    useEffect(() => {
        document.getElementById('content').scrollTo({ top: 0, behavior: 'smooth' });
    }, [location]);

    useEffect(() => {
        const coinPriceUpdater = setInterval(() => {
            dispatch(getSupportedCoinList());
        }, 5000);

        return () => {
            clearInterval(coinPriceUpdater);
        };
    }, []);

    return (
        <AnimatePresence exitBeforeEnter initial={false}>
            <ProgressSwitch>
                <ErrorBoundary
                    FallbackComponent={ErrorFallback}
                    onError={handleBoundaryError}
                    onReset={() => setExplode(false)}
                    resetKeys={[explode]}
                >
                    {
                        children
                    }
                </ErrorBoundary>
            </ProgressSwitch>
        </AnimatePresence>
    );
}

export default Content;
