import React from 'react';
import Trans from '../../../components/lang';

export default [

    {
        selector: '[data-tut="setWithdrawalDate"]',
        content: () => (
            <div>
                <p>در این بخش  میتوانید زمان برداشت وجه را وارد کنید</p>
                <p>
<span style={{ color: 'red' }}>نکته: </span>
<span><Trans>SaterexRialSettlementSchedule</Trans></span>
                </p>
            </div>
        ),
    },
    {
        selector: '[data-tut="totalFundWithdrawal"]',
        content: () => (
            <div>
                <p>موجودی قابل برداشت شما در اینجا قرار دارد</p>
            </div>
        ),
    },
    {
        selector: '[data-tut="withdrawalPrice"]',
        content: () => (
            <div>
                <p>مبلغ برداشت را در اینجا وارد کنید</p>
            </div>
        ),
    },
    {
        selector: '[data-tut="selectedBankAccount"]',
        content: () => (
            <div>
                <p>در این قسمت میتوانید یکی از کارت های تایید شده توسط ادمین را برای برداشت وجه انتخاب کنید</p>
            </div>
        ),
    },
    {
        selector: '[data-tut="addNewBankAccount"]',
        content: () => (
            <div>
                <p>اگر اکانت بانکی ایجاد نکرده ایید ویا برای بررسی ادمین ارسال نکرده ایید با انتخاب این گزینه مستقیما به صفحه ایجاد کارت بانکی هدایت میشوید</p>
            </div>
        ),
    },

    {
        selector: '[data-tut="toFactorCode"]',
        content: () => (
            <div>
                <p>ثبت برداشت نیاز به کد دوعاملی دارد که در این قسمت میتوانیددرخواست کد پیامکی را انتخاب و سپس کد ارسال شده را در فیلد مربوطه وارد کنید</p>
            </div>
        ),
    },
{
        selector: '[data-tut="bankNetFee"]',
        content: () => (
            <div>
                <p>کارمزد شبکه بانکی را میتوانید اینجا ببینید</p>
            </div>
        ),
    },

];
