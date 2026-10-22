import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

const variants = {
    initial: {
        opacity: 0,
       y: 100,
        height: 0,
    },
    in: {
        opacity: 1,
        y: 0,
        height: 92,
    },
    out: {
        opacity: 0,
        y: -100,
        height: 0,
    },
};

interface OrderInputsAnimationProps {
    children:ReactNode,
    className?: string,
}

const OrderInputsAnimation: React.FC<OrderInputsAnimationProps> = ({ children, className = '', ...props }) => (
        <motion.div
                className={className}
                {...props}
                initial="initial"
                animate="in"
                exit="out"
                transition={{ ease: [0.17, 0.67, 0.83, 1], duration: 0.1 }}
                variants={variants}
                style={{ overflow: 'visible' }}
        >
                {children}
        </motion.div>
    );
export default OrderInputsAnimation;
