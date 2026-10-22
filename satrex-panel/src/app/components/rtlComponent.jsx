import React from 'react';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@mui/styles';
import { createTheme, ThemeProvider } from '@mui/material';
import { useSelector } from 'react-redux';
import { satrexGreen } from '../../styles/colors';

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

export default function (props) {
    const lang = useSelector((state) => state.user.language);
    const isEn = lang === 'EN';
  return (
    <StylesProvider jss={jss}>
      <ThemeProvider
        theme={createTheme({
            palette: {
                primary: {
                    main: satrexGreen,
                },
            },
            direction: isEn ? 'ltr' : 'rtl',
})}
      >
        {props.children}
      </ThemeProvider>
    </StylesProvider>
  );
}

// export const Float = !isRtl ? 'left' : 'right';
//
// export const numType = !isRtl ? ' ' : 'enNum';
