export const isAuthRoutes = (route) => {
    switch (route) {
        case '/login':
            return true;
        case '/register':
            return true;
        case '/reset-password':
            return true;
        default:
            return false;
    }
};