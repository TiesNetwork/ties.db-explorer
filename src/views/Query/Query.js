import React from 'react';

// Containers
import Form from './containers/Form';
import Table from './containers/Table';

// Styles
import styles from './Query.scss';

const Query = () => (
  <div className={styles.Root}>
    <div className={styles.Form}>
      <Form />
    </div>

    <div className={styles.Table}>
      <Table />
    </div>
  </div>
);

export default Query;
