import React from 'react';

export default [
    {
        selector: '[data-tut="toolbarSetting"]',
        content: () => (
            <div>
                <p>در این بخش میتوانید تنظیماتی چون تم پلتفرم ,زبان و... را تغییر دهید</p>
            </div>
        ),
    },
    {
        selector: '[data-tut="toolbarQuickAccess"]',
        content: () => (
            <div>
                <p>برای دسترسی سریع به صفحات اصلی سایت میتوانید از این بخش استفاده کنید</p>
            </div>
        ),
    },
    {
        selector: '[data-tut="menu"]',
        content: () => (
            <div>
                <p>از این قسمت میتوانید ساید بار را باز و یا بسته کنید</p>
            </div>
        ),
    },
{
    selector: '[data-tut="sliderTour"]',
    content: () => (
      <div>
        <p>قیمت جهانی کوین های مورد پشتیبانی را در این بخش میتوانید مشاهده کنید, همچنین با کلیک بر روی هر کدام از کوین ها به صفحه معامله آن هدایت میشوید</p>
      </div>
    ),
  },
{
    selector: '[data-tut="dashboardTotalVolumeInToman"]',
    content: () => (
      <div>
        <p>مجموع کل دارایی های موجود در کیف پول های خود به تومان را در این بخش میتوانید ببینید</p>
      </div>
    ),
  },
{
    selector: '[data-tut="dashboardTotalVolumeInTether"]',
    content: () => (
      <div>
        <p>مجموع کل دارایی های موجود در کیف پول های خود  به تتر را در این بخش میتوانید ببینید</p>
      </div>
    ),
  },
{
    selector: '[data-tut="dashboardWalletChart"]',
    content: () => (
      <div>
        <p>موجودی خود را در یک هفته گذشته میتوانید در این بخش مشاهده کنید</p>
      </div>
    ),
  },
{
    selector: '[data-tut="dashboardWalletList"]',
    content: () => (
      <div>
        <p>در این قسمت لیست کیف پول های غیر صفر شما نمایش داده میشود</p>
      </div>
    ),
  },
    {
        selector: '[data-tut="dashboardUserLevel"]',
        content: () => (
            <div>
                <p>میزان انجام شده احراز هویت خود را در این بخش مشاهده کنید</p>
            </div>
        ),
    },
    {
        selector: '[data-tut="firstRowGuide"]',
        content: () => (
            <div>
                <p>با انتخاب کلیک بر روی هرکدام از سرستون ها جدول ها بر اساس همان ستون به صورت صعودی یا نزولی مرتب میشود, همچنین با کشیدین کناره های سرستون ها میتوانید طول آن را تنظیم کنید</p>
            </div>
        ),
    },

  {
    selector: '[data-tut="dashboardMarketList"]',
    content: () => (
      <div>
        <p>دراین قسمت میتوانید لیست بازارها را در ۲۴ ساعت گذشته مشاهده کنید</p>
      </div>
    ),
  },
{
    selector: '[data-tut="activateGuide"]',
    content: () => (
      <div>
        <p>با انتخاب این گزینه راهنمای صفحه ی جاری فعال میشود </p>
      </div>
    ),
  },

];
