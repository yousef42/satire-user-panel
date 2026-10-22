import React from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useSelector } from 'react-redux';
import { Divider } from '@mui/material';
import Trans from './lang';

const useStyles = makeStyles({
    modalPaper: {
        maxWidth: '1200px',
    },
});

// const PaperComponent = (props)=> {
//     return (
//         <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
//             <Paper {...props} style={{backgroundColor: !satrexTheme ? satrexSemiDarkerBlueDarkMode  : 'white',
//                 color: !satrexTheme ? '#bebebe' : satrexGray
//             }} />
//         </Draggable>
//     );
// }

export default React.memo((props) => {
    const satrexTheme = useSelector((state) => state.layout.theme);
    const lang = useSelector((state) => state.user.language);
    const isEn = lang === 'EN' || lang === 'gr' || lang === 'fr';
    const classes = useStyles();

    return (
        <div>
            <Dialog
                open={props.modalOpen}
                onClose={props.handleClose}
                // PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
                style={{ direction: isEn ? 'ltr' : 'rtl' }}
                classes={{
                    paper: classes.modalPaper,
                }}
            >
                {
                    props.title
                    && (
                        <DialogTitle
                            style={{ cursor: 'move' }}
                            id="draggable-dialog-title"
                            onClose={props.handleClose}
                        >
          <span>
            <Trans>{props.title}</Trans>
          </span>
                        </DialogTitle>
                    )
                }
                <Divider />
                <DialogContent>
                    {props.children}
                </DialogContent>
                {props.action && <DialogActions>{props.action}</DialogActions>}
            </Dialog>
        </div>
    );
});
