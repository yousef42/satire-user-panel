import React, { useEffect } from 'react';
import { makeStyles } from '@mui/styles';

import anime from 'animejs';
import { useSelector } from 'react-redux';
import { satrexGray, satrexGreen } from '../../../styles/colors';
import satrexLogo from '../../../images/satrexLogo.png';

const useStyles = makeStyles((theme) => ({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    margin: 'auto',
    top: 0,
    height: '100%',
    width: '100%',
    display: 'flex',
    direction: 'ltr',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

function Loading() {
  const satrexTheme = useSelector((state) => state.layout.satrexTheme);
  const classes = useStyles();

  useEffect(() => {
    let isMounted = true;
    let logoAnimation;
    if (isMounted) {
       logoAnimation = anime.timeline({
        autoplay: true,
        delay: 200,
        loop: false,
      });

      logoAnimation.add({
        targets: '#logo',
        translateY: [-100, 0],
        opacity: [0, 1],
        elasticity: 600,
        duration: 1600,
      }).add({
        targets: '#logo',
        rotate: [-270, 0],
        duration: 1200,
        elasticity: 600,
        offset: 100,

      }).add({
        targets: '#logo-text',
        translateX: ['-100%', 0],
        opacity: [0, 1],
        duration: 1000,
        easing: 'easeOutExpo',

      });
    }
    return () => {
      isMounted = false;
      logoAnimation = null;
    };
  }, []);

  return (
    <div className={classes.loading}>
      <style>
{`
              

              .site-logo {
                display: flex;
                align-items: center;
                transform: translateZ(0);
              }

              [id=logo] {
                position: relative;
                flex: 0 0 3.75rem;
                width: 3.75rem;
                z-index: 2;
              }

              [id=logo] {
                transform-origin: 50%;
              }

              [id=logo] circle {
                transform-origin: 80% 80%;
              }

              .site-title {
                position: relative;
                overflow: hidden;
                margin-left: -1.5rem;
                z-index: 1;
                transform: translateZ(0);
              }

              .site-title-text {
                padding: 0.25rem 0.375rem 0.25rem 1.75rem;
                font-size: 2rem;
                color:${satrexTheme ? satrexGray : 'white'}
                font-weight: 800;
              }

              .site-title-text span {
                margin-left: 0.015625rem;
                color: ${satrexGreen};
              }
              
            `}
      </style>
      {/* <ScaleLoader color={color} loading={loading} css={override} size={50} /> */}
      <div className="site-logo">
        <img src={satrexLogo} style={{ width: 60, height: 60 }} id="logo" alt="" />
        <div className="site-title">
          <div id="logo-text" className="site-title-text">
            satrex
              <span>Exchange</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loading;
