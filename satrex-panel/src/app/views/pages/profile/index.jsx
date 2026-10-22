import React, { useEffect, useRef, useState } from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { makeStyles } from '@mui/styles';
import {
    FormControlLabel, Grid, Radio,
} from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import jMoment from 'moment-jalaali';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { useTour } from '@reactour/tour';
import AccountStatus from './AccountStatus';
import WalletBalances from './WalletBalances';
import { satrexApi } from '../../../components/api';
import BankAccountRows from '../editBankInfo/bankAccountRows';
import SatrexInput from '../../../components/SatrexInput';
import Trans, { transFn } from '../../../components/lang';
import {
    satrexGreen,
    satrexRed,
    satrexLightGray,
    satrexGray,
    satrexBorderDarkColor,
    satrexDarkBlueDarkMode,
} from '../../../../styles/colors';
import SatrexCard from '../../../components/SatrexCard';
import tourLoader from '../../../../utils/helpers/tourLoader';
import AnimatedPage from '../../../components/AnimatedPage';
import satrexToast from '../../../components/satrexToast';

const useStyles = makeStyles({
    stepDiv: {
        width: '40px',
        height: '40px',
        borderRadius: '20px',
    },
    stepLabel: {
        position: 'relative',
        color: 'white',
        top: '25%',
        fontSize: '20px !important',
    },
    indexLabel: {
        position: 'relative',
        right: '-22px',
        top: '4px',
        minWidth: '60px',
    },
    indexLabelEn: {
        position: 'relative',
        left: '-37px',
        top: '4px',
        minWidth: '60px',
    },
    chartTitle: {
        color: `${satrexGreen}!important`,
    },
    peopleIcon: {
        position: 'absolute',
        top: 50,
        fontSize: '30px',
    },
    radialBarChart: {
        '& text': {
            fontFamily: 'faNum !important',
        },
    },
    radialBarChartEn: {
        '& text': {
            fontFamily: 'enNum !important',
        },
    },
    radioChecked: {
        '& div': {
            color: `${satrexRed}!important`,
        },
    },
    radioLabel: {
        margin: 0,
    },
    progressTrack: {
        position: 'relative',
        width: '100%',
        height: 4,
        borderRadius: 999,
        overflow: 'visible',
    },
    progressFill: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        borderRadius: 999,
        transition: 'width 180ms ease',
    },
    stepsRow: {
        position: 'relative',
        marginTop: -18,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
});

