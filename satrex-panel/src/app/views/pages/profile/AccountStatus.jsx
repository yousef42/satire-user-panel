import React, { useEffect } from 'react';
import { TableBody } from '@mui/material';
import { TableCell } from '@mui/material';
import { TableContainer } from '@mui/material';
import { TableRow } from '@mui/material';
import { useSelector } from 'react-redux';
import { Table } from '@mui/material';
import Trans from '../../../components/lang';

export default function (props) {
    const lang = useSelector((state) => state.user.language);
    const satrexTheme = useSelector((state) => state.layout.theme);
    const isEn = lang === 'EN' || lang === 'gr' || lang === 'fr';
    const titleColor = satrexTheme ? '#334155' : '#eef4ff';
    const valueColor = satrexTheme ? '#0f172a' : '#ffffff';
    const [calLevel, setCalLevel] = React.useState(0);

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            if (props.levelPrecent >= 50) setCalLevel(1);
            if (props.levelPrecent === 100) setCalLevel(2);
        }
        return () => { isMounted = false; };
    }, [props.levelPrecent]);

    return (
        <TableContainer>

            <Table style={{ borderCollapse: 'separate', borderSpacing: '0 4px' }}>
                <TableBody style={{ width: '100%' }}>
                    <TableRow
                        className="tableRow displayTableCell"
                    >
                        <TableCell
                            style={{
                                textAlign: isEn ? 'left' : 'right',
                                padding: 15,
                                fontWeight: 'bold',
                                width: 500,
                            }}
                        >
                            <span style={{ color: titleColor }}>
                                <Trans>UserLevel</Trans>
                            </span>
:
                        </TableCell>
                        <TableCell
                            style={{
                                textAlign: !isEn ? 'left' : 'right',
                                width: '50%',
                                padding: 15,
                                color: valueColor,
                            }}
                        >
                            {
                                calLevel > 0 ? (
<span>
{' '}
                                        <Trans>ApprovedLevel</Trans>
&nbsp;&nbsp;
<span>{calLevel}</span>
</span>
)
                                    : <span className="faNum">0</span>
                            }
                        </TableCell>
                    </TableRow>
                    <TableRow
                        className="tableRow displayTableCell"
                    >
                        <TableCell
                            style={{
                                textAlign: isEn ? 'left' : 'right',
                                padding: 15,
                                width: '50%',
                                fontWeight: 'bold',
                            }}
                        >
                            <span style={{ color: titleColor }}>
                                <Trans>RialDepositCeiling</Trans>
                            </span>
:
                        </TableCell>
                        <TableCell
                            style={{
                                textAlign: !isEn ? 'left' : 'right',
                                width: '50%',
                                padding: 15,
                                color: valueColor,
                            }}
                        >
                            {calLevel === 1
                                ? <Trans>500thousandTomansPerDay</Trans>
                                : calLevel === 2
                                    ? <Trans>100millionCryptocurrencyPerDay</Trans>
                                    : <span className="faNum">0</span>}
                        </TableCell>
                    </TableRow>
                    <TableRow
                        className="tableRow displayTableCell"
                    >
                        <TableCell
                            style={{
                                textAlign: isEn ? 'left' : 'right',
                                width: '50%',
                                padding: 15,
                                fontWeight: 'bold',
                            }}
                        >
                            <span style={{ color: titleColor }}>
                                <Trans>RialWithdrawalCeiling</Trans>
                            </span>
:
                        </TableCell>
                        <TableCell
                            style={{
                                textAlign: !isEn ? 'left' : 'right',
                                width: '50%',
                                padding: 15,
                                color: valueColor,
                            }}
                        >
                            {calLevel === 1
                                ? <Trans>20millionTomansPerDay</Trans>
                                : calLevel === 2
                                    ? <Trans>300MillionTomansPerday</Trans>
                                    : <span className="faNum">0</span>}
                        </TableCell>
                    </TableRow>
                    <TableRow
                        className="tableRow displayTableCell"
                    >
                        <TableCell
                            style={{
                                textAlign: isEn ? 'left' : 'right',
                                width: '50%',
                                padding: 15,
                                fontWeight: 'bold',
                            }}
                        >
                            <span style={{ color: titleColor }}>
                                <Trans>RialAndRamzarzHarvestCeiling</Trans>
                            </span>
:
                        </TableCell>
                        <TableCell
                            style={{
                                textAlign: !isEn ? 'left' : 'right',
                                width: '50%',
                                padding: 15,
                                color: valueColor,
                            }}
                        >
                            {calLevel === 1
                                ? <Trans>100millionTomansPerDay</Trans>
                                : calLevel === 2
                                    ? <Trans>500MillionTomansPerday</Trans>
                                    : <span className="faNum">0</span>}
                        </TableCell>
                    </TableRow>
                    {calLevel === 2 && (
                        <TableRow
                            className="tableRow displayTableCell"
                        >
                            <TableCell
                                style={{
                                    textAlign: isEn ? 'left' : 'right',
                                    width: '50%',
                                    padding: 15,
                                    fontWeight: 'bold',
                                }}
                            >
                                <span style={{ color: titleColor }}>
                                    <Trans>MaximumLevelTwoApplicationsIn30days</Trans>
                                </span>
:
                            </TableCell>
                            <TableCell
                                style={{
                                    textAlign: !isEn ? 'left' : 'right',
                                    width: '50%',
                                    padding: 15,
                                    color: valueColor,
                                }}
                            >
                                <Trans>3BillionTomans</Trans>
                            </TableCell>
                        </TableRow>

                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
