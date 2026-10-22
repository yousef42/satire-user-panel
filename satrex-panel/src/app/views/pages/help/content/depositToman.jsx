import React from 'react';
import depositPic1 from '../../../../../images/helpPhotos/6.png';
import depositPic2 from '../../../../../images/helpPhotos/7.png';
import depositPic3 from '../../../../../images/helpPhotos/شاپرک.png';
import Liked from '../Liked';
import Trans from '../../../../components/lang';

export default function () {
  return (
    <div style={{ width: '100%' }}>
      <div style={{ padding: '20px' }}>
        <p><Trans>helpPageDescriptionLine36</Trans></p>
        <p><Trans>helpPageDescriptionLine37</Trans></p>
        <p><Trans>helpPageDescriptionLine38</Trans></p>
        <center>
          <img
            src={depositPic1}
            style={{ width: '1200px' }}
            alt=""
          />
        </center>
        <p><Trans>helpPageDescriptionLine39</Trans></p>
        <center>
          <img
            src={depositPic2}
            style={{ width: '1200px' }}
            alt=""
          />
        </center>
        <p><Trans>helpPageDescriptionLine40</Trans></p>
        <center>
          <img
            src={depositPic3}
            style={{ width: '1200px' }}
            alt=""
          />
        </center>
        <p><Trans>If the deposit is successful, your Rial wallet will be charged. You will have access to the details of all your transactions on the account turnover page.</Trans></p>
      </div>
      <Liked />
    </div>
  );
}
