import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose, withHandlers } from 'recompose';

// Components
import Button from 'components/Button';
import Table from '../components/Table';

// Ducks
import { EDIT_MODAL_ID } from 'containers/Edit';

// Entities
import { TABLES_ENTITY_ID } from 'entities/tables';

// Services
import { openModal } from 'services/modals';

// Styles
import { GRADIENT } from 'styles';
import styles from './Tables.scss';

const DashboardTables = ({
  handleClick,
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
        color={GRADIENT.PURPLE}
        fullWidth
        onClick={handleClick}
      >
        Create Table
      </Button>
    </div>
  </div>
);

const mapStateToProps = ({ entities, views }, { match }): Object => {
  const tablespaceHash = get(match, 'params.tablespaceHash');
  const tablespace = get(entities, `tablespaces.${tablespaceHash}`);

  return {
    currentTablespace: tablespaceHash,
    tables: get(tablespace, 'tables'),
  };
};

export default withRouter(compose(
  connect(mapStateToProps, { openModal }),
  withHandlers({
    handleClick: ({ openModal }): func => (): void =>
      openModal(EDIT_MODAL_ID, { type: TABLES_ENTITY_ID }),
  }),
)(DashboardTables));
