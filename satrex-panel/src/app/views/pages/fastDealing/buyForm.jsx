import React, { useEffect, useState } from 'react';
import { ButtonBase } from '@mui/material';
import {
    Grid, Menu, MenuItem,
} from '@mui/material';
import { Fade } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import starkString from 'starkstring';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useQueryClient } from 'react-query';
import { useTour } from '@reactour/tour';
import Trans, { transFn } from '../../../components/lang';
import SatrexInput from '../../../components/SatrexInput';
import { satrexGreen } from '../../../../styles/colors';
import { satrexApi } from '../../../components/api';
import { setTopbarValues } from '../../../redux/actions/LayoutActions';
import SatrexNumFormat from '../../../components/satrexNumFormat';
import useStyles from './styles';
import { setFastExchangeOrder } from '../../../../utils/apis';
import satrexToast from '../../../components/satrexToast';
import tourLoader from '../../../../utils/helpers/tourLoader';
import LoadingButton from '../../../components/LoadingButton';

export default function (props) {
    const [anchorEl, setAnchorEl] = useState('');
    const { coinList } = props;
    const [mounted, setMounted] = useState();
    const [amount, setAmount] = useState('');
    const { setIsOpen, setSteps } = useTour();
    const minimumTransactionsPrice = useSelector((state) => state.layout.minimumTransactionsPrice);
    const queryClient = useQueryClient();
    const dispatch = useDispatch();
    const [exchangePrice, setExchangePrice] = useState(0);
    const [totalPrice, setTotalPrice] = useState('');
    const lang = useSelector((state) => state.user.language);
    const satrexTheme = useSelector((state) => state.layout.theme);
    const classes = useStyles({ satrexTheme });
    const isEn = lang === 'EN' || lang === 'gr' || lang === 'fr';
    const textColor = satrexTheme ? '#334155' : '#dce6ff';
    const mutedTextColor = satrexTheme ? '#64748b' : '#9fb0d0';
    const [loading, setLoading] = useState(false);
    useEffect(() => {
            tourLoader(setIsOpen, setSteps, 'fast-dealing');
    }, []);
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

    const seletingCrypto = async (item) => {
        // await getFastExchangePrice({
        //     assetId: item.id,
        // });
        satrexApi()
            .post('/FastExchange/GetFastExchangePrice', {
                assetId: item.id,
            })
            .then(({ data }) => {
                setExchangePrice(data.data.fastExchangeBuyPriceInToman);
                setTotalPrice(amount * data.data.fastExchangeBuyPriceInToman);
            }).catch((err) => {
            satrexToast(transFn('failedInMission'), 'error');
        });
        setSelectedCrypto(item);

        handleClose();
    };
    const submitOrder = async () => {
        setLoading(true);
        if (amount * exchangePrice < minimumTransactionsPrice) {
             satrexToast(`${transFn('The minimum amount allowed for the transaction is ') + minimumTransactionsPrice}`, 'error');
        } else {
            const result = await setFastExchangeOrder({
                AssetId: selectedCrypto.id, Volume: amount, orderType: 'buy',
            });
            if (result) {
                dispatch(setTopbarValues());
                setAmount('');
                setTotalPrice('0');
                setExchangePrice(0);
                setSelectedCrypto({
                    englishTitle: null, id: null,
                });
                await queryClient.invalidateQueries('getTotalFundAndTradable');
            }
        }
        setLoading(false);
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
                        data-tut="chooseCrypto"
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
                        dataTut="setAmountFastdeal"
                        label="amount"
                        inputValue={amount}
                        type="number"
                        placeholder="0"
                        onChange={(e) => {
                            if ((exchangePrice * starkString(e.target.value).englishNumber().toString()).toFixedSpecial(8).length < 22) {
                                setAmount(starkString(e.target.value).englishNumber().toString());
                                setTotalPrice(exchangePrice * starkString(e.target.value).englishNumber().toString());
                            }
                        }}
                    />
                </div>
                <div className={classes.fieldBlock}>
                    <SatrexInput
                        dataTut="exchangePrice"
                        isDisabled
                        label={transFn('UnitPrice(Tomans)')}
                        isMoney
                        inputValue={exchangePrice.toFixed(14) * 1}
                    />
                </div>
                <div className={classes.fieldBlock}>
                    <SatrexInput
                        dataTut="totalAmount"
                        label={transFn('TotalAmount(Tomans)')}
                        isMoney
                        onChange={(e) => {
                            setTotalPrice(starkString(e.target.value.replace(/,/g, ''))
                                .englishNumber()
                                .toString());
                            if (exchangePrice && exchangePrice > 0) {
                                setAmount((parseInt(starkString(e.target.value.replace(/,/g, ''))
                                    .englishNumber()
                                    .toString()) / exchangePrice).toFixedSpecial(14));
                            }
                        }}
                        placeholder="0"
                        inputValue={totalPrice}
                    />
                </div>
                <div className={classes.amountInWords} style={{ color: mutedTextColor }}>
                    {parseInt(totalPrice) > 0 && `${starkString(parseInt(totalPrice).toFixed(0))
                        .digitsToWords()
                        .toString()} ${transFn('toman')} `}
                </div>
                <div data-tut="transactionDetail" className={classes.fieldBlock}>
                    <div className={classes.infoBlock}>
                        <div
                            className={classes.balanceRow}
                            style={{ color: satrexGreen }}
                        >
                            <Trans>inventory</Trans>
                            :&nbsp;
                            <span
                                className={!isEn ? 'faNum' : 'enNum'}
                                style={{ fontWeight: 'bold', fontSize: '14px', color: satrexGreen }}
                            >
                                <SatrexNumFormat num={props.tomanTotalFund} />
                            </span>
                            <span style={{ fontWeight: 'bold', fontSize: '14px', color: satrexGreen }}>
                                &nbsp;&nbsp;
                                <Trans>toman</Trans>
                            </span>
                        </div>

                        <div className={classes.infoCell}>
                            <Trans>fee</Trans>
                            :&nbsp;
                            <span>
                                {totalPrice ? (
                                    <SatrexNumFormat num={(props.fee / 100) * amount} />
                                ) : 0}
                            </span>
                            <span style={{ fontSize: 10 }}>
                                &nbsp;&nbsp;
                                {selectedAssetSuffix}
                            </span>
                        </div>
                        <div className={classes.infoCell}>
                            <Trans>UserDeposit</Trans>
                            :&nbsp;
                            <span>
                                {totalPrice ? (
                                    <SatrexNumFormat num={amount - ((props.fee / 100) * amount)} />
                                ) : 0}
                            </span>
                            <span style={{ fontSize: 10 }}>
                                &nbsp;&nbsp;
                                {selectedAssetSuffix}
                            </span>
                        </div>
                    </div>
                </div>
                <div data-tut="maxAmount" className={classes.maxAmountAction} style={{ color: satrexGreen }}>
                    <label
                        style={{ color: satrexGreen, cursor: 'pointer' }}
                        onClick={() => {
                            if (selectedCrypto.id) {
                                setAmount((props.tomanTotalFund / exchangePrice).toFixedSpecial(14));
                                setTotalPrice(exchangePrice * (props.tomanTotalFund / exchangePrice));
                            }
                        }}
                    >
                        <Trans>maxBuy</Trans>
                        :
                        {' '}
                        <span className="faNum">
                            {exchangePrice && (
                                <SatrexNumFormat num={props.tomanTotalFund / exchangePrice} />
                            )}
                        </span>
                    </label>
                </div>

                <div className={classes.submitButtonWrap}>
                    <LoadingButton loading={loading}>
                        <Button
                            className="greenButton"
                            classes={{
                                root: classes.buyButton,
                            }}
                            disabled={loading}
                            type="button"
                            onClick={submitOrder}
                        >
                            <Trans>registerBuyorder</Trans>
                        </Button>
                    </LoadingButton>
                </div>
            </div>
        </Grid>
    );
}
