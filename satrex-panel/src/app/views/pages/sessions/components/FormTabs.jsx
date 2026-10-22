import React, { useState } from 'react';
import { alpha, Button, FormControl, Grid, IconButton, InputBase } from '@mui/material';
import { makeStyles, withStyles } from '@mui/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import LockIcon from '@mui/icons-material/Lock';
import { useDispatch, useSelector } from 'react-redux';
import { useHistoryCompat as useHistory } from '../../../../router/routerCompat';
import RtlComponent from '../../../../components/rtlComponent';
import LoadingButton from '../../../../components/LoadingButton';
import {
    LOGIN_ERROR,
    LOGIN_LOADING,
    LOGIN_SUCCESS,
    setJwtToken,
    setRefreshTokenTime,
} from '../../../../redux/actions/LoginActions';
import jwtAuthService from '../../../../services/jwtAuthService';
import { persistAuthSession } from '../../../../services/authStorage';
import { satrexGray, satrexSemiGray } from '../../../../../styles/colors';
import { setTopbarValues } from '../../../../redux/actions/LayoutActions';
import { getSupportedCoinList } from '../../../../redux/actions/CoinActions';
import Trans, { transFn } from '../../../../components/lang';
import TwoFactorComponent from './twoFactorComponent';
import { satrexApi } from '../../../../components/api';
import satrexToast from '../../../../components/satrexToast';
import { isAuthRoutes } from '../../../../../utils/helpers/isAuthRoute';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
    },
    satrexInput: {
        textAlign: (props) => (!props.isEn ? 'right !important' : 'left !important'),
        direction: (props) => (!props.isEn ? 'rtl !important' : 'ltr !important'),
        '&::placeholder': {
            textAlign: (props) => (!props.isEn ? 'right !important' : 'left !important'),
        },
    },
    satrexEmailInput: {
        textAlign: 'left',
        '&::placeholder': {
            textAlign: 'left',
            fontFamily: (props) => (!props.isEn ? 'faNum' : 'enNum'),
            fontSize: 15,
        },
        direction: 'ltr',
    },
    passwordInputElement: {
        paddingRight: '52px !important',
        paddingLeft: '52px !important',
    },
    buttonDisabled: {
        backgroundColor: `${satrexSemiGray} !important`,
    },
}));

const BootstrapInput = withStyles((theme) => ({
    root: {
        borderRadius: 10,
        position: 'relative',
        border: '1px solid #b8c0cc !important',
        backgroundColor: '#ffffff !important',
        width: '100%',
        minHeight: 46,
        padding: '0 12px',
        '&.Mui-focused': {
            borderColor: `${theme.palette.primary.main} !important`,
            boxShadow: `${alpha(theme.palette.primary.main, 0.2)} 0 0 0 0.2rem`,
        },
    },
    input: {
        fontSize: '16px !important',
        height: 'auto',
        color: `${satrexGray} !important`,
        width: '100% !important',
        direction: 'rtl',
        padding: '10px 0',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            boxShadow: 'none',
        },
    },
}))(InputBase);

