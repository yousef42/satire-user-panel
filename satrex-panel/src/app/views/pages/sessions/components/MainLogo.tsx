import React from 'react';

import logo from '../../../../../images/newLogo/logo.png';

const MainLogo: React.FC = () => (
    <img
        src={logo}
        alt="Logo"
        style={{ width: '100%', height: 'auto', display: 'block' }}
    />
);

export default MainLogo;
