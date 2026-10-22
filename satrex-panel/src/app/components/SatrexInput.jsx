import React, { useState } from 'react';
import { InputLabel, InputBase, FormControl, alpha } from '@mui/material';
import {
    makeStyles,
    withStyles,
} from '@mui/styles';
import { useSelector } from 'react-redux';
import Trans from '../components/lang';
import {
    satrexBorderDarkColor,
    satrexGreen,
    satrexSemiDarkerBlueDarkMode,
} from '../../styles/colors';

const useStyle = makeStyles({
    inputLabel: {
        left: 'auto !important',
        fontSize: '13px',
        color: (props) => `${props.satrexTheme ? '#334155' : '#dce6ff'} !important`,
        fontWeight: 600,
    },
    shrinkLabel: {
        transform: 'translate(0, 1.5px) scale(1)',
    },
    themedInput: {
        color: (props) => `${props.satrexTheme ? '#1f2937' : '#edf2ff'} !important`,
        WebkitTextFillColor: (props) => `${props.satrexTheme ? '#1f2937' : '#edf2ff'} !important`,
        backgroundColor: (props) => `${props.satrexTheme ? '#ffffff' : 'rgba(255,255,255,0.05)'} !important`,
        borderColor: (props) => `${props.satrexTheme ? '#cbd5e1' : '#59627f'} !important`,
        fontSize: '15px !important',
        fontWeight: '500 !important',
        boxShadow: (props) => (props.satrexTheme ? '0 1px 2px rgba(15,23,42,0.06)' : 'none'),
        '&:hover': {
            borderColor: (props) => `${props.satrexTheme ? '#94a3b8' : '#7480a3'} !important`,
        },
        '&::placeholder': {
            color: (props) => `${props.satrexTheme ? '#64748b' : '#9aa7c2'} !important`,
            opacity: 1,
        },
        '&.Mui-disabled': {
            opacity: '1 !important',
            color: (props) => `${props.satrexTheme ? '#243041' : '#f8fbff'} !important`,
            WebkitTextFillColor: (props) => `${props.satrexTheme ? '#243041' : '#f8fbff'} !important`,
            backgroundColor: (props) => `${props.satrexTheme ? '#f8fafc' : satrexSemiDarkerBlueDarkMode} !important`,
            borderColor: (props) => `${props.satrexTheme ? '#cfd8e3' : '#66708f'} !important`,
        },
    },
    errInput: {
        '& .MuiInputBase-input': {
            borderColor: 'red !important',
            '&:focus': {
                borderColor: 'red !important',
                boxShadow: '0 0 0 0.2rem rgba(255,0,0,0.3) !important',
            },
        },
    },
});

export const BootstrapInput = withStyles((theme) => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(2.7),
        },
    },
    disabled: {},
    input: {
        borderRadius: 8,
        position: 'relative',
        height: 24,
        width: '100%',
        padding: '10px 12px',
        backgroundColor: 'transparent !important',
        border: '1px solid',
        transition: theme.transitions.create(['box-shadow']),
        '&:focus': {
            boxShadow: `${alpha(satrexGreen, 0.25)} 0 0 0 0.2rem`,
            borderColor: satrexGreen,
        },
        '&::placeholder': {
            padding: '0px',
            color: 'black',
        },
    },
}))(InputBase);

export default function (props) {
    const lang = useSelector((state) => state.user.language);
    const satrexTheme = useSelector((state) => state.layout.theme);
    const classes = useStyle({ lang, satrexTheme });
    const [invalidInput, setInvalidInput] = useState(false);
    const mergedInputClassName = [classes.themedInput, props.classes?.input].filter(Boolean).join(' ');
    const mergedRootClassName = [
        props.classes?.root,
        props.validate && props.validate.rules.filter((item) => item.rule).length > 0 ? classes.errInput : '',
    ].filter(Boolean).join(' ');

    return (
        <div data-tut={props.dataTut}>
            <FormControl style={{ width: '100%' }}>
                <InputLabel
                    shrink
                    htmlFor="bootstrap-input"
                    classes={{
                        formControl: classes.inputLabel,
                        shrink: classes.shrinkLabel,
                    }}
                >
          <span className="inputLabel">
            <Trans>{props.label}</Trans>
          </span>
                </InputLabel>

                <BootstrapInput
                    style={{
                        direction: props.direction,
                        width: '100%',
                        height: props.height,
                    }}
                    defaultValue={props.defaultValue}
                    placeholder={props.placeholder}
                    type={props.type}
                    id={props.id}
                    name={props.name}
                    onFocus={props.onFocus}
                    onChange={props.onChange}
                    className={props.className}
                    inputProps={props.inputProps}
                    value={(() => {
                        // Keep the input consistently controlled and avoid passing null/undefined to `value`.
                        const raw = props.inputValue ?? '';
                        if (!props.isMoney) return raw;
                        if (raw === '') return '';
                        return raw.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                    })()}

                    disabled={props.isDisabled}
                    onKeyUp={props.onKeyUp}
                    onKeyDown={(evt) => {
                        if (props.isMoney && !((evt.which >= 48 && evt.which <= 57) || (evt.which >= 96 && evt.which <= 106) || (evt.which === 8) || (evt.which === 9) || (evt.which === 190) || (evt.which === 110))) {
                            evt.preventDefault();
                        }

                        if (props.type === 'number') {
                            // console.log(evt.which);
                            if (!((evt.which >= 48 && evt.which <= 57) || (evt.which >= 96 && evt.which <= 106) || (evt.which === 8) || (evt.which === 9) || (evt.which === 190) || (evt.which === 110))) evt.preventDefault();
                            if (evt.which !== 8 && ((evt.target.value.split('.')[1] && evt.target.value.split('.')[1].length >= 8) || evt.target.value.split('.')[0].length >= 12)) {
                                evt.preventDefault();
                            }
                        }
                        const p = /^[\u0600-\u06FF\s]+$/;
                        if (!p.test(evt.target.value) && evt.target.value) setInvalidInput(true);
                        else {
                            setInvalidInput(false);
                        }
                    }}
                    classes={{
                        ...props.classes,
                        input: mergedInputClassName,
                        root: mergedRootClassName,
                    }}
                    onInput={
                        props.maxLength
                            ? (e) => {
                                e.target.value = Math.max(0, parseInt(e.target.value))
                                    .toString()
                                    .slice(0, props.maxLength);
                            }
                            : () => {
                            }
                    }
                />
            </FormControl>
            {props.validate
                && props.validate.rules.map((item) => {
                    if (item.rule) {
                        return (
                            <div key={item.message} style={{ width: '100%', marginTop: '5px' }}>
                <span key={item.message} style={{ color: 'red' }}>
                  {item.message}
                </span>
                            </div>
                        );
                    }
                })}
            {invalidInput && props.isPersian && (
                <div style={{ width: '100%', marginTop: '5px' }}>
          <span style={{ color: 'red' }}>
            <Trans>persianRequired</Trans>
          </span>
                </div>
            )}
        </div>
    );
}
