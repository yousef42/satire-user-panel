import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Button } from '@mui/material';
import {
    Dialog, DialogContent, Paper,
} from '@mui/material';
import { DialogContentText } from '@mui/material';
import InputMask from 'react-input-mask';
import Draggable from 'react-draggable';
import { useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { IconButton } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { satrexApi, satrexApiV3 } from '../../../components/api';
import SatrexInput from '../../../components/SatrexInput';
import Trans, { transFn } from '../../../components/lang';
import {
    satrexDarkerBlueDarkMode,
    satrexGray,
    satrexGreen,
    satrexSemiGray,
} from '../../../../styles/colors';
import ThemeAtrr from '../../../MasterLayout/MasterTheme/ThemeAtrr';
import satrexToast from '../../../components/satrexToast';
import LoadingButton from '../../../components/LoadingButton';
import { LightTooltip } from '../../../components/LightTooltip';

function PaperComponent(props) {
    return (
        <Draggable
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper {...props} />
        </Draggable>
    );
}

const useStyles = makeStyles((theme) => ({
    codeInput: {
        letterSpacing: '3px',
        color: satrexGray,
        textAlign: 'center',
        direction: 'ltr',
    },
    darkCodeInput: {
        letterSpacing: '3px',
        color: 'white',
        textAlign: 'center',
        direction: 'ltr',
    },
    emailInput: {
        textAlign: 'left',
        direction: 'ltr',
        fontFamily: 'HelveticaLt, Arial, sans-serif !important',
        letterSpacing: '0.1px',
    },
    buttonDisabled: {
        backgroundColor: (props) => `${props.satrexTheme ? '#e2e8f0' : 'rgba(255,255,255,0.12)'} !important`,
        color: (props) => `${props.satrexTheme ? '#475569' : '#e5eefc'} !important`,
        opacity: '1 !important',
        '& span': {
            color: (props) => `${props.satrexTheme ? '#475569' : '#e5eefc'} !important`,
        },
    },
}));

export default function ({ setEmailConfirm }) {
    const lang = useSelector((state) => state.user.language);
    const [email, setEmail] = useState('');
    const [emailModalOpen, setEmailModalOpen] = useState(false);
    const [emailSecretCode, setEmailSecretCode] = useState('');
    const satrexTheme = useSelector((state) => state.layout.theme);
    const extraTheme = useSelector((state) => state.layout.extraTheme);
    const isEn = lang === 'EN' || lang === 'gr' || lang === 'fr';
    const classes = useStyles({ satrexTheme });
    const queryCache = useQueryClient();
    // const [saveLoading, setSaveLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const emailVarification = () => {
        satrexApiV3()
            .post('/User/SendEmailVerificationCode', {
                emailAddress: email,
            })
            .then(({ data }) => {
                if (data.isSuccess) {
                    setEmailModalOpen(true);
                } else {
                    data.Errors.forEach((err) => {
                        satrexToast(err.Description, 'error');
                    });
                }
                setLoading(false);
            })
            .catch(() => {
                satrexToast(transFn('An error occurred while sending the validation code. Please try again'), 'error');
                setLoading(false);
            });
    };
    const varifyEmail = async () => {
        const { data } = await satrexApi().post('/User/VerifyEmail', {
            email,
            secretCode: emailSecretCode.replace(/-/g, ''),
        });
        return data;
    };

    const updateEmail = async () => {
        setLoading(true);
        const { data } = await satrexApi().post('/User/UpdateEmail', {
            emailAddress: email,
        });

        return data;
    };

    const getEmail = async () => {
        const { data } = await satrexApi().post('/User/GetEmail');
        return data?.data;
    };

    const getPersonalInfo = async () => {
        const { data } = await satrexApi().post('/PersonalInfo/Get');
        return data?.isSuccess ? data.data : null;
    };

    const userEmail = useQuery('userEmail', getEmail).data;
    const personalInfo = useQuery('personalInfo', getPersonalInfo).data;
    const resolvedEmail = userEmail?.emailAddress || personalInfo?.username || '';

    const updateEmailMutation = useMutation((varify) => updateEmail(varify), {
        onSuccess: (data, varify) => {
            if (data.isSuccess) {
                if (!varify) {
                    satrexToast(transFn('Information successfully saved'), 'success');
                }
                queryCache.setQueryData('userEmail', {
                    ...queryCache.getQueryData('userEmail'),
                    emailAddress: email,
                });
                if (varify) {
                    emailVarification();
                } else {
                    setLoading(false);
                }
            } else {
                data.Errors.forEach((err) => {
                    satrexToast(err.Description, 'error');
                });
                setLoading(false);
            }
        },
        onError: (data) => {
            satrexToast(transFn('failedInMission'), 'error');
            setLoading(false);
        },
    });
    const varifyEmailMutation = useMutation(varifyEmail, {
        onSuccess: (data) => {
            if (data.isSuccess) {
                satrexToast(transFn('Email verified successfully'), 'success');
                setEmailModalOpen(false);
                queryCache.setQueryData('userEmail', {
                    ...queryCache.getQueryData('userEmail'),
                    emailConfirmed: true,
                });
            } else {
                data.Errors.forEach((err) => {
                    satrexToast(err.Description, 'error');
                });
            }
        },
    });

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            if (resolvedEmail) {
                setEmail(resolvedEmail);
                setEmailConfirm(true);
            } else if (userEmail) {
                setEmailConfirm(userEmail.emailConfirmed);
            }
        }
        return () => {
            isMounted = false;
        };
    }, [resolvedEmail, userEmail, setEmailConfirm]);

    return (
        <Grid
            className="satrexDiv pr"
            style={{
                marginTop: '45px',
                paddingRight: '8%',
                paddingLeft: '5%',
                paddingBottom: '45px',
            }}
            container
            spacing={2}
            data-tut="emailValidation"
        >
            <div className="pa saveButtonInEditPersonalInfo">
                <LoadingButton loading={loading}>
                    <LightTooltip
                        title={transFn('save')}
                        aria-label={transFn('save')}
                    >
                        <span>
                            <IconButton
                                disabled
                                onClick={() => {
                                    (email && !loading) ? updateEmailMutation.mutate() : () => {
                                    };
                                }}
                            >
                            <SaveIcon
                                style={{ color: satrexGreen }}
                            />
                            </IconButton>
                        </span>
                    </LightTooltip>
                </LoadingButton>
            </div>
            <Grid size={12}>
                <label
                    style={{
                        backgroundColor: !satrexTheme ? (ThemeAtrr(extraTheme).cardStyle ? ThemeAtrr(extraTheme).cardStyle.backgroundColor : satrexDarkerBlueDarkMode) : 'white',
                        transition: '0.3s',
                        position: 'relative',
                        top: '-77%',
                        left: !isEn ? '5.5%' : 'auto',
                        right: isEn ? '3.5%' : 'auto',
                        paddingLeft: lang === 'EN' ? '0px' : '3%',
                        paddingRight: lang === 'EN' ? '3%' : '0px',
                    }}
                >
                    {' '}
                    <FiberManualRecordIcon
                        style={{
                            width: '0.85em',
                            color: satrexGreen,
                            position: 'relative',
                            top: '6px',
                        }}
                    />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {' '}
                    <span style={{ fontSize: '18px' }}>
            <Trans>email</Trans>
                    </span>
                </label>
            </Grid>
            {userEmail && userEmail.emailConfirmed && (
                <div className="statusGreenBox">
                    <Grid container>
                        <CheckCircleIcon style={{ color: satrexGreen }} />
                        <div
                            style={{
                                padding: '2px',
                                paddingTop: '3px',
                                color: satrexGreen,
                            }}
                        >
                            <Trans>adminAcceptation</Trans>
                        </div>
                    </Grid>
                </div>
            )}
            <Grid
                size={{
                    xs: 12,
                    md: 7
                }}>
                <SatrexInput
                    isDisabled
                    inputValue={resolvedEmail}
                    direction="ltr"
                    inputProps={{
                        title: resolvedEmail,
                    }}
                    classes={{
                        input: classes.emailInput,
                    }}
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                    label={<Trans>email</Trans>}
                />
            </Grid>
            <Grid
                style={{
                    paddingTop: '35px',
                    paddingBottom: '20px',
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: isEn ? 'flex-start' : 'flex-end',
                }}
                size={{
                    xs: 12,
                    md: 5,
                }}
            >
                <Grid container>
                    {/* <Grid item> */}
                    {/*  <Button */}
                    {/*    autoFocus */}

                    {/*    disableElevation */}
                    {/*    className="greenButton" */}
                    {/*    style={{ float: lang === 'EN' ? 'left' : 'right' }} */}
                    {/*    disabled={userEmail?.emailConfirmed} */}
                    {/*    onClick={() => { */}
                    {/*      email ? updateEmailMutation.mutate() : () => {}; */}
                    {/*    }} */}
                    {/*    classes={{ */}
                    {/*      disabled: classes.buttonDisabled, */}
                    {/*    }} */}
                    {/*  > */}
                    {/*    <span style={{ color: satrexGray }}> */}
                    {/*      <Trans>save</Trans> */}
                    {/*    </span> */}
                    {/*  </Button> */}
                    {/* </Grid> */}
                    <div style={{ width: 20 }} />
                    <Grid>
                        <LoadingButton loading={loading}>
                            <Button

                                style={{ float: lang === 'EN' ? 'left' : 'right' }}
                                onClick={() => ((email && !loading) ? updateEmailMutation.mutate(true) : () => {
                                })}
                                disabled
                                disableElevation
                                classes={{
                                    disabled: classes.buttonDisabled,
                                }}
                                className="greenButton"
                            >
              <span>
                {' '}
                  <Trans>ReviewRequest</Trans>
              </span>
                            </Button>
                        </LoadingButton>

                    </Grid>
                </Grid>
            </Grid>
            <Dialog
                open={emailModalOpen}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
                className={satrexTheme ? 'appContent' : 'appContentDark'}
            >
                <DialogContent>
                    <DialogContentText>
            <span>
              <Trans>varifyEmailCode</Trans>
            </span>
                        <div style={{ width: '100%', marginTop: '20px' }}>
                            <InputMask
                                mask="*-*-*-*-*-*"
                                formatChars={{ '*': '[0-9]' }}
                                maskChar=""
                                maskPlaceholder=""
                                value={emailSecretCode}
                                onChange={(e) => {
                                    setEmailSecretCode(e.target.value);
                                }}
                            >
                                {
                                    (inputProps) => (
                                        <SatrexInput
                                            style={{ textAlign: 'center', color: 'white' }}
                                            classes={{
                                                input: satrexTheme
                                                    ? classes.codeInput
                                                    : classes.darkCodeInput,
                                            }}
                                            {...inputProps}
                                            label="validationCode"
                                        />
                                    )
                                }
                            </InputMask>
                            <Grid container>
                                <Grid size={6}>
                                    <Button
                                        className="grayButton"
                                        onClick={() => {
                                            setEmailSecretCode('');
                                            setEmailModalOpen(false);
                                        }}
                                        style={{ width: '100%', marginTop: '10px' }}
                                    >
                                      <span>
                                        <Trans>cancel</Trans>
                                      </span>
                                    </Button>

                                </Grid>
                                <Grid size={6}>
                                    <Button
                                        className="greenButton"
                                        onClick={() => {
                                            varifyEmailMutation.mutate();
                                        }}
                                        style={{ width: '100%', marginTop: '10px' }}
                                    >
                                    <span>
                                      <Trans>send</Trans>
                                    </span>
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </Grid>
    );
}
