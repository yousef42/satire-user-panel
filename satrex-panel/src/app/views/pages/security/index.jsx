import React, { useEffect, useState } from 'react';
import {
    Checkbox,
    createTheme,
    FormControl,
    FormControlLabel,
    Grid,
    InputAdornment,
    InputBase,
} from '@mui/material';
import { ThemeProvider, styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { Button } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useSelector } from 'react-redux';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { satrexApi } from '../../../components/api';
import Trans, { transFn } from '../../../components/lang';
import ReportTB from './reportTB';
import {
    satrexBorderDarkColor,
    satrexRed,
    satrexSemiDarkerBlueDarkMode,
} from '../../../../styles/colors';
import SatrexCard from '../../../components/SatrexCard';
import AnimatedPage from '../../../components/AnimatedPage';
import satrexToast from '../../../components/satrexToast';
import { changeUserPassword, getLoginByOtpStatus } from '../../../../utils/apis';

const materialTheme = createTheme({
    palette: {
        mode: 'light',
        primary: { main: satrexRed },
        background: { default: '#fff', paper: '#fff' },
        text: { primary: 'rgba(0,0,0,0.87)', secondary: 'rgba(0,0,0,0.54)' },
    },
    components: {
        MuiIconButton: {
            styleOverrides: {
                root: {
                    color: 'inherit !important',
                },
            },
        },
    },
});

const PasswordInput = styled(InputBase)({
    width: '100%',
    minHeight: 46,
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
    paddingLeft: 12,
    paddingRight: 12,
    '& .MuiInputAdornment-root': {
        margin: 0,
        flexShrink: 0,
    },
    '& .MuiInputAdornment-positionStart': {
        marginRight: 12,
    },
    '& .MuiInputAdornment-positionEnd': {
        marginLeft: 12,
    },
    '& .MuiIconButton-root': {
        padding: 6,
    },
    '& .MuiInputBase-input': {
        height: 24,
        flex: 1,
        minWidth: 0,
        width: 'auto',
        padding: '10px 0',
        border: 'none',
        backgroundColor: 'transparent !important',
        boxSizing: 'border-box',
    },
});

const useStyles = makeStyles({
    checkBoxStyle: {
        color: `${satrexRed}!important`,
    },
    passwordRow: {
        width: '100%',
        marginTop: '10px !important',
        alignItems: 'center',
    },
    passwordField: {
        width: '100%',
        marginTop: '18px !important',
    },
    passwordLabel: {
        marginBottom: 8,
        color: (props) => (!props.satrexTheme ? '#cfcddb' : '#7f7f86'),
        textAlign: 'right',
        fontSize: 14,
        paddingRight: 4,
    },
    securityFormWrapper: {
        padding: '0 14px 16px',
        boxSizing: 'border-box',
        '& .MuiFormControl-root': {
            width: '100%',
        },
        '& .MuiInputBase-root': {
            width: '100%',
            border: (props) => `1px solid ${props.satrexTheme ? 'rgba(173,173,173,0.9)' : satrexBorderDarkColor}`,
            borderRadius: 8,
            backgroundColor: (props) => (!props.satrexTheme ? satrexSemiDarkerBlueDarkMode : 'transparent'),
            minHeight: 46,
            boxSizing: 'border-box',
            transition: 'border-color 0.2s, box-shadow 0.2s',
            '&:focus-within': {
                borderColor: `${satrexRed} !important`,
                boxShadow: '0 0 0 0.2rem rgba(250,70,22,0.18) !important',
            },
        },
        '& .MuiInputBase-input': {
            border: 'none !important',
            backgroundColor: 'transparent !important',
            color: (props) => (!props.satrexTheme ? '#ecebef !important' : 'inherit'),
            '&::placeholder': {
                color: (props) => (!props.satrexTheme ? '#9f9cab !important' : 'black'),
            },
        },
        '& .inputLabel': {
            color: (props) => (!props.satrexTheme ? '#cfcddb !important' : 'inherit'),
        },
    },
});

