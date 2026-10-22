import React from 'react';

export default [
    {
        selector: '[data-tut="chooseCoin"]',
        content: () => (
            <div>
                <p>برای ثبت واریز  رمز ارز ابتدا باید رمز ارز خود را از این بخش انتخاب کنید</p>
            </div>
        ),
    },
    {
        selector: '[data-tut="walletBalance"]',
        content: () => (
            <div>
                <p>موجودی کیف پول شما در این بخش قرار دارد</p>
            </div>
        ),
    },
    {
        selector: '[data-tut="chooseNetwork"]',
        content: () => (
            <div>
                <p>بعد از انتخاب رمزارز مورد نظر شبکه های مورد ساپورت در این جا قرار میگیرد</p>
            </div>
        ),
    },

    {
        selector: '[data-tut="showBlockchainAddress"]',
        content: () => (
            <div>
                <p>بعد از انتخاب رمزارز و سپس انتخاب شبکه برای نمایش آدرس کیف پول خود این دکمه را بفشارید</p>
            </div>
        ),
    },
    {
        selector: '[data-tut="updateInvestory"]',
        content: () => (
            <div>
                <p>بعد از واریز برای بروزرسانی موجودی خود میتوانید این دکمه را بفشارید</p>
            </div>
        ),
    },
    {
        selector: '[data-tut="blockChainAddress"]',
        content: () => (
            <div>
                <p>آدرس بلاکچین شما در اینجا قرار میگیرد</p>
            </div>
        ),
    },
    {
        selector: '[data-tut="qrCode"]',
        content: () => (
            <div>
                <p>کیوآر کد آدرس بلاکچین شما در این جا قرار میگیرد</p>
            </div>
        ),
    },
    {
        selector: '[data-tut="chooseCoin2"]',
        content: () => (
            <div>
                <p>برای ثبت برداشت رمز ارز ابتدا باید رمز ارز خود را از این بخش انتخاب کنید</p>
            </div>
        ),
    },
    {
        selector: '[data-tut="walletBalance2"]',
        content: () => (
            <div>
                <p>موجودی کیف پول شما در این بخش قرار دارد</p>
            </div>
        ),
    },
    {
        selector: '[data-tut="withdrawalAmount"]',
        content: () => (
            <div>
                <p>مقدار برداشت رمز ارز را در اینجا وارد کنید</p>
                <p>در نظر داشته باشید که مقدار برداشت نمیتواند بیشتر از موجودی شما باشد</p>
            </div>
        ),
    },
    {
        selector: '[data-tut="destinationWalletAddress"]',
        content: () => (
            <div>
                <p>آدرس کیف پول مقصد را اینجا وارد کنید</p>
            </div>
        ),
    },
    {
        selector: '[data-tut="paste"]',
        content: () => (
            <div>
                <p>برای جایگذاری آدرس از کلیپ بورد خود میتوانید از این دکمه استفاده کنید</p>
                <p>در صورت کار نکردن دکمه باید مجوز آن را در مرورگر خود اعمال کنید</p>
            </div>
        ),
    },
    {
        selector: '[data-tut="toFactorWithdrawalCode"]',
        content: () => (
            <div>
                <p>برای ثبت برداشت باید کد دوعاملی برای شما ارسال شود سپس مقدار آن را در اینجا وارد کنید</p>
            </div>
        ),
    },
    {
        selector: '[data-tut="networkFee"]',
        content: () => (
            <div>
                <p>کارمزد تقریبی شبکه ی رمز ارز انتخابی را میتوانید در اینجا مشاهده کنید</p>
            </div>
        ),
    },
];
