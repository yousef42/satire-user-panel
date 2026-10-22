import React, { useEffect, useRef, useState } from 'react';
import {
    alpha,
    Button,
    FormControl,
    Grid,
    IconButton,
    InputBase,
} from '@mui/material';
import { makeStyles, withStyles } from '@mui/styles';
import { Cached, Visibility, VisibilityOff } from '@mui/icons-material';
import LockIcon from '@mui/icons-material/Lock';
import InputMask from 'reactMask';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { loginWithEmailAndPassword } from '../../../../redux/actions/LoginActions';
import Trans, { transFn } from '../../../../components/lang';
import { defaultApi, defaultApiV3 } from '../../../../components/api';
import { satrexGray, satrexSemiGray } from '../../../../../styles/colors';
import LoadingButton from '../../../../components/LoadingButton';
import satrexToast from '../../../../components/satrexToast';

const Schema = Yup.object().shape({
    password: Yup.string().required('This field is required').matches(
        /^([A-Za-z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
        'Password can only contain Latin letters and Numbers.',
    ).min(8, 'Password is too short - should be 8 chars minimum and must contain uppercase and lowercase letters.')
        .matches(/[A-Z]/, 'Password must contain uppercase and lowercase letters.')
        .matches(/[a-z]/, 'Password must contain uppercase and lowercase letters.')
        .matches(/[0-9]/, 'Password must contain Numbers.'),
    repeatedPassword: Yup.string().required(transFn('This field is required')).when('password', {
        is: (val) => (!!(val && val.length > 0)),
        then: Yup.string().oneOf(
            [Yup.ref('password')],
            'Both password need to be the same',
        ),
    }),
    code: Yup.string().required('This field is required'),
});

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
    smsCodeInput: {
        '& input': {
            textAlign: 'center',
            letterSpacing: '3px',
        },
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

export default function RegisterFormTabs() {
    const dispatch = useDispatch();
    const timerRef = useRef(null);
    const lang = useSelector((state) => state.user.language);
    const isEn = lang === 'EN' || lang === 'gr' || lang === 'fr';
    const classes = useStyles({ isEn });

    const [email, setEmail] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatedPassword, setShowRepeatedPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resetLoading, setResetLoading] = useState(false);
    const [emailValidation, setEmailValidation] = useState(false);
    const [timer, setTimer] = useState('');
    const [enableButton, setEnableButton] = useState(false);
    const [smsCodeShow, setSmsCodeShow] = useState(false);

    useEffect(() => () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
    }, []);

    const startCountdown = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }

        const countDownDate = new Date(new Date().getTime() + 3 * 60000).getTime();
        setEnableButton(true);

        timerRef.current = setInterval(() => {
            const now = new Date().getTime();
            const distance = countDownDate - now;

            if (distance <= 0) {
                setEnableButton(false);
                setTimer('');
                clearInterval(timerRef.current);
                timerRef.current = null;
                return;
            }

            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            setTimer(`${minutes}:${seconds.toString().padStart(2, '0')}`);
        }, 1000);
    };

    const handleEmailInput = (event) => {
        const inputValue = event.target.value;

        if (inputValue && !/^\S+@\S+\.\S+$/.test(inputValue)) {
            setEmailValidation(transFn('Please enter a valid email address'));
        } else {
            setEmailValidation(false);
        }

        setEmail(inputValue);
    };

    const sendEmailCode = async () => {
        const normalizedEmail = email.trim();

        if (!normalizedEmail) {
            satrexToast(transFn('email phone entry is mandatory'), 'error');
            return;
        }

        if (!/^\S+@\S+\.\S+$/.test(normalizedEmail)) {
            const errorMessage = transFn('Please enter a valid email address');
            setEmailValidation(errorMessage);
            satrexToast(errorMessage, 'error');
            return;
        }

        setLoading(true);
        try {
            const { data } = await defaultApiV3().post('/User/SendemailSecretCodeForForgetPassword', {
                email: normalizedEmail,
            });

            if (!data.isSuccess) {
                data.Errors.forEach((err) => {
                    satrexToast(err.Description, 'error');
                });
                return;
            }

            satrexToast(transFn('The code was sent to you'), 'success');
            setSmsCodeShow(true);
            startCountdown();
        } catch (error) {
            satrexToast(transFn('failedInMission'), 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (values) => {
        const normalizedEmail = email.trim();

        setResetLoading(true);
        try {
            const { data } = await defaultApi().post('/User/ResetPassword', {
                email: normalizedEmail,
                smsSecretCode: values.code.replace(/[-\s]/g, ''),
                newPassword: values.password,
            });

            if (!data.isSuccess) {
                data.Errors.forEach((err) => {
                    satrexToast(err.Description, 'error');
                });
                return;
            }

            await dispatch(loginWithEmailAndPassword({ email: normalizedEmail, password: values.password }));
        } finally {
            setResetLoading(false);
        }
    };

    return (
        <Grid container className={`borderR9 ${classes.root}`}>
            {!smsCodeShow && (
                <div style={{ width: '100%' }}>
                    <div style={{ color: 'black', marginTop: '1%', fontSize: '30px' }}>
                        <Trans>Password recovery</Trans>
                    </div>
                    <div style={{ fontSize: '14px', marginTop: '1%' }}>
                        <Trans>urlCheck</Trans>
                    </div>
                    <center>
                        <div className="loginLink">
                            <span className="greenColor" style={{ fontSize: '15px' }}>
                                <LockIcon fontSize="small" className="httpsIcon" />
                            </span>
                            <span className="greenColor">
                                https://
                            </span>
                            <span>panel.shiniance.net</span>
                        </div>
                    </center>

                    <div
                        style={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 22,
                            marginTop: 22,
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
                                id="reset-email"
                                name="email"
                                type="email"
                                placeholder="example@example.com"
                                value={email}
                                inputProps={{
                                    tabIndex: 1,
                                    autoComplete: 'off',
                                    form: {
                                        autoComplete: 'off',
                                    },
                                }}
                                onChange={handleEmailInput}
                                classes={{
                                    input: classes.satrexEmailInput,
                                }}
                                style={{
                                    direction: 'ltr',
                                    textAlign: 'left',
                                    width: '100%',
                                }}
                            />
                            <div style={{ textAlign: isEn ? 'left' : 'right', minHeight: 19 }}>
                                <span style={{ color: 'red' }}>{emailValidation}</span>
                            </div>
                        </FormControl>

                        <center style={{ width: '100%', marginTop: 12 }}>
                            <LoadingButton loading={loading}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    disableElevation
                                    style={{ color: 'white', width: '82%' }}
                                    className="submitButton"
                                    type="button"
                                    classes={{
                                        disabled: classes.buttonDisabled,
                                    }}
                                    onClick={sendEmailCode}
                                    disabled={loading}
                                >
                                    <Trans>Send code</Trans>
                                </Button>
                            </LoadingButton>
                        </center>
                    </div>
                </div>
            )}

            {smsCodeShow && (
                <Formik
                    initialValues={{ password: '', repeatedPassword: '', code: '' }}
                    validationSchema={Schema}
                    onSubmit={handleResetPassword}
                >
                    {({
                        handleChange: handleInputChange,
                        errors,
                        touched,
                        values,
                    }) => (
                        <Form style={{ width: '100%' }}>
                            <div style={{ color: 'black', marginTop: '1%', fontSize: '30px' }}>
                                <Trans>Enter Auth Code</Trans>
                            </div>
                            <div style={{ fontSize: '14px', marginTop: '1%' }}>
                                <Trans>codeSentToemail</Trans>
                                {' '}
                                <span className={isEn ? 'enNum' : ''}>{email}</span>
                            </div>

                            <div
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: 22,
                                    marginTop: 22,
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
                                        <Trans>password</Trans>
                                    </div>
                                    <div style={{ position: 'relative' }}>
                                        <BootstrapInput
                                            id="reset-password"
                                            type={showPassword ? 'text' : 'password'}
                                            value={values.password}
                                            name="password"
                                            onChange={handleInputChange}
                                            placeholder={transFn('EnterPassword')}
                                            inputProps={{
                                                tabIndex: 1,
                                                className: classes.passwordInputElement,
                                            }}
                                            classes={{
                                                input: classes.satrexInput,
                                            }}
                                            style={{
                                                direction: 'ltr',
                                                textAlign: isEn ? 'left' : 'right',
                                                width: '100%',
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
                                            onClick={() => setShowPassword((prev) => !prev)}
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
                                            {showPassword ? <Visibility fontSize="small" /> : <VisibilityOff fontSize="small" />}
                                        </IconButton>
                                    </div>
                                    <div className="errorDiv">
                                        <span>{touched.password && <Trans>{errors.password}</Trans>}</span>
                                    </div>
                                </FormControl>

                                <FormControl style={{ width: '90%' }}>
                                    <div
                                        style={{
                                            fontSize: 17,
                                            marginBottom: 8,
                                            textAlign: isEn ? 'left' : 'right',
                                        }}
                                    >
                                        <Trans>repeatPassword</Trans>
                                    </div>
                                    <div style={{ position: 'relative' }}>
                                        <BootstrapInput
                                            id="reset-repeat-password"
                                            name="repeatedPassword"
                                            type={showRepeatedPassword ? 'text' : 'password'}
                                            value={values.repeatedPassword}
                                            onChange={handleInputChange}
                                            placeholder={transFn('RepeatPassword')}
                                            inputProps={{
                                                tabIndex: 2,
                                                className: classes.passwordInputElement,
                                            }}
                                            classes={{
                                                input: classes.satrexInput,
                                            }}
                                            style={{
                                                direction: 'ltr',
                                                textAlign: isEn ? 'left' : 'right',
                                                width: '100%',
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
                                            onClick={() => setShowRepeatedPassword((prev) => !prev)}
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
                                            {showRepeatedPassword ? <Visibility fontSize="small" /> : <VisibilityOff fontSize="small" />}
                                        </IconButton>
                                    </div>
                                    <div className="errorDiv">
                                        <span>{touched.repeatedPassword && <Trans>{errors.repeatedPassword}</Trans>}</span>
                                    </div>
                                </FormControl>

                                <FormControl style={{ width: '90%' }}>
                                    <div
                                        style={{
                                            fontSize: 17,
                                            marginBottom: 8,
                                            textAlign: 'center',
                                        }}
                                    >
                                        <Trans>Enter Auth Code</Trans>
                                    </div>
                                    <InputMask
                                        mask="9-9-9-9-9-9"
                                        disabled={false}
                                        maskChar=" "
                                        onChange={handleInputChange}
                                        value={values.code}
                                        name="code"
                                    >
                                        {(inputProps) => (
                                            <BootstrapInput
                                                {...inputProps}
                                                id="reset-code"
                                                inputProps={{
                                                    ...(inputProps.inputProps || {}),
                                                    tabIndex: 3,
                                                }}
                                                style={{ direction: 'ltr', width: '100%' }}
                                                className={classes.smsCodeInput}
                                            />
                                        )}
                                    </InputMask>
                                    <div className="errorDiv">
                                        <span>{touched.code && <Trans>{errors.code}</Trans>}</span>
                                    </div>
                                </FormControl>

                                <div tabIndex={4} style={{ fontSize: 14 }}>
                                    {enableButton && (
                                        <p style={{ margin: 0 }}>
                                            {isEn ? 'Resubmit the code in ' : 'ارسال مجدد کد تا '}
                                            <span>{timer}</span>
                                            {!isEn && ' دیگر'}
                                        </p>
                                    )}
                                    {!enableButton && (
                                        <Button onClick={sendEmailCode} startIcon={<Cached />} color="secondary">
                                            <Trans>resend</Trans>
                                        </Button>
                                    )}
                                </div>

                                <center style={{ width: '100%', marginTop: 12 }}>
                                    <LoadingButton loading={resetLoading}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            disableElevation
                                            style={{ color: 'white', width: '82%' }}
                                            className="submitButton"
                                            type="submit"
                                            tabIndex={5}
                                        >
                                            <Trans>continue</Trans>
                                        </Button>
                                    </LoadingButton>
                                </center>
                            </div>
                        </Form>
                    )}
                </Formik>
            )}
        </Grid>
    );
}
