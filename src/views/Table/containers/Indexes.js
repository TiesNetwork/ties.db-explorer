import React from 'react';

// Components
import Button from 'components/Button';
import Table from 'components/Table';

// Styles
import { Typography } from 'styles';
import styles from './Indexes.scss';

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
    accessor: 'type',
    Header: 'Type',
    width: 120,
  },
  {
    accessor: 'fields',
    Header: 'Fields',
    width: 120,
  },
];

const DATA = [
  {
    index: 1,
    fields: 'user_id',
    name: 'Owner',
    type: 'primary',
  },
  {
    index: 2,
    fields: 'attach_id',
    name: 'Attachment',
    type: 'internal',
  },
  {
    index: 3,
    fields: 'id',
    name: 'Delete message',
    type: 'external',
  },
];

const TableIndexes = () => (
  <div className={styles.Root}>
    <div className={styles.Header}>
      <Typography
        className={styles.Title}
        variant={Typography.VARIANT.H5}
      >
        Indexes
      </Typography>

      <div className={styles.Actions}>
        <Button className={styles.Create}>
          Create index
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

export default TableIndexes;
