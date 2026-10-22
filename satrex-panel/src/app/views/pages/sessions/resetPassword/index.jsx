import React from 'react';
import MasterPage from '../MasterPage';
import RegisterFormTabs from './RegisterFormTabs';

const signUp = () => (
    <MasterPage back={{ path: '/login' }}>
        <RegisterFormTabs />
    </MasterPage>
);

export default signUp;
