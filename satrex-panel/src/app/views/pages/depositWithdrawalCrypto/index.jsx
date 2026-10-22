import React, {useEffect, useMemo, useState} from 'react';
import { Grid } from '@mui/material';
import { IconButton } from '@mui/material';
import { ButtonBase } from '@mui/material';
import { alpha } from '@mui/material';
import { createTheme, Menu, MenuItem, Popover } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useSelector, useDispatch } from 'react-redux';
import { Fade } from '@mui/material';
import { Button } from '@mui/material';
import QRCode from 'react-qr-code';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import { useHistoryCompat as useHistory } from '../../../router/routerCompat';
import { CheckCircleOutline } from '@mui/icons-material';
import { useTour } from '@reactour/tour';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Trans, { transFn } from '../../../components/lang';
import SatrexInput from '../../../components/SatrexInput';
import WarningAlert from '../../../components/warningAlert';
import {
    satrexBorderDarkColor,
    satrexGreen,
    satrexSemiDarkerBlueDarkMode,
    satrexSemiGray,
} from '../../../../styles/colors';
import { satrexApi, satrexApiV3 } from '../../../components/api';
import LoadingButton from '../../../components/LoadingButton';
import SuspendNotif from '../../../components/suspendNotif';
import ThemeAtrr from '../../../MasterLayout/MasterTheme/ThemeAtrr';
import tourLoader from '../../../../utils/helpers/tourLoader';
import Copied from '../../../components/Copied';
import SatrexCard from '../../../components/SatrexCard';
import AnimatedPage from '../../../components/AnimatedPage';
import satrexToast from '../../../components/satrexToast';
import { useAssetList } from '../../../../utils/queries';
import satrexNumFormat from '../../../components/satrexNumFormat';
import TimerButton from '../../../components/TimerButton';
import _ from "lodash"
// import cryptoWithdrawalLimitation
const useStyles = makeStyles((theme) => ({
    countryButton: {
        borderRadius: 8,
        position: 'relative',
        justifyContent: 'flex-start !important',
        border: (props) => `1px solid ${props.satrexTheme ? '#cbd5e1' : satrexBorderDarkColor}`,
        backgroundColor: (props) => `${props.satrexTheme ? '#ffffff' : satrexSemiDarkerBlueDarkMode} !important`,
        color: (props) => `${props.satrexTheme ? '#0f172a' : '#f8fbff'} !important`,
        fontSize: 16,
        minHeight: 50,
        width: '100%',
        padding: '12px 14px',
        boxShadow: (props) => (props.satrexTheme
            ? '0 1px 2px rgba(15,23,42,0.07)'
            : '0 0 0 1px rgba(255,255,255,0.06)'),
        '& svg': {
            color: (props) => `${props.satrexTheme ? '#64748b' : '#b8c6e3'} !important`,
        },
        '&:focus': {
            boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
            borderColor: theme.palette.primary.main,
        },
        '&:hover': {
            backgroundColor: (props) => `${props.satrexTheme ? '#f8fafc' : '#171b2f'} !important`,
        },
    },
    depositInputFa: {
        marginTop: '7px !important',
        paddingLeft: '2% !important',
        '& input': {
            paddingLeft: 40,
            borderRadius: 10,
            borderColor: (props) => `${props.satrexTheme ? '#cbd5e1' : '#4a4f67'} !important`,
            boxShadow: (props) => (props.satrexTheme
                ? '0 1px 2px rgba(15,23,42,0.06)'
                : '0 0 0 1px rgba(255,255,255,0.05)'),
            backgroundColor: (props) => (props.satrexTheme ? '#f4f4f7 !important' : (ThemeAtrr(props.extraTheme, true) ? `${ThemeAtrr(props.extraTheme, true).addressInput.backgroundColor} !important` : '#0e0f1c !important')),
        },
    },
    depositInputEn: {
        marginTop: '7px !important',
        paddingRight: '2% !important',
        '& input': {
            paddingRight: 40,
            borderRadius: 10,
            borderColor: (props) => `${props.satrexTheme ? '#cbd5e1' : '#4a4f67'} !important`,
            boxShadow: (props) => (props.satrexTheme
                ? '0 1px 2px rgba(15,23,42,0.06)'
                : '0 0 0 1px rgba(255,255,255,0.05)'),
            backgroundColor: (props) => (props.satrexTheme ? '#f4f4f7 !important' : (ThemeAtrr(props.extraTheme, true) ? `${ThemeAtrr(props.extraTheme, true).addressInput.backgroundColor} !important` : '#0e0f1c !important')),
        },
    },
    menuStyle: {
        padding: '6px !important',
    },
    popoverStyle: {
        minWidth: '280px !important',
        maxHeight: '500px !important',
        borderRadius: '12px !important',
        border: (props) => `1px solid ${props.satrexTheme ? '#d9e2ec' : satrexBorderDarkColor}`,
        backgroundColor: (props) => `${props.satrexTheme ? '#ffffff' : '#11162a'} !important`,
        boxShadow: (props) => (props.satrexTheme
            ? '0 18px 40px rgba(15,23,42,0.12) !important'
            : '0 18px 40px rgba(0,0,0,0.35) !important'),
    },
    buttonDisabled: {
        backgroundColor: `${satrexSemiGray} !important`,
    },
    withdrawAllButton: {
        minWidth: 155,
        height: 42,
        paddingInline: 14,
        borderRadius: 8,
        backgroundColor: (props) => `${props.satrexTheme ? '#f1f5f9' : 'rgba(255,255,255,0.06)'} !important`,
        border: (props) => `1px solid ${props.satrexTheme ? '#cbd5e1' : satrexBorderDarkColor}`,
        boxShadow: 'none !important',
        whiteSpace: 'nowrap',
        '&:hover': {
            backgroundColor: (props) => `${props.satrexTheme ? '#e2e8f0' : 'rgba(255,255,255,0.1)'} !important`,
        },
        '& span': {
            color: (props) => `${props.satrexTheme ? '#0f172a' : satrexGreen} !important`,
            fontSize: 13,
            fontWeight: 600,
            whiteSpace: 'nowrap',
        },
    },
    menuItem: {
        minHeight: 44,
        borderRadius: 8,
        marginBottom: 4,
        color: (props) => `${props.satrexTheme ? '#0f172a' : '#edf2ff'} !important`,
        '&:last-child': {
            marginBottom: 0,
        },
        '&:hover': {
            backgroundColor: (props) => `${props.satrexTheme ? '#f8fafc' : 'rgba(255,255,255,0.06)'} !important`,
        },
    },
    networkSection: {
        marginTop: '20px',
        padding: '14px 16px',
        borderRadius: 10,
        border: (props) => `1px solid ${props.satrexTheme ? '#e2e8f0' : satrexBorderDarkColor}`,
        backgroundColor: (props) => `${props.satrexTheme ? '#ffffff' : 'rgba(255,255,255,0.02)'}`,
    },
    networkLabelRow: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: 12,
        whiteSpace: 'nowrap',
    },
    networkChipsRow: {
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        gap: 10,
        justifyContent: 'flex-start',
    },
    prominentInputRoot: {
        width: '100%',
    },
    prominentInput: {
        border: (props) => `2px solid ${props.satrexTheme ? '#c7d2e3' : '#6c7695'} !important`,
        backgroundColor: (props) => `${props.satrexTheme ? '#ffffff' : 'rgba(255,255,255,0.06)'} !important`,
        boxShadow: (props) => (props.satrexTheme
            ? '0 2px 8px rgba(15,23,42,0.06)'
            : '0 0 0 1px rgba(255,255,255,0.04)'),
    },
    inlineActionRow: {
        marginTop: 20,
        alignItems: 'center',
    },
    inlineActionButtonCell: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
}));

