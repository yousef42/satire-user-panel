import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { bankConfirmed } from '../../../redux/actions/BankActions';
import AccountRow from './AccountRow';
import {
    satrexGreen,
} from '../../../../styles/colors';
import SatrexInput from '../../../components/SatrexInput';
import Trans, { transFn } from '../../../components/lang';
import { useBankAccountList } from '../../../../utils/queries';
import _ from "lodash"



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
    headerInput: {
        marginTop: '0px !important',
        '& input:disabled': {
            backgroundColor: 'rgba(77,52,0,0.07) !important',
            textAlign: 'center',
            border: 'none',
        },
    },
    iconButton: {
        border: 'solid 1px gray',
        borderRadius: '8px',
    },
}));

export default function (props) {
    const satrexTheme = useSelector((state) => state.layout.theme);
    const classes = useStyles({ satrexTheme });

    const [mounted, setMounted] = useState(false);
    const [cardRows, setCardRows] = useState([]);
    const dispatch = useDispatch();
    const lang = useSelector((state) => state.user.language);
    const isEn = lang === 'EN' || lang === 'gr' || lang === 'fr';
    const { data: bankAccounts, isLoading } = useBankAccountList();
    useEffect(() => {
        let isMounted = true;
        if (isMounted && bankAccounts) {
           const acceptedOne = _.findIndex(bankAccounts, { lastConfirmationType: 'Accepted' });
            if (acceptedOne !== -1) {
                dispatch(
                    bankConfirmed(
                        bankAccounts[acceptedOne].lastConfirmationType,
                    ),
                );
            } else dispatch(bankConfirmed(false));
            // setGotCards(true);
            setCardRows(bankAccounts);
        }
        return () => { isMounted = false; };
    }, [bankAccounts]);

    // const getBankAccounts = () => {
    //     satrexApi()
    //         .post('/BankAccounts/GetList')
    //         .then(({ data }) => {
    //             if (
    //                 _.findIndex(data.data, { lastConfirmationType: 'Accepted' }) !== -1
    //             ) {
    //                 dispatch(
    //                     bankConfirmed(
    //                         data.data[
    //                             _.findIndex(data.data, { lastConfirmationType: 'Accepted' })
    //                             ].lastConfirmationType,
    //                     ),
    //                 );
    //             } else dispatch(bankConfirmed(false));
    //             setCardRows(data.data);
    //         });
    // };

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            setMounted(true);
        }
        return () => {
            isMounted = false;
        };
    }, []);

    const newBankRow = {
        cardNumber: '',
        iban: '',
        lastConfirmationType: 'Editable',
        notSent: true,
    };
    const addNewRow = () => {
        setCardRows([...cardRows, newBankRow]);
    };

    return (
        <div>
            <div
                style={{
                    paddingRight: '2%',
                    paddingLeft: '2%',
                    paddingBottom: '20px',
                }}
            >
                <Grid container style={{ marginTop: 20 }} data-tut="bankAccountsList">
                    <Grid size={12}>
                        <Grid container spacing={1}>
                            <Grid size={12}>
                                <Grid container>
                                    <Grid style={{ paddingLeft: '2px', paddingRight: '2px' }} size={3}>
                                        <SatrexInput
                                            className="borderNone"
                                            classes={{ root: classes.headerInput }}
                                            isDisabled
                                            inputValue={transFn('bankCardNumber')}
                                        />
                                    </Grid>
                                    <Grid style={{ paddingLeft: '2px', paddingRight: '2px' }} size={3}>
                                        <SatrexInput
                                            className="borderNone"
                                            classes={{ root: classes.headerInput }}
                                            isDisabled
                                            inputValue={transFn('bankIbanNumber')}
                                        />
                                    </Grid>
                                    <Grid style={{ paddingLeft: '2px', paddingRight: '2px' }} size={3}>
                                        <SatrexInput
                                            className="borderNone"
                                            classes={{ root: classes.headerInput }}
                                            isDisabled
                                            inputValue={transFn('bankName')}
                                        />
                                    </Grid>
                                    <Grid style={{ paddingLeft: '2px', paddingRight: '2px' }} size={3}>
                                        <SatrexInput
                                            className="borderNone"
                                            classes={{ root: classes.headerInput }}
                                            isDisabled
                                            inputValue={transFn('status')}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        { !isLoading && cardRows.map((item, index) => (
                            <Grid container spacing={1} key={index}>
                                <Grid size={12}>
                                    <AccountRow
                                        setCardRows={setCardRows}
                                        item={item}
                                        index={index}
                                        onChange={(e) => (item.cardNumber = e.target.value)}
                                    />
                                </Grid>

                            </Grid>
                        ))}
                        {!props.onlyShow && (
                            <Grid container>
                                <Grid size={12}>
                    <span
                        style={{
                            borderBottom: `solid 2px ${satrexGreen}`,
                            color: satrexGreen,
                            cursor: 'pointer',
                        }}
                        data-tut="addNewRow"
                        onClick={addNewRow}
                    >
                      <AddIcon style={{ position: 'relative', top: '8px' }} />
                        {' '}
                        <span style={{ color: satrexGreen }}>
                        <Trans>addBankAccount</Trans>
                        </span>
                    </span>
                                </Grid>
                            </Grid>
                        )}
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}
