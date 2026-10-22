import React from 'react';
import { Card } from '@mui/material';
import { useSelector } from 'react-redux';
import Trans from './lang';
import { satrexGreen } from '../../styles/colors';

export default function ({
 style, children, header, imgSrc,
}) {
    const lang = useSelector((state) => state.user.language);
    const isEn = lang === 'EN' || lang === 'gr' || lang === 'fr';
    const satrexTheme = useSelector((state) => state.layout.theme);
    const cardBackground = satrexTheme ? '#ffffff' : '#121827';
    const cardBorder = satrexTheme ? 'rgba(148, 163, 184, 0.24)' : 'rgba(148, 163, 184, 0.16)';
    const titleColor = satrexTheme ? satrexGreen : '#4ade80';
    const textColor = satrexTheme ? '#334155' : '#d9e4ff';

    return (
        <Card
            style={{
                ...style,
                borderRadius: 10,
                boxShadow: satrexTheme
                    ? '0 18px 40px rgba(148, 163, 184, 0.14)'
                    : '0 18px 40px rgba(2, 6, 23, 0.36)',
                padding: 10,
                height: 300,
                backgroundColor: cardBackground,
                border: `1px solid ${cardBorder}`,
            }}
            className="cardContentHelp"
        >
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <img src={imgSrc} style={{ maxWidth: 300, maxHeight: 120 }} alt="" />
            </div>
            <div className="contentCardHeader">
        <span
            style={{
                textAlign: isEn ? 'left' : 'right',
                fontSize: '15px',
                color: titleColor,
                width: '100%',
                direction: isEn ? 'ltr' : 'rtl',
            }}
        >
          <Trans>{header}</Trans>
        </span>
            </div>

            <div
                className="cardContentText"
                style={{
                    color: textColor,
                    textAlign: isEn ? 'left' : 'right',
                    direction: isEn ? 'ltr' : 'rtl',
                }}
            >
                {children}
            </div>
        </Card>
    );
}
