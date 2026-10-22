import React from 'react';

export default [

    {
        selector: '[data-tut="ticketTitle"]',
        content: () => (
            <div>
                <p>برای ارسال پیام به پشتیبان سیستم ابتدا موضوع پیام خود را در این بخش وارد کنید</p>
            </div>
        ),
    },
    {
        selector: '[data-tut="department"]',
        content: () => (
            <div>
                <p>برای بررسی دقیق تر مشکل شما دپارتمان خود را از این بخش انتخاب کنید </p>
            </div>
        ),
    },
    {
        selector: '[data-tut="Priority"]',
        content: () => (
            <div>
                <p>اولویت بررسی پیام را در این بخش مشخص کنید</p>
            </div>
        ),
    },
    {
        selector: '[data-tut="Priority"]',
        content: () => (
            <div>
                <p>اولیت بررسی پیام را در این بخش مشخص کنید</p>
            </div>
        ),
    },
    {
        selector: '[data-tut="message"]',
        content: () => (
            <div>
                <p>متن اصلی پیام خود را با جزئیات اینجا وارد کنید</p>
            </div>
        ),
    },
    {
        selector: '[data-tut="captcha"]',
        content: () => (
            <div>
                <p>برای ارسال پیام نیاز هست که حروف این بخش را کامل کنید</p>
            </div>
        ),
    },
    {
        selector: '[data-tut="messageList"]',
        content: () => (
            <div>
                <p>لیست پیام های خود را در اینجا میتوانید مشاهده کنید</p>
            </div>
        ),
    },

];
