import React, { useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import {
    Grid,
    Menu,
    MenuItem,
} from '@mui/material';
import { Fade } from '@mui/material';
import { Button } from '@mui/material';
import moment from 'moment';
import { alpha } from '@mui/material'; import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import { useHistoryCompat as useHistory } from '../../../router/routerCompat';
import { useTour } from '@reactour/tour';
import starkString from 'starkstring';
import getBankName from '../editBankInfo/bankName';
import LoadingButton from '../../../components/LoadingButton';
import SuspendNotif from '../../../components/suspendNotif';
import tourLoader from '../../../../utils/helpers/tourLoader';
import {
    satrexGray3,
    satrexGreen,
    satrexSemiGray,
} from '../../../../styles/colors';
import SatrexInput from '../../../components/SatrexInput';
import Trans, { transFn } from '../../../components/lang';
import SatrexCard from '../../../components/SatrexCard';
import AnimatedPage from '../../../components/AnimatedPage';
import {
    useBankAccountList,
    useMaximumWithdrawalPerDayInToman,
    useTotalFundAndTradable,
} from '../../../../utils/queries';
import { SendemailSecretCodeForRegisteredUser, setWithdrawal } from '../../../../utils/apis';
import satrexNumFormat from '../../../components/satrexNumFormat';
import satrexToast from '../../../components/satrexToast';
import { numberWithCommas } from '../../../../utils/helpers/numberWithCommas';
import SatrexDatePicker from '../../../components/satrexDatePicker';
import TimerButton from '../../../components/TimerButton';
import ConvertDate from '../../../components/convertDate';
import { setTopbarValues } from '../../../redux/actions/LayoutActions';
import _ from "lodash"
const useStyles = makeStyles((theme) => ({
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
    bankListStyle: {
        minWidth: 475,
    },
    menuItemStyle: {
        fontFamily: (props) => (props.isEn ? 'enNum !important' : 'faNum !important'),
    },
    prominentInputRoot: {
        width: '100%',
    },
    prominentInput: {
        border: '2px solid #c7d2e3 !important',
        backgroundColor: '#ffffff !important',
        boxShadow: '0 2px 8px rgba(15,23,42,0.06)',
    },
    inlineActionRow: {
        marginTop: '20px',
        alignItems: 'center',
    },
    inlineActionButtonCell: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: (props) => (props.isEn ? 'flex-start' : 'flex-end'),
    },
}));

