## معماری و تکنولوژی‌های پروژه

این پروژه یک پنل داخلی/داشبورد **React** است که با **Refine**، **Vite**، **TypeScript** و **Ant Design** ساخته شده و از **axios** برای ارتباط با بک‌اند استفاده می‌کند.

- **فریم‌ورک اصلی**: React 18 (`react`, `react-dom`)
- **فریم‌ورک اپلیکیشن**: Refine (`@refinedev/core` و پکیج‌های مرتبط)
- **UI Kit**: Ant Design 5 (`antd`, `@ant-design/icons`)
- **Router**: React Router v6 (`react-router-dom`, `@refinedev/react-router-v6`)
- **Build Tool**: Vite 4 (`vite`, `@vitejs/plugin-react`)
- **زبان**: TypeScript (`typescript`، `@types/*`)
- **Networking**: axios با یک اینستنس کانفیگ شده در `src/config/axios.ts`
- **مدیر بسته**: pnpm (فایل `pnpm-lock.yaml`)

## ساختار سطح بالا

- `src/index.tsx`: ورودی React که با `createRoot` کامپوننت `App` را روی المان `root` رندر می‌کند.
- `src/App.tsx`: روت اپلیکیشن که Refine را با providerها، resources، layout و routing تنظیم می‌کند.
- `src/pages/*`: صفحات مختلف (مثل `blog-posts`، `categories`، `customer`) که به عنوان list/create/edit/show در Refine تعریف شده‌اند.
- `src/components/*`: کامپوننت‌های مشترک UI (مثلاً `Header`).
- `src/contexts/color-mode`: کانتکست مدیریت تم/حالت تیره/روشن.
- `src/config/axios.ts`: اینستنس axios با `baseURL` و interceptor برای ست کردن توکن.
- `src/authProvider.ts`: منطق احراز هویت برای Refine (login/logout/check auth و ...).
- `src/providers/dataProvider.ts`: data provider برای اتصال Refine به API بک‌اند.

## جریان اصلی اپلیکیشن

1. **Bootstrap** (در `src/index.tsx`):
   - `createRoot` روی المان دارای id=`root`.
   - رندر `<App />` داخل `<React.StrictMode>`.

2. **ریشه اپلیکیشن** (در `src/App.tsx`):
   - دور اپلیکیشن چند لایه provider پیچیده شده‌اند:
     - `BrowserRouter` از React Router.
     - `RefineKbarProvider` برای kbar (command palette).
     - `ColorModeContextProvider` برای مدیریت حالت رنگ.
     - `AntdApp` برای context داخلی Ant Design.
     - `DevtoolsProvider` برای Refine Devtools.
   - داخل این لایه‌ها، کامپوننت اصلی `<Refine />` تنظیم شده است با:
     - `dataProvider={dataProvider}`
     - `notificationProvider={useNotificationProvider}`
     - `routerProvider={routerBindings}`
     - `authProvider={authProvider}`
     - آرایه `resources` که resourceهای مختلف (مثل `blog_posts` و `customers`) را تعریف می‌کند.
   - گزینه‌های عمومی Refine (مثل `syncWithLocation`, `warnWhenUnsavedChanges`, `projectId`) در `options` ست شده‌اند.

3. **Routing و Layout**:
   - از `Routes` و `Route` در React Router v6 استفاده شده است.
   - برای بخش‌های حفاظت‌شده از کامپوننت `<Authenticated>` استفاده می‌شود:
     - اگر کاربر احراز هویت نشده باشد، با `CatchAllNavigate` به `/login` ریدایرکت می‌شود.
   - Layout اصلی با `ThemedLayoutV2` ساخته شده که:
     - `Header` سفارشی پروژه را به عنوان هدر می‌گیرد.
     - `ThemedSiderV2` به صورت ثابت (`fixed`) برای منوی کناری استفاده می‌شود.
     - `Outlet` محتوای صفحات داخلی را نمایش می‌دهد.
   - روت‌ها به این صورت تعریف شده‌اند:
     - `/blog-posts`: لیست/ساخت/ویرایش/نمایش بلاگ‌پست‌ها.
     - `/customers`: لیست مشتری‌ها.
     - `/categories`: لیست/ساخت/ویرایش/نمایش دسته‌بندی‌ها.
     - مسیرهای auth (`/login`, `/register`, `/forgot-password`) در یک شاخه‌ی جداگانه که با `<Authenticated>` دیگر محافظت شده/هدایت می‌شوند.

