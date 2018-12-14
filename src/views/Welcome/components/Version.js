import React from 'react';

// Styles
import { Typography } from 'styles';
import styles from './Version.scss';

const WelcomeVersion = () => (
   <a
    className={styles.Root}
    href="https://github.com/TiesNetwork/ties.db-ui/releases/tag/v0.1.0"
    rel="noopener noreferrer"
    target="_blank"
  >
    <Typography
      component="span"
      variant={Typography.VARIANT.OVERLINE}
    >
      BUILD:&nbsp;
      <span className={styles.Tag}>
        #0.1.1
      </span>
    </Typography>
  </a>
);

export default WelcomeVersion;
