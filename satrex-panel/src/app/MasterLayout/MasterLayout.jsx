import React, {Component, Suspense} from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { isEqual, merge } from 'lodash';
import { Helmet } from 'react-helmet';
import { ToastContainer } from 'react-toastify';
import AppContext from '../appContext';
import {
    setLayoutSettings,
    setDefaultSettings,
} from '../redux/actions/LayoutActions';
import { isMdScreen, getQueryParam } from '../../utils';
import { isRtl, transFn } from '../components/lang';
import Layout from './Layout1/Layout1'
import { withRouterCompat as withRouter } from '../router/routerCompat';


class MasterLayout extends Component {
    constructor(props, context) {
        super(props);
        this.appContext = context;
        this.updateSettingsFromRouter();

        // Set settings from query (Only for demo purpose)
        this.setLayoutFromQuery();
    }

    componentDidUpdate(prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            this.updateSettingsFromRouter();
        }
        if (this.props.location.pathname !== prevProps.location.pathname) {
            document.getElementsByClassName('content-wrap')[0].style.transition = '0.3s !important';
            document.getElementsByClassName('content-wrap')[0].scroll(0, 0);
        }
    }

    unlisten = () => {
    };

    UNSAFE_componentWillMount() {
        if (window) {
            window.addEventListener('resize', this.listenWindowResize);
        }
    }

    componentDidMount() {
        this.unlisten = this.props.history.listen(() => {
            window.scrollTo(0, 0);
        });
    }

    componentWillUnmount() {
        if (window) {
            window.removeEventListener('resize', this.listenWindowResize);
        }
        this.unlisten();
    }

    setLayoutFromQuery = () => {
        try {
            let settingsFromQuery = getQueryParam('settings');
            settingsFromQuery = settingsFromQuery
                ? JSON.parse(settingsFromQuery)
                : {};
            const { settings, setLayoutSettings, setDefaultSettings } = this.props;
            const updatedSettings = merge({}, settings, settingsFromQuery);

            setLayoutSettings(updatedSettings);
            setDefaultSettings(updatedSettings);
        } catch (e) {
            // ("Error! Set settings from query param", e);
        }
    };

    listenWindowResize = () => {
        const { settings, setLayoutSettings } = this.props;

        if (settings.layout1Settings.leftSidebar.show) {
            const mode = isMdScreen() ? 'close' : 'full';
            setLayoutSettings(
                merge({}, settings, { layout1Settings: { leftSidebar: { mode } } }),
            );
        }
    };

    updateSettingsFromRouter() {
        const { routes } = this.appContext;
        const { defaultSettings, settings, setLayoutSettings, location } = this.props;

        const matched = routes.find((r) => r.path === location.pathname);

        if (matched && matched.settings) {
            const updatedSettings = merge({}, settings, matched.settings);
            if (!isEqual(settings, updatedSettings)) {
                setLayoutSettings(updatedSettings);
            }
        } else if (!isEqual(settings, defaultSettings)) {
            setLayoutSettings(defaultSettings);
        }
    }

    render() {
        return (
            <div
                style={{
                    height: '100%', width: '100%', display: 'flex', justifyContent: 'center',
                }}
                className={`${
                    this.props.satrexTheme ? 'appContent' : 'appContentDark'
                } ${this.props.language === 'EN' ? 'enApp' : 'faApp'}`}
                dir={!isRtl ? 'ltr' : 'rtl'}
                id="appContent"
            >
                <Helmet>
                    <meta charSet="utf-8" />
                    {/* <title>242243</title> */}
                    <title>
                        {transFn('satrex')}
                        -
                        {transFn((this.props.history.location.pathname).split('/')[1])}
                    </title>

                </Helmet>
                <div style={{ height: '100%', width: '100%', position: 'relative' }} className="mainDiv">
                    <Suspense fallback={()=>'loading...'}>
                        <Layout {...this.props} />
                    </Suspense>
                </div>
                <ToastContainer
                    position={`top-${this.props.language === 'EN' ? 'left' : 'right'}`}
                    autoClose={4000}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    pauseOnFocusLoss
                    style={{ height: 50 }}
                    draggable
                    pauseOnHover

                />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    setLayoutSettings: PropTypes.func.isRequired,
    setDefaultSettings: PropTypes.func.isRequired,
    settings: state.layout.settings,
    defaultSettings: state.layout.defaultSettings,
    language: state.user.language,
    satrexTheme: state.layout.theme,
});

MasterLayout.contextType = AppContext;

export default withRouter(
    connect(mapStateToProps, { setLayoutSettings, setDefaultSettings })(
        MasterLayout,
    ),
);
