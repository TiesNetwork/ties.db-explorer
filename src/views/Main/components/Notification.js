import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

// Styles
import { Typography } from 'styles';
import styles from './Notification.scss';

const VARIANT = {
  ALERT: {
    className: styles.RootVariantAlert,
    icon: 'fas fa-exclamation-triangle',
  },
  DANGER: {
    icon: '',
  },
  NEWS: {
    className: styles.RootVariantNews,
    icon: 'fab fa-twitter',
  },
  UPDATE: {
    className: styles.RootVariantUpdate,
    icon: 'fab fa-github',
  },
};

const MainNotification = ({
  description,
  title,
  variant = VARIANT.ALERT,
}) => {
  const rootClassNames = classNames(styles.Root, variant.className);
  const iconClassNames = classNames(styles.Icon, variant.icon);

  return (
    <Link
      className={rootClassNames}
      to="/"
    >
      <div className={styles.Logo}>
        <i className={iconClassNames} />
      </div>

      <div className={styles.Info}>
        <Typography
          className={styles.Title}
          noWrap
          variant={Typography.VARIANT.SUBTITLE1}
        >
          {title}
        </Typography>

        <Typography
          className={styles.Description}
          variant={Typography.VARIANT.CAPTION}
        >
          {description}
        </Typography>
      </div>
    </Link>
  );
};

MainNotification.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
  variant: PropTypes.shape({
    className: PropTypes.string,
    icon: PropTypes.string,
  }),
};

MainNotification.VARIANT = VARIANT;

export default MainNotification;