const Schema = Yup.object().shape({
    newPassword: Yup.string().required(('This field is required')).matches(
        /^([A-Za-z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
        'Password can only contain Latin letters and Numbers.',
    ).min(8, ('Password is too short - should be 8 chars minimum and must contain uppercase and lowercase letters.'))
        .matches(/[A-Z]/, ('Password must contain uppercase and lowercase letters.'))
        .matches(/[a-z]/, ('Password must contain uppercase and lowercase letters.'))
        .matches(/[0-9]/, ('Password must contain Numbers.')),
    repeatedPassword: Yup.string().required(('This field is required')).when('newPassword', {
        is: (val) => (!!(val && val.length > 0)),
        then: Yup.string().oneOf(
            [Yup.ref('newPassword')],
            ('Both password need to be the same'),
        ),
    }),
});

export default function () {
    const satrexTheme = useSelector((state) => state.layout.theme);
    const classes = useStyles({ satrexTheme });
    const passwordIconColor = !satrexTheme ? '#cfcddb' : '#7f7f86';
    const [showoldPassword, setShowoldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showRepeatedPassword, setShowRepeatedPassword] = useState(false);
    const [loginStatusOtp, setLoginStatusOtp] = useState(false);
    useSelector((state) => state.user.language);

    const changePassword = async (values) => {
            await changeUserPassword({
                oldPassword: values.oldPassword,
                newPassword: values.newPassword,
            });
    };

    const getOtpStatus = async () => {
        const result = await getLoginByOtpStatus();
            if (result) setLoginStatusOtp(result.isEnable);
    };

    useEffect(() => {
        let isMounted = true;
        if (isMounted) getOtpStatus();
        return () => { isMounted = false; };
    }, []);

    const handleOtp = async () => {
        try {
            const res = loginStatusOtp
                ? await satrexApi().post('/User/DisableLoginByOtp')
                : await satrexApi().post('/User/EnableLoginByOtp');
            const data = res?.data;
            if (data?.isSuccess) setLoginStatusOtp(!loginStatusOtp);
            else if (data?.Errors?.length) {
                data.Errors.forEach((err) => {
                    satrexToast(err.Description, 'error');
                });
            }
        } catch (err) {
            satrexToast(transFn('failedInMission'), 'error');
        }
    };

    const renderPasswordField = ({
        name,
        label,
        value,
        visible,
        onToggle,
        touched,
        error,
        onChange,
    }) => (
        <Grid size={12} className={classes.passwordField}>
            <div className={classes.passwordLabel}>
                <Trans>{label}</Trans>
            </div>
            <FormControl style={{ width: '100%' }}>
                <PasswordInput
                    style={{
                        direction: 'ltr',
                        width: '100%',
                    }}
                    name={name}
                    value={value}
                    type={visible ? 'text' : 'password'}
                    onChange={onChange}
                    startAdornment={(
                        <InputAdornment
                            position="start"
                            style={{
                                color: passwordIconColor,
                                opacity: 0.5,
                                pointerEvents: 'none',
                            }}
                        >
                            <LockIcon fontSize="small" />
                        </InputAdornment>
                    )}
                    endAdornment={(
                        <InputAdornment
                            position="end"
                            style={{
                                color: passwordIconColor,
                            }}
                        >
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={onToggle}
                                onMouseDown={(event) => event.preventDefault()}
                                size="small"
                                type="button"
                                style={{
                                    opacity: 0.6,
                                    padding: 6,
                                }}
                            >
                                {visible ? (
                                    <Visibility fontSize="small" />
                                ) : (
                                    <VisibilityOff fontSize="small" />
                                )}
                            </IconButton>
                        </InputAdornment>
                    )}
                />
            </FormControl>
            <div className="errorDiv" style={{ justifyContent: 'unset' }}>
                {
                    touched
                    && <Trans>{error}</Trans>
                }
            </div>
        </Grid>
    );

    return (
        <ThemeProvider theme={materialTheme}>
        <AnimatedPage>
            <Grid container spacing={2} style={{ marginTop: '20px' }}>
            <Grid
                size={{
                    xs: 12,
                    md: 6
                }}>
                <SatrexCard header="changePassword">
                    <Formik
                        initialValues={{ oldPassword: '', newPassword: '', repeatedPassword: '' }}
                        validationSchema={Schema}
                        onSubmit={changePassword}
                    >
                        {({
 handleChange: handleInputChange, touched, values, errors,
}) => (
                                <Form className={classes.securityFormWrapper}>
                                    <Grid container style={{ marginTop: '10px' }} data-tut="changePassword">
                                        {renderPasswordField({
                                            name: 'oldPassword',
                                            label: 'enterCurrentPassword',
                                            value: values.oldPassword,
                                            visible: showoldPassword,
                                            onToggle: () => setShowoldPassword(!showoldPassword),
                                            touched: touched.oldPassword,
                                            error: errors.oldPassword,
                                            onChange: handleInputChange,
                                        })}
                                        {renderPasswordField({
                                            name: 'newPassword',
                                            label: 'EnterNewPassword',
                                            value: values.newPassword,
                                            visible: showNewPassword,
                                            onToggle: () => setShowNewPassword(!showNewPassword),
                                            touched: touched.newPassword,
                                            error: errors.newPassword,
                                            onChange: handleInputChange,
                                        })}
                                        {renderPasswordField({
                                            name: 'repeatedPassword',
                                            label: 'repeatNewPassword',
                                            value: values.repeatedPassword,
                                            visible: showRepeatedPassword,
                                            onToggle: () => setShowRepeatedPassword(!showRepeatedPassword),
                                            touched: touched.repeatedPassword,
                                            error: errors.repeatedPassword,
                                            onChange: handleInputChange,
                                        })}
                                        <Grid style={{ marginBottom: '10px' }} size={12}>
                                            <Button
                                                className="greenButton"
                                                style={{
                                                    width: '100%',
                                                    height: '45px',
                                                    marginTop: '30px',
                                                    marginBottom: '20px',
                                                }}
                                                type="submit"
                                            >
                                                <Trans>changePassword</Trans>
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Form>
                            )}

                    </Formik>
                </SatrexCard>
            </Grid>
            <Grid
                size={{
                    xs: 12,
                    md: 6
                }}>
                <SatrexCard header="activeTwoFactorIdentification">
                        <Grid
                            data-tut="enableLoginPassword"
                            container
                            style={{
                                padding: '20px',
                                transition: '1s',
                                paddingBottom: '70px',
                                height: 413,
                            }}
                        >
                            <Grid size={12}>
                                <Trans>securityPage1</Trans>
                            </Grid>
                            {/* <Grid xs={12} item style={{ marginTop: "30px" }}> */}
                            {/*  <FormControlLabel */}
                            {/*    control={ */}
                            {/*      <Checkbox */}
                            {/*        checked={googleAuth} */}
                            {/*        classes={{ */}
                            {/*          checked: classes.checkBoxStyle, */}
                            {/*        }} */}
                            {/*      /> */}
                            {/*    } */}
                            {/*    label={transFn("ActivateGoogleAuth")} */}
                            {/*  /> */}
                            {/* </Grid> */}
                            <Grid style={{ marginTop: '10px' }} size={12}>
                                <FormControlLabel
                                    control={(
                                        <Checkbox
                                            checked={loginStatusOtp}
                                            classes={{
                                                checked: classes.checkBoxStyle,
                                            }}
                                            onClick={() => {
                                                handleOtp();
                                            }}
                                        />
                                      )}
                                    label={transFn('EnableLoginSMS')}
                                />
                            </Grid>
                        </Grid>
                </SatrexCard>
            </Grid>
            <Grid size={12}>
                <SatrexCard header="LoginLogoutInformation">
                    <div style={{ padding: '20px' }}>
                        <Trans>securityPageTableLine1</Trans>
                    </div>

                    <ReportTB />
                </SatrexCard>
            </Grid>
            </Grid>
        </AnimatedPage>
        </ThemeProvider>
    );
}
