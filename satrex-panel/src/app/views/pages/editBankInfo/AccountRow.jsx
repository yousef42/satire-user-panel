import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import InputMask from 'react-input-mask';
import { makeStyles } from '@mui/styles';
import { useSelector } from 'react-redux';
import { IconButton } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SaveIcon from '@mui/icons-material/Save';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import DeleteIcon from '@mui/icons-material/Delete';
import getBankName from './bankName';
import SatrexInput from '../../../components/SatrexInput';
import './editBankInfo.scss';
import Trans, { transFn } from '../../../components/lang';
import LoadingButton from '../../../components/LoadingButton';
import { LightTooltip } from '../../../components/LightTooltip';
import { satrexGreen, satrexRed } from '../../../../styles/colors';
import { removeBankAccount } from '../../../../utils/apis';
import { satrexApi } from '../../../components/api';
import satrexToast from '../../../components/satrexToast';
import { useQueryClient } from 'react-query';

const useStyles = makeStyles((theme) => ({
    accountStatus: {
        borderRadius: 8,
        minHeight: '46px',
        position: 'relative',
        backgroundColor: 'transparent !important',
        border: 'none',
        width: '100%',
        paddingRight: '5%',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        right: '-1px',
    },
    bankNameDiv: {
        borderRadius: 8,
        position: 'relative',
        border: 'solid 2px rgba(136,136,161,0.09) !important',
        width: '100%',
        height: '100%',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
    },
    bankLogo: {
        width: '30px',
        height: '34px',
        position: 'relative',
        top: '5px',
    },
    bankName: {
        position: 'relative',
        top: '-8px',
        right: ' 6px',
    },
    bankNameEn: {
        position: 'relative',
        top: '-8px',
        left: ' 6px',
    },
    inputRoot: {
        marginTop: '0px !important',
        border: 'none',
    },
    inputInput: {
        textAlign: 'center',
        fontFamily: 'enNum !important',
        border: 'solid 2px rgba(136,136,161,0.09) !important',
    },
    inputDisabled: {
        backgroundColor: 'rgb(136 136 161 / 5%) !important',

        '& input': {
            border: 'none !important',
        },
    },
    inputDisabledOdd: {
        backgroundColor: 'rgb(136 136 161 / 5%) !important',
        border: 'none !important',
    },
    iconButton: {
        border: 'solid 1px gray',
        borderRadius: '8px',
    },
}));

