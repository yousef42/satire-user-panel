import React, { Component } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Paper,
} from '@mui/material';
import { DialogContentText } from '@mui/material';
import Draggable from 'react-draggable';
import { connect, useDispatch } from 'react-redux';
import { useHistoryCompat as useHistory } from '../../../app/router/routerCompat';
import { useQueryClient } from 'react-query';
import MatxVerticalNavExpansionPanel from './MatxVerticalNavExpansionPanel';
import SideBarItem from './SideBarItem';
import { exiting } from '../../../app/redux/actions/LoginActions';
import Trans from '../../../app/components/lang';
import {
    satrexGray,
    satrexSemiDarkerBlueDarkMode,
} from '../../../styles/colors';
import SidenavContainer from '../../../app/MasterLayout/Layout1/SidenavContainer';
import ThemeAtrr from '../../../app/MasterLayout/MasterTheme/ThemeAtrr';

function ExitButton({ handleClose }) {
    const queryClient = useQueryClient();
    const history = useHistory();
    const dispatch = useDispatch();

    const exitLogin = async () => {
        // queryClient.clear();
        await dispatch(exiting());
        history.replace({
            pathname: '/login',
        });
        await queryClient.removeQueries();
        handleClose();
    };
    return (
        <Button
                onClick={exitLogin}
                style={{ width: 140 }}
                className="redButton"
        >
                <Trans>yes</Trans>
        </Button>
    );
}

class MatxVerticalNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            modalOpen: false,
            profileSelected: false,
            profileStatus: false,
            accountingStatus: false,
        };
    }

    handleClickOpen = () => {
        this.setState({ modalOpen: true });
    };

    handleClose = () => {
        this.setState({ modalOpen: false });
    };

    handleSubMenus = (profileStatus, accountingStatus) => {
        this.setState({
            profileStatus,
            accountingStatus,
        });
    };

    setProfileSelected = (status) => {
        this.setState({ profileSelected: status });
    };

    renderLevels = (data, isChild) => data.map((item, index) => {
            const itemKey = `${item.name}-${item.path || `group-${index}`}`;
            if (item.children) {
                return (
                    <MatxVerticalNavExpansionPanel
                        item={item}
                        key={itemKey}
                        handleProfile={this.setProfileSelected}
                        handleSubMenus={this.handleSubMenus}
                        subMenuStatus={{
                            profile: this.state.profileStatus,
                            accounting: this.state.accountingStatus,
                        }}
                        profileStatus={this.state.profileSelected}
                    >
                        {this.renderLevels(item.children, true)}
                    </MatxVerticalNavExpansionPanel>
                );
            }
                return (
                    <SideBarItem
                        item={item}
                        isChild={isChild}
                        index={index}
                        key={itemKey}
                        handleProfile={this.setProfileSelected}
                        handleSubMenus={this.handleSubMenus}
                        handleExitAlertOpen={this.handleClickOpen.bind(this)}
                    />
                );
        });

    PaperComponent = (props) => (
            <Draggable
                handle="#draggable-dialog-title"
                cancel={'[class*="MuiDialogContent-root"]'}
            >
                <Paper
                    {...props}
                    style={{
                        backgroundColor: ThemeAtrr(this.props.extraTheme, true)
                            ? ThemeAtrr(this.props.extraTheme).inputStyle.backgroundColor : !this.props.satrexTheme
                                ? satrexSemiDarkerBlueDarkMode
                                : 'white',
                        color: !this.props.satrexTheme ? '#bebebe' : satrexGray,
                    }}
                />
            </Draggable>
        );

    render() {
        const isEn = this.props.language === 'EN';
        return (
            <div className="navigation">
                <div className="sidenavSelector" id="sidenavSelector" />
                <SidenavContainer>
                    {this.renderLevels(this.props.navigation)}
                </SidenavContainer>
                <Dialog
                    open={this.state.modalOpen}
                    onClose={this.handleClose}
                    PaperComponent={this.PaperComponent}
                    aria-labelledby="draggable-dialog-title"
                    style={{ direction: isEn ? 'ltr' : 'rtl' }}
                >
                    <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
            <span>
              <Trans>systemExit</Trans>
            </span>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText
                            style={{
                                color: !this.props.satrexTheme ? '#bebebe' : satrexGray,
                            }}
                        >
                            <Trans>sureToGetOut</Trans>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                            <Button
                                autoFocus
                                onClick={this.handleClose}
                                style={{ width: 140 }}
                                className="modalCancelButton "
                            >
              <span>
                <Trans>cancel</Trans>
              </span>
                            </Button>

                            <ExitButton handleClose={this.handleClose} />
                        </div>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    language: state.user.language,
    satrexTheme: state.layout.theme,
    extraTheme: state.layout.extraTheme,
});
export default connect(mapStateToProps, { exiting })(MatxVerticalNav);
