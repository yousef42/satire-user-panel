import { cssTransition, toast } from 'react-toastify';

const bounce = cssTransition({
    enter: 'animate__animated animate__bounceInDown',
    exit: 'animate__animated animate__bounceOutUp',
});

const toastOptions = { transition: bounce };

export default (text, type) => {
    const kind = String(type || 'default').toLowerCase();
    if (kind === 'success') return toast.success(text, toastOptions);
    if (kind === 'error') return toast.error(text, toastOptions);
    if (kind === 'info') return toast.info(text, toastOptions);
    if (kind === 'warning' || kind === 'warn') return toast.warning(text, toastOptions);
    return toast(text, toastOptions);
};
