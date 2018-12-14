import React from 'react';

// Containers
import Accounts from './Accounts';
import Favorites from './Favorites';
import Notifications from './Notifications';
import Transactions from './Transactions';

// import Title from '../components/Title';

// Utils
import { capitalize } from 'utils/string';

// Styles
import styles from './Header.scss';

const MENU = [
  { id: 'transactions', icon: 'far fa-receipt', title: 'Show Transactions' },
  { id: 'settings', icon: 'far fa-cog', title: 'Show Settings' },
];

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
