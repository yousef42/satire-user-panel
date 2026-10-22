import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { ThemeProvider } from '@mui/material';
import { DropzoneArea } from '../../../components/DropzoneArea';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { createTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import {
    Dialog,
    DialogContent,
    DialogTitle, IconButton,
    Paper,
} from '@mui/material';
import { DialogContentText } from '@mui/material';
import Draggable from 'react-draggable';
import { CloudUpload, Delete } from '@mui/icons-material';
import SaveIcon from '@mui/icons-material/Save';
import ThemeAtrr from '../../../MasterLayout/MasterTheme/ThemeAtrr';
import LoadingButton from '../../../components/LoadingButton';
import { satrexApi } from '../../../components/api';
import Trans, { transFn } from '../../../components/lang';
import {
    satrexDarkerBlueDarkMode,
    satrexGray,
    satrexGreen,
    satrexLightBlue,
    satrexRed,
    satrexSemiDarkerBlueDarkMode, satrexSemiGray,
} from '../../../../styles/colors';
import satrexToast from '../../../components/satrexToast';
import { LightTooltip } from '../../../components/LightTooltip';

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
const disableDropzone = createTheme({
    overrides: {
        MuiDropzonePreviewList: {
            removeButton: {
                display: 'none',
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

const useStyles = makeStyles((theme) => ({
    dropzoneStyleLight: {
        backgroundColor: 'white',
        background: (props) => `url(${props.nationalCardPreview})`,
        backgroundSize: 'contain !important',
        backgroundRepeat: 'no-repeat !important',
        '& p': {
            color: 'transparent',
        },
        '& svg': {
            color: 'transparent',
        },
        transition: '0.3s',
        '&:hover': {
            filter: (props) => (props.disabled ? 'unset' : 'brightness(50%)'),
        },
        borderRadius: 40,
        width: 400,
        height: 400,
        backgroundPosition: 'center !important',
        animation: 'unset !important',
    },
    dropzoneStyle2Light: {
        backgroundColor: 'white',
        backgroundRepeat: 'no-repeat !important',
        background: (props) => `url(${props.personalImagePreview})`,
        backgroundSize: 'contain !important',
        '& p': {
            color: 'transparent',
        },
        '& svg': {
            color: 'transparent',
        },
        transition: '0.3s',
        '&:hover': {
            filter: (props) => (props.disabled ? 'unset' : 'brightness(50%)'),
        },
        borderRadius: 40,
        width: 400,
        height: 400,
        backgroundPosition: 'center !important',
        animation: 'unset !important',
    },
    buttonDisabled: {
        backgroundColor: `${satrexSemiGray} !important`,
    },
    dropzoneStyleDark: {
        backgroundColor: satrexSemiDarkerBlueDarkMode,
        borderColor: '#3a3a3a !important',
        backgroundRepeat: 'no-repeat !important',
        background: (props) => `url(${props.nationalCardPreview})`,
        backgroundSize: 'contain !important',
        '& p': {
            color: 'transparent',
        },
        '& svg': {
            color: 'transparent',
        },
        transition: '0.3s',
        '&:hover': {
            filter: (props) => (props.disabled ? 'unset' : 'brightness(50%)'),
        },
        borderRadius: 40,
        width: 400,
        height: 400,
        backgroundPosition: 'center !important',
        animation: 'unset !important',
    },
    dropzoneStyle2Dark: {
        backgroundColor: satrexSemiDarkerBlueDarkMode,
        borderColor: '#3a3a3a !important',
        backgroundRepeat: 'no-repeat !important',
        background: (props) => `url(${props.personalImagePreview})`,
        backgroundSize: 'contain !important',
        '& p': {
            color: 'transparent',
        },
        '& svg': {
            color: 'transparent',
        },
        transition: '0.3s',
        '&:hover': {
            filter: (props) => (props.disabled ? 'unset' : 'brightness(50%)'),
        },
        borderRadius: 40,
        width: 400,
        height: 400,
        backgroundPosition: 'center !important',
        animation: 'unset !important',
    },
}));
export default function ({
                             personalImagePreview,
                             handlePersonalImagePreview,
                             nationalCardImagePreview,
                             nationalCardPreview,
                             nationalCardImage,
                             setNationalCardImage,
                             personalImage,
                             setPersonalImage,
                             setNationalCardPreview,
                             setPersonalImagePreview,
                         }) {
    const [userImageStatus, setUserImageStatus] = useState('');
    const classes = useStyles({ nationalCardPreview, personalImagePreview, disabled: userImageStatus !== 'Accepted' });
    const satrexTheme = useSelector((state) => state.layout.theme);
    const [userImageDisable, setUserImageDisable] = useState(false);
    const [sampleModalOpen, setSampleModalOpen] = useState(false);
    const [saveLoading, setSaveLoading] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [sampleImagePreview, setSampleImagePreview] = useState('');
    const extraTheme = useSelector((state) => state.layout.extraTheme);
    const lang = useSelector((state) => state.user.language);
    const isEn = lang === 'EN' || lang === 'gr' || lang === 'fr';

    const uploadNationalCardImage = (sendToAdmin = false) => {
        if (!nationalCardImage && sendToAdmin) return finalSubmit();
        const formData = new FormData();
        formData.append('file', nationalCardImage);

        satrexApi()
            .post('/UserImage/UploadNationalCardImage', formData)
            .then((data) => {
                if (data.data.isSuccess) {
                    if (sendToAdmin) {
                        finalSubmit();
                    } else {
                        satrexToast(transFn('National card image uploaded successfully'), 'success');
                    }
                } else {
                    data.data.Errors.forEach((err) => {
                        satrexToast(err.Description, 'error');
                    });
                }
            }).catch((err) => {
            satrexToast(transFn('failedInMission'), 'error');
        });
    };
    const cancelRequest = () => {
        satrexApi()
            .post('/UserImage/CancelConfirmRequest')
            .then((data) => {
                if (data.data.isSuccess) {
                    satrexToast(transFn('Document review request was successfully canceled'), 'success');
                    setUserImageDisable(false);
                    setUserImageStatus('Editable');
                } else {
                    data.data.Errors.forEach((err) => {
                        satrexToast(err.Description, 'error');
                    });
                }
            }).catch((err) => {
            satrexToast(transFn('failedInMission'), 'error');
        });
    };

    // const getImageFile = async (image,callbackFn)=>{
    //     let img = new Image();
    //     img.src = image;
    //     console.log(img)
    //     const myInit = {
    //         mode: 'no-cors',
    //         method: 'HEAD',
    //         crossdomain: false,
    //         withCredentials: true,
    //         // headers: {
    //         //     'Access-Control-Allow-Origin':'*',
    //         //     'Sec-Fetch-Site':'cross-site',
    //         //     'Sec-Fetch-Mode':'no-cors',
    //         //     'Sec-Fetch-Dest':'image'
    //         // }
    //     };
    //     const myRequest = new Request(image, myInit);
    //     const response = await fetch(myRequest);
    //     console.log('response : ',response)
    //     const blob = await response.blob();
    //     const file = new File([blob], 'image.jpg', {type: blob.type});
    //     console.log('file is : ',file)
    //     callbackFn(file)
    //
    // }

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            satrexApi()
                .post('/UserImage/GetSampleUserImages')
                .then(({ data }) => {
                    setSampleImagePreview(data.data.personalImageSampleImageAddress);
                }).catch((err) => {
                satrexToast(transFn('failedInMission'), 'error');
            });

            satrexApi()
                .post('/UserImage/Get')
                .then(async (data) => {
                    if (data.data.isSuccess) {
                        if (data.data.data.nationalCardImageAddress) setNationalCardPreview(data.data.data.nationalCardImageAddress);
                        else setNationalCardPreview(null);
                        if (data.data.data.personalImageAddress) setPersonalImagePreview(data.data.data.personalImageAddress);
                        else setPersonalImagePreview(null);
                        if (
                            data.data.data.lastConfirmationType !== 'Editable'
                            && data.data.data.lastConfirmationType !== 'Rejected'
                        ) {
                            setUserImageDisable(true);
                        }

                        setUserImageStatus(data.data.data.lastConfirmationType);
                    } else {
                        data.data.Errors.forEach((err) => {
                            satrexToast(err.Description, 'error');
                        });
                    }
                });
        }
        return () => {
            isMounted = false;
        };
    }, []);

    const uploadPersonalImage = (sendToAdmin = false) => {
        if (!personalImage) return uploadNationalCardImage(sendToAdmin);
        const formData = new FormData();
        formData.append('file', personalImage);
        if (sendToAdmin) setSubmitLoading(true);
        else setSaveLoading(true);
        satrexApi()
            .post('/UserImage/UploadPersonalImage', formData)
            .then((data) => {
                if (data.data.isSuccess) {
                    uploadNationalCardImage(sendToAdmin);
                    if (!sendToAdmin) {
                        setSaveLoading(false);
                        satrexToast(transFn('Personal image uploaded successfully'), 'success');
                    }
                } else {
                    data.data.Errors.forEach((err) => {
                        satrexToast(err.Description, 'error');
                    });
                }
            }).catch((err) => {
            satrexToast(transFn('failedInMission'), 'error');
        });
    };
    const handleSubmit = (sendToAdmin = false) => {
        uploadPersonalImage(sendToAdmin);
    };

    const finalSubmit = () => {
        satrexApi()
            .post('/UserImage/SetConfirmRequest')
            .then((data) => {
                if (data.data.isSuccess) {
                    satrexToast(transFn('The review request was successfully sent to the admin'), 'success');
                    setSubmitLoading(false);
                    setUserImageDisable(true);
                    setUserImageStatus('ConfirmRequest');
                } else {
                    data.data.Errors.forEach((err) => {
                        satrexToast(err.Description, 'error');
                    });
                }
            }).catch((err) => {
            satrexToast(transFn('failedInMission'), 'error');
        });
    };

    return (
        <Grid
            className="satrexDiv pr"
            style={{ marginTop: '45px', paddingRight: '8%', paddingLeft: '5%' }}
            container
            spacing={2}
            data-tut="userImages"
        >
            <div className="pa saveButtonInEditPersonalInfo">
                <LoadingButton loading={saveLoading}>
                    <LightTooltip
                        title={transFn('save')}
                        aria-label={transFn('save')}
                    >
                       <span>
                            <IconButton
                                onClick={() => {
                                    !userImageDisable
                                    && personalImagePreview
                                    && nationalCardPreview
                                        ? handleSubmit()
                                        : () => {
                                        };
                                }}
                                disabled={userImageDisable || saveLoading || submitLoading
                                    || !personalImagePreview
                                    || !nationalCardPreview}
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
            <Trans>sendingDocs</Trans>
                    </span>
                </label>
            </Grid>
            <Grid size={12}>
                {userImageStatus === 'Rejected' && (
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
                {userImageStatus === 'Accepted' && (
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
                {userImageStatus === 'ConfirmRequest' && (
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
            <Grid
                size={{
                    xs: 12,
                    lg: 6
                }}>
                <Grid
                    className="sectionSepration"
                    style={{ display: 'flex', justifyContent: 'center' }}
                    container
                    spacing={2}
                >
                    <Grid size={12}>
                        <Trans>uploadNationalCardImage</Trans>
                    </Grid>
                    <Grid style={{ height: 400, width: 400, position: 'relative' }}>
                        <ThemeProvider
                            theme={(userImageStatus !== 'Accepted' && userImageStatus !== 'ConfirmRequest') ? dropzoneTheme : disableDropzone}
                        >
                            {Boolean(nationalCardPreview && `${nationalCardPreview}`.trim()) && (
                                <DropzoneArea
                                    classes={{
                                        root: satrexTheme
                                            ? classes.dropzoneStyleLight
                                            : classes.dropzoneStyleDark,
                                    }}
                                    filesLimit={1}
                                    showPreviewsInDropzone={false}
                                    showAlerts={false}
                                    onChange={
                                        (userImageStatus !== 'Accepted' && userImageStatus !== 'ConfirmRequest') ? nationalCardImagePreview : () => {
                                        }
                                    }
                                    acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                                    initialFiles={[nationalCardPreview]}
                                    dropzoneText={transFn('dragAndDropImageOrClick')}
                                />
                            )}
                        </ThemeProvider>
                        {
                            (userImageStatus !== 'Accepted' && userImageStatus !== 'ConfirmRequest')
                            && (
                                <>
                                    <div style={{ position: 'absolute', top: '32%', left: '20%' }}>
                                        <Trans>dragAndDropImageOrClick</Trans>
                                    </div>
                                    <CloudUpload style={{
                                        color: 'black',
                                        position: 'absolute',
                                        fontSize: 50,
                                        top: '46%',
                                        left: '43%',
                                    }}
                                    />

                                    {
                                        nationalCardPreview
                                        && (
                                            <IconButton
                                                style={{ position: 'absolute', bottom: '0px', left: 0 }}
                                                onClick={() => {
                                                    setNationalCardImage(null);
                                                    setNationalCardPreview(null);
                                                }}
                                                className="deleteBtn"
                                            >
                                                <Delete style={{ color: 'red', fontSize: 40 }} />
                                            </IconButton>
                                        )
                                    }
                                </>
                            )
                        }
                    </Grid>
                </Grid>
            </Grid>
            <Grid
                size={{
                    xs: 12,
                    lg: 6
                }}>
                <Grid
                    className="sectionSepration"
                    style={{ display: 'flex', justifyContent: 'center' }}
                    container
                    spacing={2}
                >
                    <Grid size={12}>
                        <Trans>sendPersonalPhotoAsPattern</Trans>
                    </Grid>
                    <Grid style={{ height: 400, width: 400, position: 'relative' }}>
                        {Boolean(personalImagePreview && `${personalImagePreview}`.trim()) && (
                            <ThemeProvider
                                theme={(userImageStatus !== 'Accepted' && userImageStatus !== 'ConfirmRequest') ? dropzoneTheme : disableDropzone}
                            >
                                <DropzoneArea
                                    style={{ backgroundColor: 'red' }}
                                    classes={{
                                        root: satrexTheme
                                            ? classes.dropzoneStyle2Light
                                            : classes.dropzoneStyle2Dark,
                                    }}
                                    filesLimit={1}
                                    showPreviewsInDropzone={false}
                                    showAlerts={false}
                                    initialFiles={[personalImagePreview]}
                                    acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                                    onChange={
                                        (userImageStatus !== 'Accepted' && userImageStatus !== 'ConfirmRequest') ? handlePersonalImagePreview : () => {
                                        }
                                    }
                                    dropzoneText={transFn('dragAndDropImageOrClick')}
                                />

                            </ThemeProvider>
                        )}
                        {
                            (userImageStatus !== 'Accepted' && userImageStatus !== 'ConfirmRequest')
                            && (
                                <>
                                    <div style={{ position: 'absolute', top: '32%', left: '20%' }}>
                                        <Trans>dragAndDropImageOrClick</Trans>
                                    </div>
                                    <CloudUpload style={{
                                        color: 'black',
                                        position: 'absolute',
                                        fontSize: 50,
                                        top: '46%',
                                        left: '43%',
                                    }}
                                    />

                                    {
                                        personalImagePreview
                                        && (
                                            <IconButton
                                                style={{ position: 'absolute', bottom: '0px', left: 0 }}
                                                onClick={() => {
                                                    setPersonalImage(null);
                                                    setPersonalImagePreview(null);
                                                }}
                                                className="deleteBtn"
                                            >
                                                <Delete style={{ color: 'red', fontSize: 40 }} />
                                            </IconButton>
                                        )
                                    }
                                </>
                            )
                        }

                    </Grid>
                    {/* <Grid xs={1} item> */}
                    {/*    {personalImagePreview && */}
                    {/*    <img alt="" className="imgPreview" */}
                    {/*         src={personalImagePreview}/>} */}
                    {/* </Grid> */}
                    {/* <Grid xs={1} item style={{padding: '22px'}}> */}
                    {/*    { */}
                    {/*        !userImageDisable && personalImagePreview && */}
                    {/*        <i className="flaticon-close" */}
                    {/*           style={{color: 'red', cursor: 'pointer'}} */}
                    {/*           onClick={() => { */}
                    {/*               setPersonalImagePreview(null) */}
                    {/*           }}/> */}
                    {/*    } */}
                    {/* </Grid> */}
                </Grid>
            </Grid>
            <Grid size={12}>
        <span
            style={{
                color: satrexLightBlue,
                borderBottom: `dotted 1px ${satrexLightBlue}`,
                cursor: 'pointer',
            }}
            onClick={() => {
                setSampleModalOpen(true);
            }}
        >
          <Trans>seeSample</Trans>
        </span>
            </Grid>
            <Grid style={{ paddingTop: '15px', paddingBottom: '20px' }} size={12}>
                {userImageStatus !== 'ConfirmRequest' && (
                    <Grid container>
                {/*        <Grid item> */}
                {/*            <center style={{ width: '100%' }}> */}
                {/*                <LoadingButton loading={saveLoading}> */}
                {/*                    <Button */}
                {/*                        autoFocus */}
                {/*                        onClick={() => { */}
                {/*                            !userImageDisable */}
                {/*                            && personalImagePreview */}
                {/*                            && nationalCardPreview */}
                {/*                                ? handleSubmit() */}
                {/*                                : () => { */}
                {/*                                }; */}
                {/*                        }} */}
                {/*                        disabled={userImageDisable || saveLoading || submitLoading */}
                {/*                            || !personalImagePreview */}
                {/*                            || !nationalCardPreview} */}
                {/*                        disableElevation */}
                {/*                      */}
                {/*                        className="greenButton" */}
                {/*                        classes={{ */}
                {/*                            disabled: classes.buttonDisabled, */}
                {/*                        }} */}
                {/*                    > */}
                {/* <span style={{ color: satrexGray }}> */}
                {/*  <Trans>save</Trans> */}
                {/* </span> */}
                {/*                    </Button> */}
                {/*                </LoadingButton> */}
                {/*            </center> */}
                {/*        </Grid> */}
                {/*        <div style={{ width: 20 }} /> */}
                        <Grid>
                            <center style={{ width: '100%' }}>
                                <LoadingButton loading={submitLoading}>
                                    <Button

                                        onClick={() => {
                                            !userImageDisable
                                            && personalImagePreview
                                            && nationalCardPreview
                                                ? handleSubmit(true)
                                                : () => {
                                                };
                                        }}
                                        classes={{
                                            disabled: classes.buttonDisabled,
                                        }}
                                        disableElevation
                                        disabled={userImageDisable || submitLoading || saveLoading
                                            || !personalImagePreview
                                            || !nationalCardPreview}
                                        className="greenButton"
                                    >
                <span>
                  {' '}
                    <Trans>ReviewRequest</Trans>
                </span>
                                    </Button>
                                </LoadingButton>
                            </center>
                        </Grid>
                    </Grid>
                )}
                {userImageStatus === 'ConfirmRequest' && (
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
            <Dialog
                open={sampleModalOpen}
                onClose={() => setSampleModalOpen(false)}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle
                    style={{ cursor: 'move' }}
                    id="draggable-dialog-title"
                />
                <DialogContent>
                    <DialogContentText>
                        {sampleImagePreview && <img alt="" src={sampleImagePreview} />}
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </Grid>
    );
}
