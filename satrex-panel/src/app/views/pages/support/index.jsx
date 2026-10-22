import React, { useState } from 'react';
import {
    Button,
    Grid,
    InputLabel,
    Menu,
    MenuItem,
    TextareaAutosize,
} from '@mui/material';
import { alpha } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useSelector } from 'react-redux';
import { Fade } from '@mui/material';
import { useQuery, useQueryClient } from 'react-query';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import SatrexInput from '../../../components/SatrexInput';
import SatrexCard from '../../../components/SatrexCard';
import Messages from '../messages/messages';
import Trans, { transFn } from '../../../components/lang';
import {
    satrexBorderDarkColor,
    satrexSemiDarkerBlueDarkMode, satrexSemiGray,
} from '../../../../styles/colors';
import { satrexApi } from '../../../components/api';
import SatrexCaptcha from '../../../components/SatrexCaptcha';
import LoadingButton from '../../../components/LoadingButton';
import AnimatedPage from '../../../components/AnimatedPage';
import satrexToast from '../../../components/satrexToast';

const useStyles = makeStyles((theme) => ({
    textArea: {
        borderRadius: 8,
        position: 'relative',
        border: '1px solid #ced4da',
        minHeight: '100px !important',
        width: '97.3%',
        padding: '10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        '&:focus': {
            boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
            borderColor: theme.palette.primary.main,
            outline: 'none',
        },
    },
    buttonDisabled: {
        backgroundColor: `${satrexSemiGray} !important`,
    },
    textAreaLight: {

        borderColor: '#ced4da !important',
    },
    textAreaDark: {
        backgroundColor: satrexSemiDarkerBlueDarkMode,
        borderColor: `${satrexBorderDarkColor} !important`,
    },
    countryButton: {
        marginTop: '3px',
        borderRadius: 8,
        border: (props) => `1px solid ${props.satrexTheme ? '#cbd5e1' : satrexBorderDarkColor}`,
        backgroundColor: (props) => `${props.satrexTheme ? '#ffffff' : satrexSemiDarkerBlueDarkMode} !important`,
        color: (props) => `${props.satrexTheme ? '#0f172a' : '#f8fbff'} !important`,
        minHeight: 47,
        width: '100%',
        padding: '10px 12px !important',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        textTransform: 'none !important',
        letterSpacing: 'normal !important',
        fontSize: '15px !important',
        fontWeight: '500 !important',
        boxShadow: (props) => (props.satrexTheme ? '0 1px 2px rgba(15,23,42,0.06)' : 'none'),
        '&:focus': {
            boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
            borderColor: theme.palette.primary.main,
        },
        '&:hover': {
            backgroundColor: (props) => `${props.satrexTheme ? '#f8fafc' : '#0f1730'} !important`,
        },
    },
    selectValue: {
        flex: 1,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        textAlign: 'right',
        color: (props) => `${props.satrexTheme ? '#0f172a' : '#f8fbff'} !important`,
    },
    selectPlaceholder: {
        color: (props) => `${props.satrexTheme ? '#64748b' : '#9fb0d1'} !important`,
    },
    selectIcon: {
        color: (props) => `${props.satrexTheme ? '#64748b' : '#b8c6e3'} !important`,
        flexShrink: 0,
        marginInlineStart: 8,
    },
    menuPaper: {
        marginTop: 8,
        minWidth: 220,
        borderRadius: 12,
        border: (props) => `1px solid ${props.satrexTheme ? '#d7dee8' : '#29324a'}`,
        backgroundColor: (props) => `${props.satrexTheme ? '#ffffff' : '#0f1730'} !important`,
        color: (props) => `${props.satrexTheme ? '#0f172a' : '#eef4ff'} !important`,
        boxShadow: (props) => (props.satrexTheme
            ? '0 12px 36px rgba(15,23,42,0.12)'
            : '0 18px 40px rgba(0,0,0,0.38)'),
    },
    menuItem: {
        minHeight: '44px !important',
        justifyContent: 'center !important',
        color: (props) => `${props.satrexTheme ? '#0f172a' : '#eef4ff'} !important`,
        backgroundColor: 'transparent !important',
        '&:hover': {
            backgroundColor: (props) => `${props.satrexTheme ? '#f8fafc' : 'rgba(124, 196, 255, 0.08)'} !important`,
        },
        '&.Mui-selected': {
            backgroundColor: (props) => `${props.satrexTheme ? '#eef6ff' : 'rgba(124, 196, 255, 0.14)'} !important`,
        },
        '&.Mui-selected:hover': {
            backgroundColor: (props) => `${props.satrexTheme ? '#e7f1ff' : 'rgba(124, 196, 255, 0.18)'} !important`,
        },
    },
}));

