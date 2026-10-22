import React from 'react';
import { useSelector } from 'react-redux';
import { satrexGreen } from '../../styles/colors';
import SatrexNumFormat from './satrexNumFormat';

interface PercentageFormaterProps {
    value: string | number | null | undefined;
    style?:any;
}

const PercentageFormater: React.FC<PercentageFormaterProps> = ({ value, ...otherProps }) => {
    const lang = useSelector((state:any) => state.user.language);
    const isEn = lang === 'EN' || lang === 'gr' || lang === 'fr';
    const parsedValue = Number(value);

    if (value === null || value === undefined || value === '' || Number.isNaN(parsedValue)) {
        return null;
    }

    return (
        <span
        className="flex flexDirection ltr"
        style={{
            color:
                parsedValue > 0
                    ? satrexGreen
                    : parsedValue
                    < 0
                        ? 'red'
                        : '',
        }}
        {...otherProps}
        >
    {
        (parsedValue < 0) && !isEn && '-'
    }
        %
        <SatrexNumFormat
            num={Math.abs(parsedValue)}
        />
        {
            (parsedValue < 0) && isEn && '-'
        }
        </span>
    );
};

export default PercentageFormater;
