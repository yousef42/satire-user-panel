import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {
    Dialog,
    DialogContent,
    FormControlLabel,
    Paper,
    Radio,
} from '@mui/material';
import { withStyles } from '@mui/styles';
import { IconButton } from '@mui/material';
import { ThemeProvider } from '@mui/material';

import moment from 'moment';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { createTheme, alpha } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { InputBase } from '@mui/material';
import starkString from 'starkstring';
import { DialogContentText } from '@mui/material';
import InputMask from 'react-input-mask';
import Draggable from 'react-draggable';
import { DropzoneArea } from '../../../components/DropzoneArea';
import { useTour } from '@reactour/tour';
import SaveIcon from '@mui/icons-material/Save';
import jMoment from 'jalali-moment';
import LoadingButton from '../../../components/LoadingButton';
import ThemeAtrr from '../../../MasterLayout/MasterTheme/ThemeAtrr';
import ConvertDate from '../../../components/convertDate';
import { satrexApi } from '../../../components/api';
import SatrexInput from '../../../components/SatrexInput';
import Trans, { transFn } from '../../../components/lang';
import {
    satrexBlack,
    satrexBorderDarkColor,
    satrexDarkerBlueDarkMode,
    satrexGray,
    satrexGreen,
    satrexRed,
    satrexSemiDarkerBlueDarkMode,
    satrexSemiGray,
    satrexWhite,
} from '../../../../styles/colors';
import tourLoader from '../../../../utils/helpers/tourLoader';
import satrexToast from '../../../components/satrexToast';
import { LightTooltip } from '../../../components/LightTooltip';
import SatrexDatePicker from '../../../components/satrexDatePicker';

const useStyles = makeStyles((theme) => ({
    radioChecked: {
        '& div': {
            color: `${satrexRed}!important`,
        },
    },
    radioLabel: {
        margin: 0,
    },
    inputLabel: {
        left: 'auto !important',
        fontSize: '13px',
    },
    shrinkLabel: {
        transform: 'translate(0, 1.5px) scale(1)',
    },
    buttonDisabled: {
        backgroundColor: `${satrexSemiGray} !important`,
    },
    countryButton: {
        borderRadius: 8,
        position: 'relative',
        backgroundColor: 'rgba(136,136,161,0.09) !important',
        border: '1px solid #d6d6d6',
        fontSize: 16,
        height: 47,
        width: '100%',
        padding: '10px 12px',
        '&:focus': {
            boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
            borderColor: theme.palette.primary.main,
        },
    },
    enInput: {
        fontFamily: 'enNum !important',
        textAlign: 'center',
        '&::placeholder': {
            textAlign: 'left',
        },
    },
    faInput: {
        fontFamily: 'faNum !important',
        '&::placeholder': {
            textAlign: 'left',
        },
    },
    dropzoneStyleLight: {
        backgroundColor: 'white',
    },
    dropzoneStyleDark: {
        backgroundColor: satrexSemiDarkerBlueDarkMode,
        borderColor: '#d5d5d5 !important',
    },
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
    },
}));
const faDatepickerTheme = createTheme({
    overrides: {
        MuiInputBase: {
            input: {
                fontFamily: 'faNum !important',
            },
        },
        MuiPickersToolbar: {
            toolbar: {
                backgroundColor: satrexGreen,
            },
        },
        MuiPickersCalendarHeader: {
            switchHeader: {
                direction: 'ltr',
            },
        },
        MuiPickersToolbarText: {
            toolbarBtnSelected: {
                color: `${satrexWhite}!important`,
            },
            toolbarTxt: {
                color: `${satrexWhite}!important`,
            },
        },
        MuiIconButton: {
            label: {
                color: `${satrexBlack}!important`,
            },
        },
        MuiPickersDay: {
            daySelected: {
                '& span': {
                    '& p': {
                        color: `${satrexWhite}!important`,
                    },
                },
                '&:hover': {
                    backgroundColor: satrexGreen,
                },
                backgroundColor: satrexGreen,
            },
        },
        MuiButton: {
            label: {
                color: `${satrexGreen}!important`,
            },
        },
    },
});
const enDatepickerTheme = createTheme({
    overrides: {
        MuiInputBase: {
            input: {
                fontFamily: 'enNum !important',
            },
        },
        MuiPickersToolbar: {
            toolbar: {
                backgroundColor: satrexGreen,
            },
        },
        MuiPickersCalendarHeader: {
            switchHeader: {
                direction: 'ltr',
            },
        },
        MuiPickersToolbarText: {
            toolbarBtnSelected: {
                color: `${satrexWhite}!important`,
            },
            toolbarTxt: {
                color: `${satrexWhite}!important`,
            },
        },
        MuiIconButton: {
            label: {
                color: `${satrexBlack}!important`,
            },
        },
        MuiPickersDay: {
            daySelected: {
                '& span': {
                    '& p': {
                        color: `${satrexWhite}!important`,
                    },
                },
                '&:hover': {
                    backgroundColor: satrexGreen,
                },
                backgroundColor: satrexGreen,
            },
        },
        MuiButton: {
            label: {
                color: `${satrexGreen}!important`,
            },
        },
    },
});

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

