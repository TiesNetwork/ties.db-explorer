import React from 'react';

// Components
import Table from 'components/Table';

const COLUMNS = [
  {
    accessor: 'id',
    Header: 'id',
    width: 64,
  },
  {
    accessor: 'body',
    Header: 'body',
    width: 260,
  },
  {
    accessor: 'title',
    Header: 'title',
    width: 120,
  },
  {
    accessor: 'attach_id',
    Header: 'attach_id',
    width: 120,
  },
  {
    accessor: 'user_id',
    Header: 'user_id',
    width: 200,
  },
];

const DATA = [
  {
    id: 1,
    body: 'Hello world!',
    title: 'Welcome',
    attach_id: 'null',
    user_id: 123,
  },
  {
    id: 2,
    body: 'Ties.DB best of the best!',
    title: 'Ties.DB',
    attach_id: 213,
    user_id: 123,
  },
  {
    id: 3,
    body: 'When moon?',
    title: 'When moon?',
    attach_id: 'null',
    user_id: 35,
  },
];

const QueryTable = () => (
  <div>
    <Table
      columns={COLUMNS}
      data={DATA}
      minRows={0}
      showPagination={false}
    />
  </div>
);

export default QueryTable;
