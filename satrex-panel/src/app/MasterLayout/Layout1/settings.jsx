import React from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { Fade } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Divider } from '@mui/material';
import { Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { changeTheme } from '../../redux/actions/LayoutActions';
import {
    satrexDarkBlueDarkMode,
    satrexGray,
    satrexSemiGray,
    satrexDarkColor3,
} from '../../../styles/colors';
import Trans, { supportedLanguages } from '../../components/lang';
import { setLanguage } from '../../redux/actions/UserActions';

const useStyles = makeStyles((theme) => ({
    bankListStyle: {
        minWidth: 320,
        padding: '0 !important',
        textAlign: (props) => (props.isEn ? 'left' : 'right'),
        direction: (props) => (props.isEn ? 'ltr' : 'rtl'),
    },
    paperStyle: {
        top: '54px !important',
        left: (props) => (props.isEn ? 'auto !important' : '0px !important'),
        right: (props) => (!props.isEn ? 'auto !important' : '0px !important'),
        padding: 0,
        minWidth: 320,
        borderRadius: 18,
        overflow: 'hidden',
        backgroundColor: (props) => `${props.satrexTheme ? '#ffffff' : '#111111'} !important`,
        color: (props) => `${props.satrexTheme ? '#334155' : '#eef4ff'} !important`,
        border: (props) => `1px solid ${props.satrexTheme ? satrexSemiGray : 'rgba(148, 163, 184, 0.16)'}`,
        boxShadow: (props) => (props.satrexTheme
            ? '0 20px 40px rgba(15, 23, 42, 0.18)'
            : '0 20px 40px rgba(2, 6, 23, 0.55)'),
    },
    sectionTitle: {
        color: (props) => (props.satrexTheme ? satrexGray : '#aebedf'),
        fontSize: 12,
        fontWeight: 700,
        marginBottom: 12,
    },
    menuSection: {
        padding: '18px 18px 16px',
    },
    menuItem: {
        borderRadius: 14,
        padding: '12px 14px',
        marginBottom: 10,
        display: 'flex',
        direction: 'rtl',
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: 10,
        textDecoration: 'none',
        color: (props) => `${props.satrexTheme ? '#334155' : '#eef4ff'} !important`,
        textAlign: 'right',
        transition: 'background-color 160ms ease, transform 160ms ease',
        backgroundColor: (props) => (props.satrexTheme ? 'rgba(148, 163, 184, 0.08)' : 'rgba(255, 255, 255, 0.06)'),
        '&:hover': {
            backgroundColor: (props) => (props.satrexTheme ? 'rgba(148, 163, 184, 0.14)' : 'rgba(255, 255, 255, 0.1)'),
            transform: 'translateX(-2px)',
        },
        '&:last-child': {
            marginBottom: 0,
        },
    },
    languageButton: {
        minWidth: 72,
        height: 40,
        borderRadius: 12,
        border: (props) => `1px solid ${props.satrexTheme ? satrexGray : 'rgba(148, 163, 184, 0.28)'}`,
        fontSize: 14,
        padding: '4px 10px',
        color: (props) => `${props.satrexTheme ? '#334155' : '#eef4ff'} !important`,
        backgroundColor: (props) => `${props.satrexTheme ? 'rgba(148, 163, 184, 0.08)' : 'rgba(255, 255, 255, 0.06)'} !important`,
    },
    divider: {
        margin: '0 !important',
        opacity: 1,
        borderColor: (props) => `${props.satrexTheme ? 'rgba(148, 163, 184, 0.18)' : 'rgba(148, 163, 184, 0.12)'} !important`,
    },
    themeGrid: {
        marginTop: 0,
        justifyContent: 'center',
    },
    themeSelect: {
        width: '58px',
        height: '58px',
        borderRadius: '16px',
        border: (props) => `1px solid ${props.satrexTheme ? satrexGray : 'rgba(148, 163, 184, 0.24)'}`,
        padding: '5px',
        cursor: 'pointer',
        transition: 'transform 160ms ease, box-shadow 160ms ease, border-color 160ms ease',
        '&:hover': {
            boxShadow: (props) => (props.satrexTheme
                ? `0px 10px 20px ${satrexSemiGray}`
                : '0px 10px 20px rgba(2, 6, 23, 0.4)'),
            transform: 'translateY(-2px)',
        },
    },
    themeSelectActive: {
        borderColor: (props) => (props.satrexTheme ? satrexGray : '#966bed'),
        boxShadow: (props) => (props.satrexTheme
            ? `0px 0px 0px 3px ${satrexSemiGray}`
            : '0px 0px 0px 3px rgba(150, 107, 237, 0.24)'),
    },
    themeSelectInner: {
        width: '100%',
        height: '100%',
        borderRadius: '10px',
    },
    sectionRow: {
        display: 'flex',
        direction: 'rtl',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 12,
        width: '100%',
    },
    languageMenuItem: {
        minWidth: 88,
        textAlign: 'center',
        justifyContent: 'center',
        color: (props) => `${props.satrexTheme ? '#334155' : '#eef4ff'} !important`,
        backgroundColor: (props) => `${props.satrexTheme ? '#ffffff' : '#111111'} !important`,
        '&:hover': {
            backgroundColor: (props) => `${props.satrexTheme ? 'rgba(148, 163, 184, 0.12)' : 'rgba(255,255,255,0.08)'} !important`,
        },
    },
    trigger: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
    },
    triggerLabel: {
        fontSize: 14,
        fontWeight: 700,
        color: (props) => (props.satrexTheme ? '#334155' : '#eef4ff'),
        whiteSpace: 'nowrap',
        cursor: 'pointer',
        userSelect: 'none',
    },
}));

