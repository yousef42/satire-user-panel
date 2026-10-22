import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import TableRowPlaceholder from './TableRowPlaceholder';
import { TableLoaderPropTypes } from '../../../utils/interfaces';

const TableLoader: React.FC<TableLoaderPropTypes> = ({
                                                         placeholderOptions, loading, children,
                                                     }) => (
    <>
        <AnimatePresence exitBeforeEnter>
            {
                loading
                && (
                    <motion.div
                        initial={{ opacity: 0, display: 'none' }}
                        animate={{ opacity: 1, display: 'initial' }}
                        exit={{ opacity: 0, display: 'none' }}
                        style={{ marginTop: 15 }}
                    >
                        <TableRowPlaceholder
                            rowsCount={3}
                            columnsCount={5}
                            {...placeholderOptions}
                        />
                    </motion.div>
                )
            }
        </AnimatePresence>
        <AnimatePresence exitBeforeEnter>
            <motion.div
                initial={{ opacity: 0, display: 'none' }}
                animate={{ opacity: 1, display: 'initial' }}
                exit={{ opacity: 0, display: 'none' }}
                transition={{ delay: 0.5 }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    </>
);

export default TableLoader;
