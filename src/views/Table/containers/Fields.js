import React from 'react';

// Components
import Button from 'components/Button';
import Table from 'components/Table';

// Styles
import { Typography } from 'styles';
import styles from './Fields.scss';

const COLUMNS = [
  {
    accessor: 'index',
    Header: '#',
    width: 64,
  },
  {
    accessor: 'name',
    Header: 'Name',
    width: 260,
  },
  {
    accessor: 'type',
    Header: 'Type',
    width: 120,
  },
  {
    accessor: 'defaultValue',
    Header: 'Default',
    width: 120,
  },
  {
    accessor: 'test',
    Header: 'Actions',
    sortable: false,
    width: 200,
  },
];

const DATA = [
  {
    index: 1,
    defaultValue: '0',
    name: 'id',
    type: 'uuid',
  },
  {
    index: 2,
    defaultValue: '',
    name: 'body',
    type: 'text',
  },
  {
    index: 3,
    defaultValue: '',
    name: 'title',
    type: 'text',
  },
  {
    index: 4,
    defaultValue: '0',
    name: 'attach_id',
    type: 'uuid',
  },
  {
    index: 5,
    defaultValue: '0',
    name: 'user_id',
    type: 'uuid',
  },
];

const TableFileds = ({

}) => (
  <div className={styles.Root}>
    <div className={styles.Header}>
      <Typography
        variant={Typography.VARIANT.H5}
      >
        Fields
      </Typography>

      <div className={styles.Actions}>
        <Button className={styles.Create}>
          Create index
        </Button>
      </div>
    </div>

    <div className={styles.Container}>
      <Table
        columns={COLUMNS}
        data={DATA}
        minRows={0}
        resizable={false}
        showPagination={false}
      />
    </div>
  </div>
);

export default TableFileds;
