import React from 'react';

// Components
import Button from 'components/Button';
import Table from 'components/Table';

// Styles
import { Typography } from 'styles';
import styles from './Triggers.scss';

const COLUMNS = [
  {
    accessor: 'index',
    Header: '#',
    width: 64,
  },
  {
    accessor: 'name',
    Header: 'Name',
    width: 200,
  },
  {
    accessor: 'payload',
    Header: 'Payload',
    width: 120,
  },
];

const DATA = [
  {
    index: 1,
    name: 'New message',
    payload: '0x7061796c6f616431',
  },
  {
    index: 2,
    name: 'Read message',
    payload: '0x7061796c6f616431',
  },
];

const TableTriggers = () => (
  <div className={styles.Root}>
    <div className={styles.Header}>
      <Typography
        className={styles.Title}
        variant={Typography.VARIANT.H5}
      >
        Triggers
      </Typography>

      <div className={styles.Actions}>
        <Button className={styles.Create}>
          Create trigger
        </Button>
      </div>
    </div>

    <div className={styles.Container}>
      <Table
        className={styles.Table}
        columns={COLUMNS}
        data={DATA}
        minRows={0}
        resizable={false}
        showPagination={false}
      />
    </div>
  </div>
);

export default TableTriggers;
