import React, { useState } from 'react';
import ButtonBase from '@mui/material/ButtonBase';
import {
    Grid, Menu, MenuItem,
} from '@mui/material';
import Fade from '@mui/material/Fade';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import starkString from 'starkstring';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SatrexInput from '../../../components/SatrexInput';
import { satrexApi } from '../../../components/api';
import { setTopbarValues } from '../../../redux/actions/LayoutActions';
import SatrexNumFormat from '../../../components/satrexNumFormat';
import Trans, { transFn } from '../../../components/lang';
import useStyles from './styles';
import satrexToast from '../../../components/satrexToast';

export default function (props) {
    const [anchorEl, setAnchorEl] = useState('');
    const { coinList } = props;
    const dispatch = useDispatch();
    const [amount, setAmount] = useState('');
    const lang = useSelector((state) => state.user.language);
    const satrexTheme = useSelector((state) => state.layout.theme);
    const classes = useStyles({ satrexTheme });
    const [exchangePrice, setExchangePrice] = useState(0);
    const [totalPrice, setTotalPrice] = useState('');
    const [assetBalance, setAssetBalance] = useState(0);
    const isEn = lang === 'EN' || lang === 'gr' || lang === 'fr';
    const textColor = satrexTheme ? '#334155' : '#dce6ff';
    const mutedTextColor = satrexTheme ? '#64748b' : '#9fb0d0';
    const minimumTransactionsPrice = useSelector((state) => state.layout.minimumTransactionsPrice);
    const [selectedCrypto, setSelectedCrypto] = useState({
        englishTitle: '',
        id: null,
        imageAddress: '',
        alt: '',
    });

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const seletingCrypto = (item) => {
        satrexApi()
            .post('/FastExchange/GetFastExchangePrice', {
                assetId: item.id,
            })
            .then(({ data }) => {
                setExchangePrice(data.data.fastExchangeSellPriceInToman);
                setTotalPrice(amount * data.data.fastExchangeBuyPriceInToman);
            });
        satrexApi()
            .post('/Wallet/GetAssetBalance', {
                assetId: item.id,
            })
            .then(({ data }) => {
                setAssetBalance(data.data.totalTradable);
            });
        setSelectedCrypto(item);
        handleClose();
    };

    const submitOrder = () => {
        if (amount * exchangePrice < minimumTransactionsPrice) {
            return satrexToast(`${transFn('The minimum amount allowed for the transaction is ') + minimumTransactionsPrice}`, 'error');
        }
        satrexApi()
            .post('/FastExchange/Create', {
                AssetId: selectedCrypto.id,
                Volume: amount,
                orderType: 'sell',
            })
            .then(({ data }) => {
                dispatch(setTopbarValues());
                setAmount(0);
                setTotalPrice(0);
                setExchangePrice(0);
                setSelectedCrypto({
                    englishTitle: null,
                    id: null,
                });
                seletingCrypto(selectedCrypto);
                if (data.isSuccess) {
                    satrexToast(transFn('The request was successfully submitted '), 'success');
                } else {
                    data.Errors.forEach((err) => {
                        satrexToast(err.Description, 'error');
                    });
                }
            });
    };

    const open = Boolean(anchorEl);
    const selectedCryptoTitle = selectedCrypto.id
        ? (isEn ? selectedCrypto.englishTitle : selectedCrypto.persianTitle)
        : (isEn ? 'Choose' : 'انتخاب کنید');
    const selectedAssetSuffix = isEn ? selectedCrypto.englishTitle : selectedCrypto.persianTitle;
    return (
        <Grid container className={classes.formRoot}>
            <div className={classes.formStack}>
                <div className={classes.fieldBlock}>
                    <label htmlFor="cardButton" className={classes.fieldLabel}>
                        <Trans>chooseCrypto</Trans>
                    </label>
                    <ButtonBase
                        id="cardButton"
                        className={classes.countryButton}
                        onClick={handleClick}
                        type="button"
                    >
                        <div className={classes.triggerContent}>
                            <div className={classes.selectedAsset}>
                                {selectedCrypto.imageAddress ? (
                                    <img
                                        src={selectedCrypto.imageAddress}
                                        style={{ maxHeight: '22px', maxWidth: '22px', flexShrink: 0 }}
                                        alt={selectedCrypto.persianTitle}
                                    />
                                ) : (
                                    <span className={classes.assetPlaceholder} aria-hidden="true" />
                                )}
                                <span className={classes.assetLabel}>{selectedCryptoTitle}</span>
                            </div>
                            <div className={classes.chevronWrap}>
                                <ArrowDropDownIcon />
                            </div>
                        </div>
                    </ButtonBase>

                    <Menu
                        elevation={2}
                        id="simple-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        TransitionComponent={Fade}
                        style={{ width: '100%' }}
                        classes={{
                            paper: classes.popoverStyle,
                        }}
                    >
                        {coinList.map((item) => {
                            if (item.symbol !== 'TOMAN') {
                                return (
                                    <MenuItem
                                        key={item.id}
                                        onClick={() => {
                                            seletingCrypto(item);
                                        }}
                                        className={classes.menuItem}
                                    >
                                        <div
                                            className={classes.menuItemInner}
                                            style={{ flexDirection: isEn ? 'row-reverse' : 'row' }}
                                        >
                                            <div className={classes.menuIconWrap}>
                                                <img
                                                    src={item.imageAddress}
                                                    style={{ maxHeight: '22px', maxWidth: '22px' }}
                                                    alt=""
                                                />
                                            </div>
                                            <div style={{ textAlign: !isEn ? 'right' : 'left', flex: 1 }}>
                                                <span style={{ color: textColor }} className={classes.menuText}>
                                                    {isEn ? item.englishTitle : item.persianTitle}
                                                </span>
                                            </div>
                                        </div>
                                    </MenuItem>
                                );
                            }
                            return null;
                        })}
                    </Menu>
                </div>
                <div className={classes.fieldBlock}>
                    <SatrexInput
                        label="amount"
                        placeholder="0"
                        inputValue={amount}
                        type="number"
                        onChange={(e) => {
                            if (
                                (
                                    exchangePrice
                                    * starkString(e.target.value).englishNumber().toString()
                                ).toFixedSpecial(8).length < 22
                            ) {
                                setAmount(
                                    starkString(e.target.value).englishNumber().toString(),
                                );
                                setTotalPrice(
                                    exchangePrice
                                    * starkString(e.target.value).englishNumber().toString(),
                                );
                            }
                        }}
                    />
                </div>
                <div className={classes.fieldBlock}>
                    <SatrexInput
                        isDisabled
                        label={transFn('UnitPrice(Tomans)')}
                        isMoney
                        inputValue={exchangePrice.toFixed(14) * 1}
                    />
                </div>
                <div className={classes.fieldBlock}>
                    <SatrexInput
                        label={transFn('TotalAmount(Tomans)')}
                        isMoney
                        onChange={(e) => {
                            setTotalPrice(
                                starkString(e.target.value.replace(/,/g, ''))
                                    .englishNumber()
                                    .toString(),
                            );
                            if (exchangePrice && exchangePrice > 0) {
                                setAmount(
                                    parseInt(
                                        starkString(e.target.value.replace(/,/g, ''))
                                            .englishNumber()
                                            .toString(),
                                    ) > 0
                                        ? (
                                            parseInt(
                                                starkString(e.target.value.replace(/,/g, ''))
                                                    .englishNumber()
                                                    .toString(),
                                            ) / exchangePrice
                                        ).toFixedSpecial(14)
                                        : 0,
                                );
                            }
                        }}
                        inputValue={exchangePrice * amount}
                    />
                </div>
                <div className={classes.amountInWords} style={{ color: mutedTextColor }}>
                    {exchangePrice * amount > 0
                        && `${starkString(parseInt(totalPrice).toFixed(0))
                            .digitsToWords()
                            .toString()} ${transFn('toman')} `}
                </div>
                <div className={classes.fieldBlock}>
                    <div className={classes.infoBlock}>
                        <div
                            className={classes.balanceRow}
                            style={{ color: '#be464e' }}
                        >
                            <Trans>inventory</Trans>
                            :&nbsp;
                            <span className={!isEn ? 'faNum' : 'enNum'}>
                                {assetBalance}
                            </span>
                            <span style={{ fontSize: 10 }}>
                                &nbsp;&nbsp;
                                {selectedAssetSuffix}
                            </span>
                        </div>
                        <div className={classes.infoCell}>
                            <Trans>transactionValue</Trans>
                            :&nbsp;
                            <span className={!isEn ? 'faNum' : 'enNum'}>
                                <SatrexNumFormat num={exchangePrice * amount} />
                            </span>
                            <span style={{ fontSize: 10 }}>
                                &nbsp;&nbsp;
                                {selectedAssetSuffix}
                            </span>
                        </div>
                        <div className={classes.infoCell}>
                            <Trans>fee</Trans>
                            :&nbsp;
                            <span className={!isEn ? 'faNum' : 'enNum'}>
                                <SatrexNumFormat num={(props.fee / 100) * exchangePrice * amount} />
                            </span>
                            <span style={{ fontSize: 10 }}>
                                &nbsp;&nbsp;
                                <Trans>toman</Trans>
                            </span>
                        </div>
                        <div className={classes.infoCell}>
                            <Trans>UserDeposit</Trans>
                            :&nbsp;
                            <span className={!isEn ? 'faNum' : 'enNum'}>
                                <SatrexNumFormat
                                    num={exchangePrice * amount - (props.fee / 100) * exchangePrice * amount}
                                />
                            </span>
                            <span style={{ fontSize: 10 }}>
                                &nbsp;&nbsp;
                                <Trans>toman</Trans>
                            </span>
                        </div>
                    </div>
                </div>

                <div className={classes.maxAmountAction} style={{ color: '#be464e' }}>
                    <label
                        style={{ color: '#be464e', cursor: 'pointer' }}
                        onClick={() => {
                            if (selectedCrypto.id) {
                                setAmount((assetBalance).toPrecision(8));
                                setTotalPrice(
                                    exchangePrice * assetBalance,
                                );
                            }
                        }}
                    >
                        <Trans>maxSell</Trans>
                        :
                        {' '}
                        <span className="faNum">
                            {assetBalance}
                        </span>
                    </label>
                </div>
                <div className={classes.submitButtonWrap}>
                    <Button
                        className="redButton"
                        classes={{
                            root: classes.sellButton,
                        }}
                        type="button"
                        onClick={submitOrder}
                    >
                        <Trans>registerSellorder</Trans>
                    </Button>
                </div>
            </div>
        </Grid>
    );
}
