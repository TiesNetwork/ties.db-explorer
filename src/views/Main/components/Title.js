import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';

// Styles
import { Typography } from 'styles';
import styles from './Title.scss';

const MainTitle = ({
  title = 'Messages',
}) => {
  const iconClassNames = classNames(styles.Icon, 'fas', 'fa-globe-americas');

  return (
    <div className={styles.Root}>
      <div className={styles.Distribute}>
        <i className={iconClassNames} />
      </div>

      <div className={styles.Info}>
        <Typography
          noWrap
          variant={Typography.VARIANT.H6}
        >
          {title}
        </Typography>

        <div className={styles.Actions}>
          <Link
            className={styles.Link}
            to="/"
          >
            <Typography variant={Typography.VARIANT.CAPTION}>
              Edit table
            </Typography>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainTitle;
