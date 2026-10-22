import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@mui/material';
import { useSelector } from 'react-redux';
import { animatedBoxPropTypes } from '../../utils/interfaces';
import ThemeAtrr from '../MasterLayout/MasterTheme/ThemeAtrr';
import {
    satrexBorderDarkColor,
    satrexDarkerBlueDarkMode,
} from '../../styles/colors';

const AnimatedBox: React.FC<animatedBoxPropTypes> = (props) => {
    const { className, children, style, ...others } = props;
    const satrexTheme = useSelector((state: any) => state.layout.theme);
    const extraTheme = useSelector((state: any) => state.layout.extraTheme);
    const cardBackgroundColor = (extraTheme !== true && extraTheme)
        ? ThemeAtrr(extraTheme)?.cardStyle?.backgroundColor
        : (!satrexTheme ? satrexDarkerBlueDarkMode : 'white');
    const pageVariants = {
        initial: {
            opacity: 0,
            scale: 1.2,
        },
        in: {
            opacity: 1,
            scale: 1,
        },
        out: {
            opacity: 0,
            scale: 1.2,
        },
    };

    return (
        <motion.div

            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}

        >
            <Card
                {...others}
                className={`${className}`}
                style={{
                    backgroundColor: cardBackgroundColor,
                    border: `solid 1px ${satrexTheme ? '#ececec' : satrexBorderDarkColor}`,
                    boxShadow: 'none',
                    ...style,
                }}
            >
                {
                    children
                }

            </Card>

        </motion.div>
    );
};

export default AnimatedBox;
