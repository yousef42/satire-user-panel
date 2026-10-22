# Satrex User Front (Monorepo)

این ریپو شامل **دو اپلیکیشن فرانت‌اند مستقل** است که هر کدام جداگانه build و deploy می‌شوند.

## اپلیکیشن‌ها

### `satrex-panel/`
- **نوع پروژه**: پنل کاربری/وب‌اپ اصلی
- **استک غالب**: React (Legacy) + Material-UI v4 + Redux/Thunk + React Router v5 + React Query + axios
- **Build Tool فعلی**: Vite (ورودی `index.html` → `src/main.tsx`)
- **داک معماری**: `satrex-panel/ARCHITECTURE.md`

### `clear-queens-guess/`
- **نوع پروژه**: پنل ادمین / داشبورد
- **استک**: Refine + React 18 + Vite + TypeScript + Ant Design + axios
- **Package Manager**: `pnpm` (دارای `pnpm-lock.yaml`)
- **داک معماری**: `clear-queens-guess/ARCHITECTURE.md`

## پیش‌نیازها
- **Node.js**: ترجیحاً 18 LTS یا 20 LTS
- **pnpm**: فقط برای پروژه `clear-queens-guess`

## اجرای لوکال

### اجرای `satrex-panel`

```bash
cd satrex-panel
npm install
npm run dev
```

### اجرای `clear-queens-guess`

```bash
cd clear-queens-guess
pnpm install
pnpm dev
```

## نکته مهم
- این ریپو به‌صورت کامل یکپارچه نشده و آثار migration/legacy در `satrex-panel` وجود دارد (مثلاً برخی فایل‌های template ویت مثل `satrex-panel/src/App.tsx` و `satrex-panel/README.md` که باید با واقعیت پروژه هم‌راستا شوند). جزئیات در داک معماری هر پروژه آمده است.


# Satrex_new_user_Panel
