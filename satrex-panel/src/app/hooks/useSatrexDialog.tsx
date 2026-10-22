import { useState } from 'react';
import { usesatrexDialogReturnType } from '../../utils/interfaces';

const usesatrexDialog: () => usesatrexDialogReturnType = (): usesatrexDialogReturnType => {
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(!open);
    };

    return {
        open,
        setOpen,
        handleClose,
    };
};

export default usesatrexDialog;
