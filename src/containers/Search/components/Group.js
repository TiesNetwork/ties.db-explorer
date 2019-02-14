import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

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
      <FormattedMessage
        id={title}
        defaultMessage={title}
      />
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