export default function App() {
    const classes = useStyles();
    const [boxShow, setBoxShow] = useState(0);
    // const [gender, setGender] = useState(1);
    // const [personalImagePreview, setPersonalImagePreview] = useState(false);
    const [levelPrecent, setLevelPrecent] = useState(0);
    const bankConfirmed = useSelector((state) => state.bank.bankConfirmed);
    const satrexTheme = useSelector((state) => state.layout.theme);
    const extraTheme = useSelector((state) => state.layout.extraTheme);
    const lang = useSelector((state) => state.user.language);
    const isEn = lang === 'EN' || lang === 'gr' || lang === 'fr';
    const [totalBalanceRial, setTotalBalanceRial] = React.useState('');
    const [totalBalanceTether, setTotalBalanceTether] = React.useState('');
    const [statusRows, setStatusRows] = React.useState([]);
    const [walletStatusHeight, setWalletStatusHeight] = React.useState(0);
    const [levelPrecentHeight, setlevelPrecentHeight] = React.useState(0);
    const { setIsOpen, setSteps } = useTour();
    const level = useSelector((state) => state.layout.totals.qualifyLevel);
    const personalInfoRef = useRef(null);
    const levelPrecentRef = useRef(null);
    const [personalInfo, setPersonalInfo] = useState({
        username: '',
        firstName: '',
        lastName: '',
        phone: '',
        nationalId: '',
        citizenId: '',
        isForeignCitizen: '',
        email: '',
        emailConfirmed: '',
        birthDate: moment().format('YYYY/MM/DD'),
        gender: 0,
        lastConfirmationType: '',
    });
    const [addressInfo, setAddressInfo] = useState({
        address: '',
        city: '',
        lastConfirmationType: 'Editable',
        phone: '',
        postalCode: ' ',
        province: '',
    });
    const cardBorderColor = satrexTheme ? '#ececec' : satrexBorderDarkColor;
    const helperTextColor = satrexTheme ? satrexGray : '#ecebef';
    const inactiveStepTextColor = satrexTheme ? '#64748b' : '#d8e3fb';
    const levelLabelColor = satrexTheme ? '#64748b' : '#cad6ef';
    const pendingStatusColor = satrexTheme ? satrexGray : '#d2dcf4';
    const noticeBackgroundColor = satrexTheme ? '#fffbf8' : 'rgba(250, 70, 22, 0.09)';
    const noticeBorderColor = satrexTheme ? '#ffd4ca' : 'rgba(250, 70, 22, 0.35)';
    const infoBoxBackgroundColor = satrexTheme ? 'rgba(59, 130, 246, 0.09)' : 'rgba(93, 164, 255, 0.14)';
    const infoBoxBorderColor = satrexTheme ? 'rgba(59, 130, 246, 0.18)' : 'rgba(123, 196, 255, 0.24)';
    // const getUserImage = (level) => {
    //   satrexApi()
    //     .post("/UserImage/Get")
    //     .then((data) => {
    //       if (data.data.isSuccess) {
    //         if (data.data.data.personalImageAddress)
    //           convertImgToBase64(
    //             baseUrl + data.data.data.personalImageAddress,
    //             setPersonalImagePreview
    //           );
    //         setUserImageStatus(data.data.data.lastConfirmationType);
    //         switch (data.data.data.lastConfirmationType) {
    //           case "ConfirmRequest":
    //             setStatusRows((statusRows) => [
    //               ...statusRows,
    //               "عکس های شما برای ادمین ارسال شده و در انتظار بررسی قرار گرفته است",
    //             ]);
    //             break;
    //           case "Rejected":
    //             setStatusRows((statusRows) => [
    //               ...statusRows,
    //               "عکس های شما مورد توسط ادمین رد شده است",
    //             ]);
    //             break;
    //           case "Editable":
    //             setStatusRows((statusRows) => [
    //               ...statusRows,
    //               "عکس های شما هنوز ارسال نشده است",
    //             ]);
    //             break;
    //           default:
    //             break;
    //         }
    //         checkBankInfo();
    //       } else {
    //         data.data.Errors.forEach((err) => {
    //           addToast(err.Description, {
    //             appearance: "success",
    //             autoDismiss: true,
    //           });
    //         });
    //       }
    //     });
    // };

    const getConfirmationMessage = (type, messages) => {
        switch (type) {
            case 'ConfirmRequest':
                return messages.confirmRequest;
            case 'Rejected':
                return messages.rejected;
            case 'Editable':
                return messages.editable;
            default:
                return null;
        }
    };

    const getBankStatusMessage = () => {
        switch (bankConfirmed) {
            case 'ConfirmRequest':
                return transFn('Your bank information has been sent to the admin and is awaiting review');
            case false:
                return transFn('Your bank information has been rejected by the admin');
            case 'Editable':
                return transFn('Your bank information has not been sent yet');
            default:
                return null;
        }
    };

    useEffect(() => {
        let isActive = true;
        const loadProfileData = async () => {
            tourLoader(setIsOpen, setSteps, 'profile');

            const nextStatusRows = [];

            try {
                const [{ data: personalRes }, { data: assetsRes }, { data: percentageRes }] = await Promise.all([
                    satrexApi().post('/PersonalInfo/Get'),
                    satrexApi().post('/Wallet/GetTotalAssetsPriceInTomanAndTether'),
                    satrexApi().post('/Dashboard/GetUserProfileCompletedLevelPercentage'),
                ]);

                if (!isActive) return;

                if (personalRes.isSuccess) {
                    setPersonalInfo(personalRes.data);
                    const personalStatus = getConfirmationMessage(personalRes.data.lastConfirmationType, {
                        confirmRequest: transFn('Your ID information has been sent to the admin and is awaiting review'),
                        rejected: transFn('Your credentials have been rejected by the admin'),
                        editable: transFn('Your ID has not yet been sent'),
                    });
                    if (personalStatus) nextStatusRows.push(personalStatus);
                } else {
                    personalRes.Errors.forEach((err) => {
                        satrexToast(err.Description, 'error');
                    });
                }

                setTotalBalanceRial(assetsRes.data.totalFundInToman);
                setTotalBalanceTether(assetsRes.data.totalFundInTether);
                setLevelPrecent(percentageRes.data.percentage);

                const addressResponse = await satrexApi().post('/AddressInfo/Get');
                if (!isActive) return;

                if (addressResponse.data.isSuccess) {
                    setAddressInfo(addressResponse.data.data);
                    const addressStatus = getConfirmationMessage(addressResponse.data.data.lastConfirmationType, {
                        confirmRequest: transFn('YourContactInformationHasBeenSentToTheAdminAndIsAwaitingReview'),
                        rejected: transFn('Your contact information has been rejected by the admin'),
                        editable: transFn('Your contact information has not been sent yet'),
                    });
                    if (addressStatus) nextStatusRows.push(addressStatus);
                } else {
                    addressResponse.data.Errors.forEach((err) => {
                        satrexToast(err.Description, 'error');
                    });
                }

                const bankStatus = getBankStatusMessage();
                if (bankStatus) nextStatusRows.push(bankStatus);
                setStatusRows(nextStatusRows);
            } catch (error) {
                if (!isActive) return;
                satrexToast(transFn('failedInMission'), 'error');
            }
        };

        loadProfileData();

        return () => {
            isActive = false;
        };
    }, [bankConfirmed, setIsOpen, setSteps]);

    useEffect(() => {
        if (personalInfoRef.current) setWalletStatusHeight(personalInfoRef.current.clientHeight);
        setlevelPrecentHeight(levelPrecentRef.current?.clientHeight);
        setBoxShow(1);
    }, [personalInfo, statusRows, levelPrecent]);

    // console.log('personalInfoRef.current : ', personalInfoRef.current?.clientHeight);

    return (
        <AnimatedPage>
            <div className="App" style={{ marginTop: '28px' }}>
                <Grid container spacing={1}>
                    <Grid data-tut="levelStatus" size={12}>
                        <SatrexCard header="profile">
                            <div style={{
                                padding: '70px', paddingTop: '40px', paddingBottom: '0px', position: 'relative',
                            }}
                            >
                                <div
                                    style={{
                                        padding: '15px',
                                        transform: isEn ? '' : 'rotate(180deg)',
                                    }}

                                >
                                    <div
                                        className={classes.progressTrack}
                                        style={{
                                            backgroundColor: !satrexTheme ? satrexDarkBlueDarkMode : satrexLightGray,
                                        }}
                                    >
                                        <div
                                            className={classes.progressFill}
                                            style={{
                                                width: `${levelPrecent}%`,
                                                backgroundColor: satrexGreen,
                                            }}
                                        />
                                    </div>
                                    <div className={classes.stepsRow}>
                                        {[0, 1, 2].map((stepIndex) => {
                                            const accomplished = stepIndex === 0
                                                ? levelPrecent >= 0
                                                : stepIndex === 1
                                                    ? levelPrecent >= 50
                                                    : levelPrecent >= 100;
                                            return (
                                                <div
                                                    key={stepIndex}
                                                    className={classes.stepDiv}
                                                    style={{
                                                        transform: isEn ? '' : 'rotate(180deg)',
                                                        textAlign: 'center',
                                                        backgroundColor: accomplished
                                                            ? satrexGreen
                                                            : satrexTheme
                                                                ? satrexLightGray
                                                                : satrexDarkBlueDarkMode,
                                                    }}
                                                >
                                                    <span
                                                        style={{ color: accomplished ? 'white' : inactiveStepTextColor }}
                                                        className={`${!isEn ? 'faNum' : 'enNum'} ${classes.stepLabel}`}
                                                    >
                                                        {stepIndex}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                                <center style={{ height: '0px' }}>
                                    <div style={{ padding: '20px' }}>
                                        <div style={{ width: '100%', height: '0px' }}>
                                            <div
                                                style={{
                                                    paddingRight: !isEn ? `${levelPrecent - 0.1}%` : 'auto',
                                                    paddingLeft: isEn ? `${levelPrecent - 0.1}%` : 'auto',
                                                    position: 'relative',
                                                    top: '-65px',
                                                    transition: '0.3s',
                                                    textAlign: !isEn ? 'right' : 'left',
                                                    opacity:
                                                        levelPrecent !== 0
                                                        && levelPrecent !== 50
                                                        && levelPrecent < 80
                                                            ? 1
                                                            : 0,
                                                }}
                                            >
                                                <div>
                                                    <LocationOnIcon
                                                        style={{
                                                            color: satrexRed,
                                                            position: 'relative',
                                                            right: !isEn ? '-11px' : 'auto',
                                                            left: isEn ? '-11px' : 'auto',
                                                        }}
                                                    />
                                                </div>
                                                <div
                                                    className={
                                                        !isEn ? classes.indexLabel : classes.indexLabelEn
                                                    }
                                                >
                                                    <label style={{ color: satrexRed }}>
                                                        <Trans>authentication</Trans>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </center>
                                <div style={{ padding: '20px' }}>
                                    <Grid
                                        container
                                        style={{
                                            width: '100%',
                                            position: 'relative',
                                            left: !isEn ? '30px' : 'auto',
                                            right: isEn ? '30px' : 'auto',
                                            top: '-8px',
                                        }}
                                    >
                                        <Grid style={{ width: '0px' }}>
                                            <div
                                                style={{
                                                    width: '0px',
                                                    marginRight: !isEn ? '-13px' : 'auto',
                                                    marginLeft: isEn ? '-23px' : 'auto',
                                                    whiteSpace: 'nowrap',
                                                    fontSize: 16,
                                                    fontWeight: 'bold',
                                                    color: satrexGreen,
                                                }}
                                            >
                                                <Trans>zeroLevelUser</Trans>
                                            </div>
                                        </Grid>
                                        <Grid size={6}>
                                            <div
                                                style={{
                                                    marginRight: !isEn ? '99%' : 'auto',
                                                    marginLeft: isEn ? '97%' : 'auto',
                                                    width: '0px',
                                                    whiteSpace: 'nowrap',
                                                    fontSize: 16,
                                                    fontWeight: 'bold',
                                                    color: levelPrecent >= 50 ? satrexGreen : levelLabelColor,
                                                }}
                                            >
                                                <Trans>oneLevelUser</Trans>
                                            </div>
                                        </Grid>
                                        <Grid size={6}>
                                            <div
                                                style={{
                                                    marginRight: !isEn ? '99%' : 'auto',
                                                    marginLeft: isEn ? '98%' : 'auto',
                                                    width: '0px',
                                                    whiteSpace: 'nowrap',
                                                    fontSize: 16,
                                                    fontWeight: 'bold',
                                                    color: levelPrecent >= 100 ? satrexGreen : levelLabelColor,
                                                }}
                                            >
                                                <Trans>twoLevelUser</Trans>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </div>
                                {levelPrecent < 100 && levelPrecent > 0 && (
                                    <div style={{ marginTop: '-30px' }}>
                                        <div
                                            style={{
                                                paddingRight: !isEn ? `${levelPrecent}%` : '',
                                                paddingLeft: isEn ? `${levelPrecent}%` : '',
                                                transition: '0.3s',
                                            }}
                                        >
                                            <div
                                                className="triangle"
                                                style={{
                                                    position: 'relative',
                                                    top: '8px',
                                                    zIndex: '10',
                                                    opacity: boxShow,
                                                    backgroundColor: noticeBackgroundColor,
                                                    borderColor: noticeBorderColor,
                                                }}
                                            />
                                        </div>

                                    </div>
                                )}

                            </div>
                            {levelPrecent < 100 && levelPrecent > 0 && (
                                <center>
                                    <div style={{ padding: '17px', paddingTop: '0px' }}>
                                        <div
                                            className="satrexOrangeDiv"
                                            style={{
                                                width: '100%',
                                                backgroundColor: noticeBackgroundColor,
                                                border: `dashed 1px ${noticeBorderColor}`,
                                                opacity: boxShow,
                                                textAlign: !isEn ? 'right' : 'left',
                                                padding: '20px',
                                                color: helperTextColor,

                                            }}
                                        >
                                            <div>
                                                <h4 style={{ color: helperTextColor }}>
                                                    {' '}
                                                    <FiberManualRecordIcon
                                                        style={{
                                                            color: satrexRed,
                                                            fontSize: '12px',
                                                            position: 'relative',
                                                            top: '3px',
                                                        }}
                                                    />
                                                    <Trans>youAreInAuthPhase</Trans>
                                                    .
                                                    <FiberManualRecordIcon
                                                        style={{
                                                            color: satrexRed,
                                                            fontSize: '12px',
                                                            position: 'relative',
                                                            top: '3px',
                                                        }}
                                                    />
                                                </h4>
                                                {statusRows.map((item, index) => (
                                                    <h6
                                                        key={index}
                                                        style={{ marginTop: '17px', color: helperTextColor }}
                                                    >
                                                        {item}
                                                    </h6>
                                                ))}
                                            </div>
                                        </div>
                                        {levelPrecent >= 0 && levelPrecent < 50 && (
                                            <div
                                                className="blueBox"
                                                style={{
                                                    width: '100%',
                                                    padding: '15px',
                                                    backgroundColor: infoBoxBackgroundColor,
                                                    border: `1px solid ${infoBoxBorderColor}`,
                                                    borderRadius: '8px',
                                                    height: '524',
                                                    marginTop: '17px',
                                                    textAlign: isEn ? 'left' : 'right',
                                                    color: helperTextColor,
                                                }}
                                            >
                                                <div>
                                                    <p>
                                                        <Trans>profileLine1</Trans>
                                                    </p>
                                                    <p><Trans>profileLine2</Trans></p>
                                                    <p><Trans>profileLine3</Trans></p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </center>
                            )}
                        </SatrexCard>
                    </Grid>
                    <Grid
                        data-tut="accountStatus"
                        size={{
                            xs: 12,
                            md: 12
                        }}>
                        <SatrexCard header="AccountStatus" style={{ minHeight: 330 }}>
                            <div style={{ padding: '1.5%' }} ref={levelPrecentRef}>
                                <AccountStatus levelPrecent={levelPrecent} />
                            </div>
                        </SatrexCard>
                    </Grid>
                    <Grid
                        data-tut="personalInfo"
                        size={{
                            xs: 12,
                            md: 7
                        }}>
                        {
                            personalInfo.username !== ''
                            && (
                                <SatrexCard header="personalInfo" ref={personalInfoRef}>
                                    <div style={{ padding: '30px' }}>
                                        <Grid container spacing={1}>
                                            <Grid size={12}>
                                                {personalInfo.lastConfirmationType === 'Rejected' && (
                                                    <div className="statusRedBox">
                                                        <Grid container>
                                                            <CheckCircleIcon style={{ color: satrexRed }} />
                                                            {' '}
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
                                                {personalInfo.lastConfirmationType === 'VerifiedBySystem' && (
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
                                                {personalInfo.lastConfirmationType === 'Accepted' && (
                                                    <div className="statusGreenBox">
                                                        <Grid container>
                                                            <CheckCircleIcon style={{ color: satrexGreen }} />
                                                            {' '}
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
                                                {personalInfo.lastConfirmationType === 'ConfirmRequest' && (
                                                    <div className="statusGrayBox">
                                                        <Grid container>
                                                            <CheckCircleIcon style={{ color: pendingStatusColor }} />
                                                            {' '}
                                                            <div
                                                                style={{
                                                                    padding: '2px',
                                                                    paddingTop: '3px',
                                                                    color: pendingStatusColor,
                                                                }}
                                                            >
                                                                <Trans>adminPending</Trans>
                                                            </div>
                                                        </Grid>
                                                    </div>
                                                )}
                                            </Grid>
                                            <Grid size={4}>
                                                <FormControlLabel
                                                    value="female"
                                                    control={(
                                                        <Radio
                                                            checked={personalInfo.gender === 'Female'}
                                                            value="a"
                                                            label=""
                                                            name="radio-button-demo"
                                                            color="primary"
                                                            classes={{
                                                                checked: classes.radioChecked,
                                                            }}
                                                        />
                                                    )}
                                                    label={(
                                                        <div style={{ fontSize: '13px', color: helperTextColor }}>
                                                            <Trans>woman</Trans>
                                                        </div>
                                                    )}
                                                    classes={{
                                                        root: classes.radioLabel,
                                                    }}
                                                />
                                            </Grid>
                                            <Grid size={4}>
                                                <FormControlLabel
                                                    value="female"
                                                    control={(
                                                        <Radio
                                                            checked={personalInfo.gender === 'Male'}
                                                            value="a"
                                                            name="radio-button-demo"
                                                            color="primary"
                                                            classes={{
                                                                checked: classes.radioChecked,
                                                            }}
                                                        />
                                                    )}
                                                    label={(
                                                        <div style={{ fontSize: '13px', color: helperTextColor }}>
                                                            <Trans>man</Trans>
                                                        </div>
                                                    )}
                                                    classes={{
                                                        root: classes.radioLabel,
                                                    }}
                                                />
                                            </Grid>
                                            <Grid size={4} />
                                            <Grid size={6}>
                                                <SatrexInput
                                                    inputValue={personalInfo.firstName ?? ''}
                                                    label="firstName"
                                                    isDisabled
                                                />
                                            </Grid>
                                            <Grid size={6}>
                                                <SatrexInput
                                                    inputValue={personalInfo.lastName ?? ''}
                                                    label="lastName"
                                                    isDisabled
                                                />
                                            </Grid>
                                            <Grid size={6}>
                                                <SatrexInput
                                                    inputValue={personalInfo.nationalId}
                                                    label="nationalId"
                                                    isDisabled
                                                />
                                            </Grid>
                                            <Grid size={6}>
                                                <SatrexInput
                                                    inputValue={
                                                        moment(personalInfo.birthDate).format('YYYY/MM/DD')
                                                        !== moment().format('YYYY/MM/DD')
                                                            ? (!isEn
                                                                ? jMoment(personalInfo.birthDate).format(
                                                                    'jYYYY/jMM/jDD',
                                                                )
                                                                : moment(personalInfo.birthDate).format('YYYY/MM/DD'))
                                                            : ''
                                                    }
                                                    label="birthDate"
                                                    isDisabled
                                                />
                                            </Grid>
                                            <Grid size={6}>
                                                <SatrexInput
                                                    inputValue={personalInfo.email ?? ''}
                                                    label="email"
                                                    isDisabled
                                                />
                                            </Grid>
                                            <Grid size={6}>
                                                <SatrexInput
                                                    inputValue={addressInfo.postalCode ?? ''}
                                                    label="postCode"
                                                    isDisabled
                                                />
                                            </Grid>
                                            <Grid size={6}>
                                                <SatrexInput
                                                    inputValue={addressInfo.phone ?? ''}
                                                    label="telephone"
                                                    isDisabled
                                                />
                                            </Grid>
                                            <Grid size={6}>
                                                <SatrexInput
                                                    inputValue={personalInfo.username ?? ''}
                                                    label="phoneNumber"
                                                    isDisabled
                                                />
                                            </Grid>
                                            <Grid size={12}>
                                                <SatrexInput
                                                    inputValue={
                                                        addressInfo.province
                                                            ? `${addressInfo.province
                                                            } - ${
                                                                addressInfo.city
                                                            } - ${
                                                                addressInfo.address}`
                                                            : ''
                                                    }
                                                    label="address"
                                                    isDisabled
                                                />
                                            </Grid>
                                        </Grid>
                                    </div>
                                </SatrexCard>
                            )
                        }
                    </Grid>
                    <Grid
                        size={{
                            xs: 12,
                            md: 5
                        }}>
                        <SatrexCard header="WalletStatus" style={{ height: walletStatusHeight }}>
                            <div style={{ padding: '15px' }} className="WalletStatusChart pr" data-tut="walletStatus">
                                <WalletBalances walletStatusHeight={walletStatusHeight} />
                            </div>
                        </SatrexCard>
                    </Grid>
                    <Grid data-tut="bankInfoStatus" size={12}>
                        <SatrexCard header="bankInfo" style={{ paddingBottom: '20px' }}>
                            <BankAccountRows onlyShow />
                        </SatrexCard>
                    </Grid>
                </Grid>
            </div>
        </AnimatedPage>
    );
}
