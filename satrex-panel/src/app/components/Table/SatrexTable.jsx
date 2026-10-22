import React, {
    useCallback, useEffect, useLayoutEffect, useRef, useState,
} from 'react';
import {
    useTable,
    useSortBy,
    useResizeColumns,
    useFlexLayout,
    usePagination,
    useGroupBy,
    useFilters,
    useExpanded,
} from 'react-table';
import { Table } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import { useSelector } from 'react-redux';
import Fade from '@mui/material/Fade';
import {
    Checkbox, FormControlLabel, Menu,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { Settings as SettingsIcon } from '@mui/icons-material';
import TableContainer from '@mui/material/TableContainer';
import { css } from '@emotion/react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Pagination } from '@mui/material';
import { ScaleLoader } from 'react-spinners';
import { satrexGray, satrexGreen, satrexLightGray } from '../../../styles/colors';
import { transFn } from '../lang';
import RtlComponent from '../rtlComponent';

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const normalizeCheckboxProps = (props) => ({
    ...props,
    indeterminate: Boolean(props?.indeterminate),
});

function Quote({
                   queueId, index, children, row, actionTodo,
               }) {
    const rowProps = row.getRowProps();
    const { key: rowKey, style: rowStyle, ...restRowProps } = rowProps;
    return (
        <Draggable draggableId={queueId} index={index}>
            {(provided) => (
                <TableRow
                    hover
                    tabIndex={-1}
                    className={`tableRow animate__animated  tableRowDiv  ${row.original.rowClass}${index}`}
                    onClick={actionTodo ? () => actionTodo(`${(row.original.sourceAssetSymbol).toLowerCase()}-${(row.original.destinationAssetSymbol).toLowerCase()}`) : () => {
                    }}
                    {...restRowProps}
                    key={rowKey || index}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                        ...provided.draggableProps.style,
                        minHeight: 'fit-content',
                        animationDelay: `${index / 7}s`,
                        ...rowStyle,
                    }}
                >
                    {children}
                </TableRow>
            )}
        </Draggable>
    );
}

