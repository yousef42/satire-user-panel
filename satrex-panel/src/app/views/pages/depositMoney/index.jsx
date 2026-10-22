import React, { useEffect, useMemo, useState } from 'react';
import {
    ButtonBase,
    Fade,
    IconButton,
    Menu,
    MenuItem,
    Tooltip,
} from '@mui/material';
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import SyncAltRoundedIcon from '@mui/icons-material/SyncAltRounded';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import { useSelector } from 'react-redux';
import { useTour } from '@reactour/tour';
import SuspendNotif from '../../../components/suspendNotif';
import tourLoader from '../../../../utils/helpers/tourLoader';
import getBankName from '../editBankInfo/bankName';
import history from '../../../../history';
import AnimatedPage from '../../../components/AnimatedPage';
import SatrexCard from '../../../components/SatrexCard';
import useStyles from './styles';

const SOURCE_BANKS = [
    { id: 'mellat', label: 'ملت', refNumber: '6104337611223344' },
    { id: 'saman', label: 'سامان', refNumber: '6219861012345678' },
    { id: 'meli', label: 'ملی', refNumber: '6037991899012233' },
    { id: 'pasargad', label: 'پاسارگاد', refNumber: '5022291055667788' },
    { id: 'tejarat', label: 'تجارت', refNumber: '6273531234567890' },
    { id: 'keshavarzi', label: 'کشاورزی', refNumber: '6037701234567890' },
];

const TAB_ITEMS = [
    {
        id: 'cardToCard',
        label: 'کارت به کارت',
        icon: CreditCardRoundedIcon,
    },
    {
        id: 'accountToAccount',
        label: 'حساب به حساب',
        icon: SyncAltRoundedIcon,
    },
    {
        id: 'paya',
        label: 'پایا',
        icon: AccountBalanceRoundedIcon,
    },
];

const PAYMENT_DESTINATIONS = {
    cardToCard: {
        mellat: {
            valueLabel: 'شماره کارت ساترکس',
            value: '6104 3376 4400 1122',
            ownerName: 'به نام فناوری های هوشمند استارتاپ',
            bankName: 'ملت',
            logoRef: '6104337611223344',
            feeLabel: 'کارمزد',
            feeValue: '2 هزار تومان',
            etaLabel: 'واریز به کیف پول',
            etaValue: 'تا 30 دقیقه بعد از واریز',
        },
        saman: {
            valueLabel: 'شماره کارت ساترکس',
            value: '6219 8610 3300 2244',
            ownerName: 'به نام فناوری های هوشمند استارتاپ',
            bankName: 'سامان',
            logoRef: '6219861012345678',
            feeLabel: 'کارمزد',
            feeValue: '2 هزار تومان',
            etaLabel: 'واریز به کیف پول',
            etaValue: 'تا 30 دقیقه بعد از واریز',
        },
        pasargad: {
            valueLabel: 'شماره کارت ساترکس',
            value: '5022 2910 8800 6655',
            ownerName: 'به نام فناوری های هوشمند استارتاپ',
            bankName: 'پاسارگاد',
            logoRef: '5022291055667788',
            feeLabel: 'کارمزد',
            feeValue: '2 هزار تومان',
            etaLabel: 'واریز به کیف پول',
            etaValue: 'تا 30 دقیقه بعد از واریز',
        },
    },
    accountToAccount: {
        mellat: {
            valueLabel: 'شماره حساب ساترکس',
            value: '0101378750602',
            ownerName: 'به نام فناوری های هوشمند استارتاپ',
            bankName: 'ملت',
            logoRef: '6104337611223344',
            feeLabel: 'کارمزد',
            feeValue: 'بدون کارمزد',
            etaLabel: 'واریز به کیف پول',
            etaValue: 'تا پایان همان روز کاری',
        },
        meli: {
            valueLabel: 'شماره حساب ساترکس',
            value: '22144019873',
            ownerName: 'به نام فناوری های هوشمند استارتاپ',
            bankName: 'ملی',
            logoRef: '6037991899012233',
            feeLabel: 'کارمزد',
            feeValue: 'بدون کارمزد',
            etaLabel: 'واریز به کیف پول',
            etaValue: 'تا پایان همان روز کاری',
        },
        tejarat: {
            valueLabel: 'شماره حساب ساترکس',
            value: '4420136507',
            ownerName: 'به نام فناوری های هوشمند استارتاپ',
            bankName: 'تجارت',
            logoRef: '6273531234567890',
            feeLabel: 'کارمزد',
            feeValue: 'بدون کارمزد',
            etaLabel: 'واریز به کیف پول',
            etaValue: 'تا پایان همان روز کاری',
        },
    },
    paya: {
        mellat: {
            valueLabel: 'شماره شبا ساترکس',
            value: 'IR330120000000010137875060',
            ownerName: 'به نام فناوری های هوشمند استارتاپ',
            bankName: 'ملت',
            logoRef: '6104337611223344',
            feeLabel: 'کارمزد',
            feeValue: '0.01 درصد',
            etaLabel: 'چرخه تسویه',
            etaValue: '13:45 و 18:45',
        },
        pasargad: {
            valueLabel: 'شماره شبا ساترکس',
            value: 'IR650570000000112233445566',
            ownerName: 'به نام فناوری های هوشمند استارتاپ',
            bankName: 'پاسارگاد',
            logoRef: '5022291055667788',
            feeLabel: 'کارمزد',
            feeValue: '0.01 درصد',
            etaLabel: 'چرخه تسویه',
            etaValue: '13:45 و 18:45',
        },
        saman: {
            valueLabel: 'شماره شبا ساترکس',
            value: 'IR290560000000998877665544',
            ownerName: 'به نام فناوری های هوشمند استارتاپ',
            bankName: 'سامان',
            logoRef: '6219861012345678',
            feeLabel: 'کارمزد',
            feeValue: '0.01 درصد',
            etaLabel: 'چرخه تسویه',
            etaValue: '13:45 و 18:45',
        },
    },
};

