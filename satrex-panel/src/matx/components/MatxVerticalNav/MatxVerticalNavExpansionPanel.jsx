import React, { Component } from 'react';
import { withStyles } from '@mui/styles';
import { ButtonBase } from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Divider } from '@mui/material';
import { classList } from '../../../utils';
import Trans from '../../../app/components/lang';
import history from '../../../history';
import { withRouterCompat as withRouter } from '../../../app/router/routerCompat';
import { setSelector } from '../../../app/MasterLayout/Layout1/SidenavContainer';

const styles = (theme) => ({
    expandIcon: {
      transition: 'transform 0.3s cubic-bezier(0, 0, 0.2, 1) 0ms',
      transform: 'rotate(90deg)',
      // marginRight: "16px"
    },
    collapseIcon: {
      transition: 'transform 0.3s cubic-bezier(0, 0, 0.2, 1) 0ms',
      transform: 'rotate(0deg)',
      // marginRight: "16px"
    },
    'expansion-panel': {
      overflow: 'hidden',
      transition: 'max-height 0.3s cubic-bezier(0, 0, 0.2, 1)',
    },
    highlight: {
      background: theme.palette.primary.main,
    },
  });

class MatxVerticalNavExpansionPanel extends Component {
  _isMounted = false;

  state = {
    collapsed: false,
    selectedCarret: '',
  };

  elementRef = React.createRef();

  componentHeight = 0;

  handleClick = (name) => {
    if (name === 'profile') {
      this.props.handleSubMenus(!this.props.subMenuStatus.profile, false);
      this.props.handleProfile(true);
      history.push({
        pathname: '/profile',
      });
      this.setState({
        selectedCarret: 'profile',
      });
    }
    if (name === 'accounting') {
      this.props.handleSubMenus(false, !this.props.subMenuStatus.accounting);
      setSelector();
      this.setState({
        selectedCarret: 'accounting',
      });
    }
  };

  calcaulateHeight(node) {
    if (node.name !== 'child') {
      for (const child of node.children) {
        this.calcaulateHeight(child);
      }
    }
    this.componentHeight += node.clientHeight;
  }

  componentDidMount() {
    this._isMounted = true;

    if (this._isMounted) {
      const { location } = this.props;
      this.calcaulateHeight(this.elementRef);
      if (location.pathname === '/profile') {
        this.props.handleSubMenus(!this.props.subMenuStatus.profile, false);
        this.props.handleProfile(true);
        this.setState({
          selectedCarret: 'profile',
        });
      }
      // OPEN DROPDOWN IF CHILD IS ACTIVE
      for (const child of this.elementRef.children) {
        if (child.getAttribute('href') === location.pathname) {
          this.setState({ collapsed: false });
        }
      }
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  a11yProps = (index) => ({
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    });

  render() {
    const { collapsed } = this.state;
    const { classes, children, index } = this.props;
    const {
 name, icon, path, badge,
} = this.props.item;
    // const [profileSelected , setProfileSelected ] = useState();
    return (

      <div className="sidenavDiv">
        {/* <NavLink key={path} to={path} className="nav-item"  > */}
        <div
          className={`nav-item ${
              (this.props.profileStatus && name === 'profile' && location.pathname === '/profile') ? 'active' : ''
          }`}
        >
          <ButtonBase
              id={name}
            className={`${classList({
              'flex-middle w-100 has-submenu': true,
              open: !this.props.subMenuStatus,
            })}`}
            onClick={() => {
              this.handleClick(name);
              setSelector();
            }}
          >
            <i className={icon} />
            <span style={{ width: '10%', minWidth: '22px' }}>&nbsp;</span>
            <span className="text-middle item-text">
              <Trans>{name}</Trans>
            </span>
            <div className="mx-auto" />

            {/* <span style={{width: '10%'}}>&nbsp;</span> */}
            {/* <span className="text-middle pl-20 item-text"><Trans>{name}</Trans></span> */}

            {badge && (
              <div className="badge ">{badge.value}</div>
            )}
            <div
              className={
                collapsed
                  ? `${classes.collapseIcon} item-arrow`
                  : `${classes.expandIcon} item-arrow`
              }
            >
              <ArrowRightIcon />
            </div>
          </ButtonBase>
        </div>
        {/* </NavLink> */}
        <div
          ref={(el) => (this.elementRef = el)}
          className={`${classes['expansion-panel']} ${name}-submenu submenu`}
          style={
            !this.props.subMenuStatus[name]
            || this.state.selectedCarret !== name
              ? { maxHeight: '0px' }
              : { maxHeight: `${this.componentHeight}px` }
          }
        >
          {children}
        </div>
        <Divider light />
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(MatxVerticalNavExpansionPanel));
