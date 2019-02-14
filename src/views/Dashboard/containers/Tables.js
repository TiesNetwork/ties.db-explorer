import classNames from 'classnames';
import { get } from 'lodash';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { matchPath, withRouter } from 'react-router-dom';
import { compose, withHandlers } from 'recompose';

// Components
import Button from 'components/Button';
import Table from '../components/Table';

// Ducks
import { EDIT_MODAL_ID } from 'containers/Edit';

// Entities
import { hasAccounts } from 'entities/accounts';
import { TABLES_ENTITY_ID } from 'entities/tables';

// Services
import { openModal } from 'services/modals';

// Styles
import { GRADIENT } from 'styles';
import styles from './Tables.scss';

const DashboardTables = ({
  handleClick,
  tables,

  // State
  isAuthorized,
}) => {
  const rootClassNames = classNames(styles.Root, {
    [styles.RootIsAuthorized]: isAuthorized,
  });

  return (
    <div className={rootClassNames}>
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

      {isAuthorized && (
        <div className={styles.Actions}>
          <Button
            color={GRADIENT.PURPLE}
            fullWidth
            onClick={handleClick}
          >
            <FormattedMessage
              id="create_table"
              defaultMessage="Create Table"
            />
          </Button>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state: Object, { location }): Object => {
  const match = matchPath(get(location, 'pathname'), { path: '/:tablespaceHash?' });
  const tablespaceHash = get(match, 'params.tablespaceHash');
  const tablespace = get(state, `entities.tablespaces.${tablespaceHash}`);

  return {
    currentTablespace: tablespaceHash,
    isAuthorized: hasAccounts(state),
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
