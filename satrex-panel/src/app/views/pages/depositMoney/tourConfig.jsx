import React from 'react';

export default [

    {
        selector: '[data-tut="selectBankAccount"]',
        content: () => (
            <div>
                <p>در این قسمت میتوانید یکی از کارت های تایید شده توسط ادمین را برای واریز وجه انتخاب کنید</p>
            </div>
        ),
    }, {
        selector: '[data-tut="setAmountDeposit"]',
        content: () => (
            <div>
                <p>مبلغ مورد نظر را در اینجا وارد کنید</p>
            </div>
        ),
    }, {
        selector: '[data-tut="maxDepositAmount"]',
        content: () => (
            <div>
                <p>حداکثر مبلغی که میتوانید وارد کنید در اینجا قرار دارد</p>
            </div>
        ),
    },

];