export default function () {
    const lang = useSelector((state) => state.user.language);
    const isEn = lang === 'EN' || lang === 'gr' || lang === 'fr';
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [langAnchorEl, setLangAnchorEl] = React.useState(null);
    const satrexTheme = useSelector((state) => state.layout.theme);
    const classes = useStyles({ isEn, satrexTheme });
    const dispatch = useDispatch();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleLangClick = (event) => {
        setLangAnchorEl(event.currentTarget);
    };

    const handleLangClose = () => {
        setLangAnchorEl(null);
    };

    const handleLanguage = (lang) => {
        handleLangClose();
        handleClose();
        dispatch(setLanguage(lang));
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const quickLinks = [
        { label: 'دعوت از دوستان', path: '/invite-friends' },
        { label: 'پروفایل', path: '/profile' },
    ];

    return (
        <div>
            <div className={classes.trigger}>
                <IconButton
                    aria-label="delete"
                    className="topbarIcons"
                    style={{ paddingTop: 15 }}
                    onClick={handleClick}
                    data-tut="toolbarSetting"
                >
                    <i
                        className="flaticon-settings"
                        style={{ fontSize: '16px' }}
                    />
                </IconButton>
                <span className={classes.triggerLabel} onClick={handleClick}>
                    <Trans>settingsLabel</Trans>
                </span>
            </div>
            <Menu
                marginThreshold={0}
                elevation={2}
                id="simple-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
                style={{ direction: isEn ? 'ltr' : 'rtl', width: '100%' }}
                classes={{
                    list: classes.bankListStyle,
                    paper: classes.paperStyle,
                }}
                className={satrexTheme ? 'appContent' : 'appContentDark'}
            >
                <div className={classes.menuSection}>
                    <div className={classes.sectionTitle}>تم</div>
                    <Grid container spacing={2} className={classes.themeGrid}>
                        <Grid size={4}>
                            <div
                                className={`${classes.themeSelect} ${satrexTheme === true ? classes.themeSelectActive : ''}`}
                                onClick={() => { handleClose(); dispatch(changeTheme(true)); }}
                            >
                                <div
                                    className={classes.themeSelectInner}
                                    style={{ backgroundColor: 'white' }}
                                />
                            </div>
                        </Grid>
                        <Grid size={4}>
                            <div
                                className={`${classes.themeSelect} ${satrexTheme === false ? classes.themeSelectActive : ''}`}
                                onClick={() => { handleClose(); dispatch(changeTheme(false)); }}
                            >
                                <div
                                    className={classes.themeSelectInner}
                                    style={{ backgroundColor: satrexDarkBlueDarkMode }}
                                />
                            </div>
                        </Grid>
                        <Grid size={4}>
                            <div
                                className={`${classes.themeSelect} ${satrexTheme === 'gray' ? classes.themeSelectActive : ''}`}
                                onClick={() => { handleClose(); dispatch(changeTheme('gray')); }}
                            >
                                <div
                                    className={classes.themeSelectInner}
                                    style={{ backgroundColor: satrexDarkColor3 }}
                                />
                            </div>
                        </Grid>
                    </Grid>
                </div>
                <Divider className={classes.divider} />
                <div className={classes.menuSection}>
                    <div className={classes.sectionRow}>
                        <span className={classes.sectionTitle} style={{ marginBottom: 0 }}>زبان سایت</span>
                        <IconButton
                            data-tut="toolbarChangeLang"
                            aria-controls="simple-menu"
                            aria-haspopup="true"
                            onClick={handleLangClick}
                            className={classes.languageButton}
                        >
                            <span style={{ fontSize: '16px' }}>
                                {lang}
                            </span>
                        </IconButton>
                        <Menu
                            marginThreshold={0}
                            elevation={2}
                            id="simple-menu"
                            anchorEl={langAnchorEl}
                            keepMounted
                            open={Boolean(langAnchorEl)}
                            onClose={handleLangClose}
                        >
                            {supportedLanguages.map((item) => (
                                <MenuItem
                                    key={item}
                                    onClick={() => handleLanguage(item)}
                                    className={classes.languageMenuItem}
                                >
                                    {item}
                                </MenuItem>
                            ))}
                        </Menu>
                    </div>
                </div>
                <Divider className={classes.divider} />
                <div className={classes.menuSection}>
                    <div className={classes.sectionTitle}>گزینه‌ها</div>
                    {quickLinks.map((item) => (
                        <MenuItem
                            key={item.path}
                            component={Link}
                            to={item.path}
                            onClick={handleClose}
                            className={classes.menuItem}
                        >
                            {item.label}
                        </MenuItem>
                    ))}
                </div>

            </Menu>
        </div>
    );
}
