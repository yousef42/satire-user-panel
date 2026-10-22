import React from 'react';

import withdrawalTomanPic1 from '../../../../../images/helpPhotos/8.png';
import withdrawalTomanPic2 from '../../../../../images/helpPhotos/9.png';
import withdrawalTomanPic3 from '../../../../../images/helpPhotos/10.png';
import Liked from '../Liked';
import Trans from '../../../../components/lang';

export default function () {
    return (
        <div style={{ width: '100%' }}>
            <div style={{ padding: '20px' }}>
                <p><Trans>helpPageDescriptionLine41</Trans></p>
                <p><Trans>helpPageDescriptionLine42</Trans></p>
                <center>
                    <img
                        src={withdrawalTomanPic1}
                        style={{ width: '1200px', height: '600px' }}
                        alt=""
                    />
                </center>
                <p><Trans>helpPageDescriptionLine43</Trans></p>
                <center>
                    <img
                        src={withdrawalTomanPic2}
                        style={{ width: '1200px', height: '600px' }}
                        alt=""
                    />
                </center>
                <p><Trans>helpPageDescriptionLine44</Trans></p>
                <center>
                    <img
                        src={withdrawalTomanPic3}
                        style={{ width: '1200px', height: '600px' }}
                        alt=""
                    />
                </center>
            </div>
            <Liked />
        </div>
    );
}
