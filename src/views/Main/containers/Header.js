import React from 'react';

// Containers
import Accounts from './Accounts';
import Favorites from './Favorites';
import Notifications from './Notifications';
import Transactions from './Transactions';

// import Title from '../components/Title';

// Styles
import styles from './Header.scss';

const MainHeader = () => (
  <header className={styles.Root}>
    <div className={styles.Actions}>
      <Transactions />
      <Notifications />
      <Favorites />
      <Accounts />
    </div>
  </header>
);

export default MainHeader;
