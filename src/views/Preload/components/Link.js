import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

// Styles
import { Typography } from 'styles';
import styles from './Link.scss';

const VARIANT = {
  MEDIUM: {
    className: styles.RootVariantMedium,
    icon: 'fab fa-medium',
  },
  TELEGRAM: {
    className: styles.RootVariantTelegram,
    icon: 'fab fa-telegram',
  },
  TWITTER: {
    className: styles.RootVariantTwitter,
    icon: 'fab fa-twitter',
  },
};

const PreloadLink = ({
  description,
  title,
  to,
  variant = VARIANT.TWITTER,
}) => {
  const rootClassNames = classNames(styles.Root, variant.className);
  const iconClassNames = classNames(styles.Icon, variant.icon);

  return (
    <a className={rootClassNames} href={to}>
      <div className={styles.Logo}>
        <i className={iconClassNames} />
      </div>

      <div className={styles.Info}>
        <Typography
          className={styles.Title}
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
    </a>
  );
};

PreloadLink.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
  to: PropTypes.string,
  variant: PropTypes.shape({
    className: PropTypes.string,
    icon: PropTypes.string,
  }),
};

PreloadLink.VARIANT = VARIANT;

export default PreloadLink;
