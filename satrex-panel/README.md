# satrex-panel

پنل کاربری/وب‌اپ اصلی satrex.

## تکنولوژی‌ها (High-level)

- **React**: نسخه‌های قدیمی‌تر (Legacy) — در کدها از `ReactDOM.render` استفاده شده است.
- **Router**: React Router v5 + `history` سفارشی (`src/history.js`)
- **State**: Redux + Thunk (`src/app/redux/Store.js`)
- **Server State**: React Query (`react-query`)
- **UI**: Material-UI v4 + RTL
- **Styling**: SCSS + theme سیستم `Matx`
- **Networking**: axios + interceptor برای refresh token (`src/app/components/api/index.jsx`)
- **Notifications**: toast ها + Firebase messaging/analytics/perf (`src/firebaseSetting.js`)
- **Build Tool**: Vite (`index.html` → `src/main.tsx`)

## اجرا

### پیش‌نیازها
- Node.js (ترجیحاً 18 LTS یا 20 LTS)

### نصب

```bash
npm install
```

### توسعه (Dev)

```bash
npm run dev
```

### بیلد (Production)

```bash
npm run build
```

### اجرای خروجی بیلد

```bash
npm run preview
```

## داکیومنت معماری

جزئیات معماری، مسیرها، auth، لایه API و نکات نگه‌داری در این فایل آمده است:

- `ARCHITECTURE.md`             

## نکته

در این پروژه برخی فایل‌های template (مثل `src/App.tsx`) وجود دارد که **entrypoint واقعی اپ** نیستند. مسیر اجرای واقعی از `index.html` به `src/main.tsx` و سپس `src/app/App.jsx` است.

# satrex-user-panel