4. **Auth و Authorization**:
   - `authProvider` پیاده‌سازی شده و به Refine پاس داده شده است.
   - کامپوننت `<Authenticated>` وضعیت login را چک می‌کند و در صورت عدم احراز هویت، کاربر را به صفحه‌ی ورود می‌فرستد.
   - توکن احراز هویت در `localStorage` ذخیره می‌شود و توسط axios در هر درخواست در هدر `Authorization` قرار می‌گیرد.

5. **Networking و ارتباط با بک‌اند**:
   - در `src/config/axios.ts` یک اینستنس axios به شکل زیر ساخته شده است:
     - `baseURL: "https://ws-offline-sales.indraproject.ir/api"`
     - interceptor روی `request` که:
       - مقدار `TOKEN_KEY` (از `authProvider`) را از `localStorage` خوانده.
       - در `config.headers["Authorization"]` به صورت `Bearer <token>` ست می‌کند.
   - `dataProvider` از این axios برای فراخوانی endpointهای REST استفاده می‌کند (الگوی Simple REST Refine).

## الگوی کدنویسی و استایل

- **TypeScript-first**:
  - تمام فایل‌های اصلی با پسوند `.tsx`/`.ts` نوشته شده‌اند.
  - استفاده از typeها و اینترفیس‌ها برای props و داده‌ها (در صفحات و providerها).

- **کامپوننت‌های تابعی (Function Components)**:
  - همه‌ی کامپوننت‌ها به صورت تابعی نوشته شده‌اند.
  - از React Hooks (و Hooks مخصوص Refine و Ant Design) برای state و side-effectها استفاده می‌شود.

- **تفکیک مسئولیت**:
  - صفحات در پوشه‌ی `src/pages` بر اساس domain جدا شده‌اند (`blog-posts`, `categories`, `customer`).
  - منطق auth در `authProvider` متمرکز شده است.
  - ارتباط با API در لایه‌ی `dataProvider` و `config/axios` قرار دارد.
  - layout و header در `components` و `contexts` جدا شده‌اند.

- **استفاده از Refine Patterns**:
  - تعریف `resources` در `<Refine />` و استفاده از آن‌ها برای routeها و navigation.
  - استفاده از `useNotificationProvider` برای نمایش نوتیفیکیشن‌ها.
  - استفاده از `NavigateToResource`, `CatchAllNavigate`, `UnsavedChangesNotifier`, `DocumentTitleHandler` به سبک استاندارد Refine.

## چرخه توسعه و اجرا

- **توسعه**:
  - `pnpm dev` → اجرای `refine dev` که عملاً Vite dev server را با HMR بالا می‌آورد.
  - Refine Devtools روی یک پورت جدا (مثلاً ۵۰۰۱) اجرا می‌شود.

- **بیلد و اجرا در حالت production**:
  - `pnpm build` → اجرای `tsc` و سپس `refine build`.
  - `pnpm start` → اجرای `refine start` برای سِرو کردن خروجی بیلد.

## نکات مهم برای نگه‌داری و توسعه

- برای اضافه کردن یک ماژول/domain جدید:
  - یک فولدر جدید در `src/pages` بسازید.
  - کامپوننت‌های list/create/edit/show را پیاده‌سازی کنید.
  - یک resource جدید در آرایه‌ی `resources` در `App.tsx` اضافه کنید و routeهای مربوطه را تنظیم کنید.

- برای تغییر نحوه‌ی ارتباط با بک‌اند:
  - `src/config/axios.ts` و `src/providers/dataProvider.ts` نقطه‌های اصلی هستند.
  - می‌توانید `baseURL` را به env (مثلاً `VITE_API_URL`) منتقل کنید و از `import.meta.env` استفاده کنید.

- برای تغییر رفتار auth:
  - توابع `login`, `logout`, `checkAuth`, `getPermissions` و ... در `authProvider` را ویرایش کنید.

