import React from 'react';
import { Link } from 'react-router-dom';

// Styles
import { Typography } from 'styles';
import styles from './Favorite.scss';

const MainFavorite = ({
  title,
  type,
}) => (
  <Link
    className={styles.Root}
    to="/"
  >
    <div className={styles.Info}>
      <Typography
        className={styles.Type}
        variant={Typography.VARIANT.OVERLINE}
      >
        {type} from <span className={styles.From} to="/">Cloud</span>
      </Typography>

      <Typography
        className={styles.Title}
        noWrap
        variant={Typography.VARIANT.SUBTITLE1}
      >
        {title}
      </Typography>
    </div>
  </Link>
);

export default MainFavorite;
