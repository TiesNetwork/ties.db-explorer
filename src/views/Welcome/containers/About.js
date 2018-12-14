import React from 'react';

// Components
import Social from '../components/Social';
import Version from '../components/Version';

// Styles
import { Typography } from 'styles';
import styles from './About.scss';

const WelcomeAbout = () => (
  <div className={styles.Root}>
    <div className={styles.Container}>
      <div className={styles.Logo} />

      <Typography
        className={styles.Title}
        variant={Typography.VARIANT.H4}
      >
        Ties.DB
      </Typography>

      <div className={styles.Social}>
        <Social />
      </div>
    </div>

    <div className={styles.Version}>
      <Version />
    </div>
  </div>
);

export default WelcomeAbout;
