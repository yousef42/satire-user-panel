import React, { useState } from 'react';
import MasterPage from './MasterPage';
import RegisterFormTabs from './components/RegisterFormTabs';

const signUp = () => {
    const [smsCodeShow, setSmsCodeShow] = useState(false);

    return (
        <MasterPage back={smsCodeShow && { path: '/login' }}>
            <RegisterFormTabs smsCodeShow={smsCodeShow} setSmsCodeShow={setSmsCodeShow} />
        </MasterPage>
    );
};

export default signUp;
