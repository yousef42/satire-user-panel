import React from 'react';
import { NavLink } from 'react-router-dom';
import { ButtonBase } from '@mui/material';
import { useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { Divider } from '@mui/material';
import Trans from '../../../app/components/lang';
import { useHistoryCompat as useHistory } from '../../../app/router/routerCompat';

import ThemeAtrr from '../../../app/MasterLayout/MasterTheme/ThemeAtrr';

const useStyles = makeStyles({
    navItem: {
        // '& .active': {
        //         borderLeft:({language}) => language === 'en' ? "solid 2px red" : 'none',
        //         borderBottomLeftRadius:({language}) => language === 'en' ?  0 : '',
        //         borderTopLeftRadius: ({language}) => language === 'en' ? 0 : '',
        //         borderRight:({language}) => language === 'en' ? '' : "solid 2px red",
        //         borderBottomRightRadius:({language}) => language === 'en' ? '' : 0,
        //         borderTopRightRadius:({language}) => language === 'en' ? '' : 0,
        //     }
    },
});

//  {
//     borderRight:"solid 2px red",
//         borderBottomRightRadius: 0,
//         borderTopRightRadius: 0,
// }
export default function (props) {
    const actionHandling = (e, item) => {
        if (item.name === 'exit') {
            e.preventDefault();
            props.handleExitAlertOpen();
        } else {
            props.handleProfile(false);
            if (!props.isChild) props.handleSubMenus(false, false);
        }
    };
    const history = useHistory();
    const language = useSelector((state) => state.user.language);
    const satrexTheme = useSelector((state) => state.layout.theme);
    const extraTheme = useSelector((state) => state.layout.extraTheme);

    // const sidebarToggle = useSelector((state) => state.layout.sidebaindex.jsxrToggle)
    const classes = useStyles({ language });
    return (
        <div
            className={`sidenavDiv ${
                props.isChild ? (satrexTheme ? 'bgMediumGray' : 'bgMediumGrayDark') : ''
            } `}
            style={props.isChild ? ThemeAtrr(extraTheme).submenuStyle : {}}
        >
            <NavLink
                key={props.index}
                to={props.item.path}
                className={`nav-item ${
                    history.location.pathname.split('/')[1] === 'market'
                    && props.item.path === '/markets'
                        ? 'active'
                        : ''
                }`}
                onClick={(e) => {
                    actionHandling(e, props.item);
                }}
            >
                <ButtonBase id={props.item.name} key={props.item.name} name="child" className="w-100">
                    {(() => {
                        if (props.item.icon) {
                            return <i className={props.item.icon} />;
                        }
                        return (
                            <span className="item-icon icon-text">
                  {props.item.iconText}
                            </span>
                        );
                    })()}
                    <span style={{ width: '10%', minWidth: '22px' }}>&nbsp;</span>
                    <span
                        className="text-middle  item-text"

                        style={{ textAlign: 'left', transition: '0.3s', whiteSpace: 'nowrap' }}
                    >
                                <Trans>{props.item.name}</Trans>
                    </span>
                    <div className="mx-auto" />
                    {props.item.badge && (
                        <div className={`badge bg-${props.item.badge.color}`}>
                            {props.item.badge.value}
                        </div>
                    )}
                </ButtonBase>
            </NavLink>
            <Divider />
        </div>
    );
}