export default function () {
    const satrexTheme = useSelector((state) => state.layout.theme);
    const classes = useStyles({ satrexTheme });
    const menuTextColor = satrexTheme ? '#0f172a' : '#eef4ff';
    const [anchorEl, setAnchorEl] = useState('');
    const [priorityAnchorEl, setPriorityAnchorEl] = useState('');
    const [listMustBeUpdated, setListMustBeUpdated] = useState(false);
    const [shuffleNum, setShuffleNum] = useState(0);
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
    const [captcha, setCaptcha] = useState();
    const [sendLoading, setSendLoading] = useState(false);
    const [priority, setPriority] = useState({
        name: '',
        id: '',
    });
    const [departMent, setDepartment] = useState({
        id: '',
        title: '',
    });
    const queryClient = useQueryClient();

    const getDepartments = async () => {
        const { data } = await satrexApi()
            .post('/Department/GetList', {});
        return data.data;
    };

    const { data: departMentList } = useQuery('getDepartments', getDepartments);
    const getDepartmentType = (title) => {
        const normalizedTitle = (title || '').toLowerCase();
        if (
            normalizedTitle.includes('مالی')
            || normalizedTitle.includes('financial')
            || normalizedTitle.includes('finance')
            || normalizedTitle.includes('account')
            || normalizedTitle.includes('payment')
        ) {
            return 'financial';
        }
        if (
            normalizedTitle.includes('فنی')
            || normalizedTitle.includes('technical')
            || normalizedTitle.includes('support')
            || normalizedTitle.includes('پشتیبانی')
        ) {
            return 'technical';
        }
        return null;
    };
    const getDepartmentDisplayTitle = (title) => {
        const departmentType = getDepartmentType(title);
        if (departmentType === 'financial') return transFn('Financial');
        if (departmentType === 'technical') return transFn('technicalSupport');
        return title;
    };
    const financialDepartment = (departMentList || []).find((item) => getDepartmentType(item?.title) === 'financial');
    const technicalDepartment = (departMentList || []).find((item) => getDepartmentType(item?.title) === 'technical');
    const allowedDepartments = [financialDepartment, technicalDepartment].filter(Boolean);
    const departmentOptions = allowedDepartments.length > 0 ? allowedDepartments : (departMentList || []);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handlePriorityClick = (event) => {
        setPriorityAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handlePriorityClose = () => {
        setPriorityAnchorEl(null);
    };

    const sendMessage = () => {
        if (subject && body && priority.name && departMent.id) {
            if (!captcha) {
                return satrexToast(transFn('Sorting is required'), 'error');
            }
            setSendLoading(true);
            satrexApi()
                .post('/Ticket/Create', {
                    departmentId: departMent.id,
                    title: subject,
                    message: body,
                    priority: priority.name,
                }).then(({ data }) => {
                    setSendLoading(false);
                    if (data.isSuccess) {
                        setShuffleNum(Math.random());
                        queryClient.invalidateQueries('messagesList');
                        satrexToast(transFn('Your request has been successfully submitted. Please wait for a backup response'), 'success');

                        setDepartment({
                            id: null,
                            title: null,
                        });
                        setPriority({
                            id: null,
                            name: null,
                        });

                        setSubject('');
                        setBody('');
                    } else {
                        satrexToast(data.data.Errors[0].Description, 'error');
                    }
                })
                .catch((err) => {
                    setSendLoading(false);
                    satrexToast(transFn('failedInMission'), 'error');
                });
        } else {
            satrexToast(transFn('All fields are required'), 'error');
        }
    };
    const priorities = [
        { id: 1, name: 'Low' },
        { id: 2, name: 'Normal' },
        { id: 3, name: 'High' },
    ];
    const selectDepartMent = (item) => {
        setDepartment(item);
        handleClose();
    };

    const open = Boolean(anchorEl);
    const priorityOpen = Boolean(priorityAnchorEl);
    const departmentLabel = departMent.title
        ? getDepartmentDisplayTitle(departMent.title)
        : transFn('RelevantDepartment');
    const priorityLabel = priority.name ? transFn(priority.name) : transFn('Priority');

    return (
        <AnimatedPage>
            <Grid container style={{ marginTop: '28px' }}>
                <Grid size={12}>
                    <SatrexCard header="SendMessageToBackup">
                        <Grid container style={{ padding: '30px' }} spacing={2}>
                            <Grid
                                size={{
                                    xs: 12,
                                    lg: 4
                                }}>
                                <SatrexInput
                                    dataTut="ticketTitle"
                                    label="requestSubject"
                                    inputValue={subject}
                                    onChange={(e) => {
                                        setSubject(e.target.value);
                                    }}
                                />
                            </Grid>
                            <Grid
                                size={{
                                    lg: 4,
                                    xs: 6
                                }}>
                                <div data-tut="department">
                                    <label htmlFor="cardButton" className="inputLabel">
                                        <Trans>RelevantDepartment</Trans>
                                    </label>
                                    <Button
                                        id="cardButton"
                                        className={classes.countryButton}
                                        onClick={handleClick}
                                        disableRipple
                                    >
                                        <span
                                            className={`${classes.selectValue} ${departMent.title ? '' : classes.selectPlaceholder}`}
                                        >
                                            {departmentLabel}
                                        </span>
                                        <KeyboardArrowDownRoundedIcon className={classes.selectIcon} />
                                    </Button>
                                </div>

                                <Menu
                                    elevation={2}
                                    id="simple-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    TransitionComponent={Fade}
                                    PaperProps={{
                                        className: classes.menuPaper,
                                    }}
                                    MenuListProps={{
                                        style: { padding: 6 },
                                    }}
                                >
                                    {departmentOptions.map((item) => (
                                        <MenuItem
                                            selected={departMent.id === item.id}
                                            className={classes.menuItem}
                                            onClick={() => {
                                                selectDepartMent(item);
                                            }}
                                            key={item.id}
                                        >
                                            <span style={{ color: menuTextColor }}>
                                                {getDepartmentDisplayTitle(item.title)}
                                            </span>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Grid>
                            <Grid
                                size={{
                                    lg: 4,
                                    xs: 6
                                }}>
                                <div data-tut="Priority">
                                    <label htmlFor="cardButton" className="inputLabel">
                                        <Trans>Priority</Trans>
                                    </label>
                                    <Button
                                        id="cardButton"
                                        className={classes.countryButton}
                                        onClick={handlePriorityClick}
                                        disableRipple
                                    >
                                        <span
                                            className={`${classes.selectValue} ${priority.name ? '' : classes.selectPlaceholder}`}
                                        >
                                            {priorityLabel}
                                        </span>
                                        <KeyboardArrowDownRoundedIcon className={classes.selectIcon} />
                                    </Button>
                                </div>

                                <Menu
                                    elevation={2}
                                    id="simple-menu"
                                    anchorEl={priorityAnchorEl}
                                    open={priorityOpen}
                                    onClose={handlePriorityClose}
                                    TransitionComponent={Fade}
                                    PaperProps={{
                                        className: classes.menuPaper,
                                    }}
                                    MenuListProps={{
                                        style: { padding: 6 },
                                    }}
                                >
                                    {priorities.map((item) => (
                                        <MenuItem
                                            selected={priority.id === item.id}
                                            className={classes.menuItem}
                                            onClick={() => {
                                                setPriority(item);
                                                handlePriorityClose();
                                            }}
                                            key={item.id}
                                        >
                                            <span style={{ color: menuTextColor }}>
                                                <Trans>{item.name}</Trans>
                                            </span>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Grid>
                            <Grid data-tut="message" size={12}>
                                <InputLabel
                                    htmlFor="bootstrap-textArea"
                                    style={{ marginBottom: '8px' }}
                                    className="inputLabel"
                                >
                                    <Trans>message</Trans>
                                </InputLabel>
                                <TextareaAutosize
                                    aria-label="empty textarea"
                                    id="bootstrap-textArea"
                                    onChange={(e) => {
                                        setBody(e.target.value);
                                    }}
                                    style={{
                                        backgroundColor: satrexTheme ? '#ffffff' : satrexSemiDarkerBlueDarkMode,
                                        borderColor: !satrexTheme
                                            ? `${satrexBorderDarkColor}`
                                            : '#ced4da',
                                        width: '100%',
                                        boxSizing: 'border-box',
                                        color: satrexTheme ? '#0f172a' : '#f8fbff',
                                    }}
                                    className={`${classes.textArea}`}
                                    value={body}
                                />
                            </Grid>
                            <Grid
                                size={{
                                    xs: 12,
                                    lg: 9
                                }}>
                                <Grid container>
                                    <Grid
                                        size={{
                                            xs: 12,
                                            lg: 10
                                        }}>
                                        <Grid container data-tut="captcha">
                                            <Grid
                                                style={{ paddingTop: '14px' }}
                                                size={{
                                                    xs: 12,
                                                    sm: 6
                                                }}>
                                                <span>
                                                    <Trans>Please arrange the phrase opposite</Trans>
                                                    {' '}
                                                    (satrex)
                                                </span>
                                            </Grid>
                                            <Grid
                                                size={{
                                                    xs: 12,
                                                    sm: 6
                                                }}>
                                                <div style={{ width: '200px', direction: 'ltr' }}>
                                                    <SatrexCaptcha
                                                        shuffle={shuffleNum}
                                                        captcha={setCaptcha}
                                                    />
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                style={{ display: 'flex', justifyContent: 'flex-end' }}
                                size={{
                                    xs: 12,
                                    lg: 3
                                }}>
                                <Grid
                                    style={{ marginTop: 10 }}
                                    size={{
                                        xs: 12,
                                        md: 4,
                                        lg: 12
                                    }}>
                                    <LoadingButton loading={sendLoading}>
                                        <Button
                                            classes={{
                                                disabled: classes.buttonDisabled,
                                            }}
                                            variant="contained"
                                            color="primary"
                                            disableElevation
                                            style={{
                                                color: 'white',
                                                width: '100%',
                                            }}
                                            disabled={sendLoading}
                                            className="greenButton"
                                            // style={{ float: "left" }}
                                            onClick={sendMessage}
                                        >
                                            <Trans>sendMessage</Trans>
                                        </Button>
                                    </LoadingButton>
                                </Grid>

                            </Grid>
                        </Grid>
                    </SatrexCard>
                </Grid>
                <Grid style={{ marginTop: '20px' }} size={12}>
                    <SatrexCard header="messages">
                        <Grid container style={{ padding: '20px' }}>
                            <Messages
                                refresh={listMustBeUpdated}
                                setListMustBeUpdated={setListMustBeUpdated}
                            />
                        </Grid>
                    </SatrexCard>
                </Grid>
            </Grid>
        </AnimatedPage>
    );
}
