import { useState } from 'react';
import { useTablePaginateReturnType } from '../../utils/interfaces';

const useTablePaginate: () => useTablePaginateReturnType = (): useTablePaginateReturnType => {
    const [page, setPage] = useState(0);

    const handlePagination = (value: number) => {
        setPage(value);
    };

    return [
        page,
        setPage,
        handlePagination,
    ];
};

export default useTablePaginate;
