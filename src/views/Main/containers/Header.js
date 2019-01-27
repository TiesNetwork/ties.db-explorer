import React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';

// Components
import Button from 'components/Button';

// Containers
import Accounts from './Accounts';
import Favorites from './Favorites';
import Notifications from './Notifications';
import Transactions from './Transactions';

import Progress from 'containers/Progress';

// Ducks
import { openModal } from 'services/modals';
import { SEARCH_MODAL_ID } from 'containers/Search/ducks/constants';

// Entities
import { hasAccounts } from 'entities/accounts';

// import Title from '../components/Title';

// Styles
import styles from './Header.scss';

const MainHeader = ({
  // Handlers
  handleClick,

  // State
  isAuthorized,
}) => (
  <header className={styles.Root}>
    <div className={styles.Search}>
      <Button
        className={styles.SearchTrigger}
        icon="far fa-search"
        onClick={handleClick}
      >
        Search
      </Button>
    </div>

    <div className={styles.Progress}>
      <Progress />
    </div>

    <div className={styles.Actions}>
      {isAuthorized && <Transactions />}

      <Notifications />
      <Favorites />
      <Accounts />
    </div>
  </header>
);

const mapStateToProps = (state: Object) => ({
  isAuthorized: hasAccounts(state),
});

export default compose(
  connect(mapStateToProps, { openModal }),
  withHandlers({
    handleClick: ({ openModal }) => () =>
      openModal(SEARCH_MODAL_ID),
  }),
)(MainHeader);
