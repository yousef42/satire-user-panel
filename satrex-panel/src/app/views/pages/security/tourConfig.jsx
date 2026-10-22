import React from 'react';

export default [

    {
        selector: '[data-tut="changePassword"]',
        content: () => (
            <div>
                <p>در این بخش میتوانید پسورد فعلی خود را عوض کنید</p>
            </div>
        ),
    },
    {
        selector: '[data-tut="enableLoginPassword"]',
        content: () => (
            <div>
                <p>با فعال کردن این بخش به هنگام ورود پیامکی برای تایید ارسال میشود</p>
            </div>
        ),
    },
    {
        selector: '[data-tut="loginLog"]',
        content: () => (
            <div>
                <p>در این بخش لیست تمام ورود های شما به سامانه نمایش داده میشود</p>
            </div>
        ),
    },
    {
        selector: '[data-tut="loginReport"]',
        content: () => (
            <div>
                <p>در این بخش میتوانید سفارشات, درخواست ها و گردش حساب های خود در یک بازه ورود مشخص مشاهده کنید </p>
            </div>
        ),
    },

];
