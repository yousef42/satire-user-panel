import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Fade } from '@mui/material';

interface menuProps{
    anchorEl:any,
    open:boolean,
    handleClose:()=>void,
    list:{
        title:string,
        onClick:()=>void,
    }[],
}

const satrexMenu:React.FC<menuProps> = ({
    anchorEl,
    open,
    handleClose,
    list,
}) => (
        <div>
            <Menu
                id="fade-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                {
                    list.map(({ title, onClick }) => <MenuItem onClick={onClick} key={title}><span>{title}</span></MenuItem>)
                }
            </Menu>
        </div>
    );

export default satrexMenu;
