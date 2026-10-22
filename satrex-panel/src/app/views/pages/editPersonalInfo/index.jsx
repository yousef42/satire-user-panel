import React, { useEffect, useState } from 'react';

import { Grid } from '@mui/material';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { alpha } from '@mui/material'; import { makeStyles } from '@mui/styles';
import jMoment from 'moment-jalaali';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import Trans from '../../../components/lang';

import SatrexCard from '../../../components/SatrexCard';
import ContentTabs from './EPITabs';

import {

    satrexRed,
    satrexGray,
    satrexSemiDarkerBlueDarkMode,
    satrexSemiGray,
} from '../../../../styles/colors';
import EmailBox from './emailBox';
import ImagesBox from './ImagesBox';
import AddressInfo from './AddressInfo';
import AnimatedPage from '../../../components/AnimatedPage';
import PersonalInfo from './personalInfo';

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
    buttonDisabled: {
        backgroundColor: `${satrexSemiGray} !important`,
    },
}));

jMoment.loadPersian({ dialect: 'persian-modern', usePersianDigits: true });

export default function () {
    const [personalImagePreview, setPersonalImagePreview] = useState(null);
    const [nationalCardPreview, setNationalCardPreview] = useState(null);
    const [nationalCardImage, setNationalCardImage] = useState(null);
    const [personalImage, setPersonalImage] = useState(null);
    const [personalInfoConfirm, setPersonalInfoConfirm] = useState(false);
    const [emailConfirm, setEmailConfirm] = useState(false);
    const lang = useSelector((state) => state.user.language);
    const isEn = lang === 'EN' || lang === 'gr' || lang === 'fr';
    const [value, setValue] = React.useState(1);

    const handlePersonalImagePreview = (files) => {
        setPersonalImage(files[0]);
        const file = files[0];
        const reader = new FileReader();
        reader.addEventListener(
            'load',
            async () => {
                setPersonalImagePreview(reader.result);
            },
            false,
        );
        if (file) {
            reader.readAsDataURL(file);
        }
    };
    const nationalCardImagePreview = (files) => {
        setNationalCardImage(files[0]);

        const file = files[0];
        const reader = new FileReader();
        reader.addEventListener(
            'load',
            () => {
                setNationalCardPreview(reader.result);
            },
            false,
        );
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    return (
        <AnimatedPage>
            <div style={{ marginTop: '28px' }}>
                <SatrexCard header="editPersonalInfo">

                    <Grid container style={{ padding: '20px' }}>
                        <Grid size={12}>
                            <ContentTabs
                                value={value}
                                firstTab={(
                                    <Grid container spacing={1}>
                                         <PersonalInfo
                                            personalImagePreview={personalImagePreview}
                                            nationalCardPreview={nationalCardPreview}
                                            handlePersonalImagePreview={handlePersonalImagePreview}
                                            nationalCardImagePreview={nationalCardImagePreview}
                                            nationalCardImage={nationalCardImage}
                                            setNationalCardImage={setNationalCardImage}
                                            personalImage={personalImage}
                                            setPersonalImage={setPersonalImage}
                                            setPersonalImagePreview={setPersonalImagePreview}
                                            setNationalCardPreview={setNationalCardPreview}
                                            setPersonalInfoConfirm={setPersonalInfoConfirm}
                                         />
                                        <EmailBox
                                            setEmailConfirm={setEmailConfirm}
                                        />
                                        {/* <AddressInfo/> */}
                                        {/* <ImagesBox/> */}
                                    </Grid>
                                  )}
                                secondTab={(
                                    <div>
                                        <AddressInfo />
                                        <ImagesBox

                                            personalImagePreview={personalImagePreview}
                                            nationalCardPreview={nationalCardPreview}
                                            handlePersonalImagePreview={handlePersonalImagePreview}
                                            nationalCardImagePreview={nationalCardImagePreview}
                                            nationalCardImage={nationalCardImage}
                                            setNationalCardImage={setNationalCardImage}
                                            personalImage={personalImage}
                                            setPersonalImage={setPersonalImage}
                                            setPersonalImagePreview={setPersonalImagePreview}
                                            setNationalCardPreview={setNationalCardPreview}

                                        />
                                    </div>
                                  )}
                            />
                        </Grid>
                    </Grid>
                    <div
                        style={{
                            padding: 18,
                            paddingTop: 0,
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <div>

                            {value === 0
                                && (
<Button
                                    onClick={() => {
                                        setValue(1);
                                    }}
                                    className={value === 1 ? 'grayButton' : 'greenButton'}
                                    size="medium"
                                    disabled={value === 1}
>
                                    {
                                        isEn ? <NavigateBeforeIcon style={{ fontSize: 20 }} />
                                            : <NavigateNextIcon style={{ fontSize: 20 }} />
                                    }
{' '}
<span><Trans>PreviousStep</Trans></span>

</Button>
)}
                        </div>
                        <div>
                            {
                                value === 1
                                && (
<Button
                                    data-tut="nextLevel"
                                    onClick={() => {
                                        setValue(0);
                                    }}
                                    className={(value === 0 || !personalInfoConfirm || !emailConfirm) ? 'grayButton' : 'greenButton'}
                                    aria-label="delete"
                                    size="medium"
                                    style={{ textAlign: 'right' }}
                                    disabled={value === 0 || !personalInfoConfirm || !emailConfirm}
>
                                    <span><Trans>NextStep</Trans></span>
                                    {
                                        !isEn
                                            ? <NavigateBeforeIcon style={{ fontSize: 20 }} />
                                            : <NavigateNextIcon style={{ fontSize: 20 }} />
                                    }
</Button>
)
                            }
                        </div>
                    </div>
                </SatrexCard>
            </div>
        </AnimatedPage>
    );
}
