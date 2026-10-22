## معماری و اطلاعات کلی `satrex-panel`

این پروژه پنل/وب‌اپ اصلی کاربر (End-user) است و بخش زیادی از کد آن **Legacy** است (React قدیمی + Router v5 + MUI v4)، اما در حال حاضر با **Vite** اجرا/بیلد می‌شود.

> هدف این سند: کمک به نگه‌داری و توسعه پروژه‌ای که از قبل موجود بوده، با تمرکز روی «نقطه ورود»، «مسیرها»، «auth»، «API layer»، و «state».

---

## تکنولوژی‌ها

- **React (Legacy)**: استفاده از `ReactDOM.render` در entrypoint
- **React Router DOM v5**: استفاده از `<Router history={history}>` و `withRouter`, `Redirect`
- **Redux + Thunk**: store در `src/app/redux/Store.js`
- **React Query**: `QueryClientProvider` و `ReactQueryDevtools` در `src/app/App.jsx`
- **Material-UI v4**: theme/RTL و کامپوننت‌ها (`@material-ui/core`, `@material-ui/styles`)
- **SCSS**: ساختار اصلی استایل‌ها در `src/styles/*` و `_index.scss`
- **axios**: instance اصلی + interceptors در `src/app/components/api/index.jsx`
- **Firebase**: analytics/performance + messaging token در `src/firebaseSetting.js`

---

## ساختار سطح بالا (High-level)

- `index.html`: فایل HTML اصلی که `#root` را تعریف می‌کند و `src/main.tsx` را لود می‌کند.
- `src/main.tsx`: entrypoint واقعی اپ (bootstrap).
- `src/app/App.jsx`: ریشه اپ (providers + layout + router).
- `src/app/RootRoutes.jsx`: ترکیب روت‌ها (pages + session + redirect + catch-all).
- `src/app/views/PagesRoutes.js`: روت‌های اصلی صفحات داخل پنل.
- `src/app/views/pages/sessions/SessionRoutes.jsx`: روت‌های لاگین/رجیستر/فراموشی رمز و ... .
- `src/app/MasterLayout/*`: layout/theme/navigation سیستم `Matx`.
- `src/app/redux/*`: reducers/actions/store.
- `src/app/components/api/index.jsx`: لایه axios و refresh-token.
- `src/utils/apis.ts`: یک لایه helper برای endpointها با toast/ترجمه.
- `src/app/components/lang/*`: ترجمه و i18n ساده.

---

## Bootstrap و Entry Point

### 1) `index.html` → `src/main.tsx`
- `index.html` از Vite استفاده می‌کند و فایل `src/main.tsx` را به‌صورت `type="module"` لود می‌کند.

### 2) `src/main.tsx`
- `babel-polyfill` را import می‌کند (برای ساپورت محیط‌های قدیمی‌تر).
- `ThemeProvider` با `direction: 'rtl'` اعمال می‌شود.
- اپ با `ReactDOM.render(<App />)` روی `#root` mount می‌شود.
- Firebase init و analytics/perf اجرا می‌شود.
- **ریدایرکت موبایل به PWA**: اگر مسیر `/satrex-markets` نباشد و user-agent موبایل تشخیص داده شود، کاربر به `https://pwa.<env>.ir/...` منتقل می‌شود.

> نکته: فایل `src/App.tsx` یک فایل template است و entrypoint واقعی پروژه نیست.

---

## Routing

### Router Provider
در `src/app/App.jsx` از `react-router-dom` v5 استفاده می‌شود:
- `<Router history={history}>` با history سفارشی `src/history.js`

### منبع روت‌ها: `src/app/RootRoutes.jsx`
روت‌ها به این صورت ساخته می‌شوند:
- مسیر ویژه:
  - `/satrex-markets` (صفحه مستقل بازارها)
- سپس:
  - `sessionRoutes` (مثل `/login`, `/register`, `/forgot-password`, `/reset-password`, `/404`)
  - `pagesRoutes` (صفحات اصلی پنل مثل `/home`, `/wallet`, ...)
- ریدایرکت روت:
  - `/` → `/home`
- catch-all:
  - هر مسیر نامعتبر → `/404`

