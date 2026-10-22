import React from 'react';
import { motion } from 'framer-motion';

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
        transition: {
            duration: 0.5,
        },
    },
};

function AnimatedPage({ children }) {
    return (
        <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
        >
            { children }
        </motion.div>
    );
}

export default AnimatedPage;
