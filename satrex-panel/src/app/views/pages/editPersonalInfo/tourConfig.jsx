import React from 'react';

export default [

    {
        selector: '[data-tut="persoanlInfoLevels"]',
        content: () => (
            <div>
                <p>احراز هویت در دو مرحله انجام میشود. مرحله اول شامل اطلاعات شخصی و ایمیل و مرحله دوم شامل اطلاعات تماس و ارسال عکس شخصی و کارت ملی است.</p>
            </div>
        ),
    },
    {
        selector: '[data-tut="personalInfo"]',
        content: () => (
            <div>
                <p>برای احراز هویت اطلاعات شخصی خود را در این بخش وارد کنید</p>
                <p>
<span style={{ color: 'red' }}>نکته: </span>
<span>درنظر داشته باشید که اطلاعات وارد شده باید دقیق باشد </span>
                </p>
            </div>
        ),
    },
    {
        selector: '[data-tut="emailValidation"]',
        content: () => (
            <div>
                <p>ایمیل خود را در این بخش تایید کنید</p>
            </div>
        ),
    },

    {
        selector: '[data-tut="nextLevel"]',
        content: () => (
            <div>
                <p>بعد از وارد کردن اطلاعات مورد نیاز این گزینه برای شما فعال میشود و میتوانید برای کامل کردن احراز هویت به مرحله ی بعد بروید</p>
            </div>
        ),
    },

];
