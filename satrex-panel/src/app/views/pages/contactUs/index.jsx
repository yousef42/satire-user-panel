import React from 'react';
import { Grid, InputLabel, TextareaAutosize } from '@mui/material';
import { Button } from '@mui/material';
import { alpha } from '@mui/material'; import { makeStyles } from '@mui/styles';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PhoneInTalkOutlinedIcon from '@mui/icons-material/PhoneInTalkOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import { useSelector } from 'react-redux';
import { satrexRed } from '../../../../styles/colors';
import Trans, { transFn } from '../../../components/lang';
import SatrexInput from '../../../components/SatrexInput';
import SatrexCard from '../../../components/SatrexCard';
import AnimatedPage from '../../../components/AnimatedPage';

const useStyles = makeStyles((theme) => ({
    textArea: {
        borderRadius: 8,
        position: 'relative',
        backgroundColor: theme.palette.common.white,
        border: '1px solid #ced4da',
        minHeight: '100px !important',
        width: '99%',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        '&:focus': {
            boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
            borderColor: theme.palette.primary.main,
            outline: 'none',
        },
    },
    inputStyle: {
        backgroundColor: 'white',
    },
}));

export default function () {
    const classes = useStyles();
    const lang = useSelector((state) => state.user.language);
    const isEn = lang === 'EN' || lang === 'gr' || lang === 'fr';
    return (
        <AnimatedPage>
            <div style={{ marginTop: '20px' }}>
                <SatrexCard header="contactus">
                    <div style={{ padding: '20px' }}>
                        <Grid container>
                            <Grid size={7}>
                                <h4>
                                    <Trans>headOfficeInfo</Trans>
                                </h4>
                                <Grid container style={{ marginTop: '20px' }}>
                                    <Grid style={{ width: '7%' }}>
                                        <LocationOnOutlinedIcon style={{ color: satrexRed }} />
                                    </Grid>
                                    <Grid size={11}>
                  <span style={{ position: 'relative', top: '5px' }}>
                    <span style={{ fontSize: '14px' }}>
                      <Trans>address</Trans>
:
                    </span>
                      &nbsp;&nbsp;&nbsp;
                      <span style={{ fontSize: '13px' }}><Trans>mashhad</Trans></span>
                  </span>
                                    </Grid>
                                </Grid>
                                <Grid container style={{ marginTop: '10px' }}>
                                    <Grid style={{ width: '7%' }}>
                                        <PhoneInTalkOutlinedIcon style={{ color: satrexRed }} />
                                    </Grid>
                                    <Grid size={11}>
                  <span style={{ position: 'relative', top: '5px' }}>
                    <span style={{ fontSize: '14px' }}>
                      <Trans>phone</Trans>
:
                    </span>
                      &nbsp;&nbsp;&nbsp;
                      <span
                          style={{ fontSize: '13px' }}
                          className={isEn ? 'enNum' : ' '}
                      >
                      02128420366
                      </span>
                  </span>
                                    </Grid>
                                </Grid>
                                <Grid container style={{ marginTop: '10px' }}>
                                    <Grid style={{ width: '7%' }}>
                                        <MailOutlineIcon style={{ color: satrexRed }} />
                                    </Grid>
                                    <Grid size={11}>
                  <span style={{ position: 'relative', top: '5px' }}>
                    <span style={{ fontSize: '14px' }}>
                      <Trans>email</Trans>
:
                    </span>
                      &nbsp;&nbsp;&nbsp;
                      <span style={{ fontSize: '13px' }}>info@satrex.ir</span>
                  </span>
                                    </Grid>
                                </Grid>
                                <Grid container style={{ marginTop: '10px' }}>
                                    <Grid style={{ width: '7%' }}>
                                        <LocationCityIcon style={{ color: satrexRed }} />
                                    </Grid>
                                    <Grid size={11}>
                  <span style={{ position: 'relative', top: '5px' }}>
                    <span style={{ fontSize: '14px' }}>
                      <Trans>openingHours</Trans>
:
                    </span>
                      &nbsp;&nbsp;&nbsp;
                      <span style={{ fontSize: '13px' }}>
                      <Trans>openingHourssatrex</Trans>
                      </span>
                  </span>
                                    </Grid>
                                </Grid>
                                <center>
                                    <div className="mapouter">
                                        <div className="gmap_canvas">
                                            <iframe
                                                width="100%"
                                                height="400"
                                                id="gmap_canvas"
                                                src="https://maps.google.com/maps?q=mashhad%20sayadshirazi%20seta%20center&t=&z=13&ie=UTF8&iwloc=&output=embed"
                                                frameBorder="0"
                                                scrolling="no"
                                                marginHeight="0"
                                                marginWidth="0"
                                            />
                                        </div>
                                    </div>
                                </center>
                            </Grid>
                            <Grid size={5}>
                                <h4>
                                    <Trans>contactForm</Trans>
                                </h4>
                                <div
                                    style={{
                                        width: '100%',
                                        marginTop: '20px',
                                        padding: '30px',
                                        borderRadius: '8px',
                                        backgroundColor: '#f8f8f8',
                                    }}
                                >
                                    <div style={{ marginTop: '15px' }}>
                                        <SatrexInput
                                            classes={{
                                                root: classes.inputStyle,
                                            }}
                                            label={transFn('firstNameAndLastName')}
                                        />
                                    </div>
                                    <div style={{ marginTop: '15px' }}>
                                        <SatrexInput
                                            classes={{
                                                root: classes.inputStyle,
                                            }}
                                            label={transFn('contactNumber')}
                                        />
                                    </div>
                                    <div style={{ marginTop: '15px' }}>
                                        <SatrexInput
                                            classes={{
                                                root: classes.inputStyle,
                                            }}
                                            label={transFn('e-mail')}
                                        />
                                    </div>
                                    <div style={{ marginTop: '15px' }}>
                                        <SatrexInput
                                            classes={{
                                                root: classes.inputStyle,
                                            }}
                                            label={transFn('discussionTopic')}
                                        />
                                    </div>
                                    <Grid style={{ marginTop: '15px' }} size={12}>
                                        <InputLabel
                                            htmlFor="bootstrap-textArea"
                                            style={{ marginBottom: '3px', fontSize: '12px' }}
                                        >
                                            <Trans>description</Trans>
                                        </InputLabel>
                                        <TextareaAutosize
                                            aria-label="empty textarea"
                                            id="bootstrap-textArea"
                                            className={classes.textArea}
                                        />
                                    </Grid>
                                    <Grid container spacing={1} style={{ marginTop: '20px' }}>
                                        <Grid size={4} />
                                        <Grid size={4}>
                                            <Button
                                                className="darkGrayButton"
                                                style={{ width: '100%' }}
                                            >
                                                <Trans>cancel</Trans>
                                            </Button>
                                        </Grid>
                                        <Grid size={4}>
                                            <Button style={{ width: '100%' }} className="greenButton">
                                                <Trans>send</Trans>
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </SatrexCard>
            </div>
        </AnimatedPage>
    );
}