const materialTheme = createTheme({
    overrides: {
        MuiPopover: {
            paper: {
                width: '20%',
            },
        },
        MuiMenu: {
            list: {
                padding: '0px',
            },
        },
    },
});

export default function () {
    const dispatch = useDispatch();
    const satrexTheme = useSelector((state) => state.layout.theme);
    const extraTheme = useSelector((state) => state.layout.extraTheme);
    const classes = useStyles({ satrexTheme, extraTheme });

    const [selectedCrypto, setSelectedCrypto] = useState({
        englishTitle: '',
        persianTitle: '',
        id: null,
        imageAddress: '',
        alt: '',
    });
    const [blockchainAddress, setBlockchainAddress] = useState({
        address: null,
    });
    const [selectedCryptoForWithdrawal, setSelectedCryptoForWithdrawal] = useState({
        englishTitle: '',
        persianTitle: '',
        id: null,
        imageAddress: '',
        alt: '',
    });

    const [withdrawalAmount, setWithdrawalAmount] = useState('');
    const [twoFactorCode, setTwoFactorCode] = useState('');
    const [assetInventoryDeposit, setAssetInventoryDeposit] = useState(null);
    const [networkList, setNetworkList] = useState([]);
    const [withdrawalNetworkList, setWithdrawalNetworkList] = useState([]);
    const [assetInventoryWithdrawal, setAssetInventoryWithdrawal] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const history = useHistory();
    const [destinationWalletAddress, setDestinationWalletAddress] = useState('');
    const [anchorElForWithdrawal, setAnchorElForWithdrawal] = useState(null);
    const [popOverAnchorEl, setPopOverAnchorEl] = useState(null);
    const [loading, setLoading] = useState(false);
    const level = useSelector((state) => state.layout.totals.qualifyLevel);
    const [addressList, setAddressList] = useState([]);
    const [walletListAnchorEl, setWalletListAnchorEl] = React.useState(null);
    const walletListOpen = Boolean(walletListAnchorEl);
    const { setIsOpen, setSteps } = useTour();
    const [withdrawalNetwork, setWithdrawalNetwork] = useState(0);
    const [networkExtraField, setNetworkExtraField] = useState(null);
    const { data: coinList } = useAssetList();
    const [limitationText, setLimitationText] = useState('')
    const getLowestFeeNetworkId = (networks) => _.minBy(networks || [], 'networkFee')?.network?.id || 0;
    // const selectedCryptoLimitation = useMemo(() => {
    //     if (depositNetwork) {
    //         const selector = `${selectedNetWork?.network?.symbol}-${selectedNetWork?.network?.title}`.toUpperCase();
    //         let limitation
    //         if (cryptoWithdrawalLimitation[selector]) {
    //             limitation =  cryptoWithdrawalLimitation[selector]
    //         } else if (cryptoWithdrawalLimitation[selectedNetWork?.network?.symbol]) {
    //             limitation = cryptoWithdrawalLimitation[selectedNetWork?.network?.symbol]
    //         }
    //         if(limitation){
    //             const text = ` حداقل مقدار برداشت برای${selectedNetWork?.network?.symbol} و شبکه ${selectedNetWork?.network.title} برابر با ${limitation} است `
    //             setLimitationText(text)
    //         }else{
    //             setLimitationText('')
    //         }
    //         return limitation
    //     }
    // }, [depositNetwork, selectedNetWork])
    const handleWalletListClick = async (event) => {
        const status = event.currentTarget;
        const { data } = await satrexApi().post('/DepositAsset/GetList', {
            assetId: selectedCrypto.id,
            networkId: 0,
        });
        if (data.isSuccess) {
            setAddressList(data.data.walletAddresses);
            setWalletListAnchorEl(status);
        }

        return true;
    };
    const handleWalletListClose = () => {
        setWalletListAnchorEl(null);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClickForWithdrawal = (event) => {
        setAnchorElForWithdrawal(event.currentTarget);
    };

    const handleCloseForWithdrawal = () => {
        setAnchorElForWithdrawal(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const pasteAddress = () => {
        navigator.clipboard
            .readText()
            .then((text) => {
                setDestinationWalletAddress(text);
            })
            .catch((err) => {
                satrexToast(transFn('clipboardPermissionsError'), 'error');
            });
    };

    const seletingCrypto = (item) => {
        if (!item?.id) {
            console.error('[DepositWithdrawalCrypto] Invalid deposit asset selection', item);
            return;
        }
        satrexApi()
            .post('/Asset/GetSupportedNetworks', {
                assetId: item.id,
            })
            .then(({ data }) => {
                const networks = Array.isArray(data?.data) ? data.data : [];
                const minFeeId = getLowestFeeNetworkId(networks);
                if (minFeeId) {
                    satrexApi()
                        .post('/DepositAsset/GetTotalReceivedAsset', {
                            assetId: item.id,
                            networkId: minFeeId,
                        })
                        .then(({ data: inventoryData }) => {
                            setAssetInventoryDeposit(inventoryData.data);
                        });
                } else {
                    setAssetInventoryDeposit(null);
                }
                setDepositNetwork(minFeeId);
                setNetworkList(networks);
            })
            .catch((error) => {
                console.error('[DepositWithdrawalCrypto] Failed to load deposit networks', error);
            });
        setSelectedCrypto(item);
        setBlockchainAddress({ address: null });
        handleClose();
    };
    const seletingCryptoForWithdrawal = (item) => {
        if (!item?.id) {
            console.error('[DepositWithdrawalCrypto] Invalid withdrawal asset selection', item);
            return;
        }
        satrexApi()
            .post('/Asset/GetSupportedNetworks', {
                assetId: item.id,
            })
            .then(({ data }) => {
                const networks = Array.isArray(data?.data) ? data.data : [];
                const minFeeId = getLowestFeeNetworkId(networks);
                if (minFeeId) {
                    satrexApi()
                        .post('/Wallet/GetAssetBalance', {
                            assetId: item.id,
                            networkId: minFeeId,
                        })
                        .then(({ data: balanceData }) => {
                            setAssetInventoryWithdrawal(balanceData?.data?.totalTradable ?? null);
                        });
                } else {
                    setAssetInventoryWithdrawal(null);
                }
                if (networks.length > 0) {
                    setWithdrawalNetwork(minFeeId);
                    setWithdrawalNetworkList(networks);
                } else {
                    setWithdrawalNetwork(0);
                    setWithdrawalNetworkList([]);
                }
            })
            .catch((error) => {
                console.error('[DepositWithdrawalCrypto] Failed to load withdrawal networks', error);
            });

        setSelectedCryptoForWithdrawal(item);
        setWithdrawalAmount('');
        setDestinationWalletAddress('');
        handleCloseForWithdrawal();
    };

    const selectedNetWork = withdrawalNetworkList.find((item) => item.network.id === withdrawalNetwork);
    const updateInventory = () => {
        satrexApi()
            .post('/DepositAsset/GetTotalReceivedAsset', {
                assetId: selectedCrypto.id,
                networkId: depositNetwork,
            })
            .then(({ data }) => {
                if (data.isSuccess) {
                    setAssetInventoryDeposit(data.data);
                }
            }).catch((err) => {
            satrexToast(transFn('failedInMission'), 'error');
        });
    };


    const handleAddressSelection = (address) => {
        handleWalletListClose();
        setBlockchainAddress(address);
    };

    const showInventory = () => {
        satrexApi()
            .post('/DepositAsset/GetWalletAddress', {
                assetId: selectedCrypto.id,
                networkId: depositNetwork,
            })
            .then(({ data }) => {
                if (data.isSuccess) {
                    if (data.data !== undefined) setBlockchainAddress(data.data);
                }
            }).catch((err) => {
            satrexToast(transFn('clipboardPermissionsError'), 'error');
        });
    };

    const handlePopOverClick = (event) => {
        if (blockchainAddress) {
            setPopOverAnchorEl(event.currentTarget);
            setTimeout(() => {
                setPopOverAnchorEl(null);
            }, 1000);
        }
    };

    const handlePopOverClose = () => {
        setPopOverAnchorEl(null);
    };

    const sendEmailSecretCode = () => {
        satrexApiV3()
            .post('/User/SendemailSecretCodeForRegisteredUser', {})
            .then((data) => {
                satrexToast(transFn('codeWasSent'), 'success');
            }).catch((err) => {
            satrexToast(transFn('failedInMission'), 'error');
        });
    };

    const getFee = () => {
        if (withdrawalNetworkList) {
            const net = withdrawalNetworkList.find((item) => item.network.id === withdrawalNetwork);
            if (net) {
                // console.log(net);
                if (net.networkFee !== -1) return net.networkFee;
                return transFn('Depending on network traffic');
            }
        }
        return undefined;
    };

    const submitWithdrawalRequest = async () => {
        // if (!selectedCryptoForWithdrawal.id)
        //   return addToast(transFn('selectCryptoRequired'), {
        //     appearance: "error",
        //     autoDismiss: true,
        //   });
        // if (withdrawalAmount <= 0)
        //   return addToast(transFn('WithdrawalMustBe>0'), {
        //     appearance: "error",
        //     autoDismiss: true,
        //   });
        // if (!destinationWalletAddress)
        //   return addToast(transFn('EnterDestinationWalletAddress'), {
        //     appearance: "error",
        //     autoDismiss: true,
        //   });
        // if (!twoFactorCode)
        //   return addToast(transFn('toFactorCodeRequired'), {
        //     appearance: "error",
        //     autoDismiss: true,
        //   });
        setLoading(true);
        try {
            const { data } = await satrexApi().post('/ExternalWithdraw/Create', {
                assetId: selectedCryptoForWithdrawal.id,
                volume: withdrawalAmount,
                externalDestinationWalletAddress: destinationWalletAddress,
                twoFactorAuthSecretCode: twoFactorCode,
                networkId: withdrawalNetwork,
                childWalletExtraFieldValue: networkExtraField ?? undefined,
            });
            setLoading(false);
            if (data.isSuccess) {
                satrexToast(transFn('WithdrawalRequestRegisteredSuccessfully'), 'success');
                setTimeout(() => {
                    history.push({
                        pathname: '/requests',
                    });
                }, 200);
            } else {
                data.Errors.forEach((err) => {
                    satrexToast(err.Description, 'error');
                });
            }
        } catch (err) {
            setLoading(false);
            satrexToast(transFn('failedInMission'), 'error');
        }
    };

    const open = Boolean(anchorEl);
    const withdrawalOpen = Boolean(anchorElForWithdrawal);

    const [depositNetwork, setDepositNetwork] = useState(0);

    const lang = useSelector((state) => state.user.language);
    const isEn = lang === 'EN' || lang === 'gr' || lang === 'fr';
    const popOverOpen = Boolean(popOverAnchorEl);
    const popOverId = popOverOpen ? 'simple-popover' : undefined;

    // console.log(_.mapValues(blockchainAddress, function (item,key) {
    //     return <div style={{textAlign:'left'}}> <img src={greenDot} style={{position: 'relative',top:7}} alt="" className="dot"/></div>
    //     // return <div style={{textAlign:'left'}}> <img src={greenDot} style={{position: 'relative',top:7}} alt="" className="dot"/></div>
    // }))

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            tourLoader(setIsOpen, setSteps, 'deposit-withdrawal-crypto');
            if (coinList && history.location.state?.asset) {
                const selectedAsset = coinList.find((item) => (item.englishTitle).toLowerCase() === (history.location.state.asset).toLowerCase());
                if (!selectedAsset) {
                    console.error('[DepositWithdrawalCrypto] Asset from route state was not found', history.location.state);
                } else if (history.location.state.type === 'withdrawal') {
                    seletingCryptoForWithdrawal(selectedAsset);
                } else {
                    seletingCrypto(selectedAsset);
                }
            }
        }
        return () => {
            isMounted = false;
        };
    }, [coinList]);

    return (
        <AnimatedPage>
            <Grid container spacing={1} style={{ marginTop: '24px' }}>
                <Grid
                    size={{
                        xs: 12,
                        lg: 6
                    }}>
                    <SatrexCard header="Deposit" style={{ height: '100%' }}>
                        <div style={{ padding: '20px' }}>
                            <p style={{ lineHeight: '2' }}>
                                <Trans>depositWithdrawalCryptoPageLine1</Trans>
                            </p>
                            <div data-tut="chooseCoin">
                                <label htmlFor="cardButton" className="inputLabel">
                                    <Trans>chooseCrypto</Trans>
                                </label>
                                <ButtonBase

                                    id="cardButton"
                                    className={`${classes.countryButton}`}
                                    onClick={handleClick}
                                >
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            width: '100%',
                                            direction: isEn ? 'ltr' : 'rtl',
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: 'flex',
                                                flex: 1,
                                                alignItems: 'center',
                                                justifyContent: isEn ? 'flex-start' : 'flex-end',
                                            }}
                                        >
                                            <img
                                                src={selectedCrypto.imageAddress}
                                                style={{ maxHeight: '23px', maxWidth: '23px', marginTop: 3 }}
                                                alt={selectedCrypto.persianTitle}
                                            />
                                            &nbsp;&nbsp;&nbsp;&nbsp;
                                            <span
                                                style={{ direction: 'ltr', fontSize: '16px' }}
                                                className={isEn ? 'enNum' : 'faNUm'}
                                            >
                {isEn
                    ? selectedCrypto.englishTitle
                    : selectedCrypto.persianTitle}
                                            </span>
                                        </div>
                                        <div style={{ width: 30 }}>
                                            <ArrowDropDownIcon style={{ position: 'relative', top: 3 }} />
                                        </div>
                                    </div>

                                </ButtonBase>
                            </div>

                            <Menu
                                elevation={2}
                                id="simple-menu"
                                anchorEl={anchorEl}
                                open={open}
                                classes={{
                                    list: classes.menuStyle,
                                    paper: classes.popoverStyle,
                                }}
                                onClose={handleClose}
                                TransitionComponent={Fade}
                                style={{ direction: isEn ? 'ltr' : 'rtl', width: '100%' }}
                            >
                                {coinList && coinList.map((item, index) => {
                                    if (item.symbol !== 'TOMAN') {
                                        return (
                                            <MenuItem
                                                key={item.id}
                                                className={classes.menuItem}
                                                onClick={() => {
                                                    seletingCrypto(item);
                                                }}
                                            >
                                                <Grid
container
spacing={1}
                                                      style={{
                                                          flexDirection: isEn ? 'row' : 'row-reverse',
                                                          width: '100%',
                                                          alignItems: 'center',
                                                      }}
                                                >
                                                    <Grid style={{ display: 'flex', justifyContent: 'center' }} size={3}>
                                                        <img
                                                            src={item.imageAddress}
                                                            style={{ maxHeight: '23px', maxWidth: '23px' }}
                                                            alt=""
                                                        />
                                                    </Grid>
                                                    <Grid style={{ textAlign: isEn ? 'left' : 'right' }} size={9}>
                          <span>
                            {isEn ? item.englishTitle : item.persianTitle}
                          </span>
                                                    </Grid>
                                                </Grid>
                                            </MenuItem>
                                        );
                                    }
                                })}
                            </Menu>
                            <div style={{ marginTop: '20px' }} data-tut="walletBalance">
                                  <span className="inputLabel">
                                    <Trans>walletBalance</Trans>
                                  </span>
                                {' '}
                                :
                                {' '}
                                {
                                    assetInventoryDeposit && <satrexNumFormat num={assetInventoryDeposit} />
                                }
                            </div>
                            <div className={classes.networkSection} data-tut="chooseNetwork">
                                <div className={classes.networkLabelRow}>
                                <span
                                    style={{ color: satrexTheme ? '#0e0139' : 'white' }}
                                >
