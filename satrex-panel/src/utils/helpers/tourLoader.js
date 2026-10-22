import rootTourConfig from '../../app/RootTourConfig';
import { bannedPages } from '../../app/views/PagesRoutes';
import { Store } from '../../app/redux/Store';
import { setTourGuideStatus } from '../../app/redux/actions/LayoutActions';

export default (setIsOpen, setSteps, page) => {
    setTimeout(() => {
        const loadedPages = localStorage.getItem('loadedPages');
        if (!JSON.parse(loadedPages)[page] && (!bannedPages.includes(page) || Store.getState().user.levelPrecentage > 0)) {
            setSteps(rootTourConfig[page]);
            // setIsOpen(true)
            localStorage.setItem('loadedPages', JSON.stringify({ ...JSON.parse(loadedPages), [page]: true, active: page }));
        } else {
            localStorage.setItem('loadedPages', JSON.stringify({ ...JSON.parse(loadedPages), active: page }));
        }
        Store.dispatch(setTourGuideStatus(true));
    }, 1000);
};
