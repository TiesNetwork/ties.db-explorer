import React from 'react';

// Components
import Query from '../components/Query';

// Styles
import styles from './Queries.scss';

const DashboardQueries = () => (
  <div className={styles.Root}>
    <div className={styles.List}>
      <Query date="30 Jan 2018 12:28" name="Message statistics" />
    </div>
  </div>
);

export default DashboardQueries;
