import React from 'react';
import { TableRow } from '@mui/material';
import { TableCell } from '@mui/material';
import { Table } from '@mui/material';
import { TableContainer } from '@mui/material';
import { TableBody } from '@mui/material';
import { TableHead } from '@mui/material';
import { tableRowPlaceholderPropType } from '../../../utils/interfaces';
import RowPlaceHolder from './RowPlaceHolder';

const TableRowPlaceholder: React.FC<tableRowPlaceholderPropType> = ({ rowsCount, columnsCount, coinIcon }) => (
    <TableContainer style={{ overflow: 'hidden' }}>
        <Table>
            <TableHead data-tut="firstRowGuide">
                <TableRow style={{ display: 'flex' }}>
                    {
                        Array.from(Array(columnsCount + 1).keys()).map((ele) => (
                            <TableCell key={ele} style={{ border: 'none', width: '100%' }} />
                        ))
                    }
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    Array.from(Array(rowsCount).keys()).map((item) => (
                    <RowPlaceHolder key={item} columnsCount={columnsCount} coinIcon={coinIcon} />
                    ))
                }
            </TableBody>
        </Table>
    </TableContainer>
);

export default TableRowPlaceholder;
