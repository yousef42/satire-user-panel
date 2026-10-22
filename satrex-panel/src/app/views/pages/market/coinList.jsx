import React, { useEffect, useState } from 'react';
import { alpha } from '@mui/material'; import { makeStyles, withStyles } from '@mui/styles';
import { Table } from '@mui/material';
import { TableBody } from '@mui/material';
import { TableCell } from '@mui/material';
import { TableContainer } from '@mui/material';
import { TableHead } from '@mui/material';
import { TableRow } from '@mui/material';
import { TableSortLabel } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Divider } from '@mui/material';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import { useHistoryCompat as useHistory } from '../../../router/routerCompat';
import { IconButton } from '@mui/material';
import { Fade } from '@mui/material';
import {
 Card, Menu, MenuItem,
} from '@mui/material';
import Trans from '../../../components/lang';
import { satrexGray } from '../../../../styles/colors';
import { selectMarketPair } from '../../../redux/actions/CoinActions';
import SatrexNumFormat from '../../../components/SatrexNumFormat';
import { capitalize } from '../../../../utils/helpers/capitalize';
import _ from "lodash"
function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const useStyles = makeStyles((theme) => ({
    menuStyle: {
        width: '150px',
    },
    root: {
        width: '100%',
        height: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
        height: '92%',
    },
    table: {
        minWidth: '100%',
        fontSize: '12px',
        overflow: 'auto',
        tr: {
            th: {
                fontSize: 10,
            },
        },
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
    tbCell: {
        fontSize: 12,
        padding: '6px !important',
        paddingRight: '0 !important',
        '& :hover': {
            '& svg': {
                display: 'initial',
            },

        },

    },
    tbContainer: {
        direction: 'rtl',
        padding: 0,
    },
    sortIcon: {
        color: satrexGray,
        display: 'none',
        transform: 'rotate(90deg)',
        fontSize: '13px',
    },
    countryButton: {
        borderRadius: 8,
        position: 'relative',
        fontSize: 16,
        height: 40,
        width: '80%',
        padding: '10px 12px',
        marginTop: 5,
        border: '1px solid #d6d6d6',
        '&:focus': {
            boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
            borderColor: theme.palette.primary.main,
        },
    },

}));

function EnhancedTableHead(props) {
    const {
        classes,
        onSelectAllClick,
        order,
        orderBy,
        numSelected,
        rowCount,
        onRequestSort,
    } = props;

    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    const lang = useSelector((state) => state.user.language);
    const isEn = lang === 'EN' || lang === 'gr' || lang === 'fr';
    return (
        <TableHead>
            <StyledTableRow className="displayTableCell">
                <TableCell
                    className={classes.tbCell}
                    style={{ textAlign: !isEn ? 'right' : 'left', direction: !isEn ? 'rtl' : 'ltr', width: 113 }}
                    padding="none"
                    sortDirection={order}
                >
                    <TableSortLabel
                        style={{ paddingLeft: 3, paddingRight: 3 }}
                        active={isEn ? orderBy === 'sourceAssetEnglishTitle' : orderBy === 'sourceAssetPersianTitle'}
                        direction={isEn ? order : 'asc'}
                        onClick={createSortHandler(isEn ? 'sourceAssetEnglishTitle' : 'sourceAssetPersianTitle')}
                        IconComponent={() => <SyncAltIcon className={classes.sortIcon} />}

                    >
            <span style={{ fontWeight: 'normal' }}>
              <Trans>type</Trans>
            </span>
                        &nbsp;&nbsp;
                        {isEn ? orderBy === 'sourceAssetEnglishTitle' : 'sourceAssetPersianTitle' ? (
                            <span className={classes.visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                            </span>
                        ) : null}

                    </TableSortLabel>
                </TableCell>
            {/*    <TableCell */}
            {/*        className={classes.tbCell} */}
            {/*        style={{ textAlign: !isEn ? 'center' : 'left', width: 113 }} */}
            {/*        padding="none" */}
            {/*        sortDirection={order} */}
            {/*    > */}
            {/*        <TableSortLabel */}
            {/*            active={orderBy === 'marketCap'} */}
            {/*            direction={orderBy === 'marketCap' ? order : 'asc'} */}
            {/*            onClick={createSortHandler('marketCap')} */}
            {/*            IconComponent={() => <SyncAltIcon className={classes.sortIcon} />} */}
            {/*            style={{ direction: isEn ? 'rtl' : 'ltr' }} */}
            {/*        > */}
            {/* <span style={{ fontWeight: 'normal' }}> */}
            {/*  <Trans>amount</Trans> */}
            {/* </span> */}
            {/*            &nbsp;&nbsp; */}
            {/*            {orderBy === 'marketCap' ? ( */}
            {/*                <span className={classes.visuallyHidden}> */}
            {/*    {order === 'desc' ? 'sorted descending' : 'sorted ascending'} */}
            {/*                </span> */}
            {/*            ) : null} */}
            {/*        </TableSortLabel> */}
            {/*    </TableCell> */}

                <TableCell
                    className={classes.tbCell}
                    align="left"
                    padding="none"
                    sortDirection={order}
                    style={{ borderRadius: 0 }}
                >

                    <TableSortLabel
                        active={orderBy === 'price'}
                        direction={orderBy === 'price' ? order : 'asc'}
                        onClick={createSortHandler('price')}
                        IconComponent={() => <SyncAltIcon className={classes.sortIcon} />}
                        style={{ float: isEn ? 'right' : 'left', direction: isEn ? 'rtl' : 'ltr' }}
                    >
                        {orderBy === 'price' ? (
                            <span className={classes.visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                            </span>
                        ) : null}
                        &nbsp;&nbsp;
                        {' '}
                        <span style={{ fontWeight: 'normal' }}>
              <Trans>price</Trans>
                        </span>
                        &nbsp;&nbsp;
                    </TableSortLabel>
                </TableCell>
            </StyledTableRow>
        </TableHead>
    );
}

const StyledTableRow = withStyles((theme) => ({
    root: {
        backgroundColor: 'transparent',
    },
}))(TableRow);

export default function ({ height }) {
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const coinPaprikaList = useSelector((state) => state.coin.coinPaprikaList);
    const [coinList, setCoinList] = React.useState([]);
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const choosedMarket = useSelector((state) => state.coin.selectedMarket);
    const [selectedMarket, setSelectedMarket] = useState(null);
    const coinlist = useSelector((state) => state.coin.supportedCoinList);

    const lang = useSelector((state) => state.user.language);
    const isEn = lang === 'EN' || lang === 'gr' || lang === 'fr';
    const histroy = useHistory();

    const redirectToMarket = (row) => {
        dispatch(selectMarketPair(row));
        localStorage.setItem('selectedPair', '');
        histroy.push({
            pathname: `/market/${(row.sourceAssetSymbol).toLowerCase()}-${(row.destinationAssetSymbol).toLowerCase()}`,
        });
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = coinList.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            setCoinList(_.groupBy(coinlist, 'destinationAssetEnglishTitle')[choosedMarket.destinationAssetEnglishTitle]?.map((coin) => ({
                ...coin,
                price: coin[`lastPriceIn${capitalize((choosedMarket.destinationAssetEnglishTitle).toLowerCase())}`],
                marketCap: coinPaprikaList.filter((item) => item.symbol === coin.sourceAssetSymbol)[0]?.totalSupply,
            })));
            setSelectedMarket(isEn ? choosedMarket?.destinationAssetEnglishTitle : choosedMarket?.destinationAssetPersianTitle);
        }
         return () => { isMounted = false; };
    }, [choosedMarket]);

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const open = Boolean(anchorEl);

    return (
        <Card
            className="contentCard scrollLight"
            style={{
                height: height || '100%',
                minHeight: height || 520,
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
            }}
            data-tut="availableMarkets"
        >
            <div className="cardHeader">
                <h4
                    style={{
                        textAlign: lang === 'EN' ? 'left' : 'right',

                    }}
                >
                    <Trans>markets</Trans>
                </h4>
            </div>
        <div
            style={{
                paddingRight: '5px',
                paddingLeft: '5px',
                width: '100%',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                minHeight: 0,
            }}
        >
            <Divider />
            <IconButton
                id="cardButton"
                className={`${classes.countryButton}`}
                onClick={handleClick}
            >
                    <span
                        style={{ direction: 'ltr', fontSize: '16px' }}
                    >
                     <Trans>{selectedMarket?.toLowerCase()}</Trans>
                    </span>
            </IconButton>
            <Menu
                elevation={2}
                id="simple-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
                style={{ direction: 'ltr', width: '100%' }}
                classes={{
                    list: classes.menuStyle,
                }}
            >
                {
                    Object.keys(_.groupBy(coinlist, 'destinationAssetEnglishTitle')).map((item, index) => (
                        <MenuItem
                            key={index}
                            onClick={() => {
                                setSelectedMarket(item);
                                setCoinList(_.groupBy(coinlist, 'destinationAssetEnglishTitle')[item].map((coin) => ({
                                    ...coin,
                                    price: coin[`lastPriceIn${capitalize((coin.destinationAssetEnglishTitle).toLowerCase())}`],
                                    marketCap: coinPaprikaList.filter((item) => item.symbol === coin.sourceAssetSymbol)[0]?.totalSupply,
                                })));
                                handleClose();
                            }}
                        >
                            <div style={{ textAlign: 'center', width: '100%' }}>
                                <span><Trans>{item.toLowerCase()}</Trans></span>
                            </div>
                        </MenuItem>
                    ))
                }
            </Menu>
            <TableContainer
                className={classes.tbContainer}
                style={{ marginTop: '5px' }}

            >
                <Table
                    stickyHeader
                    style={{ direction: isEn ? 'ltr' : 'rtl' }}
                    classes={{
                        root: classes.table,
                    }}
                    aria-labelledby="tableTitle"
                    size="small"
                    aria-label="enhanced table"
                >
                    <EnhancedTableHead
                        classes={classes}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={coinList?.length}
                    />
                </Table>
            </TableContainer>
            <TableContainer
                style={{
                    flex: 1,
                    minHeight: 340,
                    direction: isEn ? 'ltr' : 'rtl',
                }}
            >
                <Table
                    stickyHeader
                    style={{ direction: isEn ? 'ltr' : 'rtl' }}
                    classes={{
                        root: classes.table,
                    }}
                    aria-labelledby="tableTitle"
                    size="small"
                    aria-label="enhanced table"
                >
                    <TableBody>
                        {coinList && stableSort(coinList, getComparator(order, orderBy)).map(
                            (row, index) => {
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <StyledTableRow
                                        hover
                                        onClick={() => redirectToMarket(row)}
                                        tabIndex={-1}
                                        key={index}
                                        style={{ cursor: 'pointer' }}
                                        className="displayTableCell"
                                    >

                                        <TableCell
                                            className={classes.tbCell}
                                            style={{ borderBottom: 'none', fontSize: '11px', width: 110 }}
                                            align={isEn ? 'left' : 'right'}
                                            id={labelId}
                                            scope="row"
                                            padding="none"
                                        >
                                            <Trans>
                                                {isEn
                                                    ? row.sourceAssetEnglishTitle
                                                    : row.sourceAssetPersianTitle}
                                                /
                                                {' '}
                                                {isEn
                                                    ? row.destinationAssetEnglishTitle
                                                    : row.destinationAssetPersianTitle}
                                            </Trans>
                                        </TableCell>

{/*                                        <TableCell */}
{/*                                            className={`${classes.tbCell} `} */}
{/*                                            style={{ borderBottom: 'none' }} */}
{/*                                            align="center" */}
{/*                                        > */}
{/*                     <span style={{ fontSize: 13 }} className="persianNum"> */}
{/* {' '} */}
{/*                         {row.totalVolumeForLast24Hours !== undefined ? ( */}
{/*                             <satrexNumFormat */}
{/*                                 num={row.totalVolumeForLast24Hours} */}
{/*                             /> */}
{/*                         ) : <CircularProgress size={15} />} */}
{/*                     </span> */}
{/*                                        </TableCell> */}

                                        <TableCell
                                            className={`${classes.tbCell} persianNum`}
                                            style={{ borderBottom: 'none', fontSize: 13 }}
                                            align={!isEn ? 'left' : 'right'}
                                        >
                                            {row[`lastPriceIn${capitalize((choosedMarket.destinationAssetEnglishTitle).toLowerCase())}`] && (
                                                <SatrexNumFormat
                                                    num={row.price}
                                                />
                                            )}
                                        </TableCell>

                                    </StyledTableRow>
                                );
                            },
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
        </Card>
    );
}
