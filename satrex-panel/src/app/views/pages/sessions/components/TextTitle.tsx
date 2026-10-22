import React from 'react';
import logo from '../../../../../images/newLogo/logo.png';
import darkLogo from '../../../../../images/newLogo/logo-4.png';

interface textTitlePropType{
    color:string
}

const TextTitle: React.FC<textTitlePropType> = ({ color = 'white' }) => (
    <img
        src={color === 'white' ? darkLogo : logo}
        alt="Logo"
        style={{ width: '100%', height: 'auto', display: 'block' }}
    />
);

export default TextTitle;
