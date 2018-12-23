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

const TableTriggers = ({
  triggers,
}) => (
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
        data={triggers}
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
    triggers: get(entities, `tables.${tableHash}.triggers`, []).map((triggerHash, index) => ({
      ...get(entities, `triggers.${triggerHash}`), index: index + 1,
    })),
  };
};

TableTriggers.propTypes = {
  triggers: PropTypes.arrayOf(PropTypes.shape({
    hash: PropTypes.string,
    index: PropTypes.number,
    name: PropTypes.string,
    payload: PropTypes.string,
  })),
};

export default withRouter(connect(mapStateToProps)(TableTriggers));