const satrexTable = ({
                         asset,
                         headerData,
                         disableDraggable,
                         searchItem,
                         actionTodo,
                         disablePaginate,
                         responsiveSizes = [],
                         disableSetting,
                         paginationInfo,
                         handlePagination,
    disableInfiniteScroll,
                     }) => {
    const lang = useSelector((state) => state.user.language);
    const satrexTheme = useSelector((state) => state.layout.theme);
    const isEn = lang === 'EN' || lang === 'gr' || lang === 'fr';
    const [data, setData] = useState(asset);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [loading, setLoading] = useState(false);
    const [distanceBottom, setDistanceBottom] = useState(0);
    useEffect(() => {
        let isMounted = true;
        if (isMounted) setData(asset);
        return () => {
            isMounted = false;
        };
    }, [asset]);
    const [section, setSection] = useState(
        {
            start: 0,
            end: 10,
        },
    );
    const [hasMore] = useState(true);
    const defaultColumn = React.useMemo(
        () => ({
            minWidth: 30, // minWidth is only used as a limit for resizing
            width: 100, // width is used for both the flex-basis and flex-grow
            maxWidth: 200, // maxWidth is only used as a limit for resizing
        }),
        [],
    );

    function onDragEnd(result) {
        if (!result.destination) {
            return;
        }

        if (result.destination.index === result.source.index) {
            return;
        }

        const quotes = reorder(
            data,
            result.source.index,
            result.destination.index,
        );

        setData(quotes);
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    const columns = React.useMemo(() => headerData.reverse(), []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        page,
        allColumns,
        setHiddenColumns,
        getToggleHideAllColumnsProps,
        setPageSize,
        state: { pageSize },
    } = useTable(
        {
            columns,
            data,
            defaultColumn,
            initialState: { pageIndex: 0 },
        },
        useResizeColumns,
        useFlexLayout,
        useFilters,
        useGroupBy,
        useSortBy,
        useExpanded,
        usePagination,
    );
    const numRows = disablePaginate || disableInfiniteScroll ? rows.length : 10;
    //
    // console.log('numRows : ', numRows);
    // console.log('pageSize : ', pageSize);
    let beforeSearch = numRows;
    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            const hiddenColumns = headerData ? headerData.filter((column) => column.hide).map((column) => column.accessor) : [];
            setHiddenColumns(hiddenColumns);

            if (rows) {
                if (!searchItem) {
                    setPageSize(beforeSearch);
                } else {
                    beforeSearch = pageSize;
                    setPageSize(rows.length);
                }
            }
        }
        return () => {
            isMounted = false;
        };
    }, [searchItem, rows.length, ...responsiveSizes]);

    const tableEl = useRef();
    let endPart = section.end;

    const loadMore = useCallback(() => {
        const loadItems = async () => {
            endPart += 5;
            await new Promise((resolve) => setTimeout(() => {
                // console.log('got here !!')
                // console.log(section)
                setSection({
                    start: 0,
                    end: endPart,
                });
                setLoading(false);
                resolve();
            }, 1200));
        };
        setLoading(true);
        loadItems();
    }, [rows]);

    const scrollListener = useCallback(() => {
        const bottom = tableEl.current.scrollHeight - tableEl.current.clientHeight;
        if (!distanceBottom) {
            // calculate distanceBottom that works for you
            setDistanceBottom(Math.round((bottom / 100) * 20));
        }
        if (tableEl.current.scrollTop > bottom - distanceBottom - 10 && hasMore && !loading && rows.length > endPart && disablePaginate) {
            loadMore();
        }
    }, [hasMore, loadMore, loading, distanceBottom]);

    useLayoutEffect(() => {
        if (disablePaginate && !disableInfiniteScroll && data && data.length > 0) {
            const tableRef = tableEl.current;
            tableRef?.addEventListener('scroll', scrollListener);
            return () => {
                tableRef?.removeEventListener('scroll', scrollListener);
            };
        }
    }, [scrollListener]);

    const open = Boolean(anchorEl);

    const override = css`
      position: relative;
      top: 5px;
    `;

    const [settingAnchorEl, setSettingAnchorEl] = React.useState(null);

    const handleSettingClick = (event) => {
        setSettingAnchorEl(event.currentTarget);
    };

    const handlePageChange = (e, value) => {
        if (handlePagination) handlePagination(value - 1);
        // gotoPage(value - 1);
    };

    const handlSettingClose = () => {
        setSettingAnchorEl(null);
    };
    const settingOpen = Boolean(settingAnchorEl);

    const datas = disablePaginate && !disableInfiniteScroll ? rows.slice(section.start, section.end) : page;
    const filteredRows = datas?.filter((suggestion) => {
        const searchParams = suggestion.original?.searchParams;

        const findItem = () => {
            let status = true;
            for (let i = 0; i < searchParams.length; i++) {
                status = suggestion.original[searchParams[i]]
                    .toLowerCase()
                    .indexOf(searchItem.toLowerCase()) > -1;
                if (status) break;
            }
            return status;
        };
        return (searchItem && searchParams && searchParams.length > 0) ? findItem() : suggestion;
    });

    const renderTableContent = (droppableProps = {}, droppableRef = null, placeholder = null) => (
        <div style={{ width: '100%', padding: 1 }} className="table">
            {
                !disableSetting
                && (
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'row-reverse' }}>
                        <IconButton onClick={handleSettingClick}>
                            <SettingsIcon style={{ fontSize: 15 }} />
                        </IconButton>
                    </div>
                )
            }
            <Menu
                elevation={2}
                id="simple-menu"
                anchorEl={settingAnchorEl}
                open={settingOpen}
                onClose={handlSettingClose}
                TransitionComponent={Fade}
                style={{ width: '100%', display: 'flex' }}
            >
                <FormControlLabel
                    style={{ display: 'flex', flexDirection: 'row-reverse' }}
                    control={(
                        <Checkbox
                            {...normalizeCheckboxProps(getToggleHideAllColumnsProps())}
                        />
                    )}

                    label={<label>{transFn('All')}</label>}
                />

                {allColumns.map((column) => (
                    <li key={column.id}>
                        <FormControlLabel
                            style={{ display: 'flex', flexDirection: 'row-reverse' }}
                            control={(
                                <Checkbox
                                    {...normalizeCheckboxProps(column.getToggleHiddenProps())}

                                />
                            )}

                            label={<label>{transFn(column.Header)}</label>}
                        />
                    </li>
                ))}
            </Menu>
            <div
                className="mainTableHeader"
                style={{
                    paddingRight: isEn ? 3 : ((rows.length >= 10 && disablePaginate) ? 6 : 0),
                    paddingLeft: isEn ? ((rows.length > 10 && disablePaginate) ? 5 : 0) : 3,
                }}
            >
                <Table {...getTableProps()} style={{ direction: isEn ? 'rtl' : 'ltr' }}>
                    <TableHead data-tut="firstRowGuide">
                        {headerGroups.map((headerGroup) => {
                            const headerGroupProps = headerGroup.getHeaderGroupProps();
                            const { key: headerGroupKey, ...restHeaderGroupProps } = headerGroupProps;
                            return (
                                <TableRow key={headerGroupKey} {...restHeaderGroupProps}>
                                    {headerGroup.headers.map((column, index) => {
                                        const headerProps = column.getHeaderProps(column.getSortByToggleProps());
                                        const { key: headerKey, ...restHeaderProps } = headerProps;
                                        return (
                                            <TableCell
                                                key={headerKey || column.id || index}
                                                {...restHeaderProps}
                                                className={column.id}
                                            >
                                                {column.render('Header')}
                                                <span>
                                                    {column.isSorted
                                                        ? (
                                                            <SyncAltIcon style={{
                                                                marginLeft: 10,
                                                                marginRight: 10,
                                                                transition: '0.3s',
                                                                transform: column.isSortedDesc ? 'rotate(90deg)' : 'rotate(270deg)',
                                                                color: satrexTheme ? satrexGray : satrexLightGray,
                                                                fontSize: '13px',
                                                            }}
                                                            />
                                                        ) : ''}
                                                </span>
                                                <span>
                                                    {' '}
                                                    {column.canResize && (
                                                        <div
                                                            {...column.getResizerProps()}
                                                            className={`resizer ${
                                                                column.isResizing ? 'isResizing' : ''
                                                            }`}
                                                        />
                                                    )}
                                                </span>
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableHead>
                </Table>
            </div>
            <div
                {...droppableProps}
                ref={droppableRef}
            >
                {
                    datas.length > 0
                    && (
                        <TableContainer
                            style={{
                                minWidth: 'fit-content',
                                width: '100%',
                                margin: 'auto',
                                paddingTop: 0,
                                marginRight: (disablePaginate && rows.length >= 10) ? (!isEn ? 4 : 1) : -2,
                                marginLeft: (disablePaginate && rows.length >= 10) ? (!isEn ? 0 : 4) : -2,
                                overflowX: 'hidden',
                                maxHeight: disablePaginate ? 576 : 'unset',
                            }}
                            ref={tableEl}
                        >

                            <div style={{
                                paddingRight: 0,
                                paddingLeft: 0,
                                position: 'relative',
                                direction: isEn ? 'rtl' : 'ltr',
                            }}
                            >
                                <Table>
                                    <TableBody {...getTableBodyProps()}>
                                        {filteredRows.map((row, index) => {
                                            prepareRow(row);
                                            const rowProps = row.getRowProps();
                                            const { key: tableRowKey, ...restRowProps } = rowProps;
                                            const tbRow = (
                                                <>
                                                    {row.cells.map((cell, i) => {
                                                        const cellProps = cell.getCellProps();
                                                        const { key: cellKey, style: cellStyle, ...restCellProps } = cellProps;
                                                        return (
                                                            <TableCell
                                                                key={cellKey || `${row.id}-${cell.column.id}-${i}`}
                                                                {...restCellProps}
                                                                className={`${cell.column.id} ${actionTodo && 'cursorPointer'}`}
                                                                style={{
                                                                    ...cellStyle,
                                                                    cursor: actionTodo ? 'pointer' : 'unset',
                                                                }}
                                                            >
                                                                {cell.render('Cell')}
                                                            </TableCell>
                                                        );
                                                    })}
                                                </>
                                            );
                                            return (
                                                disableDraggable ? (
                                                    <TableRow
                                                        hover
                                                        role="checkbox"
                                                        tabIndex={-1}
                                                        key={tableRowKey || index}
                                                        className={`tableRow  ${row.original.rowClass}${index}`}
                                                        onClick={actionTodo ? () => actionTodo(`${(row.original.sourceAssetSymbol).toLowerCase()}-${(row.original.destinationAssetSymbol).toLowerCase()}`) : () => {
                                                        }}
                                                        {...restRowProps}
                                                    >
                                                        {tbRow}
                                                    </TableRow>
                                                )
                                                    : (
                                                        <Quote
                                                            actionTodo={actionTodo}
                                                            row={row}
                                                            queueId={row.id}
                                                            index={index}
                                                            key={index}
                                                        >
                                                            {tbRow}
                                                        </Quote>
                                                    )

                                            );
                                        })}
                                    </TableBody>
                                </Table>
                                {
                                    disablePaginate
                                    && (
                                        <div className="center column middle" style={{ marginTop: 10 }}>
                                            <ScaleLoader
                                                color={satrexGreen}
                                                loading={loading}
                                                css={override}
                                                height={15}
                                                width={3}
                                            />
                                        </div>
                                    )
                                }
                            </div>
                            {
                                rows && (rows.length >= 10 || (paginationInfo && paginationInfo.pageCount > 0)) && !disablePaginate && paginationInfo
                                && (
                                    <div className="tablePaginationsButtons">
                                        <RtlComponent>
                                            <Pagination
                                                count={paginationInfo.pageCount}
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    direction: !isEn ? 'rtl' : 'ltr',
                                                }}
                                                color="primary"
                                                onChange={handlePageChange}
                                                showFirstButton
                                                showLastButton
                                            />
                                        </RtlComponent>
                                    </div>
                                )
                            }
                        </TableContainer>
                    )
                }
            </div>
            {placeholder}
        </div>
    );

    if (!datas || !data || data.length === 0) {
        return null;
    }

    if (disableDraggable) {
        return renderTableContent();
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="list">
                {(provided) => renderTableContent(
                    provided.droppableProps,
                    provided.innerRef,
                    provided.placeholder,
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default satrexTable;
