import React from 'react';
import withdrawalCryptoPic1 from '../../../../../images/helpPhotos/13.png';
import withdrawalCryptoPic2 from '../../../../../images/helpPhotos/14.png';
import withdrawalCryptoPic3 from '../../../../../images/helpPhotos/10.png';
import Liked from '../Liked';
import Trans from '../../../../components/lang';

export default function () {
    return (
        <div style={{ width: '100%' }}>
            <div style={{ padding: '20px' }}>
                <p><Trans>helpPageDescriptionLine52</Trans></p>
                <center>
                    <img
                        src={withdrawalCryptoPic1}
                        alt=""
                    />
                </center>
                <p><Trans>helpPageDescriptionLine53</Trans></p>
                <center>
                    <img
                        src={withdrawalCryptoPic2}
                        alt=""
                    />
                </center>
                <p><Trans>helpPageDescriptionLine54</Trans></p>
                <center>
                    <img
                        src={withdrawalCryptoPic3}
                        alt=""
                    />
                </center>
            </div>
            <Liked />
        </div>
    );
}
