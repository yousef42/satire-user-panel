import React from 'react';

export default [

    {
        selector: '[data-tut="levelStatus"]',
        content: () => (
            <div>
                <p>وضعیت احراز هویت خود را میتوانید در این جا ببینید</p>
            </div>
        ),
    },
    {
        selector: '[data-tut="accountStatus"]',
        content: () => (
            <div>
                <p>امکانات سطح کاربری خود را در  این جا ببینید</p>
            </div>
        ),
    },
    {
        selector: '[data-tut="walletStatus"]',
        content: () => (
            <div>
                <p>وضعیت کیف پول خود را در اینجا ببینید</p>
            </div>
        ),
    },
    {
        selector: '[data-tut="personalInfo"]',
        content: () => (
            <div>
                <p>وضعیت اطلاعات شخصی خود را در اینجا ببینید</p>
            </div>
        ),
    },
    {
        selector: '[data-tut="bankInfoStatus"]',
        content: () => (
            <div>
                <p>وضعیت اکانت های بانکی خود را در اینجا ببینید</p>
            </div>
        ),
    },

];
