import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { push } from 'react-router-redux';
import { compose, withHandlers } from 'recompose';

// Components
import Button from 'components/Button';
import Table from '../components/Table';

// Styles
import styles from './Tables.scss';

const DashboardTables = ({
  tables,
}) => (
  <div className={styles.Root}>
    {tables && tables.length > 0 && (
      <div className={styles.List}>
        {tables.map(tableHash => (
          <Table
            hash={tableHash}
            key={tableHash}
          />
        ))}
      </div>
    )}

    <div className={styles.Actions}>
      <Button
        color={Button.COLOR.GRADIENT.PURPLE}
        fullWidth
      >
        Create Table
      </Button>
    </div>
  </div>
);

const mapStateToProps = ({ entities, views }, { match }) => {
  const tablespaceHash = get(match, 'params.tablespaceHash');
  const tablespace = get(entities, `tablespaces.${tablespaceHash}`);

  return {
    currentTablespace: tablespaceHash,
    tables: get(tablespace, 'tables'),
  };
};

export default withRouter(compose(
  connect(mapStateToProps, { push }),
  withHandlers({
    handleClick: ({

    }),
  }),
)(DashboardTables));
