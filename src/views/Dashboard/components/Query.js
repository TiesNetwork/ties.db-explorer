import PropTypes from 'prop-types';
import React from 'react';

// Styles
import { Typography } from 'styles';
import styles from './Query.scss';

const DashboardQuery = ({
  date,
  name,
}) => (
  <button
    className={styles.Root}
    type="button"
  >
    <div className={styles.Info}>
      <Typography
        className={styles.Date}
        noWrap
        variant={Typography.VARIANT.OVERLINE}
      >
        Last: {date}
      </Typography>

      <Typography
        noWrap
        variant={Typography.VARIANT.SUBTITLE1}
      >
        {name}
      </Typography>
    </div>
  </button>
);

DashboardQuery.propTypes = {
  date: PropTypes.string,
  title: PropTypes.string,
};

export default DashboardQuery;
