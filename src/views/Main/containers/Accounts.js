import React from 'react';

// Components
import Button from 'components/Button';
import Dropdown from 'components/Dropdown';
import Account from '../components/Account';

// Styles
import { Typography } from 'styles';
import styles from './Accounts.scss';

const MainFavoritesTrigger = (props: Object) => (
  <Button {...props}
    className={styles.Trigger}
    removeAutoBlur={false}
  >
    <div className={styles.Info}>
      <Typography className={styles.Name}>
        Account 1
      </Typography>

      <div className={styles.Avatar} />
    </div>
  </Button>
);

const MainFavorites = () => (
  <Dropdown
    align="left"
    classNames={{
      root: styles.Root,
      dropdown: styles.Dropdown,
    }}
    trigger={<MainFavoritesTrigger />}
  >
    <Account
      address="0x67628b0a6c9eb165f0a4200ed8f01e5"
      balance="0.23321"
      name="Account 1"
    />

    <Account
      address="0x67628b0a6c9eb165f0a4200ed8f01e5"
      balance="43.123213"
      name="Account 2"
    />
  </Dropdown>
);

export default MainFavorites;
