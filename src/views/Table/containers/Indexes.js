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

const TableIndexes = ({
  indexes,
}) => (
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

    {indexes && indexes.length > 0 && (
      <div className={styles.Container}>
        <Table
          className={styles.Table}
          columns={COLUMNS}
          data={indexes}
          minRows={0}
          resizable={false}
          showPagination={false}
        />
      </div>
    )}
  </div>
);

const mapStateToProps = ({ entities }, { location }) => {
  const pathname = get(location, 'pathname');
  const match = matchPath(pathname, { path: '/:tablespaceHash/table/:tableHash'});
  const tableHash = get(match, 'params.tableHash');

  return {
    indexes: get(entities, `tables.${tableHash}.indexes`, []).map((indexHash, index) => ({
      ...get(entities, `indexes.${indexHash}`), index: index + 1,
    })),
  };
};

TableIndexes.propTypes = {
  indexes: PropTypes.arrayOf(PropTypes.shape({
    fields: PropTypes.arrayOf(PropTypes.string),
    hash: PropTypes.string,
    index: PropTypes.number,
    name: PropTypes.string,
    type: PropTypes.string,
  })),
};

export default withRouter(connect(mapStateToProps)(TableIndexes));
