import React from 'react';
import depositCryptoPic1 from '../../../../../images/helpPhotos/11.png';
import depositCryptoPic2 from '../../../../../images/helpPhotos/12.png';
import depositCryptoPic3 from '../../../../../images/helpPhotos/واریزرمزارز.png';
import Trans from '../../../../components/lang';

import Liked from '../Liked';

export default function () {
  return (
    <div style={{ width: '100%' }}>
      <div style={{ padding: '20px' }}>
        <p><Trans>helpPageDescriptionLine45</Trans></p>

        <p><Trans>helpPageDescriptionLine46</Trans></p>
        <center>
          <img
            src={depositCryptoPic1}

            alt=""
          />
        </center>
        <p>
<Trans>helpPageDescriptionLine47</Trans>
{' '}
        </p>
        <center>
          <img
            src={depositCryptoPic2}

            alt=""
          />
        </center>
        <p><Trans>helpPageDescriptionLine48</Trans></p>
        <center>
          <img
            src={depositCryptoPic3}

            alt=""
          />
        </center>
        <p>
<Trans>helpPageDescriptionLine49</Trans>
{' '}
        </p>
        <p><Trans>helpPageDescriptionLine50</Trans></p>
        <p>
<Trans>helpPageDescriptionLine51</Trans>
{' '}
        </p>
      </div>
      <Liked />
    </div>
  );
}
