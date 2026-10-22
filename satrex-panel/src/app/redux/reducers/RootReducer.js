import { combineReducers } from 'redux';
import LoginReducer from './LoginReducer';
import UserReducer from './UserReducer';
import LayoutReducer from './LayoutReducer';
import ScrumBoardReducer from './ScrumBoardReducer';
import NotificationReducer from './NotificationReducer';
import EcommerceReducer from './EcommerceReducer';
import CoinReducer from './CoinReducer';
import BankReducer from './BankReducer';
import MarketReducer from './MarketReducer';
import PersonalInfoReducer from './PersonalInfoReducer';

const RootReducer = combineReducers({
    login: LoginReducer,
    user: UserReducer,
    layout: LayoutReducer,
    scrumboard: ScrumBoardReducer,
    notification: NotificationReducer,
    ecommerce: EcommerceReducer,
    coin: CoinReducer,
    bank: BankReducer,
    personalInfo: PersonalInfoReducer,
    market: MarketReducer,
});

const appReducer = (state, action) => {
    if (action.type === 'EXITING') {
        state = { layout: state.layout, user: { language: state.user.language } };
    }

    return RootReducer(state, action);
};

export default appReducer;