<Trans>Choose Network</Trans>
                                </span>
                                    &nbsp;:&nbsp;
                                </div>
                                <div className={classes.networkChipsRow}>
                                    {
                                        networkList.map((item, index) => (
                                            <div
                                                key={index}
                                            >
                                                <Button

                                                    disableElevation
                                                    onClick={() => setDepositNetwork(item.network.id)}
                                                    className={` chipBtn ${depositNetwork === item.network.id ? 'selectedChipBtn' : ''}`}
                                                    type="button"
                                                    style={{
                                                        width: 'fit-content',
                                                        whiteSpace: 'nowrap',
                                                        paddingRight: 15,
                                                        paddingLeft: 15,
                                                        height: 33,
                                                    }}
                                                >
                                                    {
                                                        depositNetwork === item.network.id
                                                        && (
                                                            <>
                                                                <CheckCircleOutline style={{
                                                                    position: 'relative',
                                                                    right: isEn ? 'unset' : -10,
                                                                    left: !isEn ? 'unset' : -10,
                                                                }}
                                                                />
                                                                &nbsp;
                                                            </>
                                                        )
                                                    }
                                                    {
                                                        item.network.title
                                                    }
                                                </Button>
                                            </div>
                                        ))
                                    }

                                </div>
                            </div>

                            <Grid container style={{ marginTop: 20 }} spacing={2}>
                                <Grid>
                                    <Button
                                        data-tut="updateInvestory"
                                        variant="contained"
                                        color="primary"
                                        disableElevation
                                        style={{
                                            color: 'white',
                                            minWidth: '130px',
                                            width: 'fit-content',
                                            whiteSpace: 'nowrap',
                                        }}
                                        className="sendEmailCode"
                                        type="submit"
                                        onClick={updateInventory}
                                        disabled={!selectedCrypto?.persianTitle}
                                        classes={{
                                            disabled: classes.buttonDisabled,
                                        }}
                                    >
                                        <Trans>updateInventory</Trans>
                                    </Button>
                                </Grid>

                                <Grid>
                                    <Button
                                        data-tut="showBlockchainAddress"
                                        variant="contained"
                                        color="primary"
                                        disableElevation
                                        style={{ color: 'white', width: 'fit-content', whiteSpace: 'nowrap' }}
                                        className="sendEmailCode"
                                        type="submit"
                                        onClick={showInventory}
                                        disabled={!selectedCrypto?.persianTitle}
                                        classes={{
                                            disabled: classes.buttonDisabled,
                                        }}
                                    >
                                        <Trans>showAddress</Trans>
                                    </Button>
                                    <Menu
                                        id="demo-positioned-menu"
                                        aria-labelledby="demo-positioned-button"
                                        anchorEl={walletListAnchorEl}
                                        open={walletListOpen}
                                        onClose={handleWalletListClose}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'left',
                                        }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'left',
                                        }}
                                    >
                                        {
                                            addressList.map((item, index) => (
                                                <MenuItem
                                                    key={index}
                                                    onClick={() => handleAddressSelection(item.address)}
                                                >
                                                    {item.address}
                                                </MenuItem>
                                            ))
                                        }
                                    </Menu>
                                </Grid>

                                {/* <Grid item> */}
                                {/*    <Button */}
                                {/*        data-tut="showBlockchainAddress" */}
                                {/*        variant="contained" */}
                                {/*        color="primary" */}
                                {/*        disableElevation */}
                                {/*        style={{color: "white", width: 'fit-content', whiteSpace: 'nowrap'}} */}
                                {/*        className="sendEmailCode" */}
                                {/*        type="submit" */}
                                {/*        onClick={generateNewAddress} */}
                                {/*        disabled={!selectedCrypto?.persianTitle} */}
                                {/*        classes={{ */}
                                {/*            disabled: classes.buttonDisabled, */}
                                {/*        }} */}
                                {/*    > */}
                                {/*        <Trans>ایجاد آدرس جدید</Trans> */}
                                {/*    </Button> */}
                                {/* </Grid> */}
                            </Grid>
                            <Grid container className="depositDiv" data-tut="blockChainAddress">
                                <Grid size={2}>
                                    <label
                                        style={{
                                            position: 'relative',
                                            top: '35%',
                                            right: !isEn ? '30%' : 'auto',
                                            left: isEn ? '30%' : 'auto',
                                        }}
                                        className="inputLabel"
                                    >
                                        <Trans>Deposit</Trans>
                                    </label>
                                </Grid>
                                <Grid size={10}>
                                    <Grid container>
                                        <Grid size={12}>
                                            <SatrexInput
                                                className="addressInput"
                                                classes={{
                                                    root: !isEn
                                                        ? classes.depositInputFa
                                                        : classes.depositInputEn,
                                                }}
                                                inputValue={blockchainAddress.address !== null ? blockchainAddress.address : ''}
                                                isDisabled
                                            />
                                        </Grid>
                                        <Grid style={{ width: '0px' }}>
                                            <CopyToClipboard text={blockchainAddress?.address}>
                                                <IconButton
                                                    id={popOverId}
                                                    style={{
                                                        cursor: 'pointer !important',
                                                        position: 'relative',
                                                        left: isEn ? 'unset' : '53px',
                                                        right: !isEn ? 'unset' : '53px',
                                                        top: '7px',
                                                    }}
                                                    onClick={handlePopOverClick}
                                                >
                                                    <FileCopyOutlinedIcon />
                                                </IconButton>
                                            </CopyToClipboard>
                                            <Popover
                                                id={popOverId}
                                                open={popOverOpen}
                                                anchorEl={popOverAnchorEl}
                                                onClose={handlePopOverClose}
                                                anchorOrigin={{
                                                    vertical: 'bottom',
                                                    horizontal: 'center',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'center',
                                                }}
                                                style={{ overflow: 'hidden' }}
                                            >
                      <span
                          style={{
                              padding: '15px',
                              fontFamily: 'YekanBakh-Medium !important',
                              color: satrexGreen,
                          }}
                      >
                        <Trans>copied</Trans>
                      </span>
                                            </Popover>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <div
                                style={{
                                    marginTop: 14,
                                    padding: 15,
                                    width: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    backgroundColor: satrexTheme
                                        ? 'initial'
                                        : ThemeAtrr(extraTheme, true) ? ThemeAtrr(extraTheme, true).addressInput.backgroundColor : satrexSemiDarkerBlueDarkMode,
                                    borderRadius: '8px',
                                    border: satrexTheme
                                        ? 'none'
                                        : `solid 1px ${satrexBorderDarkColor}`,
                                }}
                                data-tut="qrCode"
                            >

                                <div style={{ minWidth: '100%', display: 'flex', justifyContent: 'center' }}>
                                    {
                                        blockchainAddress.address !== undefined && (
                                            <div style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                flex: 1,
                                                justifyContent: 'center',
                                                width: '100%',
                                            }}
                                            >
                                                {
                                                    Object.keys(blockchainAddress).map((key) => ((key !== 'address' && key !== 'derivationKey')
                                                        ? (
                                                            <div
                                                                className="animate__animated animate__flash"
                                                                style={{
                                                                    width: '100%',
                                                                    display: 'flex',
                                                                    direction: 'ltr',
                                                                    justifyContent: 'center',
                                                                }}
                                                            >
                                                                <div className="redPoint" style={{ marginTop: 10 }} />
                                                                &nbsp;&nbsp;&nbsp;&nbsp;
                                                                <span
                                                                    style={{ fontSize: 20 }}
                                                                >
{key.replace(/([A-Z])/g, ' $1').charAt(0).toUpperCase() + key.replace(/([A-Z])/g, ' $1').slice(1)}
                                                                    {' '}
                                                                    :
                                                                    {' '}
                                                                </span>
                                                                <span
                                                                    style={{
                                                                        fontSize: 20,
                                                                        color: 'red',
                                                                        fontWeight: 'bold',
                                                                    }}
                                                                >
&nbsp;
                                                                    {blockchainAddress[key]}
                                                                    &nbsp;
                                                                </span>
                                                                &nbsp;&nbsp;
                                                                <Copied
                                                                    text={blockchainAddress[key]}
                                                                />
                                                            </div>
                                                        ) : ''))
                                                }

                                            </div>
                                        )
                                    }
                                </div>
                                <div style={{
                                    minWidth: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    marginTop: 10,
                                }}
                                >
                                    {blockchainAddress.address !== undefined && blockchainAddress.address !== null && (
                                        <QRCode value={blockchainAddress?.address} size={170} />
                                    )}
                                </div>
                            </div>
                            <div style={{ marginTop: 50 }}>
                                {blockchainAddress.address !== null && (
                                    <WarningAlert>
                                        {isEn
                                            ? (
                                                <ul>
                                                    <li>
                                                        Just send
                                                        {' '}
                                                        {selectedCrypto.englishTitle}
                                                        {' '}
                                                        to this address.
                                                    </li>
                                                    <li>
                                                        Sending coins or tokens other than
                                                        {' '}
                                                        {selectedCrypto.englishTitle}
                                                        {' '}
                                                        to
                                                        this
                                                        address will result in the loss of your property.
                                                    </li>
                                                    <li>
                                                        Be sure to use the above address completely when using the
                                                        address
                                                        Match and then proceed to deposit coins.
                                                    </li>
                                                </ul>
                                            )
                                            : (
                                                <ul>
                                                    <li>
                                                        فقط
                                                        {' '}
                                                        {selectedCrypto.persianTitle}
                                                        {' '}
                                                        به این آدرس ارسال کنید.
                                                    </li>
                                                    <li>
                                                        ارسال کوین یا توکن غیر از
                                                        {' '}
                                                        {selectedCrypto.persianTitle}
                                                        {' '}
                                                        به
                                                        این آدرس منجر به از دست دادن دارایی شما خواهد شد.
                                                    </li>
                                                    <li>
                                                        حتما در زمان استفاده آدرس، دقت کنید کاملا با آدرس بالا
                                                        مطابقت داشته باشد و سپس نسبت به واریز کوین اقدام نمایید.
                                                    </li>
                                                </ul>
                                            )}
                                    </WarningAlert>
                                )}
                            </div>
                        </div>
                    </SatrexCard>
                </Grid>
                <Grid
                    size={{
                        xs: 12,
                        lg: 6
                    }}>
                    <SatrexCard header="depositCryptocurrency">
                        <div style={{ padding: '20px' }}>
                            <p>
                                <Trans>depositWithdrawalCryptoPageLine2</Trans>
                            </p>
                            <div data-tut="chooseCoin2">
                                <label htmlFor="cardButton" className="inputLabel">
                                    <Trans>chooseCrypto</Trans>
                                </label>
                                <ButtonBase
                                    id="cardButton"
                                    className={`${classes.countryButton}`}
                                    onClick={handleClickForWithdrawal}

                                >
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            width: '100%',
                                            direction: isEn ? 'ltr' : 'rtl',
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: 'flex',
                                                flex: 1,
                                                alignItems: 'center',
                                                justifyContent: isEn ? 'flex-start' : 'flex-end',
                                            }}
                                        >
                                            <img
                                                src={selectedCryptoForWithdrawal.imageAddress}
                                                style={{ maxHeight: '23px', maxWidth: '23px', marginTop: 3 }}
                                                alt={selectedCryptoForWithdrawal.persianTitle}
                                            />
                                            &nbsp;&nbsp;&nbsp;&nbsp;
                                            <span
                                                style={{ direction: 'ltr', fontSize: '16px' }}
                                                className={isEn ? 'enNum' : 'faNum'}
                                            >
                {isEn
                    ? selectedCryptoForWithdrawal.englishTitle
                    : selectedCryptoForWithdrawal.persianTitle}
                                            </span>
                                        </div>
                                        <div style={{ width: 30 }}>
                                            <ArrowDropDownIcon style={{ position: 'relative', top: 4 }} />
                                        </div>
                                    </div>

                                </ButtonBase>
                            </div>

                            <Menu
                                elevation={2}
                                id="simple-menu"
                                anchorEl={anchorElForWithdrawal}
                                open={withdrawalOpen}
                                onClose={handleCloseForWithdrawal}
                                TransitionComponent={Fade}
                                classes={{
                                    list: classes.menuStyle,
                                    paper: classes.popoverStyle,
                                }}
                                style={{ direction: isEn ? 'ltr' : 'rtl', width: '100%' }}
                            >
                                {coinList && coinList.map((item, index) => {
                                    if (item.symbol !== 'TOMAN') {
                                        return (
                                            <MenuItem
                                                key={item.id}
                                                className={classes.menuItem}
                                                onClick={() => {
                                                    seletingCryptoForWithdrawal(item);
                                                }}
                                            >
                                                <Grid
container
spacing={1}
                                                      style={{
                                                          flexDirection: isEn ? 'row' : 'row-reverse',
                                                          width: '100%',
                                                          alignItems: 'center',
                                                      }}
                                                >
                                                    <Grid style={{ display: 'flex', justifyContent: 'center' }} size={3}>
                                                        <img
                                                            src={item.imageAddress}
                                                            style={{ maxHeight: '23px', maxWidth: '23px' }}
                                                            alt=""
                                                        />
                                                    </Grid>
                                                    <Grid style={{ textAlign: isEn ? 'left' : 'right' }} size={9}>
                          <span>
                            {isEn ? item.englishTitle : item.persianTitle}
                          </span>
                                                    </Grid>
                                                </Grid>
                                            </MenuItem>
                                        );
                                    }
                                })}
                            </Menu>
                            <div className={classes.networkSection} data-tut="walletBalance2">
                                <div className={classes.networkLabelRow}>
                                <span
                                    style={{ color: satrexTheme ? '#0e0139' : 'white' }}
                                >
