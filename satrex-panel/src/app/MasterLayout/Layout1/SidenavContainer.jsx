import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const profileRoutes = ['/edit-personal-info', '/edit-bank-info', '/messages'];
const accountingRoutes = ['/deposit-withdrawal-crypto', '/deposit', '/withdrawal', '/turnover', '/add-bank-account', '/requests', '/reports'];
export const setSelector = () => {
    function scrollMainView() {

    }

    document.getElementsByClassName('mainDiv')[0].addEventListener('scroll', scrollMainView);
    // document.getElementsByClassName("content-wrap")[0].addEventListener("scroll", scrollMainView);

    const sidenav = document.getElementById('sidenav');
    const sidenavSelector = document.getElementById('sidenavSelector');
    if (sidenavSelector) {
        setTimeout(() => {
            const testDiv = sidenav.getElementsByClassName('active')[0];
            if (!testDiv) sidenavSelector.style.opacity = '0';
            else sidenavSelector.style.opacity = '1';
            if (accountingRoutes.includes(location.pathname)) {
                const accountingSubmenu = document.getElementsByClassName('accounting-submenu')[0];
                accountingSubmenu.style.maxHeight = '876px';
                sidenavSelector.style.top = `${testDiv.parentElement.offsetTop + 58 + accountingSubmenu.parentElement.offsetTop}px`;
            } else if (profileRoutes.includes(location.pathname)) {
                const profileMenu = document.getElementsByClassName('profile-submenu')[0];
                profileMenu.style.maxHeight = '438px';

                setTimeout(() => {
                    sidenavSelector.style.top = `${testDiv.parentElement.offsetTop + 58 + profileMenu.parentElement.offsetTop}px`;
                }, 150);
            } else {
                setTimeout(() => {
                   if (testDiv) {
                       sidenavSelector.style.top = `${testDiv.parentElement.offsetTop + 3}px`;
                   }
                }, 150);
            }
        }, 0);
    }
};

function SidenavContainer({ children }) {
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;
        if (isMounted) setSelector();
        return () => {
            isMounted = false;
        };
    }, [location.pathname]);
    // console.log(location)
    return (
        <>
            {
                children
            }
        </>
    );
}

export default SidenavContainer;