const dropzoneTheme = createTheme({
    overrides: {
        MuiDropzonePreviewList: {
            removeButton: {
                right: 'auto',
                left: '2px',
                top: '-20px',
                '& span': {
                    color: 'red !important',
                },
            },
        },
    },
});

export default function ({
                             personalImagePreview,
                             handlePersonalImagePreview,
                             nationalCardImagePreview,
                             nationalCardPreview,
                             nationalCardImage,
                             personalImage,
                             setNationalCardPreview,
                             setPersonalImagePreview,
                             setPersonalInfoConfirm,
                         }) {
    const classes = useStyles();
    const lang = useSelector((state) => state.user.language);
    const satrexTheme = useSelector((state) => state.layout.theme);
    const extraTheme = useSelector((state) => state.layout.extraTheme);
    const isEn = lang === 'EN' || lang === 'gr' || lang === 'fr';
    const [gender, setGender] = useState('Male');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [nationalId, setNationalId] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [lastConfirmationType, setLastConfirmationType] = useState(null);
    const [datePickerShow, setDatePickerShow] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [ModalOpen, setModalOpen] = useState(false);
    const [infoModalOpen, setInfoModalOpen] = useState(false);
    const [phoneSecretCode, setPhoneSecretCode] = useState('');
    const [sendInfoLoading, setSendInfoLoading] = useState(false);
    const [varifyInfoLoading, setVarifyInfoLoading] = useState(false);
    const [finotekTry, setFinotekTry] = useState(null);
    const [finotekFailed, setFinotekFailed] = useState(false);
    const queryCache = useQueryClient();
    const { setIsOpen, setSteps } = useTour();
    const queryClient = useQueryClient();
    const [saveLoading, setSaveLoading] = useState(false);



    const getPersonalInfo = async () => {
        const { data } = await satrexApi().post('/PersonalInfo/Get');
        tourLoader(setIsOpen, setSteps, 'edit-personal-info');
        if (!data.isSuccess) {
            return null;
        }
        return data.data;
    };
    const personalInfo = useQuery('personalInfo', getPersonalInfo).data;

    const mergePersonalInfoCache = (patch) => {
        queryCache.setQueryData('personalInfo', (current = {}) => ({
            ...current,
            ...patch,
        }));
    };

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            if (personalInfo) {
                setPersonalInfoConfirm(
                    personalInfo.lastConfirmationType === 'Accepted'
                    || personalInfo.lastConfirmationType === 'VerifiedBySystem',
                );
            }
        }
        return () => {
            isMounted = false;
        };
    }, [personalInfo]);


    const getUserPhotos = () => {
        satrexApi()
            .post('/UserImage/Get')
            .then((data) => {
                if (data.data.isSuccess) {
                    if (data.data.data.nationalCardImageAddress) {
                        setNationalCardPreview(data.data.data.nationalCardImageAddress);
                    } else setNationalCardPreview(null);
                    if (data.data.data.personalImageAddress) {
                        setPersonalImagePreview(data.data.data.personalImageAddress);
                    } else setPersonalImagePreview(null);
                    if (
                        data.data.data.lastConfirmationType !== 'Editable'
                        && data.data.data.lastConfirmationType !== 'Rejected'
                    ) {
                    }
                } else {
                    data.data.Errors.forEach((err) => {
                        satrexToast(err.Description, 'error');
                    });
                }
            });
    };
    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            getUserPhotos();
            if (personalInfo) {
                setGender(personalInfo.gender || 'Unknown');
                setFirstName(personalInfo.firstName || '');
                setLastName(personalInfo.lastName || '');
                setFinotekTry(
                    personalInfo.externalIdentityAuthorizationRequestCounter,
                );
                setNationalId(personalInfo.nationalId || '');
                setBirthdate(personalInfo.birthDate || '');
                setLastConfirmationType(personalInfo.lastConfirmationType || 'Editable');
                setPhoneNumber(personalInfo.username || '');
            }
        }
        return () => {
            isMounted = false;
        };
    }, [personalInfo]);

    const updateInfo = async (showNotif=true) => {
        setSaveLoading(true);
        const { data } = await satrexApi().post('/PersonalInfo/Update', {
            firstName,
            lastName,
            nationalId,
            citizenId: null,
            isForeignCitizen: false,
            phone: null,
            birthdate: starkString(birthdate).englishNumber().toString(),
            gender,
        });
        if (data.isSuccess) {
            if(showNotif)
            satrexToast(transFn('Information successfully saved'), 'success');
            setSendInfoLoading(false);
            setInfoModalOpen(false);
        } else {
            data.Errors.forEach((err) => {
                setSendInfoLoading(false);
                setInfoModalOpen(false);
            });
        }

        return data;
    };

    const cancelRequest = () => {
        satrexApi()
            .post('/PersonalInfo/CancelConfirmRequest')
            .then((data) => {
                if (data.data.isSuccess) {
                    satrexToast(transFn('The request to verify personal information was successfully canceled'), 'success');
                } else {
                    data.data.Errors.forEach((err) => {
                        satrexToast(err.Description, 'error');
                    });
                }
            });
    };
    const finalSubmit = async () => {
        setVarifyInfoLoading(true);

        try {
            const { data } = await satrexApi().post(
                '/ExternalAuthorization/VerifyOtpForIdentityAuthorization',
                {
                    otp: phoneSecretCode.replace(/-/g, ''),
                },
            );
            return data;
        } catch {
            setFinotekFailed(true);
            setVarifyInfoLoading(true);
            setModalOpen(false);
            setInfoModalOpen(true);
        }
    };

    const personalInfoReq = () => {
        satrexApi()
            .post('/PersonalInfo/SetConfirmRequest')
            .then((data) => {
                if (data.data.isSuccess) {
                    satrexToast(transFn('The review request was successfully sent to the admin'), 'success');
                    queryClient.invalidateQueries('personalInfo');
                    setInfoModalOpen(false);
                } else {
                    data.data.Errors.forEach((err) => {
                        satrexToast(err.Description, 'error');
                    });
                }
            });
    };
    const uploadPersonalImage = () => {
        const formData = new FormData();
        formData.append('file', personalImage);

        satrexApi()
            .post('/UserImage/UploadPersonalImage', formData)
            .then((data) => {
                if (data.data.isSuccess) {
                    satrexToast(transFn('Personal image uploaded successfully'), 'success');
                    uploadNationalCardImage();
                } else {
                    data.data.Errors.forEach((err) => {
                        satrexToast(err.Description, 'error');
                    });
                }
            });
    };
    const uploadNationalCardImage = () => {
        const formData = new FormData();
        formData.append('file', nationalCardImage);

        satrexApi()
            .post('/UserImage/UploadNationalCardImage', formData)
            .then((data) => {
                if (data.data.isSuccess) {
                    satrexToast(transFn('National card image uploaded successfully'), 'success');
                    personalInfoReq();
                } else {
                    data.data.Errors.forEach((err) => {
                        satrexToast(err.Description, 'error');
                    });
                }
            });
    };

    const authorizating = async () => {
        setSendInfoLoading(true);
        updatePersonalInfo.mutate(true);
    };
    const adminCheck = async () => {
        // setSendInfoLoading(true);
        // if (!personalImage) {
        //     setSendInfoLoading(false);
        //     satrexToast(transFn('Please attach your personal photo'), 'error');
        // } else if (!nationalCardImage) {
        //     setSendInfoLoading(false);
        //     satrexToast(transFn('Please attach a photo of your national card'), 'error');
        // } else {
        //     updatePersonalInfo.mutate('admincheck');
        // }
        updatePersonalInfo.mutate('admincheck');

    };

    const updatePersonalInfo = useMutation(
        async (authorize) => await updateInfo(authorize !== 'admincheck'),
        {

            onSuccess: async (data, authorize) => {
                if (data.isSuccess) {
                    mergePersonalInfoCache({
                        firstName,
                        lastName,
                        nationalId,
                        citizenId: null,
                        isForeignCitizen: false,
                        phone: null,
                        birthDate: birthdate,
                        gender,
                    });
                    if (authorize === 'admincheck') {
                        await personalInfoReq();
                        // uploadPersonalImage();
                    } else if (authorize) {
                        const { data } = await satrexApi().post(
                            '/ExternalAuthorization/SendSmsForIdentityAuthorization',
                        );
                        if (data.isSuccess) {
                            setModalOpen(true);
                            setInfoModalOpen(false);
                            setSendInfoLoading(false);
                        } else {
                            setVarifyInfoLoading(false);
                            data.Errors.forEach((err) => {
                                satrexToast(err.Description, 'error');
                            });
                        }
                    }
                } else {
                    data.Errors.forEach((err) => {
                        satrexToast(err.Description, 'error');
                    });
                }
                setSaveLoading(false);
                setVarifyInfoLoading(false);
                setSaveLoading(false)
            },
            onError: (_, authorize) => {
                if (authorize !== 'admincheck') {
                    setFinotekFailed(true);
                }
                setSendInfoLoading(false);
                setVarifyInfoLoading(false);
                setSaveLoading(false)
                satrexToast(transFn('failedInMission'), 'error');
            },
        },
    );
    const confirmRequest = useMutation(finalSubmit, {
        onError: (error) => {
            setSendInfoLoading(false);
            satrexToast(error.response.data.description, 'error');
            setVarifyInfoLoading(false);
        },
        onSuccess: (data) => {
            if (data.isSuccess) {
                setModalOpen(false);
                setVarifyInfoLoading(false);
                mergePersonalInfoCache({
                    lastConfirmationType: 'VerifiedBySystem',
                });
                setModalOpen(false);
            } else {
                data.Errors.forEach((err) => {
                    satrexToast(err.Description, 'error');
                });
                setModalOpen(false);
                setInfoModalOpen(true);
                setVarifyInfoLoading(false);
                setPhoneSecretCode(null);
                setFinotekTry(finotekTry + 1);
            }
        },

    });

    const cancelRequestMutation = useMutation(cancelRequest, {
        onError: () => {
            setSendInfoLoading(false);
            setVarifyInfoLoading(false);
            satrexToast(transFn('failedInMission'), 'error');
        },
        onSuccess: () => {
            mergePersonalInfoCache({
                lastConfirmationType: 'Editable',
            });
        },
    });

    const handleBirthDateChange = (ins, date) => {
        if (date && date?.replace(/\_/g, '').length === 10) {
            setBirthdate(ConvertDate(starkString(date.replace(/\//g, '-')).englishNumber().toString()));
        } else if (ins && date) {
            setBirthdate(ConvertDate(starkString(ins.format('jYYYY-jMM-jDD')).englishNumber().toString()));
        }
    };
    return (
        // <div></div>
        <Grid
            className="satrexDiv pr"
            style={{ marginTop: '20px', paddingRight: '8%', paddingLeft: '5%' }}
            container
            spacing={2}
            data-tut="personalInfo"
        >
            <div className="pa saveButtonInEditPersonalInfo">
                <LoadingButton loading={saveLoading}>
                    <LightTooltip
                        title={transFn('save')}
                        aria-label={transFn('save')}
                    >
                        <span>
                            <IconButton
                                disabled={!firstName
                                    || saveLoading
                                    || !lastName
                                    || !nationalId
                                    || !birthdate
                                    || gender === 'Unknown'
                                    || (lastConfirmationType !== 'Editable'
                                        && lastConfirmationType !== 'Rejected')}
                                onClick={() => {
                                    firstName
                                    && lastName
                                    && nationalId
                                    && birthdate
                                    && gender !== 'Unknown'
                                    && (lastConfirmationType === 'Editable'
                                        || lastConfirmationType === 'Rejected')
                                        ? updatePersonalInfo.mutate()
                                        : () => {
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
            <Trans>personalInfo</Trans>
                    </span>
                </label>
            </Grid>
            <Grid size={12}>
                {lastConfirmationType === 'Rejected' && (
                    <div className="statusRedBox">
                        <Grid container>
                            <CheckCircleIcon style={{ color: satrexRed }} />
                            <div
                                style={{
                                    padding: '2px',
                                    paddingTop: '3px',
                                    color: satrexRed,
                                }}
                            >
                                <Trans>adminRejection</Trans>
                            </div>
                        </Grid>
                    </div>
                )}
                {lastConfirmationType === 'VerifiedBySystem' && (
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
                                <Trans>ApprovedBySystem</Trans>
                            </div>
                        </Grid>
                    </div>
                )}
                {lastConfirmationType === 'Accepted' && (
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
                {lastConfirmationType === 'ConfirmRequest' && (
                    <div className="statusGrayBox">
                        <Grid container>
                            <CheckCircleIcon
                                style={{
                                    color: satrexTheme ? satrexGray : 'rgba(255,255,255,0.6)',
                                }}
                            />
                            <div
                                style={{
                                    padding: '2px',
                                    paddingTop: '3px',
                                    color: satrexTheme ? satrexGray : 'rgba(255,255,255,0.6)',
                                }}
                            >
                                <Trans>adminPending</Trans>
                            </div>
                        </Grid>
                    </div>
                )}
            </Grid>
            <Grid style={{ marginTop: '-41px' }} size={12}>
                <Grid container>
                    <Grid
                        size={{
                            xs: 12,
                            md: 4
                        }}>
                        <Grid container style={{ paddingTop: '7%' }}>
                            <Grid size={6}>
                                <FormControlLabel
                                    value="Female"
                                    control={(
                                        <Radio
                                            checked={gender === 'Female'}
                                            onChange={
                                                lastConfirmationType === 'Editable'
                                                || lastConfirmationType === 'Rejected'
                                                    ? () => setGender('Female')
                                                    : () => {
                                                    }
                                            }
                                            value="a"
                                            name="radio-button-demo"
                                            color="primary"
                                            classes={{
                                                checked: classes.radioChecked,
                                            }}
                                        />
                                    )}
                                    label={(
                                        <div style={{ fontSize: '13px' }}>
                                            <Trans>woman</Trans>
                                        </div>
                                    )}
                                    classes={{
                                        root: classes.radioLabel,
                                    }}
                                />
                            </Grid>
                            <Grid size={6}>
                                <FormControlLabel
                                    value="Male"
                                    control={(
                                        <Radio
                                            checked={gender === 'Male'}
                                            onChange={
                                                lastConfirmationType === 'Editable'
                                                || lastConfirmationType === 'Rejected'
                                                    ? () => setGender('Male')
                                                    : () => {
                                                    }
                                            }
                                            value="a"
                                            name="radio-button-demo"
                                            color="primary"
                                            classes={{
                                                checked: classes.radioChecked,
                                            }}
                                        />
                                    )}
                                    label={(
                                        <div style={{ fontSize: '13px' }}>
                                            <Trans>man</Trans>
                                        </div>
                                    )}
                                    classes={{
                                        root: classes.radioLabel,
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid size={8} />
                </Grid>
            </Grid>
            <Grid
                size={{
                    xs: 12,
                    sm: 12,
                    md: 4
                }}>
                <SatrexInput
                    inputValue={firstName}
                    inputProps={{
                        maxLength: 20,
                    }}
                    isDisabled={
                        lastConfirmationType !== 'Editable'
                        && lastConfirmationType !== 'Rejected'
                    }
                    onChange={(e) => {
                        setFirstName(e.target.value);
                    }}
                    isPersian={!isEn}
                    label={<Trans>firstName</Trans>}
                />
            </Grid>
            <Grid
                size={{
                    xs: 12,
                    sm: 12,
                    md: 4
                }}>
                <SatrexInput
                    inputValue={lastName}
                    inputProps={{
                        maxLength: 25,
                    }}
                    isDisabled={
                        lastConfirmationType !== 'Editable'
                        && lastConfirmationType !== 'Rejected'
                    }
                    onChange={(e) => setLastName(e.target.value)}
                    isPersian={!isEn}
                    label={<Trans>lastName</Trans>}
                />
            </Grid>
            <Grid
                size={{
                    xs: 12,
                    sm: 12,
                    md: 4
                }}>
                <SatrexInput
                    pattern="[0-9]*"
                    direction="ltr"
                    inputProps={{
                        maxLength: 10,
                    }}
                    classes={{ input: isEn ? classes.enInput : classes.faInput }}
                    inputValue={nationalId}
                    isNumber
                    isDisabled={
                        lastConfirmationType !== 'Editable'
                        && lastConfirmationType !== 'Rejected'
                    }
                    onChange={(e) => setNationalId(e.target.value.replace(/\D/, ''))}
                    label={<Trans>nationalId</Trans>}
                />
            </Grid>
            <Grid
                size={{
                    xs: 12,
                    sm: 12,
                    md: 4
                }}>
                <label htmlFor="cardButton" className="inputLabel">
                    <Trans>birthDate</Trans>
                </label>
                <SatrexDatePicker
                    disabled={lastConfirmationType !== 'Editable' && lastConfirmationType !== 'Rejected'}
                    date={birthdate}
                    handleChangeDate={handleBirthDateChange}
                    datePickerShow={datePickerShow}
                    setDatePickerShow={setDatePickerShow}
                />
                {/* {lastConfirmationType !== 'Editable' */}
                {/*    && lastConfirmationType !== 'Rejected' && ( */}
                {/*        <satrexInput */}
                {/*            classes={{ input: isEn ? classes.enInput : classes.faInput }} */}
                {/*            inputValue={birthdate} */}
                {/*            isDisabled */}
                {/*            label={<Trans>birthDate</Trans>} */}
                {/*        /> */}
                {/*    )} */}
                {/* {(lastConfirmationType === 'Editable' */}
                {/*    || lastConfirmationType === 'Rejected') && ( */}
                {/*    <Grid container> */}
                {/*        <Grid xs={12} item> */}
                {/*            <satrexInput */}
                {/*                classes={{ input: isEn ? classes.enInput : classes.faInput }} */}
                {/*                onChange={(e) => setBirthdate(e.target.value)} */}
                {/*                inputValue={birthdate} */}
                {/*                label={<Trans>birthDate</Trans>} */}
                {/*            /> */}
                {/*        </Grid> */}
                {/*        <Grid */}
                {/*            item */}
                {/*            style={{ */}
                {/*                width: '0px', */}
                {/*                position: 'relative', */}
                {/*                left: isEn ? 'unset' : '45px', */}
                {/*                right: !isEn ? 'unset' : '45px', */}
                {/*                top: '22px', */}
                {/*            }} */}
                {/*        > */}
                {/*            <IconButton */}
                {/*                onClick={() => { */}
                {/*                    setDatePickerShow(true); */}
                {/*                }} */}
                {/*                color="primary" */}
                {/*                aria-label="add to shopping cart" */}
                {/*            > */}
                {/*                <EventIcon /> */}
                {/*            </IconButton> */}
                {/*        </Grid> */}
                {/*    </Grid> */}
                {/* )} */}
            </Grid>
            <Grid
                size={{
                    xs: 12,
                    sm: 12,
                    md: 4
                }}>
                <SatrexInput
                    direction="ltr"
                    classes={{ input: isEn ? classes.enInput : classes.faInput }}
                    isDisabled
                    inputValue={phoneNumber}
                    label={<Trans>email</Trans>}
                />
            </Grid>
            <Grid size={4} />
            <Grid style={{ paddingTop: '15px', paddingBottom: '20px' }} size={12}>
                {lastConfirmationType !== 'ConfirmRequest' && (
                    <Grid container>
                        {/*        <Grid item> */}
                        {/*            <Button */}
                        {/*                autoFocus */}
                        {/*                onClick={() => { */}
                        {/*                    firstName */}
                        {/*                    && lastName */}
                        {/*                    && nationalId */}
                        {/*                    && birthdate */}
                        {/*                    && gender !== 'Unknown' */}
                        {/*                    && (lastConfirmationType === 'Editable' */}
                        {/*                        || lastConfirmationType === 'Rejected') */}
                        {/*                        ? updatePersonalInfo.mutate() */}
                        {/*                        : () => { */}
                        {/*                        }; */}
                        {/*                }} */}
                        {/*                className="greenButton" */}
                        {/*                disabled={!firstName */}
                        {/*                    || !lastName */}
                        {/*                    || !nationalId */}
                        {/*                    || !birthdate */}
                        {/*                    || gender === 'Unknown' */}
                        {/*                    || (lastConfirmationType !== 'Editable' */}
                        {/*                        && lastConfirmationType !== 'Rejected')} */}
                        {/*                classes={{ */}
                        {/*                    disabled: classes.buttonDisabled, */}
                        {/*                }} */}
                        {/*                style={{ float: lang === 'EN' ? 'left' : 'right' }} */}

                        {/*            > */}
                        {/* <span style={{ color: satrexGray }}> */}
                        {/*  <Trans>save</Trans> */}
                        {/* </span> */}
                        {/*            </Button> */}
                        {/*        </Grid> */}
                        {/*        <div style={{ width: 20 }} /> */}
                        <Grid>
                            <Button
                                style={{ float: lang === 'EN' ? 'left' : 'right' }}
                                onClick={
                                    firstName
                                    && lastName
                                    && nationalId
                                    && birthdate
                                    && gender !== 'Unknown'
                                    && (lastConfirmationType === 'Editable'
                                        || lastConfirmationType === 'Rejected')
                                        ? () => {
                                            if (!/^[\u0600-\u06FF\s]+$/.test(firstName) && !isEn) {
                                                satrexToast(transFn('The value of the firstname must be Persian'), 'error');
                                                return false;
                                            }
                                            if (!/^[\u0600-\u06FF\s]+$/.test(lastName) && !isEn) {
                                                satrexToast(transFn('The value of the lastname must be Persian'), 'error');
                                                return false;
                                            }
                                            setInfoModalOpen(true);
                                        }
                                        : () => {
                                        }
                                }
                                disableElevation
                                className="greenButton"
                                disabled={!firstName
                                    || !birthdate
                                    // || !jMoment(typeof birthdate === 'string' ? birthdate : birthdate.format('jYYYY/jM/jD'), 'jYYYY/jM/jD').isValid()
                                    || !lastName
                                    || !nationalId
                                    || gender === 'Unknown'
                                    || (lastConfirmationType !== 'Editable'
                                        && lastConfirmationType !== 'Rejected')}
                                classes={{
                                    disabled: classes.buttonDisabled,
                                }}
                            >
                <span>
                  {' '}
                    <Trans>ReviewRequest</Trans>
                </span>
                            </Button>
                        </Grid>
                    </Grid>
                )}
                {lastConfirmationType === 'ConfirmRequest' && (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            cancelRequestMutation.mutate();
                        }}
                        disableElevation
                        style={{
                            color: 'white',
                            float: lang === 'EN' ? 'left' : 'right',
                            width: 'fit-content',
                            minWidth: 300,
                        }}
                        className="greenButton"
                        type="button"
                    >
                        <Trans>cancelRequest</Trans>
                    </Button>
                )}
            </Grid>
            <Dialog
                open={ModalOpen}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogContent>
                    <DialogContentText>
            <span>
              <Trans>The code was sent to you</Trans>
            </span>
                        <div style={{ width: '100%', marginTop: '20px' }}>
                            <InputMask
                                mask="*-*-*-*-*"
                                formatChars={{ '*': '[0-9]' }}
                                maskChar=""
                                maskPlaceholder=""
                                value={phoneSecretCode}
                                onChange={(e) => {
                                    setPhoneSecretCode(e.target.value);
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
                            <center style={{ width: '100%' }}>

                                <Grid container>
                                    <Grid size={6}>
                                        <Button
                                            className="grayButton"
                                            onClick={() => {
                                                setModalOpen(false);
                                                setPhoneSecretCode(null);
                                            }}
                                            style={{ width: '100%', marginTop: '10px' }}
                                        >
                      <span>
                        <Trans>cancel</Trans>
                      </span>
                                        </Button>

                                    </Grid>
                                    <Grid size={6}>
                                        <LoadingButton loading={varifyInfoLoading}>
                                            <Button
                                                className="greenButton"
                                                onClick={() => {
                                                    confirmRequest.mutate();
                                                }}
                                                style={{ width: '100%', marginTop: '10px' }}
                                                classes={{
                                                    disabled: classes.buttonDisabled,
                                                }}
                                                disabled={varifyInfoLoading}
                                            >
                    <span>
                      <Trans>send</Trans>
                    </span>
                                            </Button>
                                        </LoadingButton>
                                    </Grid>
                                </Grid>

                            </center>
                        </div>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
            <Dialog
                className={satrexTheme ? 'appContent' : 'appContentDark'}
                open={infoModalOpen}
                onClose={() => setInfoModalOpen(false)}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
                maxWidth="md"
                fullWidth
            >
                <DialogContent>
                    <DialogContentText>
            <span>
              <Trans>Are you sure you want to send the following information?</Trans>
            </span>
                        {
                            infoModalOpen
                            && (
                                <Grid
                                    container
                                    spacing={2}
                                    style={{ width: '100%', marginTop: '20px' }}
                                >
                                    <Grid style={{ marginTop: '-41px' }} size={12}>
                                        <Grid container>
                                            <Grid size={4}>
                                                <Grid container style={{ paddingTop: '7%' }}>
                                                    <Grid size={6}>
                                                        <FormControlLabel
                                                            value="Female"
                                                            control={(
                                                                <Radio
                                                                    checked={gender === 'Female'}
                                                                    value="a"
                                                                    name="radio-button-demo"
                                                                    color="primary"
                                                                    classes={{
                                                                        checked: classes.radioChecked,
                                                                    }}
                                                                />
                                                            )}
                                                            label={(
                                                                <div style={{ fontSize: '13px' }}>
                                                                    <Trans>woman</Trans>
                                                                </div>
                                                            )}
                                                            classes={{
                                                                root: classes.radioLabel,
                                                            }}
                                                        />
                                                    </Grid>
                                                    <Grid size={6}>
                                                        <FormControlLabel
                                                            value="Male"
                                                            control={(
                                                                <Radio
                                                                    checked={gender === 'Male'}
                                                                    value="a"
                                                                    name="radio-button-demo"
                                                                    color="primary"
                                                                    classes={{
                                                                        checked: classes.radioChecked,
                                                                    }}
                                                                />
                                                            )}
                                                            label={(
                                                                <div style={{ fontSize: '13px' }}>
                                                                    <Trans>man</Trans>
                                                                </div>
                                                            )}
                                                            classes={{
                                                                root: classes.radioLabel,
                                                            }}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid size={8} />
                                        </Grid>
                                    </Grid>
                                    <Grid size={6}>
                                        <SatrexInput
                                            inputValue={firstName}
                                            isDisabled
                                            onChange={(e) => setFirstName(e.target.value)}
                                            label={<Trans>firstName</Trans>}
                                        />
                                    </Grid>
                                    <Grid size={6}>
                                        <SatrexInput
                                            inputValue={lastName}
                                            isDisabled
                                            onChange={(e) => setLastName(e.target.value)}
                                            label={<Trans>lastName</Trans>}
                                        />
                                    </Grid>
                                    <Grid size={6}>
                                        <SatrexInput
                                            direction="ltr"
                                            classes={{ input: isEn ? classes.enInput : classes.faInput }}
                                            inputValue={nationalId}
                                            isDisabled
                                            onChange={(e) => setNationalId(e.target.value)}
                                            label={<Trans>nationalId</Trans>}
                                        />
                                    </Grid>
                                    <Grid size={6}>
                                        <SatrexInput
                                            classes={{ input: isEn ? classes.enInput : classes.faInput }}
                                            inputValue={birthdate ? jMoment(birthdate).format('jYYYY/jMM/jDD') : ''}
                                            isDisabled
                                            direction="ltr"
                                            label={<Trans>birthDate</Trans>}
                                        />
                                    </Grid>

                                    <Grid size={6}>
                                        <SatrexInput
                                            direction="ltr"
                                            classes={{ input: isEn ? classes.enInput : classes.faInput }}
                                            isDisabled
                                            inputValue={phoneNumber}
                                            label={<Trans>email</Trans>}
                                        />
                                    </Grid>
                                    {((finotekTry >= 2 || finotekFailed) && false)
                                        && (
                                            <Grid container spacing={1}>
                                                <Grid style={{ marginTop: '10px' }} size={12}>
                                                    {
                                                        finotekFailed ? (
                                                                <span>
                            <Trans>Sorry, the system is currently unavailable. Please send your information to admin for review</Trans>
                                                                </span>
                                                            )
                                                            : (
                                                                <span>
<Trans>Your personal information has not been approved by the system, so to pass this step, upload the required photos and then send them to the admin.</Trans>
                                                                    {' '}
                                                                </span>
                                                            )
                                                    }
                                                </Grid>
                                                <Grid size={6}>
                                                    <Trans>uploadNationalCardImage</Trans>
                                                    <ThemeProvider theme={dropzoneTheme}>
                                                        <DropzoneArea
                                                            classes={{
                                                                root: satrexTheme
                                                                    ? classes.dropzoneStyleLight
                                                                    : classes.dropzoneStyleDark,
                                                            }}
                                                            filesLimit={1}
                                                            showPreviewsInDropzone
                                                            showAlerts={false}
                                                            initialFiles={[nationalCardPreview]}
                                                            onChange={nationalCardImagePreview}
                                                            acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                                                            dropzoneText={<Trans>dragAndDropImageOrClick</Trans>}
                                                        />
                                                    </ThemeProvider>
                                                </Grid>
                                                <Grid size={6}>
                                                    <Trans>sendPersonalPhotoAsPattern</Trans>
                                                    <ThemeProvider theme={dropzoneTheme}>
                                                        <DropzoneArea
                                                            classes={{
                                                                root: satrexTheme
                                                                    ? classes.dropzoneStyleLight
                                                                    : classes.dropzoneStyleDark,
                                                            }}
                                                            filesLimit={1}
                                                            showPreviewsInDropzone
                                                            showAlerts={false}
                                                            initialFiles={[personalImagePreview]}
                                                            onChange={handlePersonalImagePreview}
                                                            acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                                                            dropzoneText={<Trans>dragAndDropImageOrClick</Trans>}
                                                        />
                                                    </ThemeProvider>
                                                </Grid>
                                            </Grid>
                                        )}

                                    <Grid size={6} />
                                    {finotekTry < 2 && !finotekFailed && (
                                        <center style={{ width: '100%' }}>
                                            <LoadingButton loading={sendInfoLoading}>
                                                <Button
                                                    className="greenButton"
                                                    onClick={() => {
                                                        authorizating();
                                                    }}
                                                    style={{ width: '100%', marginTop: '10px' }}
                                                    classes={{
                                                        disabled: classes.buttonDisabled,
                                                    }}
                                                    disabled={sendInfoLoading}
                                                >
                      <span>
                        <Trans>send</Trans>
                      </span>
                                                </Button>

                                            </LoadingButton>
                                        </center>
                                    )}
                                    {(finotekTry >= 2 || finotekFailed)
                                        && (
                                            <center style={{ width: '100%' }}>
                                                <LoadingButton loading={sendInfoLoading}>
                                                    <Button
                                                        className="greenButton"
                                                        onClick={() => {
                                                            adminCheck();
                                                        }}
                                                        style={{ width: '100%', marginTop: '10px' }}
                                                        classes={{
                                                            disabled: classes.buttonDisabled,
                                                        }}
                                                        disabled={sendInfoLoading}
                                                    >
                      <span>
                        <Trans>Admin check</Trans>
                      </span>
                                                    </Button>
                                                </LoadingButton>
                                            </center>
                                        )}
                                </Grid>
                            )
                        }
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </Grid>
    );
}