const DEFAULT_DESTINATIONS = {
    cardToCard: {
        valueLabel: 'شماره کارت پیش فرض',
        value: '6274 1212 0011 2233',
        ownerName: 'به نام فناوری های هوشمند استارتاپ',
        bankName: 'اقتصاد نوین',
        logoRef: '6274121234567890',
        feeLabel: 'کارمزد',
        feeValue: '2 هزار تومان',
        etaLabel: 'واریز به کیف پول',
        etaValue: 'تا 30 دقیقه بعد از واریز',
    },
    accountToAccount: {
        valueLabel: 'شماره حساب پیش فرض',
        value: '77890011224',
        ownerName: 'به نام فناوری های هوشمند استارتاپ',
        bankName: 'اقتصاد نوین',
        logoRef: '6274121234567890',
        feeLabel: 'کارمزد',
        feeValue: 'بدون کارمزد',
        etaLabel: 'واریز به کیف پول',
        etaValue: 'تا پایان همان روز کاری',
    },
    paya: {
        valueLabel: 'شماره شبا پیش فرض',
        value: 'IR790540000000778900112244',
        ownerName: 'به نام فناوری های هوشمند استارتاپ',
        bankName: 'اقتصاد نوین',
        logoRef: '6274121234567890',
        feeLabel: 'کارمزد',
        feeValue: '0.01 درصد',
        etaLabel: 'چرخه تسویه',
        etaValue: '13:45 و 18:45',
    },
};

const TAB_DESCRIPTIONS = {
    cardToCard:
        'بانک مبدا را انتخاب کنید تا در صورت موجود بودن، شماره کارت مقصد متناظر همان بانک نمایش داده شود. اگر بانک مقصد متناظر نداشته باشیم، شماره کارت پیش‌فرض نمایش داده می‌شود.',
    accountToAccount:
        'برای واریز حساب به حساب، شماره حساب مقصد بر اساس بانک انتخابی کاربر نمایش داده می‌شود. این بخش فقط برای مشاهده رابط کاربری و بدون وابستگی به بک‌اند پیاده‌سازی شده است.',
    paya:
        'برای پایا، شماره شبا مقصد بر اساس بانک مبدا انتخاب می‌شود. اگر برای آن بانک داده متناظر نداشته باشیم، اطلاعات پیش‌فرض نمایش داده خواهد شد.',
};

