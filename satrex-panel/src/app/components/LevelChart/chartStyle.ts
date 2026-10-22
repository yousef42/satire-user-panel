import { makeStyles } from '@mui/styles';
import { satrexGreen } from '../../../styles/colors';

export default makeStyles((theme) => ({
    chartTitle: {
        color: `${satrexGreen} !important`,
    },
    peopleIcon: {
        position: 'absolute',
        top: 50,
        fontSize: '30px',
    },
    radialBarChart: {
        '& text': {
            fontFamily: 'YekanBakh !important',
        },
    },
    radialBarChartEn: {
        '& text': {
            fontFamily: 'enNum !important',
        },
    },
}));