export default function () {
    const [requestDate, setRequestDate] = useState(moment().add(1, 'd').format('YYYY/MM/DD'));
    const [twoFactorCode, setTwoFactorCode] = useState('');
    const { data: bankAccounts } = useBankAccountList();
    const [withdrawalAmount, setWithdrawalAmount] = useState('');
    const { data: maximumWithdrawal } = useMaximumWithdrawalPerDayInToman();
    const lang = useSelector((state) => state.user.language);
    const isEn = lang === 'EN' || lang === 'gr' || lang === 'fr';
    const classes = useStyles({ isEn });
    const history = useHistory();
    const { setIsOpen, setSteps } = useTour();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [datePickerShow, setDatePickerShow] = useState(false);
    const [withdrawalLoading, setWithdrawalLoading] = useState(false);
    const level = useSelector((state) => state.layout.totals.qualifyLevel);
    const { data: inventory } = useTotalFundAndTradable();
    const dispatch = useDispatch();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const [selectedBankAccount, setSelectedBankAccount] = useState({
        cardNumber: null,
        id: null,
    });

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            tourLoader(setIsOpen, setSteps, 'withdrawal');
        }
        return () => {
            isMounted = false;
        };
    }, []);

    // console.log('getCalendarHeaderText : ', JalaliUtils.getCalendarHeaderText);

    const submitWithdrawalRequest = async () => {
        // console.log('requestDate : ', jMoment(requestDate).format('YYYY-MM-DD'));
        setWithdrawalLoading(true);
        if (!selectedBankAccount.id) {
            setWithdrawalLoading(false);
            return satrexToast(transFn('Selecting a card number is required'), 'error');
        }
        if (withdrawalAmount <= 0) {
            setWithdrawalLoading(false);
            return satrexToast(transFn('Withdrawal value must be greater than zero'), 'error');
        }
        if (!twoFactorCode) {
            setWithdrawalLoading(false);
            return satrexToast(transFn('A two-factor identification code is required'), 'error');
        }
        const result = await setWithdrawal({
            withdrawDateTimeAtUtc: starkString(requestDate).englishNumber().toString(),
            price: withdrawalAmount,
            bankAccountId: selectedBankAccount.id,
            twoFactorAuthSecretCode: twoFactorCode,
        });
        if (result) {
            dispatch(setTopbarValues());
            setTimeout(() => {
                history.push({
                    pathname: '/requests',
                });
            }, 200);
        }
        setWithdrawalLoading(false);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const selectAccount = (account) => {
        setSelectedBankAccount(account);
        handleClose();
    };
    const handleRequestDate = (ins, date) => {
        if (date && date?.replace(/\_/g, '').length === 10) {
            setRequestDate(ConvertDate(starkString(date.replace(/\//g, '-')).englishNumber().toString()));
        } else if (ins && date) {
            setRequestDate(ConvertDate(starkString(ins.format('jYYYY-jMM-jDD')).englishNumber().toString()));
        }
    };

    const open = Boolean(anchorEl);
    return (
        <AnimatedPage>
            <div style={{ marginTop: '28px' }}>

                <SatrexCard header="withdrawal">
                    <div style={{ paddingLeft: '20px', paddingRight: '20px', paddingTop: '20px' }}>
                        <center>
                            <p style={{ color: satrexGray3 }}><Trans>RegisterYourRialBalanceWithdrawalRequest</Trans></p>
                            <p style={{ color: satrexGray3 }}>
                                <Trans>withdrawalPageDescriptionLine2</Trans>
                            </p>
                        </center>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                        <Grid
                            size={{
                                xs: 12,
                                sm: 10,
                                md: 6
                            }}>
                            <div style={{ padding: '20px' }}>
                                <Grid container>
                                    <Grid size={12}>
                                        <label htmlFor="cardButton" className="inputLabel">
                                            <Trans>withdrawalTime</Trans>
                                        </label>
                                        <SatrexDatePicker
                                            date={requestDate}
                                            handleChangeDate={handleRequestDate}
                                            setDatePickerShow={setDatePickerShow}
                                            datePickerShow={datePickerShow}
                                            otherProps={{ disablePast: true }}
                                        />
                                    </Grid>
                                </Grid>
                                <p style={{ color: 'red' }}>
                                    <span style={{
                                        fontSize: '18px', color: 'red', position: 'relative', top: 5,
                                    }}
                                    >
*
                                    </span>
                                    &nbsp;
                                    <Trans>withdrawalDateNote</Trans>
                                    .&nbsp;
                                    <span
                                        style={{ color: 'blue', cursor: 'pointer' }}
                                        onClick={() => {
                                            history.push({ pathname: '/fee-guide' });
                                        }}
                                    >
                  (
<Trans>SaterexRialSettlementSchedule</Trans>
)
                                    </span>
                                </p>
                                <div style={{ marginTop: '20px' }}>
                                    <SatrexInput
                                        dataTut="totalFundWithdrawal"
                                        isDisabled
                                        label={transFn('Inventory(Toman)')}
                                        inputValue={inventory ? numberWithCommas((inventory.totalTradable).toFixed(0)) : ''}
                                    />
                                </div>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid
                                        style={{ marginTop: '20px' }}
                                        size={{
                                            xs: 12,
                                            md: 8
                                        }}
                                    >
                                        <SatrexInput
                                            dataTut="withdrawalPrice"
                                            label={transFn('WithdrawalAmount(Tomans)')}
                                            classes={{
                                                root: classes.prominentInputRoot,
                                                input: classes.prominentInput,
                                            }}
                                            validate={{
                                                rules: [
                                                    {
                                                        rule: withdrawalAmount > inventory?.totalTradable,
                                                        message: transFn('Withdrawal amount can not be more than your balance!'),
                                                    },
                                                ],
                                            }}
                                            inputProps={{
                                                maxLength: 19,
                                            }}
                                            inputValue={withdrawalAmount}
                                            isMoney
                                            onChange={(e) => {
                                                setWithdrawalAmount(e.target.value.replace(/,/g, ''));
                                            }}
                                        />
                                    </Grid>
                                    <Grid
                                        style={{
                                            marginTop: '20px',
                                            display: 'flex',
                                            justifyContent: isEn ? 'flex-start' : 'flex-end',
                                        }}
                                        size={{
                                            xs: 12,
                                            md: 4
                                        }}
                                    >
                                        {
                                            maximumWithdrawal && (
                                                <Button
                                                    variant="contained"
                                                    disableElevation
                                                    style={{
                                                        minWidth: 164,
                                                        backgroundColor: 'transparent',
                                                        borderRight: !isEn ? `1px dotted${satrexGreen}` : 'unset',
                                                        borderLeft: isEn ? `1px dotted${satrexGreen}` : 'unset',
                                                    }}
                                                    type="submit"
                                                    onClick={() => {
                                                        setWithdrawalAmount(maximumWithdrawal.maximumWithdrawalPerDayInToman);
                                                    }}
                                                >
                    <span style={{ color: satrexGreen, whiteSpace: 'nowrap', fontSize: 11 }}>
                      <Trans>Maximum daily withdrawal amount</Trans>
                    </span>
                                                </Button>
                                            )
                                        }
                                    </Grid>
                                </Grid>
                                <div style={{ marginTop: '5px' }}>
                                    <span style={{ color: 'red' }}>
                                    <Trans>Note : The withdrawal amount must be more than one hundred thousand tomans</Trans>
                                    </span>
                                </div>
                                <div>
                                    <div style={{ marginTop: '5px' }}>
                                        <span>
<Trans>TotalDailyWithdrawals</Trans>
                                            &nbsp;:
                                        </span>
                                        &nbsp;&nbsp;
                                        <span>
                                            {
                                                maximumWithdrawal
                                                && (
                                                    <satrexNumFormat
                                                        num={maximumWithdrawal.maximumWithdrawalPerDayInToman}
                                                    />
                                                )
                                            }
                                        </span>
                                    </div>
                                </div>
                                <div style={{ marginTop: '20px' }}>
                                    <div data-tut="selectedBankAccount">
                                        <label htmlFor="cardButton" className="inputLabel">
                                            <Trans>bankCard</Trans>
                                        </label>
                                        <IconButton
                                            id="cardButton"
                                            className={`${classes.countryButton}`}
                                            onClick={handleClick}

                                        >
                                            {selectedBankAccount.cardNumber && (
                                                <span
                                                    style={{ direction: 'ltr', fontSize: '16px' }}
                                                    className="faNum"
                                                >
                                              {selectedBankAccount.iban}
                                                </span>
                                            )}
                                        </IconButton>
                                    </div>
                                    <Menu
                                        elevation={2}
                                        id="simple-menu"
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        TransitionComponent={Fade}
                                        style={{ direction: 'ltr', width: '100%' }}
                                        classes={{
                                            list: classes.bankListStyle,
                                        }}
                                    >
                                        {bankAccounts && bankAccounts.map((item) => {
                                            if (item.lastConfirmationType === 'Accepted') {
                                                return (
                                                    <MenuItem
                                                        onClick={() => {
                                                            selectAccount(item);
                                                        }}
                                                        key={item.cardNumber}
                                                    >
                                                        <Grid container dir={!isEn ? 'ltr' : 'rtl'}>
                                                            <Grid style={{ marginTop: '5px' }} size={4}>
                                                                {item.cardNumber && (
                                                                    <Grid container>
                                                                        <Grid size={8}>
                                                                            <div style={{ marginTop: '9px' }}>
                                                                                {getBankName(item.cardNumber)[0]}
                                                                            </div>
                                                                        </Grid>
                                                                        <Grid size={4}>
                                                                            {
                                                                                getBankName(item.cardNumber)[1]
                                                                                && (
                                                                                    <img
                                                                                        src={getBankName(item.cardNumber)[1]}
                                                                                        style={{
                                                                                            width: '25px',
                                                                                            height: '30px',
                                                                                        }}
                                                                                        alt=""
                                                                                    />
                                                                                )
                                                                            }
                                                                        </Grid>
                                                                    </Grid>
                                                                )}
                                                            </Grid>
                                                            <Grid style={{ textAlign: 'center', marginTop: '5px' }} size={8}>
                                                                <div
                                                                    className="faNum"
                                                                    style={{ marginTop: '9px' }}
                                                                >
                                  <span className={classes.menuItemStyle}>

                                    {item.iban}
                                  </span>
                                                                </div>
                                                            </Grid>
                                                        </Grid>
                                                    </MenuItem>
                                                );
                                            }
                                        })}
                                        {_.filter(bankAccounts, (row) => row.lastConfirmationType === 'Accepted').length === 0 && (
                                            <MenuItem>
                                                <center style={{ width: '100%' }}>
                        <span className={isEn ? 'enNum' : 'faNum'}>
                          <Trans>No verified bank account found!</Trans>
                        </span>
                                                </center>
                                            </MenuItem>
                                        )}
                                    </Menu>

                                </div>
                                <div style={{ width: '100%', marginTop: '5px' }}>
                <span>
                 <Trans>SelectOneOfYourApprovedBankAccountsToReceiveTheMoney</Trans>
                </span>
                                </div>
                                <span
                                    style={{
                                        borderBottom: `solid 2px ${satrexGreen}`,
                                        color: satrexGreen,
                                        cursor: 'pointer',
                                    }}
                                    data-tut="addNewBankAccount"
                                >
                <AddIcon style={{ position: 'relative', top: '8px' }} />
                                    {' '}
                                    <span
                                        style={{ color: satrexGreen }}
                                        onClick={() => history.push({ pathname: '/edit-bank-info' })}

                                    >
                  <Trans>addBankAccount</Trans>
                                    </span>
                                </span>
                                <Grid container spacing={2} className={classes.inlineActionRow}>
                                    <Grid
                                        size={{
                                            xs: 12,
                                            md: 8
                                        }}
                                    >
                                        <SatrexInput
                                            dataTut="toFactorCode"
                                            label="TwoFactorCode"
                                            inputValue={twoFactorCode}
                                            classes={{
                                                root: classes.prominentInputRoot,
                                                input: classes.prominentInput,
                                            }}
                                            onChange={(e) => {
                                                setTwoFactorCode(e.target.value);
                                            }}
                                        />
                                    </Grid>
                                    <Grid
                                        size={{
                                            xs: 12,
                                            md: 4
                                        }}
                                        className={classes.inlineActionButtonCell}
                                    >
                                        <TimerButton
                                            timerSeconds={120}
                                            buttonProps={{
                                                variant: 'contained',
                                                color: 'primary',
                                                disableElevation: true,
                                                className: 'sendEmailCode',
                                                type: 'submit',
                                                style: {
                                                    width: '155px',
                                                },
                                                onClick: SendemailSecretCodeForRegisteredUser,
                                                disabled: !withdrawalAmount
                                                    || !selectedBankAccount.id
                                                    || withdrawalAmount < 100000
                                                    || !requestDate || !inventory || withdrawalAmount > inventory.totalTradable,
                                                classes: {
                                                    disabled: classes.buttonDisabled,
                                                },
                                                title: <span
                                                    style={{ whiteSpace: 'nowrap' }}
                                                >
                                                    <Trans>requestSMScode</Trans>
                                                </span>,
                                            }}
                                        />
                                    </Grid>
                                </Grid>

                                <div style={{ marginTop: '20px' }}>
                                    <SatrexInput
                                        dataTut="bankNetFee"
                                        isDisabled
                                        label="BankingNetworkTransferFee"
                                        inputValue={withdrawalAmount < 400000 ? (Math.max(withdrawalAmount * 0.01, 1000)) : (withdrawalAmount < 50000000 ? 4000 : (parseInt(withdrawalAmount / 50000000) * 4000))}
                                    />
                                </div>
                                <center style={{ paddingTop: 30, paddingBottom: 10 }}>
                                    <LoadingButton loading={withdrawalLoading}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            disableElevation
                                            style={{
                                                color: 'white',
                                                width: '100%',
                                            }}
                                            className="submitButton"
                                            type="submit"
                                            classes={{
                                                disabled: classes.buttonDisabled,
                                            }}
                                            disabled={
                                                withdrawalLoading
                                                || withdrawalAmount > inventory?.totalTradable
                                                || withdrawalAmount < 100000
                                                || !withdrawalAmount
                                                || !twoFactorCode
                                                || !selectedBankAccount.id
                                                || !requestDate
                                            }
                                            onClick={() => submitWithdrawalRequest()}
                                        >
                                            <Trans>SubmitWithdrawalRequest</Trans>
                                        </Button>
                                    </LoadingButton>
                                </center>
                            </div>
                        </Grid>
                    </div>
                </SatrexCard>
                {level?.code && level?.code === '0' && <SuspendNotif />}
            </div>
        </AnimatedPage>
    );
}
