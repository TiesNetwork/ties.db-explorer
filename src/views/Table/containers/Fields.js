import { get } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { matchPath, withRouter } from 'react-router-dom';

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

const TableFileds = ({
  fields,
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
          Create field
        </Button>
      </div>
    </div>

    <div className={styles.Container}>
      <Table
        columns={COLUMNS}
        data={fields}
        minRows={0}
        resizable={false}
        showPagination={false}
      />
    </div>
  </div>
);

const mapStateToProps = ({ entities }, { location }) => {
  const pathname = get(location, 'pathname');
  const match = matchPath(pathname, { path: '/:tablespaceHash/table/:tableHash'});
  const tableHash = get(match, 'params.tableHash');

  return {
    fields: get(entities, `tables.${tableHash}.fields`, []).map((fieldHash, index) => ({
      ...get(entities, `fields.${fieldHash}`), index: index + 1,
    })),
  };
};

TableFileds.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.shape({
    defaultValue: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    hash: PropTypes.string,
    index: PropTypes.number,
    name: PropTypes.string,
    type: PropTypes.string,
  })),
};

export default withRouter(connect(mapStateToProps)(TableFileds));
