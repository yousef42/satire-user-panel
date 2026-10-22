import React from 'react';
import SatrexCard from '../../../components/SatrexCard';
import registerPic from '../../../../images/helpPhotos/1.png';
import codePic from '../../../../images/helpPhotos/2.png';
import Liked from '../help/Liked';
import Trans, { transFn } from '../../../components/lang';
import AnimatedPage from '../../../components/AnimatedPage';

export default function () {
    return (
        <AnimatedPage>
            <div>
                <SatrexCard
                    style={{ marginTop: '20px' }}
                    header={transFn('helpPageDescriptionLine2')}
                >
                    <div style={{ padding: '20px' }}>
                        <p>
                            <Trans>helpPageDescriptionLine27</Trans>
.
                        </p>
                        <p>
                            <Trans>helpPageDescriptionLine28</Trans>
.
                        </p>
                        <center>
                            <img
                                src={registerPic}
                                style={{ width: '1200px', height: '600px' }}
                                alt=""
                            />
                        </center>
                        <p>
                            <Trans>helpPageDescriptionLine29</Trans>
.
                        </p>
                        <center>
                            <img
                                src={codePic}
                                style={{ width: '1200px', height: '600px' }}
                                alt=""
                            />
                        </center>
                        <p>
<Trans>helpPageDescriptionLine30</Trans>
.
                        </p>
                    </div>
                    <Liked />
                </SatrexCard>
            </div>
        </AnimatedPage>
    );
}
