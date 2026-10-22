import React from 'react';

export default [

    {
        selector: '[data-tut="contactInfo"]',
        content: () => (
            <div>
                <p>در این مرحله برای ارتقا سطح کاربری باید اطلاعات تماس خود در اینجا پر کنید</p>
            </div>
        ),
    },
    {
        selector: '[data-tut="userImages"]',
        content: () => (
            <div>
                <p>عکس های شخصی خود را در این بخش وارد کنید </p>
                <p>
<span style={{ color: 'red' }}>نکته: </span>
<span>دقت داشته باشید که عکس شخصی باید مطابق نمونه باشد</span>
                </p>
            </div>
        ),
    },

];
