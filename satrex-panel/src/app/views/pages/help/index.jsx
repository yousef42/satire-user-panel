import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { Divider } from '@mui/material';
import { LayoutGroup, motion } from 'framer-motion';
import { Card, IconButton, useMediaQuery } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';
import SatrexCard from '../../../components/SatrexCard';
import ContentCard from '../../../components/contentCard';
import Startsatrex from './content/startSatrex';
import DealingCrypto from './content/dealingCrypto';
import RegisterInsatrex from './content/registerInSatrex';
import Authentication from './content/authentication';
import DepositToman from './content/depositToman';
import WithdrawalToman from './content/withdrawalToman';
import DepositCrypto from './content/depositCrypto';
import WithdrawalCrypto from './content/withdrawalCrypto';
import LevelGuide from './content/levelGuide';
import PersonalPhotoGuide from './content/personalPhotoGuide';
import Trans from '../../../components/lang';
import AnimatedPage from '../../../components/AnimatedPage';
import startImage from '../../../../images/helpPage/start.svg';
import dealImage from '../../../../images/helpPage/deal.svg';
import registerImage from '../../../../images/helpPage/register.svg';
import upgradeImage from '../../../../images/helpPage/upgrade.svg';
import depositImage from '../../../../images/helpPage/deposit.svg';
import withdrawalImage from '../../../../images/helpPage/withdrawal.svg';
import depositCryptoImage from '../../../../images/helpPage/depositCrypto.png';
import withdrawalCryptoImage from '../../../../images/helpPage/withdrawalCrypto.png';
import levelsImage from '../../../../images/helpPage/levels.svg';
import imageImage from '../../../../images/helpPage/image.svg';