export default function (props) {
    const lang = useSelector((state) => state.user.language);
    const isEn = lang === 'EN' || lang === 'gr' || lang === 'fr';
    const satrexTheme = useSelector((state) => state.layout.theme);
    const classes = useStyles({ satrexTheme });
    const [loading, setLoading] = useState(false);
    const queryClient = useQueryClient();
    const [bankItem, setBankItem] = useState(props.item);
    const cardChange = (e) => {
        const cardNumber = e.target.value;
        setBankItem((prevState) => ({ ...prevState, cardNumber }));
        // bankItem.cardNumber = e.target.value;
    };
    const shebaChange = (e) => {
        const sheba = e.target.value;
        setBankItem((prevState) => ({ ...prevState, iban: sheba }));
    };

    const removingAccount = async (index) => {
        if (!bankItem.notSent) {
            const result = await removeBankAccount({
                id: bankItem.id,
            });
            if (result) {
                await queryClient.invalidateQueries('getBankAccount');
                setTimeout(() => {
                    props.setCardRows(queryClient.getQueryData('getBankAccount'));
                }, 300);
            }
        } else {
            props.setCardRows((cardRows) => cardRows.filter((item, i) => index !== i));
        }
    };

    useEffect(() => {
        setBankItem(props.item);
    }, [props.item]);
    const cancelAccount = (item) => {
        satrexApi()
            .post('/BankAccounts/CancelConfirmRequest', {
                id: item.id,
            })
            .then(({ data }) => {
                if (data.isSuccess) {
                    satrexToast(transFn('Request to verify review successfully cancelled'), 'success');
                    setBankItem((prevState) => ({ ...prevState, lastConfirmationType: 'Editable' }));
                } else {
                    data.Errors.forEach((err) => {
                        satrexToast(err.Description, 'error');
                    });
                }
            }).catch((err) => {
            satrexToast(transFn('failedInMission'), 'error');
        });
    };
    const submitAccount = (id) => {
        satrexApi()
            .post('/BankAccounts/SetConfirmRequest', {
                id,
            })
            .then(({ data }) => {
                if (data.isSuccess) {
                    satrexToast(transFn('Bank account successfully sent to admin'), 'success');
                    setBankItem((prevState) => ({ ...prevState, lastConfirmationType: 'ConfirmRequest' }));
                } else {
                    data.Errors.forEach((err) => {
                        satrexToast(err.Description, 'error');
                    });
                }
            }).catch((err) => {
            satrexToast(transFn('failedInMission'), 'error');
        });
        setLoading(false);
    };

    const savingAccount = (item) => {
        setLoading(true);
        satrexApi()
            .post('/BankAccounts/Add', {
                iban: item.iban,
                cardNumber: item.cardNumber.toString().replace(/ /g, ''),
            })
            .then(({ data }) => {
                if (data.isSuccess) {
                    setBankItem((prevState) => ({ ...prevState, notSent: false, id: data.data }));
                    submitAccount(data.data);
                } else {
                    data.Errors.forEach((err) => {
                        satrexToast(err.Description, 'error');
                    });
                    setLoading(false);
                }
            }).catch((err) => {
            setLoading(false);
            satrexToast(transFn('failedInMission'), 'error');
        });
    };

    // console.log(props.item);

    return (
        <Grid container>
            <Grid style={{ paddingLeft: '2px', paddingRight: '2px' }} size={3}>
                <InputMask
                    mask="**** **** **** ****"
                    formatChars={{ '*': '[0-9]' }}
                    maskChar=""
                    maskPlaceholder=""
                    inputProps={{
                        maxLength: 19,
                    }}
                    value={bankItem.cardNumber}
                    onChange={cardChange}
                >
                    {
                        (inputProps) => (
                            <SatrexInput
                                direction="ltr"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                    disabled: classes.inputDisabled,
                                }}
                                className={`${props.index % 2 === 0 ? 'bankInfoInput' : 'bankInfoInputOdd'} ${
                                    (bankItem.lastConfirmationType !== 'Editable'
                                        || !bankItem.notSent) && 'borderNone'
                                }`}
                                isDisabled={
                                    bankItem.lastConfirmationType !== 'Editable'
                                    || !bankItem.notSent
                                }
                                {...inputProps}
                            />
                        )
                    }
                </InputMask>
            </Grid>
            <Grid style={{ paddingLeft: '2px', paddingRight: '2px' }} size={3}>
                <InputMask
                    mask="IR************************"
                    formatChars={{ '*': '[0-9]' }}
                    maskChar=""
                    maskPlaceholder=""
                    onChange={shebaChange}
                    value={bankItem.iban}
                >
                    {(inputProps) => (
                        <SatrexInput
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                                disabled: classes.inputDisabled,
                            }}
                            className={`${props.index % 2 === 0 ? 'bankInfoInput' : 'bankInfoInputOdd'} ${
                                (bankItem.lastConfirmationType !== 'Editable'
                                    || !bankItem.notSent) && 'borderNone'
                            }`}
                            isDisabled={
                                bankItem.lastConfirmationType !== 'Editable'
                                || !bankItem.notSent
                            }
                            direction="ltr"
                            {...inputProps}
                        />
                    )}
                </InputMask>
            </Grid>
            <Grid
                style={{
                    textAlign: 'center',
                    paddingLeft: isEn ? '2px' : '0px',
                    paddingRight: isEn ? '0px' : '2px',
                }}
                size={3}>
                <div
                    className={`${classes.bankNameDiv}
           ${props.index % 2 === 0 ? 'bankInfoInput' : 'bankInfoInputOdd'}
           ${
                        bankItem.lastConfirmationType !== 'Editable'
                        || !bankItem.notSent
                            ? 'Mui-disabled '
                            : ''
                    }`}
                >
                    {' '}
                    {getBankName(bankItem.cardNumber)[1] && (
                        <img
                            src={getBankName(bankItem.cardNumber)[1]}
                            alt=""
                            className={classes.bankLogo}
                        />
                    )}
                    <span className={isEn ? classes.bankNameEn : classes.bankName}>
            {bankItem.cardNumber ? getBankName(bankItem.cardNumber)[0] : ''}
                    </span>
                </div>
            </Grid>
            <Grid
                style={{
                    paddingRight: !isEn ? '1px' : '6px',
                    paddingLeft: !isEn ? '5px' : '0px',
                }}
                size={3}>
                <Grid container className={classes.accountStatus}>
                    <Grid size={6}>
                        {
                            bankItem.lastConfirmationType === 'Accepted' && (
                                <label className="confirmedDiv">
                                    <Trans>accepted</Trans>
                                </label>
                            )
                        }
                        {
                            bankItem.lastConfirmationType === 'ConfirmRequest' && (
                                <label className="pendingDiv">
                                    <Trans>awaitingApproval</Trans>
                                </label>
                            )
                        }
                        {bankItem.lastConfirmationType === 'Rejected' && (
                            <Grid container>
                                <Grid size={6}>
                                    <label className="rejectedDiv">
                                        <Trans>rejected</Trans>
                                    </label>
                                </Grid>
                                <Grid size={6}>
                                    <HelpOutlineIcon
                                        style={{ color: 'red', paddingTop: '10px' }}
                                    />
                                </Grid>
                            </Grid>
                        )}
                    </Grid>
                    <Grid size={6}>
                        {!props.onlyShow && (
                            <Grid container>
                                <Grid style={{ minHeight: '44px' }} size={6}>
                                    <Grid container>
                                        <Grid size={6}>
                                            {bankItem.lastConfirmationType === 'Editable'
                                                && bankItem.notSent && (
                                                    <LoadingButton loading={loading}>
                                                        <LightTooltip
                                                            title={transFn('SaveAndSubmitForAdminApproval')}
                                                            aria-label={transFn('Save and send for confirmation')}
                                                        >
                                                            <IconButton
                                                                disabled={loading}
                                                                classes={{
                                                                    root: classes.iconButton,
                                                                }}
                                                                onClick={() => {
                                                                    savingAccount(bankItem);
                                                                }}
                                                            >
                                                                <SaveIcon
                                                                    style={{ color: satrexGreen }}
                                                                />
                                                            </IconButton>
                                                        </LightTooltip>
                                                    </LoadingButton>
                                                )}
                                            {bankItem.lastConfirmationType
                                                === 'ConfirmRequest' && (
                                                    <IconButton
                                                        classes={{
                                                            root: classes.iconButton,
                                                        }}
                                                        onClick={() => {
                                                            cancelAccount(bankItem);
                                                        }}
                                                    >
                                                        <HighlightOffIcon
                                                            style={{ color: satrexRed }}
                                                        />
                                                    </IconButton>
                                                )}
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid size={6}>
                                    {(bankItem.lastConfirmationType === 'Editable'
                                        || bankItem.lastConfirmationType === 'Rejected') && (
                                        <LightTooltip
                                            title={transFn('delete')}
                                            aria-label={transFn('delete')}
                                        >
                                            <IconButton
                                                classes={{
                                                    root: classes.iconButton,
                                                }}
                                                aria-label="delete"
                                                onClick={() => removingAccount(props.index)}
                                            >
                                                <DeleteIcon
                                                    style={{ color: satrexRed }}
                                                />
                                            </IconButton>
                                        </LightTooltip>
                                    )}
                                </Grid>
                            </Grid>
                        )}
                    </Grid>
                </Grid>
            </Grid>
            <style>
                {`
                  .Mui-disabled input {
                    border: none !important;
                  }
                `}
            </style>
        </Grid>
    );
}
