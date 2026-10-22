import React from 'react';
import MasterPage from './MasterPage';
import RegisterFormTabs from './resetPassword/RegisterFormTabs';

const ForgotPassword = () => (
    <MasterPage back={{ path: '/login' }}>
        <RegisterFormTabs />
    </MasterPage>
);

export default ForgotPassword;
