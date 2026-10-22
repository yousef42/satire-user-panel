import React from 'react';

export default [
    {
        selector: '[data-tut="walletTable"]',
        content: () => (
            <div>
                <p>لیست کیف پول های خود را در اینجا ببینید</p>
            </div>
        ),
    }, {
        selector: '[data-tut="searchWalletpage"]',
        content: () => (
            <div>
                <p>در این قسمت میتوانید رمز ارز مورد نظر را جستجو کنید</p>
            </div>
        ),
    }, {
        selector: '[data-tut="nonZeroBtn"]',
        content: () => (
            <div>
                <p>با فشردن این دکمه فقط کیف پول های غیر صفر شما نمایش داده میشود</p>
            </div>
        ),
    }, {
        selector: '[data-tut="withdrawal"]',
        content: () => (
            <div>
                <p>با فشردن این دکمه به صفحه واریز رمز ارز انتخابی هدایت میشوید</p>
            </div>
        ),
    }, {
        selector: '[data-tut="deposit"]',
        content: () => (
            <div>
                <p>با فشردن این دکمه به صفحه برداشت رمز ارز انتخابی هدایت میشوید</p>
            </div>
        ),
    },

    ];
