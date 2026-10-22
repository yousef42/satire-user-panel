import React from 'react';

export default [
    {
        selector: '[data-tut="favMarkets"]',
        content: () => (
            <div>
                <p>لیست بازارهای انتخابی خود را اینجا ببینید</p>
            </div>
        ),
    },
    {
        selector: '[data-tut="marketTypes"]',
        content: () => (
            <div>
                <p>لیست بازارها بر اساس نوع آن ها را اینجا ببینید</p>
            </div>
        ),
    },
    {
        selector: '[data-tut="searchMarketpage"]',
        content: () => (
            <div>
                <p>در این قسمت میتوانید رمز ارز مورد نظر را جستجو کنید</p>
            </div>
        ),
    },
    {
        selector: '[data-tut="addToFav"]',
        content: () => (
            <div>
                <p>با فشردن این دکمه مارکت به لیست علاقه مندی های شما اضافه یا حذف میشود</p>
            </div>
        ),
    },

];
