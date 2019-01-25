import { get, keys } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';

// Components
import Button from 'components/Button';
import Dropdown from 'components/Dropdown';
import Account from '../components/Account';

// Containers
import { IMPORT_MODAL_ID } from 'containers/Import';

// Services
import { openModal } from 'services/modals';
import { getCurrentAccount } from 'services/session';

// Styles
import { Typography } from 'styles';
import styles from './Accounts.scss';

const MainAccountsTrigger = ({
  hash,
  ...props,
}) => (
  <Account {...props} hash={hash} />
);

const MainAccounts = ({
  currentAccount,
  items,

  // Handlers
  handleCreate,
}) => (
  <Dropdown
    align="left"
    classNames={{
      root: styles.Root,
      dropdown: styles.Dropdown,
    }}
    trigger={<MainAccountsTrigger {...currentAccount} isDensed />}
  >
    {items.map((accountHash: string) => (
      <Account hash={accountHash} key={accountHash} />
    ))}

    <Button
      className={styles.Import}
      icon="far fa-plus"
      onClick={handleCreate}
    >
      Import new account
    </Button>
  </Dropdown>
);

const mapStateToProps = (state: Object): Object => ({
  currentAccount: getCurrentAccount(state),
  items: keys(get(state, 'entities.accounts', [])),
});

export default compose(
  connect(mapStateToProps, { openModal }),
  withHandlers({
    handleCreate: ({ openModal }): func => (): Object =>
      openModal(IMPORT_MODAL_ID),
  }),
)(MainAccounts);
