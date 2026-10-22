import React, { useEffect, useState } from 'react';
import InputMask from 'reactMask';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { withStyles } from '@mui/styles';
import { alpha } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { InputBase } from '@mui/material';
import LoadingButton from '../../../../components/LoadingButton';
import Trans, { transFn } from '../../../../components/lang';
import { satrexGray, satrexSemiGray } from '../../../../../styles/colors';
import SatrexInput from '../../../../components/SatrexInput';

const BootstrapInput = withStyles((theme) => ({
    root: {
        borderRadius: 10,
        position: 'relative',
        border: '1px solid #b8c0cc !important',
        backgroundColor: '#ffffff !important',
        width: '100%',
        minHeight: 46,
        padding: '0 12px',
        boxSizing: 'border-box',
        '&.Mui-focused': {
            borderColor: `${theme.palette.primary.main} !important`,
            boxShadow: `${alpha(theme.palette.primary.main, 0.2)} 0 0 0 0.2rem`,
        },
    },
    input: {
        fontSize: '15px !important',
        height: 'auto',
        minHeight: 44,
        color: `${satrexGray} !important`,
        width: '100% !important',
        padding: '9px 8px',
        border: 'none',
        boxSizing: 'border-box',
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

const formatContactForMessage = (contact) => {
    const value = (contact || '').trim();
    if (!value) return '';
    if (value.includes('@')) return value;
    const digits = value.replace(/\D/g, '');
    if (digits.length <= 4) return value;
    return `0${digits.slice(-10)}`;
};

const useStyles = makeStyles((theme) => ({
    smsCodeInput: {
        '& input': {
            textAlign: 'center',
            letterSpacing: '3px',
        },
    },
    buttonDisabled: {
        backgroundColor: `${satrexSemiGray} !important`,
    },
    referralCode: {
        textAlign: 'center',
        letterSpacing: '3px',
    },
    root: {
        width: '100%',
        textAlign: 'center',
    },
    authCodeTitle: {
        color: '#212121',
        marginTop: 4,
        marginBottom: 16,
        fontSize: 26,
        fontWeight: 700,
        textAlign: 'center',
        width: '100%',
        lineHeight: 1.35,
    },
    verificationMessage: {
        fontSize: 14,
        lineHeight: 1.75,
        color: '#616161',
        marginBottom: 20,
        padding: '0 12px',
        textAlign: 'center',
        direction: (props) => (props.isEn ? 'ltr' : 'rtl'),
    },
    contactHighlight: {
        fontWeight: 600,
        color: '#424242',
        direction: 'ltr',
        display: 'inline-block',
        unicodeBidi: 'plaintext',
    },
    formFieldWrap: {
        width: '90%',
        margin: '0 auto',
    },
    codeInputWrap: {
        marginBottom: 12,
        '& > span': {
            display: 'block',
            width: '100%',
        },
    },
    referralWrap: {
        marginBottom: 50,
        direction: (props) => (props.isEn ? 'ltr' : 'rtl'),
    },
    timerText: {
        margin: '8px 0 16px',
        fontSize: 14,
        color: '#757575',
    },
}));
export default function (props) {
    const lang = useSelector((state) => state.user.language);
    const isEn = lang === 'EN' || lang === 'gr' || lang === 'fr';
    const [smsSecretCode, setSmsSecretCode] = useState(false);
    const [enableButton, setEnableButton] = useState(true);
    const [timer, setTimer] = useState('');
    const classes = useStyles({ isEn });

    const handleFreshTimer = () => {
        const countDownDate = new Date(new Date().getTime() + 3 * 60000).getTime();
        setEnableButton(true);
        const x = setInterval(() => {
            const now = new Date().getTime();
            const distance = countDownDate - now;
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            // (minutes + "m " + seconds + "s ")
            setTimer(`${minutes}:${seconds}`);
            if (distance < 0) {
                setEnableButton(false);
                setTimer(' ');
                clearInterval(x);
            }
        }, 1000);
    };

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            handleFreshTimer();
        }
        return () => {
            isMounted = false;
        };
    }, []);

    const contactDisplay = formatContactForMessage(props.email);

    return (
        <div className={classes.root}>
            <h2 className={classes.authCodeTitle}>
                <Trans>EnterAuthCode</Trans>
            </h2>
            <p className={classes.verificationMessage}>
                {lang === 'FA' ? (
                    <>
                        کد تایید به{' '}
                        <span className={`${classes.contactHighlight} ${isEn ? 'enNum' : ''}`}>
                            {contactDisplay}
                        </span>
                        {' '}ارسال گردید
                    </>
                ) : (
                    <>
                        <Trans>codeSentToemail</Trans>
                        {' '}
                        <span className={`${classes.contactHighlight} ${isEn ? 'enNum' : ''}`}>
                            {contactDisplay}
                        </span>
                    </>
                )}
            </p>
            <div className={`${classes.formFieldWrap} ${classes.codeInputWrap}`}>
                <InputMask
                    mask="9-9-9-9-9-9"
                    disabled={false}
                    maskChar=" "
                    onChange={(e) => {
                        props.setValue(e.target.value);
                    }}
                >
                    {() => (
                        <BootstrapInput
                            id="bootstrap-input"
                            style={{ direction: 'ltr', width: '100%' }}
                            className={`codeInput ${classes.smsCodeInput}`}
                        />
                    )}
                </InputMask>
            </div>
            {enableButton && (
                <p className={classes.timerText}>
                    <Trans>ResendCodeUp</Trans>
                    {' '}
                    <span className={isEn ? 'enNum' : ''}>{timer}</span>
                </p>
            )}
            {!enableButton && (
                <p
                    className={classes.timerText}
                    onClick={() => {
                        props.tryAgain();
                        handleFreshTimer();
                    }}
                    style={{ color: '#5c6bc0', cursor: 'pointer' }}
                >
                    <Trans>resend</Trans>
                </p>
            )}

            <div className={`${classes.formFieldWrap} ${classes.referralWrap} loginInput`}>
                <SatrexInput
                    label={transFn('Referral code Or Invitation Code')}
                    inputValue={props.refralCode}
                    onChange={(e) => props.setRefralCode(e.target.value)}
                    classes={{
                        input: classes.referralCode,
                    }}
                />
            </div>

            <LoadingButton loading={props.loading}>
                <Button
                    variant="contained"
                    color="primary"
                    disableElevation
                    style={{ color: 'white' }}
                    className="submitButton"
                    type="submit"
                    onClick={props.action}
                    classes={{
                        disabled: classes.buttonDisabled,
                    }}
                    disabled={props.loading}
                >
                    <Trans>continue</Trans>
                </Button>
            </LoadingButton>
        </div>
    );
}
