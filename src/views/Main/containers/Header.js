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

// Ducks
import { openModal } from 'services/modals';
import { SEARCH_MODAL_ID } from 'containers/Search/ducks/constants';

// import Title from '../components/Title';

// Styles
import styles from './Header.scss';

const MainHeader = ({
  handleClick,
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

    <div className={styles.Actions}>
      <Transactions />
      <Notifications />
      <Favorites />
      <Accounts />
    </div>
  </header>
);

export default compose(
  connect(null, { openModal }),
  withHandlers({
    handleClick: ({ openModal }) => () =>
      openModal(SEARCH_MODAL_ID),
  }),
)(MainHeader);
