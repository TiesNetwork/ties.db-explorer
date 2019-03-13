import React from 'react';

// Components
import Social from '../components/Social';

// Styles
import { Typography } from 'styles';
import styles from './About.scss';

const SOCIAL = [
  { id: 'twitter', icon: 'fab fa-twitter', link: 'https://twitter.com/tiesnetwork' },
  { id: 'medium', icon: 'fab fa-medium', link: 'https://medium.com/@Ties.DB' },
  { id: 'github', icon: 'fab fa-github', link: 'https://github.com/TiesNetwork' },
  { id: 'telegram', icon: 'fab fa-telegram', link: 'https://t.me/tiesdb' },
];

const ConnectionsAbout = ({
  social,
  version = VERSION, //eslint-disable-line
}): Function => (
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
        {SOCIAL.map((item: Object, index: number): Function => (
          <Social {...item} key={index} />
        ))}
      </div>
    </div>

    <div className={styles.Version}>
      <a
        className={styles.Link}
        href={`https://github.com/TiesNetwork/ties.db-explorer/releases/tag/v${version}`}
        rel="noopener noreferrer"
        target="_blank"
      >
        <Typography
          component="span"
          variant={Typography.VARIANT.OVERLINE}
        >
          BUILD:&nbsp;
          <span className={styles.Tag}>
            #{version}
          </span>
        </Typography>
      </a>
    </div>
  </div>
);

export default ConnectionsAbout;
