import React from 'react';

export default [

    {
        selector: '[data-tut="bankAccountsList"]',
        content: () => (
            <div>
                <p>لیست کارت های بانکی خود را در اینجا میتوانید ببینید</p>
            </div>
        ),
    },
    {
        selector: '[data-tut="addNewRow"]',
        content: () => (
            <div>
                <p>برای افزودن ردیف جدید از این گزینه استفاده کنید</p>
            </div>
        ),
    },

];