export default function () {
    const [contentPage, setContentPage] = useState(false);
    const sidenavToggle = useSelector((state) => state.layout.sidebarToggle);
    const lang = useSelector((state) => state.user.language);
    const satrexTheme = useSelector((state) => state.layout.theme);
    const isEn = lang === 'EN' || lang === 'gr' || lang === 'fr';
    const xl = useMediaQuery('(min-width:1200px)');
    const [selectedCard, setSelectedCard] = useState('');
    const modalBackground = satrexTheme ? '#ffffff' : '#0f172a';
    const modalBorder = satrexTheme ? 'rgba(148, 163, 184, 0.24)' : 'rgba(148, 163, 184, 0.18)';
    const modalPrimaryText = satrexTheme ? '#1e293b' : '#f8fbff';
    const modalSecondaryText = satrexTheme ? '#475569' : '#d8e4ff';

    const changeContent = (index) => {
        setContentPage(index);
    };

    const [contentArr, setContentArr] = useState([
        null,
        <Startsatrex />,
        <DealingCrypto />,
        <RegisterInsatrex />,
        <Authentication setContentPage={changeContent} />,
        <DepositToman />,
        <WithdrawalToman />,
        <DepositCrypto />,
        <WithdrawalCrypto />,
        <LevelGuide />,
        <PersonalPhotoGuide />,
    ]);

    const [selectedId, setSelectedId] = useState(null);

    return (
        <AnimatedPage>
            <div style={{ marginTop: '20px' }} className="helpPage">
                <SatrexCard header="systemGuide">
                    <Grid container spacing={2} style={{ padding: 20 }}>

                        <Grid
                            xxl={3}
                            xxxl={2}
                            size={{
                                xs: 12,
                                sm: 6,
                                md: 6,
                                lg: 4,
                                xl: 3
                            }}>
                            <motion.div
                                layoutId={1}
                                onClick={() => {
                                    changeContent(1);
                                    setSelectedCard('GettingStartedInsatrex');
                                }}
                            >
                                <ContentCard
                                    header="GettingStartedInsatrex"
                                    style={{ cursor: 'pointer' }}
                                    imgSrc={startImage}
                                >
                                    <div style={{ padding: '8px' }}><Trans>helpPageDescriptionLine1</Trans></div>
                                </ContentCard>
                            </motion.div>
                        </Grid>
                        <Grid
                            xxl={3}
                            xxxl={2}
                            size={{
                                xs: 12,
                                sm: 6,
                                md: 6,
                                lg: 4,
                                xl: 3
                            }}>
                            <motion.div
                                layoutId={2}
                                onClick={() => {
                                    changeContent(2);
                                    setSelectedCard('helpPageDescriptionLine2');
                                }}
                            >
                                <ContentCard
                                    header="helpPageDescriptionLine2"
                                    style={{ cursor: 'pointer' }}
                                    imgSrc={dealImage}
                                >
                                    <div style={{ padding: '8px' }}><Trans>helpPageDescriptionLine3</Trans></div>
                                </ContentCard>
                            </motion.div>

                        </Grid>
                        <Grid
                            xxl={3}
                            xxxl={2}
                            size={{
                                xs: 12,
                                sm: 6,
                                md: 6,
                                lg: 4,
                                xl: 3
                            }}>
                            <motion.div
                                layoutId={3}
                                onClick={() => {
                                    changeContent(3);
                                    setSelectedCard('RegisterAtSatrex');
                                }}
                            >
                                <ContentCard
                                    header="RegisterAtSatrex"
                                    style={{ cursor: 'pointer' }}
                                    imgSrc={registerImage}
                                >
                                    <div style={{ padding: '8px' }}>
                                        <Trans>helpPageDescriptionLine4</Trans>
                                        .
                                    </div>
                                </ContentCard>
                            </motion.div>

                        </Grid>

                        <Grid
                            xxl={3}
                            xxxl={2}
                            size={{
                                xs: 12,
                                sm: 6,
                                md: 6,
                                lg: 4,
                                xl: 3
                            }}>
                            <motion.div
                                layoutId={4}
                                onClick={() => {
                                    changeContent(4);
                                    setSelectedCard('authenticationInSatrex');
                                }}
                            >
                                <ContentCard
                                    header="authenticationInSatrex"
                                    style={{ cursor: 'pointer' }}
                                    imgSrc={upgradeImage}
                                >
                                    <div style={{ padding: '8px' }}>
                                        <Trans>helpPageDescriptionLine5</Trans>
                                        .
                                    </div>
                                </ContentCard>
                            </motion.div>

                        </Grid>
                        {' '}
                        <Grid
                            xxl={3}
                            xxxl={2}
                            size={{
                                xs: 12,
                                sm: 6,
                                md: 6,
                                lg: 4,
                                xl: 3
                            }}>
                            <motion.div
                                layoutId={5}
                                onClick={() => {
                                    changeContent(5);
                                    setSelectedCard('helpPageDescriptionLine6');
                                }}
                            >
                                <ContentCard
                                    header="helpPageDescriptionLine6"
                                    style={{ cursor: 'pointer' }}
                                    imgSrc={depositImage}
                                >
                                    <div style={{ padding: '8px' }}>
                                        <Trans>helpPageDescriptionLine7</Trans>
                                        .
                                    </div>
                                </ContentCard>
                            </motion.div>

                        </Grid>
                        <Grid
                            xxl={3}
                            xxxl={2}
                            size={{
                                xs: 12,
                                sm: 6,
                                md: 6,
                                lg: 4,
                                xl: 3
                            }}>
                            <motion.div
                                layoutId={6}
                                onClick={() => {
                                    changeContent(6);
                                    setSelectedCard('helpPageDescriptionLine8');
                                }}
                            >
                                <ContentCard
                                    header="helpPageDescriptionLine8"
                                    style={{ cursor: 'pointer' }}
                                    imgSrc={withdrawalImage}
                                >
                                    <div style={{ padding: '8px' }}>
                                        <Trans>helpPageDescriptionLine9</Trans>
                                        .
                                    </div>
                                </ContentCard>
                            </motion.div>

                        </Grid>
                        <Grid
                            xxl={3}
                            xxxl={2}
                            size={{
                                xs: 12,
                                sm: 6,
                                md: 6,
                                lg: 4,
                                xl: 3
                            }}>
                            <motion.div
                                layoutId={7}
                                onClick={() => {
                                    changeContent(7);
                                    setSelectedCard('helpPageDescriptionLine10');
                                }}
                            >
                                <ContentCard
                                    header="helpPageDescriptionLine10"
                                    style={{ cursor: 'pointer' }}
                                    imgSrc={depositCryptoImage}
                                >
                                    <div style={{ padding: '8px' }}>
                                        <Trans>helpPageDescriptionLine11</Trans>
                                        .
                                    </div>
                                </ContentCard>
                            </motion.div>

                        </Grid>
                        <Grid
                            xxl={3}
                            xxxl={2}
                            size={{
                                xs: 12,
                                sm: 6,
                                md: 6,
                                lg: 4,
                                xl: 3
                            }}>
                            <motion.div
                                layoutId={8}
                                onClick={() => {
                                    changeContent(8);
                                    setSelectedCard('depositCryptocurrency');
                                }}
                            >
                                <ContentCard
                                    header="depositCryptocurrency"
                                    style={{ cursor: 'pointer' }}
                                    imgSrc={withdrawalCryptoImage}
                                >
                                    <div style={{ padding: '8px' }}>
                                        <Trans>helpPageDescriptionLine12</Trans>
                                        .
                                    </div>
                                </ContentCard>
                            </motion.div>

                        </Grid>
                        <Grid
                            xxl={3}
                            xxxl={2}
                            size={{
                                xs: 12,
                                sm: 6,
                                md: 6,
                                lg: 4,
                                xl: 3
                            }}>
                            <motion.div
                                layoutId={9}
                                onClick={() => {
                                    changeContent(9);
                                    setSelectedCard('helpPageDescriptionLine13');
                                }}
                            >
                                <ContentCard
                                    header="helpPageDescriptionLine13"
                                    style={{ cursor: 'pointer' }}
                                    imgSrc={levelsImage}
                                >
                                    <div style={{ padding: '8px' }}>
                                        <Trans>helpPageDescriptionLine14</Trans>
                                        .
                                    </div>
                                </ContentCard>
                            </motion.div>

                        </Grid>
                        <Grid
                            xxl={3}
                            xxxl={2}
                            size={{
                                xs: 12,
                                sm: 6,
                                md: 6,
                                lg: 4,
                                xl: 3
                            }}>
                            <motion.div
                                layoutId={10}
                                onClick={() => {
                                    changeContent(10);
                                    setSelectedCard('helpPageDescriptionLine15');
                                }}
                            >
                                <ContentCard
                                    header="helpPageDescriptionLine15"
                                    style={{ cursor: 'pointer' }}
                                    imgSrc={imageImage}
                                >
                                    <div style={{ padding: '8px' }}>
                                        <Trans>helpPageDescriptionLine16</Trans>
                                        .
                                    </div>
                                </ContentCard>
                            </motion.div>

                        </Grid>
                    </Grid>
                    {
                        contentPage
                        && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                className="backDrop"
                                animate={{ opacity: 1 }}
                                onClick={() => setContentPage(null)}
                                style={{
                                    backgroundColor: satrexTheme
                                        ? 'rgba(15, 23, 42, 0.3)'
                                        : 'rgba(2, 6, 23, 0.72)',
                                    position: 'fixed',
                                    zIndex: 99,
                                    width: '100%',
                                    height: '100%',
                                    top: 0,
                                    left: 0,
                                }}
                            />
                        )
                    }
                    <LayoutGroup>

                        {
                            contentPage && (
                                <motion.div
                                style={{
                                        marginTop: '20px',
                                        position: 'fixed',
                                        top: 0,
                                        left: 0,
                                        zIndex: 100,
                                        height: '100%',
                                        overflow: 'auto',
                                        width: '100%',
                                        display: 'flex',
                                        justifyContent: 'flex-end',

                                    }}
                                    layoutId={contentPage}
                                    onClick={() => setContentPage(null)}
                                >
                                    <div style={{
                                        width: !xl ? 'calc(100% - 61px)' : (sidenavToggle ? 'calc(100% - 260px)' : 'calc(100% - 61px)'),
                                        padding: 150,
                                        transition: '0.3s',
                                    }}
                                    >
                                        <Card
                                            onClick={(event) => event.stopPropagation()}
                                            style={{
                                                backgroundColor: modalBackground,
                                                color: modalSecondaryText,
                                                borderRadius: 18,
                                                border: `1px solid ${modalBorder}`,
                                                boxShadow: satrexTheme
                                                    ? '0 24px 48px rgba(15, 23, 42, 0.12)'
                                                    : '0 24px 64px rgba(2, 6, 23, 0.48)',
                                                overflow: 'hidden',
                                            }}
                                        >
                                            <div style={{
                                                padding: 14,
                                                width: '100%',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                direction: isEn ? 'ltr' : 'rtl',
                                            }}
                                            >

                                                <span style={{
                                                    fontSize: 17,
                                                    fontWeight: 'bold',
                                                    paddingLeft: 10,
                                                    paddingRight: 10,
                                                    color: modalPrimaryText,
                                                    textAlign: isEn ? 'left' : 'right',
                                                    direction: isEn ? 'ltr' : 'rtl',
                                                }}
                                                >
                                                    <Trans>{selectedCard}</Trans>
                                                </span>
                                                <IconButton
                                                    onClick={() => setContentPage(null)}
                                                    style={{ color: modalPrimaryText }}
                                                >
                                                    <CloseIcon />
                                                </IconButton>
                                            </div>
                                            <center>
                                                <Divider
                                                    style={{
                                                        width: '97%',
                                                        borderColor: modalBorder,
                                                        opacity: 0.9,
                                                    }}
                                                />
                                            </center>
                                            <motion.div
                                                style={{
                                                    padding: '12px 16px 22px',
                                                    color: modalSecondaryText,
                                                    textAlign: isEn ? 'left' : 'right',
                                                    direction: isEn ? 'ltr' : 'rtl',
                                                    lineHeight: 1.95,
                                                }}
                                            >
                                                {contentArr[contentPage]}
                                            </motion.div>
                                        </Card>
                                    </div>
                                </motion.div>
                            )
                        }

                    </LayoutGroup>
                    {/* <CircleLoader color={color} loading={loading} css={override} size={50} /> */}
                    {/* <iframe src="https://platform.tgju.org/tv3/?symbol=price_dollar_rl" frameborder="0" width="100%" height="800px"/> */}
                </SatrexCard>
            </div>
        </AnimatedPage>
    );
}
