import React from 'react';
import SatrexCard from '../../../components/SatrexCard';
import Liked from '../help/Liked';
import DealingFees from './dealingFees';
import WithdrawalFees from './withdrawlFees';
import RialFees from './RialFees';
import { satrexGreen } from '../../../../styles/colors';
import AnimatedPage from '../../../components/AnimatedPage';
import Trans from '../../../components/lang';

export default function () {
    return (
        <AnimatedPage>
            <SatrexCard style={{ marginTop: '20px' }} header="FeesAndServiceFees">
                <div style={{ padding: '20px' }} className="footerPage">
                    <p>
                        <Trans>feeguidePageDescriptionLine1</Trans>
                        .
                    </p>
                    <h5 style={{ marginTop: '30px', color: satrexGreen }}><Trans>TradingFee</Trans></h5>

                    <p><Trans>feeguidePageDescriptionLine2</Trans></p>

                    <ul>
                        <li><Trans>feeguidePageDescriptionLine3</Trans></li>
                        <li><Trans>feeguidePageDescriptionLine4</Trans></li>
                        <li><Trans>feeguidePageDescriptionLine5</Trans></li>
                    </ul>

                    <p><Trans>feeguidePageDescriptionLine6</Trans></p>
                    <center>
                        <div style={{ width: '700px' }}>
                            <DealingFees />
                        </div>
                    </center>
                    <h5 style={{ marginTop: '30px', color: satrexGreen }}><Trans>feeguidePageDescriptionLine8</Trans></h5>
                    <p>
                        <Trans>feeguidePageDescriptionLine9</Trans>
                        :
                        {' '}
                    </p>
                    <center>
                        <div style={{ width: '700px' }}>
                            <WithdrawalFees />
                        </div>
                    </center>
                    <h5 style={{ marginTop: '30px', color: satrexGreen }}><Trans>feeguidePageDescriptionLine10</Trans></h5>
                    <p><Trans>feeguidePageDescriptionLine11</Trans></p>
                    <p>
                        <Trans>feeguidePageDescriptionLine12</Trans>
                        :
                    </p>
                    <center>
                        <div style={{ width: '700px' }}>
                            <RialFees />
                        </div>
                    </center>
                    <Trans>feeguidePageDescriptionLine13</Trans>
                    <ul style={{ marginTop: 20 }}>
                        <li style={{ lineHeight: '2' }}><Trans>feeguidePageDescriptionLine14</Trans></li>
                        <li style={{ lineHeight: '2' }}><Trans>feeguidePageDescriptionLine15</Trans></li>
                        <li style={{ lineHeight: '2' }}>
                            <Trans>feeguidePageDescriptionLine16</Trans>
                            .
                        </li>
                        <li style={{ lineHeight: '2' }}><Trans>feeguidePageDescriptionLine17</Trans></li>
                    </ul>
                </div>
                <Liked />
            </SatrexCard>
        </AnimatedPage>
    );
}
