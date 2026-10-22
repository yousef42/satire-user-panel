import React from 'react';
import authpic1 from '../../../../../images/helpPhotos/3.png';
import auth2 from '../../../../../images/helpPhotos/auth2.png';
import auth3 from '../../../../../images/helpPhotos/auth3.png';
import auth4 from '../../../../../images/helpPhotos/auth4.png';
import auth5 from '../../../../../images/helpPhotos/auth5.png';
import auth6 from '../../../../../images/helpPhotos/auth6.png';
import auth7 from '../../../../../images/helpPhotos/auth7.png';
import auth8 from '../../../../../images/helpPhotos/auth8.png';
import Trans from '../../../../components/lang';
import Liked from '../Liked';
import { satrexGreen } from '../../../../../styles/colors';

export default function (props) {
    return (
        <div style={{ width: '100%' }}>
            <div style={{ padding: '20px' }}>
                <p>
                    <Trans>helpPageDescriptionLine31</Trans>
                </p>
                <h5 style={{ marginTop: '30px', color: satrexGreen }}><Trans>UserLevel1</Trans></h5>
                <p>
                    برای این سطح کاربری شما نیازمند تایید اطلاعات شخصی، ایمیل و حداقل یک حساب بانکی هستید.
                </p>
                <p>
                    <Trans>helpPageDescriptionLine32</Trans>
                </p>
                <center>
                    <img
                        src={authpic1}
                        style={{ maxWidth: 1200 }}
                        alt=""
                    />
                    <img
                        src={auth2}
                        style={{ maxWidth: 1200 }}
                        alt=""
                    />
                    <img
                        src={auth3}
                        style={{ maxWidth: 1200 }}
                        alt=""
                    />
                </center>
                <p>
                    چنانچه بیش از 2 مرتبه برای این مرحله درخواست بررسی بدهد و بعلت  وارد کردن اطلاعات نادرست موفق به تایید اطلاعات این بخش نشوید، فرم زیر برای شما نمایش داده می­شود که تصویر کارت ملی و تصویر شخصی مطابق نمونه باید ضمیمه گردد. از آنجا که در این مرحله اطلاعات شما توسط ادمین بررسی و تایید می­شود، زمان بیشتری خواهد برد. لذا توصیه می­شود در همان درخواست اولیه از صحت اطلاعات اطمینان حاصل فرمایید.
                </p>
                <center>
                <img
                    src={auth4}
                    style={{ maxWidth: 1200 }}
                    alt=""
                />
                </center>
                <p>
                    در مرحله بعد با وارد کردن ایمیل معتبر و درخواست بررسی، کد صحت سنجی به ایمیل شما ارسال خواهد شد که با وارد کردن این کد ایمیلتان تایید می­شود. در صورت تمایل میتوانید آدرس ایمیلتان را ذخیره و در فرصتی دیگر نسبت به تایید آن اقدام نمایید.
                </p>
                <center>
                    <img
                        src={auth5}
                        style={{ maxWidth: 1200 }}
                        alt=""
                    />
                </center>
                <p>
                    در آخرین مرحله احراز هویت سطح یک، شماره کارت بانکی و شماره شبا همان کارت را ذخیره کرده و منتظر بررسی ادمین سیستم باشید. توجه داشته باشید کارت بانکی باید متعلق به کاربر بوده و از ثبت کارت بانکی اشخاص دیگر خودداری فرمایید. در صورت تایید اطلاعات بانکی، شما به عنوان کاربر سطح یک قادر به فعالیت در ساترکس خواهید بود.
                </p>
                <center>
                    <img
                        src={auth6}
                        style={{ maxWidth: 1200 }}
                        alt=""
                    />
                </center>
                <h5 style={{ marginTop: '30px', color: satrexGreen }}><Trans>UserLevel2</Trans></h5>
                <p>
                    برای ارتقا به سطح کاربری دو، فرآیند احراز هویت را در مرحله دوم ادامه دهید. در این مرحله اطلاعات تماس، تصویر کارت ملی و تصویر شخصی شما مورد بررسی قرار خواهد گرفت.
                </p>
                <p>
                    پس از تکمیل فرم اطلاعات تماس با درخواست بررسی، در انتظار تایید اطلاعات و با ذخیره اطلاعات در زمان دیگری می­توانید درخواست بررسی را فعال کنید.
                </p>
                <center>
                    <img
                        src={auth7}
                        style={{ maxWidth: 1200 }}
                        alt=""
                    />
                </center>
                <p>
                    در آخرین مرحله تصویر کارت ملی و تصویر شخصی مطابق نمونه را ارسال نمایید. پس از بررسی و تایید توسط مدیر سیستم، سطح کاربری شما به سطح دو ارتقا خواهد یافت.
                </p>
                <center>
                    <img
                        src={auth8}
                        style={{ maxWidth: 1200 }}
                        alt=""
                    />
                </center>

                <Liked />
            </div>
        </div>
    );
}
