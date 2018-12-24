import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { compose, withHandlers } from 'recompose';

// Ducks
import { closeModal } from 'services/modals';

// Styles
import { Typography } from 'styles';
import styles from './Link.scss';

const SearchLink = ({
  description,
  handleClick,
  icon,
  title,
  to,
}) => {
  const iconClassNames = classNames(styles.Icon, icon);

  return (
    <Link
      className={styles.Root}
      onClick={handleClick}
      to={to}
    >
      <div className={styles.Logo}>
        <i className={iconClassNames} />
      </div>

      <div className={styles.Info}>
        <Typography
          variant={Typography.VARIANT.SUBTITLE1}
        >
          {title}
        </Typography>

        {description && (
          <Typography
            className={styles.Description}
            variant={Typography.VARIANT.CAPTION}
          >
            {description}
          </Typography>
        )}
      </div>
    </Link>
  );
};

export default compose(
  connect(null, { closeModal }),
  withHandlers({
    handleClick: ({ closeModal }) => () =>
      closeModal('search'),
  }),
)(SearchLink);