### تعریف صفحات: `src/app/views/PagesRoutes.js`
صفحات عمده:
- `/home`
- `/markets`, `/market/:id`
- `/wallet`
- `/deposit`, `/withdrawal`, `/turnover`
- `/requests`, `/messages`
- `/security`, `/reports`, `/profile`
- `/deposit-withdrawal-crypto`
- `/contact-us`, `/about`, `/help`, `/policies`, `/FAQ`
- `/level-guide`, `/registration-guide`, `/fee-guide`, `/invite-friends`

برخی مسیرها `auth` دارند و با `authRoles` محدود شده‌اند (مثلاً `authRoles.admin`).

---

## Auth / Authorization

### 1) Auth اولیه: `src/app/auth/Auth.jsx`
- در constructor:
  - language/theme از `localStorage` خوانده می‌شود
  - `checkJwtAuth()` اجرا می‌شود
- توکن‌ها:
  - `bearerToken`, `refreshToken`, `expirationDate` در `localStorage`
- اگر کاربر توکن نداشته باشد (و مسیر جزو استثناها نباشد)، به `/login` هدایت می‌شود.
- اعتبار expiration/refresh نیز با `moment()` چک می‌شود.

### 2) Guard مسیرها: `src/app/auth/AuthGuard.jsx`
- بر اساس route match و `route.auth` و `user.role` مقدار `authenticated` را محاسبه می‌کند.
- نکته: بخش redirect در `redirectRoute` وجود دارد، ولی در `componentDidMount/componentDidUpdate` کامنت شده است؛ بنابراین فعلاً guard بیشتر نقش محاسباتی دارد تا enforce کامل.

---

## API Layer و ارتباط با بک‌اند

### axios instance اصلی: `src/app/components/api/index.jsx`
- `baseURL`:
  - `https://enduserapi.<env>.ir/api/v1`
  - مقدار `<env>` از `getEnv()` می‌آید (`src/utils/helpers/getEnv.js`)
- دو helper اصلی:
  - `defaultApi()`: بدون Authorization
  - `satrexApi()`: با Authorization از redux یا `localStorage`
- interceptor request:
  - `Accept-language` بر اساس `state.user.language`
- interceptor response برای `401`:
  - Refresh token به `/Token/Refresh`
  - update توکن‌ها در redux و `localStorage`
  - queue برای درخواست‌های همزمان در حالت refreshing
- `axios-retry`:
  - retry روی `401` یا offline

### لایه helper endpointها: `src/utils/apis.ts`
- wrapper هایی برای endpointهای رایج (wallet, orders, profile, ...)
- الگوی `apiCaller` برای نمایش toast و ترجمه پیام‌ها (`transFn`)

---

## State Management

### Redux
- store: `src/app/redux/Store.js`
- reducers: `src/app/redux/reducers/RootReducer.js`
  - slices: `login`, `user`, `layout`, `coin`, `bank`, `market`, `personalInfo`, ...
- اکشن خاص `EXITING`:
  - state را ریست می‌کند و فقط layout و زبان را نگه می‌دارد.

### React Query
- `QueryClientProvider` در `src/app/App.jsx`
- تنظیمات پیش‌فرض:
  - `refetchOnWindowFocus: false`
  - `retry: 3`
  - `keepPreviousData: true`

---

## i18n و RTL

### ترجمه
در `src/app/components/lang/index.jsx`:
- `<Translate>...</Translate>` برای ترجمه inline
- `transFn(word)` برای ترجمه در کد
- زبان از `state.user.language`
- زبان‌های اصلی: `FA`, `EN`

### RTL
- RTL در theme اصلی (`direction: 'rtl'`) و در برخی کامپوننت‌ها نیز set می‌شود.

---

## Notifications و Firebase

- `src/firebaseSetting.js`:
  - `initializeFirebase`, `analytics`, `perf`
  - `askForPermissionToReceiveNotifications()` برای دریافت FCM token
- در `src/app/App.jsx` از `ToastProvider` استفاده می‌شود (autoDismiss و placement).

---

## نکات نگه‌داری (Maintenance Notes)

- **Environment**: در `src/utils/helpers/getEnv.js` فعلاً مقدار env روی `'satrex'` hard-code شده است. اگر نیاز به multi-env دارید، این فایل نقطه اصلی تغییر است.
- **Router v5**: برای مهاجرت به Router v6 نیاز به بازنویسی `Redirect/withRouter` و ساختار route config خواهید داشت.
- **legacy/template files**: وجود `src/App.tsx` (template) ممکن است گمراه‌کننده باشد؛ به entrypoint واقعی (`src/main.tsx` و `src/app/App.jsx`) توجه کنید.

