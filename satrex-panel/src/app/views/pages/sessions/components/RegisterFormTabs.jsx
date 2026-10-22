import React, { useEffect, useRef, useState } from 'react';
import { alpha } from '@mui/material'; import { makeStyles } from '@mui/styles';
import { FormControl } from '@mui/material';
import {
    Checkbox,
    Dialog, DialogActions, DialogContent, DialogTitle,
} from '@mui/material';
import { withStyles } from '@mui/styles';
import { InputBase } from '@mui/material';
import { IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import LockIcon from '@mui/icons-material/Lock';
import { Button } from '@mui/material';
import { Grid } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useHistoryCompat as useHistory } from '../../../../router/routerCompat';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { loginWithEmailAndPassword } from '../../../../redux/actions/LoginActions';
import Trans, {
    transFn,
} from '../../../../components/lang';
import { defaultApiV3 } from '../../../../components/api';
import LoadingButton from '../../../../components/LoadingButton';
import {
    satrexGray,
    satrexGreen,
    satrexRed,
    satrexSemiGray,
} from '../../../../../styles/colors';
import GetSmsCode from './getSmsCode';
import satrexToast from '../../../../components/satrexToast';

const Schema = Yup.object().shape({
    password: Yup.string().required('This field is required').matches(
        /^([A-Za-z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
        'Password can only contain Latin letters and Numbers.',
    ).min(8, 'Password is too short - should be 8 chars minimum and must contain uppercase and lowercase letters.')
        .matches(/[A-Z]/, ('Password must contain uppercase and lowercase letters.'))
        .matches(/[a-z]/, ('Password must contain uppercase and lowercase letters.'))
        .matches(/[0-9]/, ('Password must contain Numbers.')),
    repeatedPassword: Yup.string().required(transFn('This field is required')).when('password', {
        is: (val) => (!!(val && val.length > 0)),
        then: Yup.string().oneOf(
            [Yup.ref('password')],
            ('Both password need to be the same'),
        ),
    }),
});

const useStyles = makeStyles((theme) => ({
    checkBoxStyle: {
        color: `${satrexGreen} !important`,
    },
    root: {
        backgroundColor: theme.palette.background.paper,
    },
    countryButton: {
        borderRadius: 8,
        position: 'relative',
        border: '1px solid #ced4da',
        fontSize: 16,
        height: 47,
        width: '100%',
        padding: '10px 12px',
        '&:focus': {
            boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
            borderColor: theme.palette.primary.main,
        },
    },
    smsCodeInput: {
        '& input': {
            textAlign: 'center',
        },
    },
    languageBox: {
        backgroundColor: 'white',
        color: 'black',
    },
    satrexInput: {
        textAlign: (props) => (!props.isEn ? 'right !important' : 'left !important'),
        direction: (props) => (!props.isEn ? 'rtl !important' : 'ltr !important'),
        '&::placeholder': {
            textAlign: (props) => (!props.isEn ? 'right !important' : 'left !important'),
        },
    },
    emailInput: {
        '&::placeholder': {
            textAlign: 'right',
            fontFamily: (props) => (!props.isEn ? 'faNum' : 'enNum'),
            fontSize: '15px !important',
        },
    },
    erremailInput: {
        borderColor: 'red !important',
        '&:focus': {
            borderColor: 'red !important',
            boxShadow: '  0 0 0 0.2rem rgba(255,0,0,0.3) !important',
        },
        '&::placeholder': {
            textAlign: 'right',
            fontFamily: (props) => (!props.isEn ? 'faNum' : 'enNum'),
            fontSize: 15,
        },
    },
    passwordInputElement: {
        paddingRight: '40px !important',
        paddingLeft: '40px !important',
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
        fontSize: '15px !important',
        height: 'auto',
        color: `${satrexGray} !important`,
        width: '100% !important',
        padding: '9px 8px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
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

export default function FullWidthTabs({ smsCodeShow, setSmsCodeShow }) {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [smsSecretCode, setSmsSecretCode] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [validationLoading, setValidationLoading] = useState(false);
    const [checkCodeLoading, setCheckCodeLoading] = useState(false);
    const policiesRef = useRef();
    const [showRepeatedPassword, setShowRepeatedPassword] = useState(null);
    const [acceptedPolicies, setAcceptedPolicies] = useState(false);
    const lang = useSelector((state) => state.user.language);
    const isEn = lang === 'EN' || lang === 'gr' || lang === 'fr';
    const classes = useStyles({ isEn });
    const history = useHistory();
    const [emailValidation, setEmailValidation] = React.useState(false);
    const [open, setOpen] = React.useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleClickShowRepeatedPassword = () => {
        setShowRepeatedPassword(!showRepeatedPassword);
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const sendCode = () => {
        if (!email || !email.trim()) {
            satrexToast(transFn('email phone entry is mandatory'), 'error');
            return;
        }
        setValidationLoading(true);
        defaultApiV3()
            .post('/User/SendEmailSecretCode', {
                email: email.trim(),
            }, {
                headers: {
                    accept: 'text/plain',
                    'Accept-Language': 'en-US',
                    'Content-Type': 'application/json-patch+json',
                },
            })
            .then(() => {
                setValidationLoading(false);
                satrexToast(transFn('The code was sent to you'), 'success');
                setOpen(false);
                setSmsCodeShow(true);
            })
            .catch(() => {
                setValidationLoading(false);
                satrexToast(transFn('failedInMission'), 'error');
            });
    };
    const registration = (password) => {
        setCheckCodeLoading(true);
        defaultApiV3()
            .post('/User/Register', {
                email: email.trim(),
                smsSecretCode: smsSecretCode.replace(/-/g, ''),
                password,
                referralCode: refralCode,
            }, {
                headers: {
                    accept: 'text/plain',
                    'Accept-Language': 'en-US',
                    'Content-Type': 'application/json-patch+json',
                },
            })
            .then((data) => {
                setCheckCodeLoading(false);
                if (!data.data.isSuccess) {
                    data.data.Errors.forEach((err) => {
                        satrexToast(err.Description, 'error');
                    });
                } else {
                    const username = email.trim();
                    dispatch(loginWithEmailAndPassword({ email: username, password }));
                    satrexToast(transFn('welcome'), 'success');
                }
            });
    };
    const handleDialogClose = () => {
        setOpen(false);
    };

    const handlePoliciesAccept = () => {
        setAcceptedPolicies(true);
        setOpen(false);
    };

    const handleemailInput = (e) => {
        const inputValue = e.target.value;
        if (inputValue && !/^\S+@\S+\.\S+$/.test(inputValue)) {
            setEmailValidation(transFn('Please enter a valid email address'));
        } else {
            setEmailValidation(false);
        }
        setEmail(inputValue);
    };
    const onScroll = () => {
        if (policiesRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = policiesRef.current;
            if (scrollTop + clientHeight === scrollHeight) {
            } else {
            }
        }
    };

    const [refralCode, setRefralCode] = useState(history.location.pathname.split('/')[2] ? history.location.pathname.split('/')[2] : '');

    return (
        <div className={`borderR9 registerContainer ${classes.root}`}>
            <Formik
                initialValues={{ email: '', password: '', repeatedPassword: '' }}
                validationSchema={Schema}
                onSubmit={() => {
                    if (!acceptedPolicies) {
                        satrexToast(transFn('Acceptance of the terms and conditions of use of satrex is mandatory'), 'error');
                        return;
                    }

                    sendCode();
                }}
            >
                {({
                    handleChange: handleInputChange, isSubmitting, values, touched, errors,
                }) => (
                    <Form>
                        <>
                            {!smsCodeShow && (
                                <div
                                    style={{ width: '100%', transition: '0.3s', marginTop: '-20px' }}
                                    className={smsCodeShow ? 'minimize' : ''}
                                >
                                    <div style={{ color: 'black', marginTop: '1%', fontSize: '30px' }}>
                                        <Trans>RegisterAtSatrex</Trans>
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
                                            <span>panel.satrex.ir</span>
                                        </div>
                                    </center>
                                    <div style={{ width: '100%', marginTop: '1.2%' }}>

                                            <FormControl style={{ width: '90%', marginBottom: 6 }}>
                                                <div
                                                    style={{
                                                        fontSize: '17px',
                                                        marginBottom: 6,
                                                        textAlign: isEn ? 'left' : 'right',
                                                    }}
                                                >
                                                    <Trans>email</Trans>
                                                </div>

                                                <Grid container style={{ direction: 'rtl' }}>
                                                    <Grid size={12}>
                                                        <BootstrapInput
                                                            autoComplete="new-password"
                                                            name="email"
                                                            type="email"
                                                            placeholder="example@example.com"
                                                            inputProps={{
                                                                tabIndex: 1,
                                                                autoComplete: 'new-password',
                                                            }}
                                                            classes={{
                                                                input: emailValidation
                                                                    ? classes.erremailInput
                                                                    : classes.emailInput,
                                                            }}
                                                            id="email"
                                                            style={{
                                                                direction: 'ltr',
                                                                width: '100%',
                                                                fontSize: '17px',
                                                                textAlign: 'left',
                                                            }}
                                                            onChange={handleemailInput}
                                                            value={email}
                                                        />
                                                    </Grid>
                                                    <Grid style={{ textAlign: 'right', minHeight: '19px' }} size={12}>
                                                        <span style={{ color: 'red' }}>{emailValidation}</span>
                                                    </Grid>
                                                </Grid>
                                            </FormControl>
                                            <Grid container style={{ marginTop: '1.4%' }} size={12}>
                                                <Grid size={12}>
                                                    <FormControl style={{ width: '90%' }}>
                                                        <div
                                                            style={{
                                                                fontSize: '17px',
                                                                marginBottom: 6,
                                                                textAlign: isEn ? 'left' : 'right',
                                                            }}
                                                        >
                                                            <Trans>password</Trans>
                                                        </div>
                                                        <div style={{ position: 'relative' }}>
                                                            <BootstrapInput
                                                                id="password"
                                                                autoComplete="new-password"
                                                                inputProps={{
                                                                    tabIndex: 2,
                                                                    autoComplete: 'new-password',
                                                                    className: classes.passwordInputElement,
                                                                }}
                                                                name="password"
                                                                style={{
                                                                    direction: 'ltr',
                                                                    whiteSpace: 'nowrap',
                                                                    fontSize: '17px',
                                                                    textAlign: isEn ? 'left' : 'right',
                                                                    left: isEn ? '0px' : 'auto',
                                                                    right: !isEn ? '0px' : 'auto',
                                                                }}
                                                                type={showPassword ? 'text' : 'password'}
                                                                value={values.password}
                                                                onChange={handleInputChange}
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
                                                                onClick={handleClickShowPassword}
                                                                onMouseDown={handleMouseDownPassword}
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
                                                        <div className="errorDiv">
                                                            <span>
                                                                {
                                                                    touched.password
                                                                    && <Trans>{errors.password}</Trans>
                                                                }
                                                            </span>
                                                        </div>
                                                    </FormControl>

                                                </Grid>
                                            </Grid>
                                            <Grid container style={{ marginTop: '2.4%' }} size={12}>
                                                <Grid size={12}>
                                                    <FormControl style={{ width: '90%' }}>
                                                        <div
                                                            style={{
                                                                fontSize: '17px',
                                                                marginBottom: 6,
                                                                textAlign: isEn ? 'left' : 'right',
                                                            }}
                                                        >
                                                            <Trans>repeatPassword</Trans>
                                                        </div>
                                                        <div style={{ position: 'relative' }}>
                                                            <BootstrapInput
                                                                id="bootstrap-input"
                                                                value={values.repeatedPassword}
                                                                onChange={handleInputChange}
                                                                inputProps={{
                                                                    tabIndex: 3,
                                                                    className: classes.passwordInputElement,
                                                                }}
                                                                name="repeatedPassword"
                                                                style={{
                                                                    direction: 'ltr',
                                                                    whiteSpace: 'nowrap',
                                                                    fontSize: '17px',
                                                                    textAlign: isEn ? 'left' : 'right',
                                                                    left: isEn ? '0px' : 'auto',
                                                                    right: !isEn ? '0px' : 'auto',
                                                                }}
                                                                type={showRepeatedPassword ? 'text' : 'password'}
                                                                placeholder={transFn('RepeatPassword')}
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
                                                                onClick={handleClickShowRepeatedPassword}
                                                                onMouseDown={handleMouseDownPassword}
                                                                size="small"
                                                                style={{
                                                                    position: 'absolute',
                                                                    top: '50%',
                                                                    transform: 'translateY(-50%)',
                                                                    left: 8,
                                                                    color: '#8c95a3',
                                                                }}
                                                            >
                                                                {showRepeatedPassword ? (
                                                                    <Visibility fontSize="small" />
                                                                ) : (
                                                                    <VisibilityOff fontSize="small" />
                                                                )}
                                                            </IconButton>
                                                        </div>
                                                        <div className="errorDiv">
                                                            <span>
                                                                {
                                                                    touched.repeatedPassword
                                                                    && <Trans>{errors.repeatedPassword}</Trans>
                                                                }
                                                            </span>
                                                        </div>
                                                    </FormControl>

                                                </Grid>
                                            </Grid>
                                            <Grid style={{ marginTop: '2.2%' }} size={12}>
                                                <div
                                                    style={{
                                                        width: '90%',
                                                        margin: '0 auto',
                                                        display: 'flex',
                                                        alignItems: 'flex-start',
                                                        direction: isEn ? 'ltr' : 'rtl',
                                                        textAlign: isEn ? 'left' : 'right',
                                                    }}
                                                >
                                                    <Checkbox
                                                        checked={acceptedPolicies}
                                                        onChange={(event) => setAcceptedPolicies(event.target.checked)}
                                                        classes={{
                                                            checked: classes.checkBoxStyle,
                                                        }}
                                                        style={{
                                                            paddingTop: 0,
                                                            color: acceptedPolicies ? satrexGreen : satrexRed,
                                                        }}
                                                    />
                                                    <div style={{ lineHeight: 1.9 }}>
                                                        <div style={{ color: 'rgba(0,0,0,0.72)' }}>
                                                            <span>
                                                                <Trans>IAccept</Trans>
                                                            </span>
                                                            {' '}
                                                            <span
                                                                role="button"
                                                                tabIndex={0}
                                                                onClick={() => setOpen(true)}
                                                                onKeyDown={(event) => {
                                                                    if (event.key === 'Enter' || event.key === ' ') {
                                                                        setOpen(true);
                                                                    }
                                                                }}
                                                                style={{
                                                                    color: satrexGreen,
                                                                    cursor: 'pointer',
                                                                    fontWeight: 700,
                                                                }}
                                                            >
                                                                <Trans>policies</Trans>
                                                            </span>
                                                        </div>
                                                        <div style={{ fontSize: 13, color: '#8c95a3' }}>
                                                            <Trans>policiesPageDescriptionLine4</Trans>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Grid>

                                            {/* <Menu */}
                                            {/*    id="simple-menu" */}
                                            {/*    anchorEl={region} */}
                                            {/*    keepMounted */}
                                            {/*    open={Boolean(region)} */}
                                            {/*    onClose={handleRegionClose} */}
                                            {/*    style={{direction: 'ltr'}} */}
                                            {/* > */}
                                            {/*    { */}
                                            {/*        countries */}
                                            {/*    } */}
                                            {/* </Menu> */}

                                            <Grid style={{ marginTop: '3%' }} size={12}>
                                                <center>
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        disableElevation
                                                        style={{ color: 'white' }}
                                                        className="submitButton"
                                                        classes={{
                                                            disabled: classes.buttonDisabled,
                                                        }}
                                                        type="submit"
                                                        tabIndex={4}
                                                        disabled={validationLoading || !acceptedPolicies}
                                                    >
                                                        <Trans>RegisterAtSatrex</Trans>
                                                    </Button>
                                                </center>
                                            </Grid>
                                            <center style={{ marginTop: '0.8%' }}>
                                                <span>
                                                    <Trans>alreadyRegistered?</Trans>
                                                </span>
                                                <span
                                                    className="redColor"
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={() => history.push('/login')}
                                                >
                                                <Trans>LoginToSatrex</Trans>
                                                </span>
                                            </center>
                                            <Dialog
                                                open={open}
                                                onClose={handleDialogClose}
                                                aria-labelledby="alert-dialog-title"
                                                aria-describedby="alert-dialog-description"
                                            >
                                                <DialogTitle
                                                    id="alert-dialog-title"
                                                    style={{
                                                        direction: isEn ? 'ltr' : 'rtl',
                                                        textAlign: isEn ? 'left' : 'right',
                                                    }}
                                                >
                                                    <Trans>policiesPageDescriptionLine1</Trans>
                                                </DialogTitle>
                                                <DialogContent
                                                    onScroll={onScroll}
                                                    ref={policiesRef}
                                                    style={{
                                                        direction: isEn ? 'ltr' : 'rtl',
                                                        textAlign: isEn ? 'left' : 'right',
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            padding: '20px',
                                                            direction: isEn ? 'ltr' : 'rtl',
                                                            textAlign: isEn ? 'left' : 'right',
                                                        }}
                                                        className="footerPage"
                                                        id="policiesContent"
                                                    >
                                                        <p
                                                            style={{
                                                                textAlign: isEn ? 'left' : 'right',
                                                                textJustify: 'inter-word',
                                                            }}
                                                        >
                                                            <Trans>policiesPageDescriptionLine2</Trans>
                                                        </p>
                                                        <h4
                                                            style={{
                                                                color: satrexGreen,
                                                                textAlign: isEn ? 'left' : 'right',
                                                            }}
                                                        >
                                                            <Trans>policiesPageDescriptionLine3</Trans>
                                                        </h4>
                                                        <div
                                                            style={{
                                                                marginTop: '20px',
                                                                textAlign: isEn ? 'left' : 'right',
                                                            }}
                                                        >
                                                            <Trans>policiesPageDescriptionLine4</Trans>
                                                        </div>
                                                        <div>
                                                            <ul style={{ paddingInlineStart: isEn ? 24 : 20 }}>
                                                                <li style={{ marginTop: '8px' }}>
                                                                    <Trans>policiesPageDescriptionLine5</Trans>
                                                                </li>
                                                                <li style={{ marginTop: '8px' }}>
                                                                    <Trans>policiesPageDescriptionLine6</Trans>
                                                                    {' '}
                                                                </li>
                                                                <li style={{ marginTop: '8px' }}>
                                                                    <Trans>policiesPageDescriptionLine7</Trans>
                                                                </li>
                                                                <li style={{ marginTop: '8px' }}>
                                                                    <Trans>policiesPageDescriptionLine8</Trans>
                                                                </li>
                                                                <li style={{ marginTop: '8px' }}>
                                                                    <Trans>policiesPageDescriptionLine9</Trans>
                                                                    {' '}
                                                                </li>
                                                                <li style={{ marginTop: '8px' }}>
                                                                    <Trans>policiesPageDescriptionLine10</Trans>
                                                                </li>
                                                                <li style={{ marginTop: '8px' }}>
                                                                    <Trans>policiesPageDescriptionLine11</Trans>
                                                                </li>
                                                                <li style={{ marginTop: '8px' }}>
                                                                    <Trans>policiesPageDescriptionLine12</Trans>
                                                                </li>
                                                                <li style={{ marginTop: '8px' }}>
                                                                    <Trans>policiesPageDescriptionLine13</Trans>
                                                                </li>
                                                                <li style={{ marginTop: '8px' }}>
                                                                    <Trans>policiesPageDescriptionLine13a</Trans>
                                                                </li>
                                                                <li style={{ marginTop: '8px' }}>
                                                                    <Trans>policiesPageDescriptionLine14</Trans>
                                                                </li>
                                                                <li style={{ marginTop: '8px' }}>
                                                                    <Trans>policiesPageDescriptionLine15</Trans>
                                                                </li>
                                                                <li style={{ marginTop: '8px' }}>
                                                                    <Trans>policiesPageDescriptionLine16</Trans>
                                                                </li>
                                                                <li style={{ marginTop: '8px' }}>
                                                                    <Trans>policiesPageDescriptionLine17</Trans>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <h4
                                                            style={{
                                                                color: satrexGreen,
                                                                textAlign: isEn ? 'left' : 'right',
                                                            }}
                                                        >
                                                            <Trans>policiesPageDescriptionLine18</Trans>
                                                        </h4>
                                                        <div style={{ textAlign: isEn ? 'left' : 'right' }}>
                                                            <Trans>policiesPageDescriptionLine19</Trans>
                                                        </div>
                                                    </div>
                                                </DialogContent>
                                                <DialogActions
                                                    style={{
                                                        padding: 20,
                                                        direction: isEn ? 'ltr' : 'rtl',
                                                        justifyContent: isEn ? 'flex-end' : 'flex-start',
                                                    }}
                                                >
                                                    <LoadingButton loading={validationLoading}>
                                                        <Button
                                                            variant="contained"
                                                            color="primary"
                                                            disableElevation
                                                            style={{ color: 'white' }}
                                                            className="submitButton"
                                                            classes={{
                                                                disabled: classes.buttonDisabled,
                                                            }}
                                                            type="button"
                                                            onClick={handlePoliciesAccept}
                                                            tabIndex={4}
                                                        >
                                                            <Trans>IAccept</Trans>
                                                        </Button>
                                                    </LoadingButton>
                                                </DialogActions>
                                            </Dialog>

                                    </div>
                                </div>
                            )}

                        </>
                        {smsCodeShow && (
                            <GetSmsCode
                                email={email}
                                action={() => registration(values.password)}
                                tryAgain={sendCode}
                                loading={checkCodeLoading}
                                setValue={setSmsSecretCode}
                                refralCode={refralCode}
                                setRefralCode={setRefralCode}
                            />
                        )}
                    </Form>
                )}
            </Formik>
        </div>
    );
}
