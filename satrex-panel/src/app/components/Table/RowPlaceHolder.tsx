import React from 'react';
import { TableRow } from '@mui/material';
import { TableCell } from '@mui/material';
import { Skeleton } from '@mui/material';
import { RowPlaceHolderProps } from '../../../utils/interfaces';

const RowPlaceHolder: React.FC<RowPlaceHolderProps> = ({ columnsCount, coinIcon }) => (
        <TableRow style={{ display: 'flex', animation: 'unset' }} className="tableRow tableRowDiv">
                <TableCell className="tableRowPlaceHolderFirstColumn" style={{ justifyContent: coinIcon ? 'flex-start' : 'center' }}>
                    {
                        coinIcon
                        && (
                            <>
                                <Skeleton animation="wave" variant="circle" width={40} height={40} />
                                &nbsp;&nbsp;
                            </>
                        )
                    }
                    <Skeleton variant="text" animation="wave" width={120} />
                </TableCell>
                {
                    Array.from(Array(columnsCount).keys()).map((ele) => (
                        <TableCell key={ele} style={{ width: '100%', minHeight: 52 }}>
                            <Skeleton animation="wave" variant="text" width={120} />
                        </TableCell>
                    ))
                }
        </TableRow>
    );

export default RowPlaceHolder;
