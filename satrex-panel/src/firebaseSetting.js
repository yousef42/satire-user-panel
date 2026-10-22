import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';
import { getAnalytics } from 'firebase/analytics';
import { getPerformance } from 'firebase/performance';

export const initializeFirebase = () => initializeApp({
    apiKey: 'AIzaSyDpvdO6g5_hgolxplrgBgQZf-ZKuQdX9qs',
    authDomain: 'satrex-exchange.firebaseapp.com',
    projectId: 'satrex-exchange',
    storageBucket: 'satrex-exchange.appspot.com',
    messagingSenderId: '331961158055',
    appId: '1:331961158055:web:17dba85d4c1808cb3a0e82',
    measurementId: 'G-4TL081D9KC',
});
export const perf = () => getPerformance(initializeFirebase());
export const analytics = () => getAnalytics(initializeFirebase());
export const askForPermissionToReceiveNotifications = async () => {
    try {
        const messaging = getMessaging(initializeFirebase());
        // console.log('this function is calling');
        // const message = messaging;
        // await message.requestPermission();
        const token = await getToken(messaging);

        return token;
    } catch (error) {
    }
};
