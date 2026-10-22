import React from 'react';
import { Card } from '@mui/material';
import { Divider } from '@mui/material';
import { useSelector } from 'react-redux';
import Trans from './lang';
import ThemeAtrr from '../MasterLayout/MasterTheme/ThemeAtrr';
import {
  satrexBorderDarkColor,
  satrexDarkerBlueDarkMode,
  satrexGray,
} from '../../styles/colors';

function satrexCard(props, ref) {
  const lang = useSelector((state) => state.user.language);
  const isEn = lang === 'EN' || lang === 'gr' || lang === 'fr';
  const satrexTheme = useSelector((state) => state.layout.theme);
  const extraTheme = useSelector((state) => state.layout.extraTheme);
  const cardBackgroundColor = (extraTheme !== true && extraTheme)
    ? ThemeAtrr(extraTheme)?.cardStyle?.backgroundColor
    : (!satrexTheme ? satrexDarkerBlueDarkMode : 'white');

  return (
    <Card
      style={{
        backgroundColor: cardBackgroundColor,
        border: `solid 1px ${satrexTheme ? '#ececec' : satrexBorderDarkColor}`,
        boxShadow: 'none',
        ...props.style,
      }}
      ref={ref}
    >
      <div className="cardHeader">
        <h4
          style={{
            textAlign: isEn ? 'left' : 'right',
            color: satrexTheme ? satrexGray : '#ecebef',
            fontSize: 20,
          }}
        >
          <Trans>{props.header}</Trans>
        </h4>
      </div>
      {props.header && (
        <center>
          <Divider style={{ width: '97%' }} />
        </center>
      )}

      {props.children}
    </Card>
  );
}

export default React.forwardRef(satrexCard);
