import React, { useEffect, useState } from 'react';
import { Slider } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import { Zoom } from '@mui/material';
import { volumeSliderPropTypes } from '../../../../utils/interfaces';
import { numberWithCommas } from '../../../../utils/helpers/numberWithCommas';
import satrexFloatFormat from '../../../../utils/helpers/satrexFloatFormat';
import { LightTooltip } from '../../../components/LightTooltip';
import { satrexGreen, satrexRed } from '../../../../styles/colors';

function valueLabelFormat(value: number, totalValue: number, isEn: boolean) {
    const val = numberWithCommas(satrexFloatFormat(parseFloat(((value * 100) / totalValue).toFixed(3)) * 1));
    return isEn ? `${val}%` : `%${val}`;
}

interface Props {
    children: React.ReactElement;
    open: boolean;
    value: number;
}

interface marksType {
    value: number,
    label: string,
}

const variants = {
    initial: {
        display: 'none',
        y: 50,
    },
    in: {
        display: 'initial',
        y: 0,
    },
    out: {
        display: 'none',
        y: -50,
    },
};

function ValueLabelComponent(props: Props) {
    const { children, open, value } = props;

    return (
        <LightTooltip
            arrow
            className="volumeSliderTooltip"
            open={open}
            enterTouchDelay={0}
            TransitionComponent={Zoom}
            placement="top"
            title={value}
        >
            {children}
        </LightTooltip>
    );
}

const marks = (tempMax: number) => [
    {
        value: 0,
        label: '0%',
    },
    {
        value: tempMax / 4,
        label: '25%',
    },
    {
        value: tempMax / 2,
        label: '50%',
    },
    {
        value: (75 / 100) * tempMax,
        label: '75%',
    },
    {
        value: tempMax,
        label: '100%',
    },
];

const VolumeSlider: React.FC<volumeSliderPropTypes> = ({
                                                           price,
                                                           setPrice,
                                                           volume,
                                                           setVolume,
                                                           lastPrice,
                                                           orderType,
                                                           getInventory,
                                                           setTotalValue,
                                                       }) => {
    // @ts-ignore
    const [max, setMax] = useState(!orderType ? getInventory() : (getInventory() / ((price === '' || price <= 0 || !price) ? lastPrice : price)));
    const lang = useSelector((state: any) => state.user.language);
    const isEn = lang === 'EN';
    // @ts-ignore
    // console.log('getInventory() : ', (getInventory() / ((price === '' || price <= 0 || !price) ? lastPrice : price)));
    useEffect(() => {
        // @ts-ignore
        const tempMax = !orderType ? getInventory() : (getInventory() / ((price === '' || price <= 0 || !price) ? lastPrice : price));
        if (Number.isFinite(tempMax)) {
            setMax(tempMax);
        }
    }, [orderType, price]);

    const handleSliderChange = (event: any, newValue: number | number[]) => {
        if (max <= 0) event.preventDefault();
        else {
            // @ts-ignore
            setVolume(Math.floor(newValue * 100000000) / 100000000);
            if (!price || price === '') {
                setPrice(lastPrice);
                // @ts-ignore
                setTotalValue((Math.floor(newValue * 100000000) / 100000000) * lastPrice);
            } else {
                // @ts-ignore
                setTotalValue((Math.floor(newValue * 100000000) / 100000000) * price);
            }
        }
    };

    // console.log('calMax : ', (calMax()).toFixed(8));
    return (
        <div className="volumeSlider">

            <AnimatePresence exitBeforeEnter initial={false}>
                <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={variants}
                    transition={{ ease: [0.17, 0.67, 0.83, 1], duration: 0.1, delay: 3 }}
                >
                    <div style={{ padding: 5 }}>
                        <Slider
                            className={orderType ? 'marketVolumeSliderGreen' : 'marketVolumeSliderRed'}
                            min={0}
                            max={max > 0 ? max : 0.00001}
                            step={0.00001}
                            disabled={max <= 0}
                            valueLabelFormat={(value) => valueLabelFormat(value, max, isEn)}
                            ValueLabelComponent={ValueLabelComponent}
                            aria-labelledby="discrete-slider-restrict"
                            valueLabelDisplay="auto"
                            value={volume}
                            onChange={handleSliderChange}
                        />
                    </div>
                    <div className="orderSliderMarks space-between flex rowReverse">
                        {
                            marks(max).map(({ value, label }) => (
                                <div
                                    style={{ color: orderType ? satrexGreen : satrexRed }}
                                    onClick={(e) => {
                                        if (max > 0) handleSliderChange(e, value);
                                    }}
                                >
                                    {label}
                                </div>
                            ))
                        }
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default VolumeSlider;