<Trans>Choose Network</Trans>
                                </span>
                                    &nbsp;:&nbsp;
                                </div>
                                <div className={classes.networkChipsRow}>
                                    {
                                        withdrawalNetworkList?.map((item, index) => (
                                            <div
                                                key={index}
                                            >
                                                <Button

                                                    disableElevation
                                                    onClick={() => setWithdrawalNetwork(item.network.id)}
                                                    className={` chipBtn ${withdrawalNetwork === item.network.id ? 'selectedChipBtn' : ''}`}
                                                    type="button"
                                                    style={{
                                                        width: 'fit-content',
                                                        whiteSpace: 'nowrap',
                                                        paddingRight: 15,
                                                        paddingLeft: 15,
                                                        height: 33,
                                                    }}
                                                >
                                                    {
                                                        withdrawalNetwork === item.network.id
                                                        && (
                                                            <>
                                                                <CheckCircleOutline style={{
                                                                    position: 'relative',
                                                                    right: isEn ? 'unset' : -10,
                                                                    left: !isEn ? 'unset' : -10,
                                                                }}
                                                                />
                                                                &nbsp;
                                                            </>
                                                        )
                                                    }
                                                    {
                                                        item.network.title
                                                    }
                                                </Button>
                                            </div>
                                        ))
                                    }

                                </div>
                            </div>
                            <div style={{ marginTop: 30 }}>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid
                                        data-tut="withdrawalAmount"
                                        size={{
                                            xs: 12,
                                            md: 8
                                        }}
                                    >
                                        <SatrexInput
                                            label="WithdrawalAmount"
                                            inputValue={withdrawalAmount}
                                            className="inputLabel"
                                            classes={{
                                                root: classes.prominentInputRoot,
                                                input: classes.prominentInput,
                                            }}
                                            validate={{
                                                rules: [
                                                    {
                                                        rule: withdrawalAmount > assetInventoryWithdrawal,
                                                        message:
                                                            transFn('Withdrawal can not be more than your inventory!'),
                                                    },
                                                ],
                                            }}
                                            onChange={(e) => {
                                                setWithdrawalAmount(e.target.value.replace(/,/g, ''));
                                            }}
                                        />
                                    </Grid>
                                    <Grid
                                        size={{
                                            xs: 12,
                                            md: 4
                                        }}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: isEn ? 'flex-start' : 'flex-end',
                                        }}
                                    >
                                        <Button
                                            variant="contained"
                                            disableElevation
                                            className={classes.withdrawAllButton}
                                            type="submit"
                                            onClick={() => {
                                                setWithdrawalAmount(assetInventoryWithdrawal);
                                            }}
                                        >
                                            <span>
                                                <Trans>WithdrawalTotalInventory</Trans>
                                            </span>
                                        </Button>
                                    </Grid>
                                </Grid>
                                <div style={{ marginTop: '7px' }}>
                                    <Trans>YourWithdrawableInventory</Trans>
                                    :&nbsp;&nbsp;
                                    <span className={isEn ? 'enNum' : 'faNum'}>
                {assetInventoryWithdrawal}
                                    </span>
                                </div>
                            </div>
                            <Grid container style={{ marginTop: '20px' }}>
                                <Grid size={12}>
                                    <SatrexInput
                                        dataTut="destinationWalletAddress"
                                        label="destinationWalletAddress"
                                        inputValue={destinationWalletAddress}
                                        onChange={(e) => {
                                            setDestinationWalletAddress(e.target.value);
                                        }}
                                    />
                                    <div style={{ marginTop: '7px' }}>
                  <span style={{ color: 'red' }}>
                  {
                      selectedNetWork?.network?.childWalletExtraFieldTitle ? <Trans>destinationWalletAddressWithTagNote</Trans>
                      : <Trans>destinationWalletAddressNote</Trans>
                  }
                  </span>
                                    </div>
                                </Grid>
                                <Grid style={{ width: '0px' }}>
                                    <IconButton
                                        data-tut="paste"
                                        style={{
                                            cursor: 'pointer !important',
                                            position: 'relative',
                                            left: '46px',
                                            top: '22px',
                                        }}
                                        onClick={pasteAddress}
                                    >
                                        <AssignmentOutlinedIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>

                            {
                                selectedNetWork?.network?.childWalletExtraFieldTitle && (
                                    <div style={{ marginTop: '20px' }}>
                                        <SatrexInput
                                            label={selectedNetWork?.network?.childWalletExtraFieldTitle}
                                            inputValue={networkExtraField}
                                            onChange={(e) => {
                                                setNetworkExtraField(e.target.value);
                                            }}
                                        />

                                    </div>
                                )
                            }
                            <Grid container spacing={2} className={classes.inlineActionRow} data-tut="toFactorWithdrawalCode">
                                <Grid
                                    size={{
                                        xs: 12,
                                        md: 8
                                    }}
                                >
                                    <SatrexInput
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
                                            style: {
                                                width: '155px',
                                            },
                                            className: 'sendEmailCode',
                                            type: 'submit',
                                            onClick: sendEmailSecretCode,
                                            disabled: !selectedCryptoForWithdrawal.id
                                                || withdrawalAmount > assetInventoryWithdrawal
                                                || withdrawalAmount <= 0
                                                || !destinationWalletAddress,
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
                                    dataTut="networkFee"
                                    label="networkFee"
                                    inputValue={getFee()}
                                    isDisabled
                                />
                                {(selectedCryptoForWithdrawal.persianTitle !== ''
                                    || selectedCryptoForWithdrawal.englishTitle !== '') && (
                                    <div>
                                        {lang === 'EN' && (
                                            <div>
                                                The transfer fee is related to the registration of the
                                                transaction in the
                                                {' '}
                                                <span style={{ color: 'red' }}>
                        {selectedCryptoForWithdrawal.englishTitle}
                                                </span>
                                                {' '}
                                                network and satrex is not a beneficiary in it.
                                            </div>
                                        )}
                                        {lang === 'FA' && (
                                            <div>
                                                کارمزد انتقال مربوط به ثبت تراکنش در شبکه‌ی
                                                {' '}
                                                <span style={{ color: 'red' }}>
                        {selectedCryptoForWithdrawal.persianTitle}
                                                </span>
                                                {' '}
                                                بوده و ساترکس در آن ذینفع نیست.
                                            </div>
                                        )}
                                        {lang === 'AR' && (
                                            <div>
                                                ترتبط رسوم التحويل بتسجيل المعاملة في شبكة
                                                {' '}
                                                <span style={{ color: 'red' }}>
                        {selectedCryptoForWithdrawal.englishTitle}
                                                </span>
                                                {' '}
                                                ولا يعتبر satrex مستفيدًا فيها.
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                            <center>
                                <LoadingButton loading={loading}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        disableElevation
                                        style={{ color: 'white', width: '100%', marginTop: '20px' }}
                                        className="submitButton"
                                        type="submit"
                                        classes={{
                                            disabled: classes.buttonDisabled,
                                        }}
                                        disabled={
                                            loading
                                            || !selectedCryptoForWithdrawal.id
                                            || withdrawalAmount > assetInventoryWithdrawal
                                            || withdrawalAmount <= 0
                                            || !destinationWalletAddress
                                            || !twoFactorCode
                                        }

                                        onClick={() => {
                                            submitWithdrawalRequest();
                                        }}
                                    >
                                        <Trans>SubmitWithdrawalRequest</Trans>
                                    </Button>
                                </LoadingButton>
                            </center>
                        </div>
                    </SatrexCard>
                </Grid>
                {level?.code && level?.code === '0' && <SuspendNotif />}
            </Grid>
        </AnimatedPage>
    );
}