export default function FormTabs() {
    const dispatch = useDispatch();
    const history = useHistory();
    const lang = useSelector((state) => state.user.language);
    const isEn = lang === 'EN' || lang === 'gr' || lang === 'fr';
    const classes = useStyles({ isEn });

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [smsCodeShow, setSmsCodeShow] = useState(false);
    const [trackId, setTrackId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [checkCodeLoading, setCheckCodeLoading] = useState(false);
    const [smsSecretCode, setSmsSecretCode] = useState('');

    const hasLoginAccessToken = (authData) => Boolean(
        authData?.jwtToken?.tokenValue
        || authData?.access_token
        || authData?.accessToken
        || authData?.bearerToken
        || authData?.token?.tokenValue
        || authData?.tokenValue,
    );

    const needsOtpChallenge = (authData) => {
        const otpNeeded = authData?.otpNeeded === true || authData?.otpNeeded === 'true';
        return otpNeeded && !hasLoginAccessToken(authData);
    };

    const handleRedirection = (historyParam) => {
        if (!isAuthRoutes(historyParam)) {
            history.replace(historyParam);
        } else {
            history.replace('/home');
        }

        satrexToast(transFn('welcome'), 'success');
    };

    const completeLogin = (userData) => {
        const session = persistAuthSession(userData);
        if (!session) {
            dispatch({
                type: LOGIN_ERROR,
                payload: transFn('failedInMission'),
            });
            satrexToast(transFn('failedInMission'), 'error');
            return;
        }
        dispatch(setRefreshTokenTime(session?.expirationDate));
        dispatch(setJwtToken(session?.bearerToken, session?.refreshToken));
        dispatch(setTopbarValues());
        dispatch(getSupportedCoinList());
        dispatch({
            type: LOGIN_SUCCESS,
        });
        setTimeout(() => {
            handleRedirection(history.location.state?.prevRoute ?? '/home');
        }, 500);
    };

    const handleEmailFormSubmit = (event) => {
        event.preventDefault();

        const normalizedEmail = email.trim();

        if (!normalizedEmail || !password) {
            satrexToast(transFn('Fields are required'), 'error');
            return;
        }

        setLoading(true);
        dispatch({
            type: LOGIN_LOADING,
        });

        jwtAuthService
            .loginWithEmailAndPassword(normalizedEmail, password)
            .then((user) => {
                setLoading(false);
                if (user.data.isSuccess) {
                    if (needsOtpChallenge(user.data.data)) {
                        setSmsCodeShow(true);
                        setTrackId(user.data.data.trackId);
                        return;
                    }

                    completeLogin(user.data.data);
                    return;
                }

                const errorMessage = user?.data?.Errors?.[0]?.Description || transFn('failedInMission');
                satrexToast(errorMessage, 'error');
                history.push({
                    pathname: '/login',
                });
                dispatch({
                    type: LOGIN_ERROR,
                    payload: errorMessage,
                });
            })
            .catch(() => {
                setLoading(false);
                satrexToast(transFn('failedInMission'), 'error');
                dispatch({
                    type: LOGIN_ERROR,
                    payload: transFn('failedInMission'),
                });
            });
    };

    const loginOtp = async () => {
        setCheckCodeLoading(true);
        try {
            const { data } = await satrexApi().post('/Token/VerifyOtp', {
                trackId,
                otp: smsSecretCode.replace(/-/g, ''),
            });

            if (data.isSuccess) {
                completeLogin(data.data);
            }
        } finally {
            setCheckCodeLoading(false);
        }
    };

    return (
        <RtlComponent>
            {!smsCodeShow && (
                <Grid
                    container
                    className={`borderR9 ${classes.root}`}
                    style={{ marginTop: '3%' }}
                >
                    <form
                        onSubmit={handleEmailFormSubmit}
                        style={{ width: '100%' }}
                        id="formLogin"
                    >
                        <div style={{ color: 'black', marginTop: '1%', fontSize: '30px' }}>
                            <Trans>LoginToSatrex</Trans>
                        </div>
                        <div
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: 22,
                                    marginTop: 8,
                                }}
                        >
                            <FormControl style={{ width: '90%' }}>
                                <div
                                    style={{
                                        fontSize: 17,
                                        marginBottom: 8,
                                        textAlign: isEn ? 'left' : 'right',
                                    }}
                                >
                                    <Trans>email</Trans>
                                </div>
                                <BootstrapInput
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="example@example.com"
                                    value={email}
                                    style={{
                                        direction: 'ltr',
                                        textAlign: 'left',
                                        width: '100%',
                                        color: satrexGray,
                                    }}
                                    inputProps={{
                                        tabIndex: 1,
                                        autoComplete: 'off',
                                        form: {
                                            autoComplete: 'off',
                                        },
                                    }}
                                    onChange={(e) => setEmail(e.target.value)}
                                    classes={{
                                        input: classes.satrexEmailInput,
                                    }}
                                />
                            </FormControl>

                            <FormControl style={{ width: '90%', color: satrexGray }}>
                                <div
                                    style={{
                                        fontSize: 17,
                                        marginBottom: 8,
                                        textAlign: isEn ? 'left' : 'right',
                                    }}
                                >
                                    <Trans>password</Trans>
                                </div>
                                <div style={{ position: 'relative' }}>
                                    <BootstrapInput
                                        id="emailPassword"
                                        name="loginPassword"
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(event) => setPassword(event.target.value)}
                                        inputProps={{
                                            tabIndex: 2,
                                            className: classes.passwordInputElement,
                                        }}
                                        placeholder={transFn('EnterPassword')}
                                        classes={{
                                            input: classes.satrexInput,
                                        }}
                                    />
                                    <LockIcon
                                        fontSize="small"
                                        style={{
                                            position: 'absolute',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            right: 12,
                                            color: '#8c95a3',
                                        }}
                                    />
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setShowPassword((current) => !current)}
                                        onMouseDown={(event) => event.preventDefault()}
                                        size="small"
                                        style={{
                                            position: 'absolute',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            left: 8,
                                            color: '#8c95a3',
                                        }}
                                    >
                                        {showPassword ? (
                                            <Visibility fontSize="small" />
                                        ) : (
                                            <VisibilityOff fontSize="small" />
                                        )}
                                    </IconButton>
                                </div>
                            </FormControl>
                        </div>

                        <div
                            style={{
                                width: '90%',
                                margin: '14px auto 0',
                                textAlign: isEn ? 'left' : 'right',
                            }}
                        >
                            <span
                                className="whiteBlueColor"
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                    history.push({
                                        pathname: '/reset-password',
                                    });
                                }}
                            >
                                <Trans>forgotPassword</Trans>
                            </span>
                        </div>

                        <Grid container>
                            <Grid style={{ marginTop: '5%' }} size={12}>
                                <center>
                                    <LoadingButton loading={loading}>
                                        <Button
                                            variant="contained"
                                            disableElevation
                                            style={{ color: 'white', width: '82%' }}
                                            tabIndex={4}
                                            className="submitButton"
                                            classes={{
                                                disabled: classes.buttonDisabled,
                                            }}
                                            type="submit"
                                            disabled={loading}
                                        >
                                            <Trans>LoginToSatrex</Trans>
                                        </Button>
                                    </LoadingButton>
                                </center>
                            </Grid>
                            <Grid size={12}>
                                <center style={{ marginTop: '2%' }}>
                                    <span>
                                        <Trans>newUser?</Trans>
                                    </span>
                                    &nbsp;
                                    <span
                                        className="redColor"
                                        tabIndex={5}
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => history.push('/register')}
                                    >
                                        <Trans>RegisterAtSatrex</Trans>
                                    </span>
                                </center>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            )}
            {smsCodeShow && (
                <TwoFactorComponent
                    email={email}
                    action={loginOtp}
                    tryAgain={loginOtp}
                    loading={checkCodeLoading}
                    setValue={setSmsSecretCode}
                />
            )}
        </RtlComponent>
    );
}
