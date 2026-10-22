import React from 'react';
import { ScaleLoader } from 'react-spinners';
import { satrexGreen } from '../../styles/colors';

const SatrexLoader: React.FC = () => (
    <div
        className="flex center middle satrexLoader"
    >
        <ScaleLoader
            color={satrexGreen}
            loading
            height={15}
            width={3}
        />
    </div>
);

export default SatrexLoader;
