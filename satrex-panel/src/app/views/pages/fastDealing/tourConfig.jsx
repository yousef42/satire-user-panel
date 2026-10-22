import React from 'react';

export default [

    {
        selector: '[data-tut="chooseCrypto"]',
        content: () => (
            <div>
                <p>برای ثبت معامله ی سریع ابتدا از این بخش رمز ارز مورد نظر خود را وارد کنید </p>
            </div>
        ),
    },
    {
        selector: '[data-tut="setAmountFastdeal"]',
        content: () => (
            <div>
                <p>میزان رمزارز مورد نظر خود را در این بخش وارد کنید</p>
            </div>
        ),
    },
    {
        selector: '[data-tut="exchangePrice"]',
        content: () => (
            <div>
                <p>مبلغ قابل عرضه صرافی در این بخش قرار میگیرد</p>
            </div>
        ),
    },
    {
        selector: '[data-tut="totalAmount"]',
        content: () => (
            <div>
                <p>مجموع مبلغ در این بخش قرار میگیرد.همچنین میتوانید با وارد کردن این بخش  فیلد میزان را نیز تنظیم کنید</p>
            </div>
        ),
    },

    {
        selector: '[data-tut="transactionDetail"]',
        content: () => (
            <div>
                <p>جزئیات معامله شما در این جا قرار میگیرد</p>
            </div>
        ),
    },
    {
        selector: '[data-tut="maxAmount"]',
        content: () => (
            <div>
                <p>حداکثر میزان قابل معامله شما در این مکان قرار میگیرد و با کلیک بر روی آن فیلد میزان مقدار دهی میشود</p>
            </div>
        ),
    },

];
