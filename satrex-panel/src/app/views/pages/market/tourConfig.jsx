import React from 'react';

export default [

    {
        selector: '[data-tut="totalCryptoInfo"]',
        content: () => (
            <div>
                <p>اطلاعات کلی درباره رمزارز را میتوانید در این بخش مشاهده کنید</p>
            </div>
        ),
    },

    {
        selector: '[data-tut="buySellPresure"]',
        content: () => (
            <div>
                <p>فشار خرید و فروش در رمز را در اینجا ببینید</p>
            </div>
        ),
    },
    {
        selector: '[data-tut="buySellQueue"]',
        content: () => (
            <div>
                <p>سفارشات خرید و فروش را در اینجا ببینید</p>
            </div>
        ),
    },
    {
        selector: '[data-tut="marketChart"]',
        content: () => (
            <div>
                <p>جارت مربوط به بازار خود را میتوانید در اینجا ببینید</p>
            </div>
        ),
    },
    {
        selector: '[data-tut="availableMarkets"]',
        content: () => (
            <div>
                <p>لیست بازا های موجود در این بخش قرار دارد  و میتوانید جابه جایی بین بازارها را از این بخش نیز انجام دهید</p>
            </div>
        ),
    },
    {
        selector: '[data-tut="matchedOrdersPart"]',
        content: () => (
            <div>
                <p>لیست معاملات انجام شده در این بخش قرار دارد</p>
            </div>
        ),
    },
    {
        selector: '[data-tut="openOrdersPart"]',
        content: () => (
            <div>
                <p>لیست سفارشات باز خود را میتوانید در این بخش مشاهده کنید</p>
            </div>
        ),
    },
    {
        selector: '[data-tut="todaysOrdersPart"]',
        content: () => (
            <div>
                <p>لیست سفارشات امروز خود را در این بخش میتوانید مشاهده کنید</p>
            </div>
        ),
    },

];
