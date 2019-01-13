import PropTypes from 'prop-types';
import React from 'react';

// Styles
import { Typography } from 'styles';
import styles from './Group.scss';

const SearchGroup = ({
  children,
  title,
}) => (
  <div className={styles.Root}>
    <Typography
      className={styles.Title}
      variant={Typography.VARIANT.BUTTON}
    >
      {title}
    </Typography>

    <div className={styles.List}>
      {children}
    </div>
  </div>
);

SearchGroup.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
};

export default SearchGroup;