const getBankLogo = (referenceNumber) => getBankName(referenceNumber)?.[1] || '';

const getDestinationForTab = (tabId, bankId) => {
    const tabData = PAYMENT_DESTINATIONS[tabId] || {};
    if (tabData[bankId]) {
        return {
            ...tabData[bankId],
            isFallback: false,
        };
    }

    return {
        ...DEFAULT_DESTINATIONS[tabId],
        isFallback: true,
    };
};

export default function DepositMoneyPage() {
    const lang = useSelector((state) => state.user.language);
    const satrexTheme = useSelector((state) => state.layout.theme);
    const level = useSelector((state) => state.layout.totals.qualifyLevel);
    const isEn = lang === 'EN' || lang === 'gr' || lang === 'fr';
    const classes = useStyles({ isEn, satrexTheme });
    const { setIsOpen, setSteps } = useTour();
    const [anchorEl, setAnchorEl] = useState(null);
    const [activeTab, setActiveTab] = useState('cardToCard');
    const [selectedBankId, setSelectedBankId] = useState(SOURCE_BANKS[0].id);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            tourLoader(setIsOpen, setSteps, 'deposit');
        }

        return () => {
            isMounted = false;
        };
    }, [setIsOpen, setSteps]);

    const selectedBank = useMemo(
        () => SOURCE_BANKS.find((item) => item.id === selectedBankId) || SOURCE_BANKS[0],
        [selectedBankId],
    );
    const selectedBankLogo = useMemo(() => getBankLogo(selectedBank.refNumber), [selectedBank]);
    const destination = useMemo(
        () => getDestinationForTab(activeTab, selectedBankId),
        [activeTab, selectedBankId],
    );
    const destinationLogo = useMemo(() => getBankLogo(destination.logoRef), [destination.logoRef]);
    const activeTabMeta = useMemo(
        () => TAB_ITEMS.find((item) => item.id === activeTab) || TAB_ITEMS[0],
        [activeTab],
    );

    const open = Boolean(anchorEl);

    const handleSelectOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleBankChange = (bankId) => {
        setSelectedBankId(bankId);
        setCopied(false);
        handleClose();
    };

    const handleCopy = async () => {
        try {
            await window.navigator.clipboard.writeText(destination.value.replace(/\s/g, ''));
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1800);
        } catch {
            setCopied(false);
        }
    };

    return (
        <AnimatedPage>
            <div className={classes.pageHeader}>
                <div className={classes.pageHeaderInner}>
                    <ButtonBase
                        className={classes.backLink}
                        onClick={() => {
                            history.goBack();
                        }}
                    >
                        <KeyboardBackspaceRoundedIcon />
                        <span>بازگشت</span>
                    </ButtonBase>
                    <h2 className={classes.pageTitle}>واریز تومان</h2>
                </div>
            </div>

            <SatrexCard style={{ marginTop: 24 }}>
                <div className={classes.pageBody}>
                    <div className={classes.tabBar}>
                        {TAB_ITEMS.map((tab) => {
                            const IconComponent = tab.icon;
                            const isActive = activeTab === tab.id;

                            return (
                                <ButtonBase
                                    key={tab.id}
                                    className={`${classes.tabButton} ${isActive ? classes.tabButtonActive : ''}`}
                                    onClick={() => {
                                        setActiveTab(tab.id);
                                        setCopied(false);
                                    }}
                                >
                                    <IconComponent className={classes.tabIcon} />
                                    <span>{tab.label}</span>
                                </ButtonBase>
                            );
                        })}
                    </div>

                    <div className={classes.bankRow}>
                        <span className={classes.bankRowLabel}>بانک شما :</span>

                        <div className={classes.bankSelectField}>
                            <WarningAmberRoundedIcon className={classes.bankSelectWarn} />

                            <ButtonBase
                                className={classes.bankSelectButton}
                                onClick={handleSelectOpen}
                            >
                                {selectedBankLogo && (
                                    <img
                                        className={classes.bankSelectLogo}
                                        src={selectedBankLogo}
                                        alt={selectedBank.label}
                                    />
                                )}
                                <span>{selectedBank.label}</span>
                            </ButtonBase>
                        </div>

                        <Menu
                            elevation={2}
                            id="source-bank-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            TransitionComponent={Fade}
                            classes={{
                                list: classes.menuStyle,
                            }}
                        >
                            {SOURCE_BANKS.map((bank) => {
                                const logo = getBankLogo(bank.refNumber);

                                return (
                                    <MenuItem
                                        key={bank.id}
                                        onClick={() => handleBankChange(bank.id)}
                                        className={classes.menuItem}
                                    >
                                        <div className={classes.menuItemInner}>
                                            <span className={classes.menuItemText}>{bank.label}</span>
                                            {logo && (
                                                <img
                                                    className={classes.menuItemLogo}
                                                    src={logo}
                                                    alt={bank.label}
                                                />
                                            )}
                                        </div>
                                    </MenuItem>
                                );
                            })}
                        </Menu>
                    </div>

                    <div className={classes.descriptionBox}>
                        <p>{TAB_DESCRIPTIONS[activeTab]}</p>
                        <p>
                            تمام داده‌های این صفحه نمونه هستند و فقط سمت فرانت‌اند نگه‌داری
                            می‌شوند تا UI بدون اتصال به هیچ حساب، کارت یا سرویس بانکی واقعی
                            قابل مشاهده باشد.
                        </p>
                        {destination.isFallback ? (
                            <div className={classes.fallbackNote}>
                                برای بانک {selectedBank.label} اطلاعات مقصد متناظر نداریم.
                            </div>
                        ) : (
                            <div className={classes.matchNote}>
                                برای بانک {selectedBank.label} اطلاعات مقصد متناظر نمایش داده شده
                                است.
                            </div>
                        )}
                    </div>

                    <div className={classes.destinationWrap}>
                        <div className={classes.destinationHeader}>
                            <span>{destination.valueLabel} :</span>
                            <div className={classes.destinationHeaderMeta}>
                                <span className={classes.destinationTypeTag}>
                                    {activeTabMeta.label}
                                </span>
                                <Tooltip title={copied ? 'کپی شد' : 'کپی'}>
                                    <IconButton
                                        className={classes.copyButton}
                                        onClick={handleCopy}
                                    >
                                        {copied ? (
                                            <CheckCircleRoundedIcon />
                                        ) : (
                                            <ContentCopyRoundedIcon />
                                        )}
                                    </IconButton>
                                </Tooltip>
                            </div>
                        </div>

                        <div className={classes.destinationCard}>
                            <div className={classes.destinationMainRow}>
                                <div className={classes.destinationNumberWrap}>
                                    <strong className={classes.destinationNumber}>
                                        {destination.value}
                                    </strong>
                                    <span className={classes.destinationOwner}>
                                        {destination.ownerName}
                                    </span>
                                </div>

                                <div className={classes.destinationBankBadge}>
                                    {destinationLogo && (
                                        <img
                                            className={classes.destinationBankLogo}
                                            src={destinationLogo}
                                            alt={destination.bankName}
                                        />
                                    )}
                                    <span>{destination.bankName}</span>
                                </div>
                            </div>

                            <div className={classes.destinationMetaGrid}>
                                <div className={classes.metaItem}>
                                    <span>{destination.feeLabel}</span>
                                    <strong>{destination.feeValue}</strong>
                                </div>
                                <div className={classes.metaItem}>
                                    <span>{destination.etaLabel}</span>
                                    <strong>{destination.etaValue}</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </SatrexCard>

            {level?.code && level?.code === '0' && <SuspendNotif />}
        </AnimatedPage>
    );
}
