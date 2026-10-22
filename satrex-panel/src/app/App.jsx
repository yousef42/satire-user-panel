import '../styles/_app.scss';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { ToastProvider } from 'react-toast-notifications';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import MatxTheme from './MasterLayout/MasterTheme/MatxTheme';
import AppContext from './appContext';
import history from '../history.js';
import { StableHistoryRouter } from './router/StableHistoryRouter';
import { routes } from './RootRoutes';
import { Store } from './redux/Store';
import Auth from './auth/Auth';
import MatxLayout from './MasterLayout/MasterLayout';
import AuthGuard from './auth/AuthGuard';
import '../styles/styles.scss';
import '../fonts/icons/font/flaticon.scss';
import 'animate.css';
import 'react-toastify/dist/ReactToastify.css';
import withClearCache from '../ClearCache.jsx';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            cacheTime: 10,
            retry: 3,
            retryDelay: 2000,
            keepPreviousData: true,
            // suspense: true,
            useErrorBoundary: false,
        },
    },
});

function MainApp() {

    return (
            <QueryClientProvider client={queryClient}>
                <AppContext.Provider value={{ routes }}>
                    <Provider store={Store}>
                        <MatxTheme>
                            <Auth>
                                <StableHistoryRouter history={history}>
                                    <AuthGuard>
                                        <ToastProvider
                                            autoDismiss
                                            autoDismissTimeout={6000}
                                            // components={{ Toast: Snack }}
                                            placement="top-right"
                                        >
                                            <ReactQueryDevtools initialIsOpen />
                                            <MatxLayout />
                                        </ToastProvider>

                                    </AuthGuard>
                                </StableHistoryRouter>
                            </Auth>
                        </MatxTheme>
                    </Provider>
                </AppContext.Provider>

            </QueryClientProvider>
    );
}

const ClearCacheComponent = withClearCache(MainApp);

function App() {
    return <MainApp />;
}

export default App;
