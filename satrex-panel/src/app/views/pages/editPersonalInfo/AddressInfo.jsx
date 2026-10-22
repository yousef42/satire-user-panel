import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { IconButton } from '@mui/material';
import { Menu, MenuItem } from '@mui/material';
import { Fade } from '@mui/material';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { alpha } from '@mui/material'; import { makeStyles } from '@mui/styles';
import { useQuery } from 'react-query';
import { useTour } from '@reactour/tour';
import SaveIcon from '@mui/icons-material/Save';
import ThemeAtrr from '../../../MasterLayout/MasterTheme/ThemeAtrr';
import { satrexApi } from '../../../components/api';
import SatrexInput from '../../../components/SatrexInput';
import Trans, { transFn } from '../../../components/lang';
import {
    satrexDarkerBlueDarkMode,
    satrexGray,
    satrexGreen,
    satrexRed, satrexSemiGray,
} from '../../../../styles/colors';
import tourLoader from '../../../../utils/helpers/tourLoader';
import satrexToast from '../../../components/satrexToast';
import LoadingButton from '../../../components/LoadingButton';
import { LightTooltip } from '../../../components/LightTooltip';
import _ from "lodash"
const useStyles = makeStyles((theme) => ({
    countryButton: {
        borderRadius: 8,
        position: 'relative',
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
    buttonDisabled: {
        backgroundColor: `${satrexSemiGray} !important`,
    },
    enInput: {
        fontFamily: 'enNum !important',
        textAlign: 'center',
        '&::placeholder': {
            textAlign: 'left',
        },
    },
    faInput: {
        '&::placeholder': {
            textAlign: 'left',
        },
    },
}));

export default function () {
    const classes = useStyles();
    const satrexTheme = useSelector((state) => state.layout.theme);
    const [contactUsStatus, setContactUsStatus] = useState('');
    const [contactUsDisable, setContactUsDisable] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [address, setAddress] = useState('');
    const [provinces, setProvinces] = useState([]);
    const [selectedCity, setSelectedCity] = useState(null);
    const [anchorCityEl, setAnchorCityEl] = useState(null);
    const [citiesList, setCitiesList] = useState([]);
    const [telephone, setTelephone] = useState(null);
    const extraTheme = useSelector((state) => state.layout.extraTheme);
    const [postCode, setPostCode] = useState(null);
    const [city, setCity] = useState(null);
    const { setIsOpen, setSteps } = useTour();
    const [loading, setLoading] = useState(false);
    const lang = useSelector((state) => state.user.language);
    const isEn = lang === 'EN' || lang === 'gr' || lang === 'fr';

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const selectingProvice = (province) => {
        setSelectedProvince(province.persianTitle);
        satrexApi()
            .post(`/City/GetCitiesByProvince?provinceId=${province.id}`, {
                provinceId: province.id,
            })
            .then(({ data }) => {
                setCitiesList(data.data);
            });

        handleClose();
    };

    const getProvices = async () => {
        const { data } = await satrexApi().post('/Province/GetList');
        if (data.isSuccess) return data;
    };

    const { data: provinceList } = useQuery('provincesList', getProvices);

    const getAddressInfo = async () => {
        const { data } = await satrexApi().post('/AddressInfo/Get');
        tourLoader(setIsOpen, setSteps, 'edit-personal-info-stage2');
        if (data.isSuccess) return data;
        data.Errors.forEach((err) => {
            satrexToast(err.Description, 'error');
        });
    };
    const { data: AddressInfo } = useQuery('AddressInfo', getAddressInfo);
    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            if (AddressInfo?.data) {
                setAddress(AddressInfo.data.address);
                setPostCode(AddressInfo.data.postalCode);
                setSelectedCity(AddressInfo.data.city);
                setCity(AddressInfo.data.cityId);
                setSelectedProvince(AddressInfo.data.province);
                setTelephone(AddressInfo.data.phone);
                if (
                    AddressInfo.data.lastConfirmationType !== 'Editable'
                    && AddressInfo.data.lastConfirmationType !== 'Rejected'
                ) {
                    setContactUsDisable(true);
                }
                setContactUsStatus(AddressInfo.data.lastConfirmationType);
            }
        }
        return () => {
            isMounted = false;
        };
    }, [AddressInfo]);

    useEffect(() => () => {
        tourLoader(setIsOpen, setSteps, 'edit-personal-info');
    }, []);
    const handleCityClick = (event) => {
        setAnchorCityEl(event.currentTarget);
    };

    const handleCityClose = () => {
        setAnchorCityEl(null);
    };
    const selectingCity = (province) => {
        setSelectedCity(province.persianTitle);
        setCity(province.id);

        handleCityClose();
    };
    const cancelRequest = () => {
        satrexApi()
            .post('/AddressInfo/CancelConfirmRequest')
            .then((data) => {
                if (data.data.isSuccess) {
                    satrexToast(transFn('The contact information request was successfully canceled'), 'success');

                    setContactUsDisable(false);
                    setContactUsStatus('Editable');
                } else {
                    data.data.Errors.forEach((err) => {
                        satrexToast(err.Description, 'error');
                    });
                }
            });
    };

    const setConfirmRequest = () => {
        satrexApi()
            .post('/AddressInfo/SetConfirmRequest')
            .then((data) => {
                if (data.data.isSuccess) {
                    satrexToast(transFn('The review request was successfully sent to the admin'), 'success');
                    setContactUsDisable(true);
                    setContactUsStatus('ConfirmRequest');
                } else {
                    data.data.Errors.forEach((err) => {
                        satrexToast(err.Description, 'error');
                    });
                }
            });
        setLoading(false);
    };
    const finalSubmit = () => {
        handleSubmit(true);
    };

    const handleSubmit = (confirmRequest = false) => {
        setLoading(true);
        // if(!/^[\u0600-\u06FF\s]+$/.test(address) && !isEn)
        // {
        //   addToast('مقدار آدرس باید فارسی باشد', {appearance: "error", autoDismiss: true});
        //   return false
        // }
        satrexApi()
            .post('/AddressInfo/Update', {
                cityId: city,
                address,
                postalCode: postCode,
                phone: telephone,
            })
            .then((data) => {
                if (data.data.isSuccess) {
                    if (confirmRequest) {
                        setConfirmRequest();
                    } else {
                        satrexToast(transFn('Information successfully saved'), 'success');
                        setLoading(false);
                    }
                } else {
                    data.data.Errors.forEach((err) => {
                        satrexToast(err.Description, 'error');
                    });
                    setLoading(false);
                }
            }).catch(() => {
            setLoading(false);
        });
    };

    const openCity = Boolean(anchorCityEl);
    const open = Boolean(anchorEl);
    return (
        <Grid
            className="satrexDiv pr"
            style={{ marginTop: '45px', paddingRight: '8%', paddingLeft: '5%' }}
            container
            spacing={2}
            data-tut="contactInfo"
        >
            <div className="pa saveButtonInEditPersonalInfo">
                <LoadingButton loading={loading}>
                    <LightTooltip
                        title={transFn('save')}
                        aria-label={transFn('save')}
                    >
                      <span>
                            <IconButton
                                onClick={() => {
                                    !loading
                                    && telephone
                                    && address
                                    && postCode
                                    && selectedCity
                                    && !contactUsDisable
                                        ? handleSubmit()
                                        : () => {
                                        };
                                }}

                                disabled={!telephone
                                    || loading
                                    || !address
                                    || !postCode
                                    || !selectedCity
                                    || contactUsDisable}
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
            <Trans>contactInfo</Trans>
                    </span>
                </label>
            </Grid>
            <Grid size={12}>
                {contactUsStatus === 'Rejected' && (
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
                {contactUsStatus === 'Accepted' && (
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
                {contactUsStatus === 'ConfirmRequest' && (
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
            <Grid size={4}>
                <label htmlFor="cardButton">
                    <Trans>province</Trans>
                </label>
                <IconButton
                    id="cardButton"
                    className={`${classes.countryButton}`}
                    onClick={!contactUsDisable ? handleClick : () => {
                    }}
                >
          <span
              style={{ direction: 'ltr', fontSize: '16px' }}
              className=""
          >
            {selectedProvince}
          </span>
                </IconButton>
                <Menu
                    elevation={2}
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={!contactUsDisable ? open : false}
                    onClose={handleClose}
                    TransitionComponent={Fade}
                    style={{ direction: 'ltr', width: '100%' }}
                >
                    {provinceList?.data.provinces.map((item, index) => (
                        <MenuItem
                            key={item.id}
                            onClick={() => {
                                selectingProvice(item);
                            }}
                        >
                            <Trans>
                                <span>{item.persianTitle}</span>
                            </Trans>
                        </MenuItem>
                    ))}
                </Menu>
            </Grid>
            <Grid size={4}>
                <label htmlFor="cardButton">
                    <Trans>city</Trans>
                </label>
                <IconButton
                    id="cardButton"
                    className={`${classes.countryButton}`}
                    onClick={!contactUsDisable ? handleCityClick : () => {
                    }}
                >
          <span
              style={{ direction: 'ltr', fontSize: '16px' }}
              className=""
          >
            {selectedCity}
          </span>
                </IconButton>
                <Menu
                    elevation={2}
                    id="simple-menu"
                    anchorEl={anchorCityEl}
                    open={!contactUsDisable ? openCity : false}
                    onClose={handleCityClose}
                    TransitionComponent={Fade}
                    style={{ direction: 'ltr', width: '100%' }}
                >
                    {_.orderBy(citiesList, ['persianTitle'], ['asc']).map((item, index) => (
                        <MenuItem
                            key={item.id}
                            onClick={() => {
                                selectingCity(item);
                            }}
                        >
                            <Trans>
                                <span>{item.persianTitle}</span>
                            </Trans>
                        </MenuItem>
                    ))}
                </Menu>
            </Grid>
            <Grid size={4} />
            <Grid size={4}>
                <SatrexInput
                    classes={{ input: isEn ? classes.enInput : classes.faInput }}
                    isDisabled={contactUsDisable}
                    direction="ltr"
                    inputProps={{
                        maxLength: 10,
                    }}
                    inputValue={postCode ?? ''}
                    onChange={(e) => setPostCode(e.target.value.replace(/\D/, ''))}
                    label={<Trans>postCode</Trans>}
                />
            </Grid>
            <Grid size={4}>
                <SatrexInput
                    classes={{ input: isEn ? classes.enInput : classes.faInput }}
                    placeholder="02188776655"
                    inputProps={{
                        maxLength: 16,
                    }}
                    isDisabled={contactUsDisable}
                    direction="ltr"
                    inputValue={telephone ?? ''}
                    onChange={(e) => setTelephone(e.target.value.replace(/\D/, ''))}
                    label={<Trans>telephone</Trans>}
                />
            </Grid>
            <Grid size={8}>
                <SatrexInput
                    classes={{ input: isEn ? classes.enInput : classes.faInput }}
                    isDisabled={contactUsDisable}
                    inputProps={{
                        maxLength: 120,
                    }}
                    inputValue={address ?? ''}
                    onChange={(e) => setAddress(e.target.value)}
                    label={<Trans>address</Trans>}
                />
            </Grid>
            <Grid size={4} />
            <Grid style={{ paddingTop: '15px', paddingBottom: '20px' }} size={12}>
                {contactUsStatus !== 'ConfirmRequest' && (
                    <Grid container>
                        {/* <Grid item> */}
                        {/*  <Button */}
                        {/*    autoFocus */}
                        {/*    onClick={() => { */}
                        {/*      telephone */}
                        {/*      && address */}
                        {/*      && postCode */}
                        {/*      && selectedCity */}
                        {/*      && !contactUsDisable */}
                        {/*        ? handleSubmit() */}
                        {/*        : () => {}; */}
                        {/*    }} */}

                        {/*    disabled={!telephone */}
                        {/*    || !address */}
                        {/*    || !postCode */}
                        {/*    || !selectedCity */}
                        {/*    || contactUsDisable} */}

                        {/*    disableElevation */}
                        {/*    classes={{ */}
                        {/*      disabled: classes.buttonDisabled, */}
                        {/*    }} */}
                        {/*    className="greenButton" */}
                        {/*    style={{ float: lang === 'EN' ? 'left' : 'right' }} */}
                        {/*    variant="contained" */}
                        {/*  > */}
                        {/*    <span style={{ color: satrexGray }}> */}
                        {/*      <Trans>save</Trans> */}
                        {/*    </span> */}
                        {/*  </Button> */}
                        {/* </Grid> */}
                        {/* <div style={{ width: 20 }} /> */}
                        <Grid>
                            <Button
                                color="default"
                                variant="contained"
                                style={{ float: lang === 'EN' ? 'left' : 'right' }}
                                onClick={() => (telephone
                                && address
                                && postCode
                                && selectedCity
                                && !contactUsDisable
                                    ? finalSubmit()
                                    : () => {
                                    })}
                                classes={{
                                    disabled: classes.buttonDisabled,
                                }}
                                disabled={!telephone
                                    || !address
                                    || !postCode
                                    || !selectedCity
                                    || contactUsDisable}
                                className="greenButton"
                                disableElevation

                            >
                <span>
                  {' '}
                    <Trans>ReviewRequest</Trans>
                </span>
                            </Button>
                        </Grid>
                    </Grid>
                )}
                {contactUsStatus === 'ConfirmRequest' && (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            cancelRequest();
                        }}
                        disableElevation
                        style={{
                            color: 'white',
                            float: lang === 'EN' ? 'left' : 'right',
                            width: 'fit-content',
                        }}
                        className="greenButton"
                        type="button"
                    >
                        <Trans>cancelRequest</Trans>
                    </Button>
                )}
            </Grid>
        </Grid>
    );
}
