import classNames from 'classnames';
import { get, keys } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { matchPath, withRouter } from 'react-router-dom';
import { compose, withHandlers } from 'recompose';

// Components
import Button from 'components/Button';
import Tablespace from '../components/Tablespace';

// Ducks
import { EDIT_MODAL_ID } from 'containers/Edit';

// Entities
import { hasAccounts } from 'entities/accounts';
import { TABLESPACES_ENTITY_ID } from 'entities/tablespaces';

// Services
import { openModal } from 'services/modals';

// Styles
import { GRADIENT } from 'styles';
import styles from './Tablespaces.scss';

const DashboardTablespaces = ({
  currentTablespace,
  handleClick,
  handleCreate,
  tablespaces,
  onTrigger,

  // State
  isAuthorized,
  isOpened,
}) => {
  const rootClassNames = classNames(styles.Root, {
    [styles.RootIsOpened]: !!isOpened,
  });

  return (
    <div className={rootClassNames}>
      <Tablespace
        address="TABLESPACE"
        hash={currentTablespace}
        isOpened={isOpened}
        isTrigger
        onClick={onTrigger}
      />

      <div className={styles.Container}>
        <div className={styles.List}>
          {tablespaces.map(tablespaceHash => (
            <Tablespace
              hash={tablespaceHash}
              key={tablespaceHash}
              onClick={handleClick}
            />
          ))}
        </div>

        {isAuthorized && (
          <div className={styles.Actions}>
            <Button
              color={GRADIENT.GREEN}
              fullWidth
              onClick={handleCreate}
            >
              <FormattedMessage
                id="create_tablespace"
                defaultMessage="Create Tablespace"
              />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

DashboardTablespaces.propTypes = {
  isOpened: PropTypes.bool,
  onTrigger: PropTypes.func,
};

const mapStateToProps = (state: Object, { location }) => {
  const match = matchPath(get(location, 'pathname'), { path: '/:tablespaceHash?' });
  const tablespaceHash = get(match, 'params.tablespaceHash');

  return {
    currentTablespace: tablespaceHash,
    isAuthorized: hasAccounts(state),
    tablespaces: keys(get(state, 'entities.tablespaces', [])),
  };
};

export default withRouter(compose(
  connect(mapStateToProps, { openModal }),
  withHandlers({
    handleClick: ({ history, onTrigger, push }): func => (hash: string): void => {
      onTrigger();
      history.push(`/${hash}`);
    },
    handleCreate: ({ openModal }): func => (): void =>
      openModal(EDIT_MODAL_ID, { type: TABLESPACES_ENTITY_ID }),
  }),
)(DashboardTablespaces));
