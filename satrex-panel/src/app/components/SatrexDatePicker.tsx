import React from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMomentJalaali } from '@mui/x-date-pickers/AdapterMomentJalaali';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { AdapterMomentHijri } from '@mui/x-date-pickers/AdapterMomentHijri';
import moment from 'moment';
import 'moment-jalaali';
import 'moment/locale/fa';
import 'moment-hijri';
import 'moment/locale/ar-sa';
import { Box, IconButton, ThemeProvider, createTheme } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import { useSelector } from 'react-redux';
import {
    satrexBlack, satrexGray, satrexGreen, satrexWhite,
} from '../../styles/colors';
import { transFn } from './lang';

const faDatepickerTheme = (isLight: boolean) => createTheme({
    components: {
        MuiInputBase: {
            styleOverrides: {
                input: {
                    fontFamily: 'faNum !important',
                    textAlign: 'center',
                    borderColor: isLight ? '#ced4da !important' : '#313131 !important',
                },
            },
        },
        MuiPickersCalendarHeader: {
            styleOverrides: {
                switchViewButton: {
                    '& .MuiSvgIcon-root': {
                        color: satrexGray,
                    },
                },
            },
        },
        MuiPickersLayout: {
            styleOverrides: {
                toolbar: {
                    backgroundColor: satrexGreen,
                },
            },
        },
        MuiPickersDay: {
            styleOverrides: {
                root: {
                    '&.Mui-selected': {
                        backgroundColor: satrexGreen,
                        color: satrexWhite,
                        '&:hover': {
                            backgroundColor: satrexGreen,
                        },
                    },
                },
            },
        },
    },
});

interface satrexDatePickerProps {
    date: any,
    handleChangeDate: (date: any, formattedDate?: string) => void,
    datePickerShow: boolean,
    setDatePickerShow: (state: boolean) => void,
    disabled?: boolean,
    otherProps?: any
}

const SatrexDatePicker: React.FC<satrexDatePickerProps> = ({
    date,
    handleChangeDate,
    datePickerShow,
    setDatePickerShow,
    disabled,
    otherProps,
}) => {
    const lang = useSelector((state: any) => state.user.language);
    const theme = useSelector((state: any) => state.layout.theme);
    const isEn = lang === 'EN';
    const isAr = lang === 'AR';

    const getAdapter = () => {
        if (isEn) return AdapterMoment;
        if (isAr) return AdapterMomentHijri;
        return AdapterMomentJalaali;
    };

    const getLocale = () => {
        if (isEn) return 'en';
        if (isAr) return 'ar-SA';
        return 'fa';
    };

    const getFormat = () => {
        if (isEn) return 'YYYY/MM/DD';
        if (isAr) return 'iYYYY/iMM/iDD';
        return 'YYYY/MM/DD';
    };

    const normalizeDateValue = React.useMemo(() => {
        if (!date) return null;
        if (moment.isMoment(date)) return date;
        if (typeof date === 'number') return moment(date);
        if (typeof date === 'string') {
            const trimmedDate = date.trim();
            if (!trimmedDate) return null;
            const parsedDate = moment(trimmedDate, [
                'YYYY/MM/DD',
                'YYYY-MM-DD',
                'jYYYY/jMM/jDD',
                'jYYYY-jMM-jDD',
                'iYYYY/iMM/iDD',
                'iYYYY-iMM-iDD',
                moment.ISO_8601,
            ], true);
            return parsedDate.isValid() ? parsedDate : moment(trimmedDate);
        }

        return moment(date);
    }, [date]);

    const handleDateChange = (nextDate: any) => {
        const formattedDate = nextDate && typeof nextDate.format === 'function'
            ? nextDate.format(getFormat())
            : '';
        handleChangeDate(nextDate, formattedDate);
    };

    const localeText = {
        okButtonLabel: 'تأیید',
        cancelButtonLabel: 'لغو',
        clearButtonLabel: 'پاک کردن',
        todayButtonLabel: transFn('today'),
    };

    return (
        <div className="pr">
            <ThemeProvider theme={faDatepickerTheme(!!theme)}>
                <LocalizationProvider
                    dateAdapter={getAdapter()}
                    adapterLocale={getLocale()}
                    localeText={localeText}
                >
                    <DatePicker
                        value={normalizeDateValue}
                        onChange={handleDateChange}
                        format={getFormat()}
                        open={datePickerShow}
                        onClose={() => setDatePickerShow(false)}
                        disabled={disabled}
                        slotProps={{
                            textField: {
                                size: 'small',
                                sx: { width: '100%', textAlign: 'center', '& input': { fontFamily: 'faNum', textAlign: 'center' } },
                            },
                            actionBar: {
                                actions: ['clear', 'today', 'accept'],
                            },
                        }}
                        sx={{ width: '100%' }}
                        {...otherProps}
                    />
                </LocalizationProvider>
                {!disabled && (
                    <Box
                        className="pa"
                        sx={{
                            position: 'absolute',
                            left: isEn ? 'unset' : 0,
                            right: !isEn ? 'unset' : 0,
                            top: 0,
                        }}
                    >
                        <IconButton
                            onClick={() => setDatePickerShow(true)}
                            color="primary"
                            aria-label="add to shopping cart"
                        >
                            <EventIcon style={{ color: theme ? satrexGray : 'white' }} />
                        </IconButton>
                    </Box>
                )}
            </ThemeProvider>
        </div>
    );
};

export default SatrexDatePicker;
