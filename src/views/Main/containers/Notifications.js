import React from 'react';

// Components
import Dropdown from 'components/Dropdown';
import Notification from '../components/Notification';

// Styles
import styles from './Notifications.scss';

const MainFavorites = () => (
  <Dropdown
    classNames={{
      button: styles.Button,
      buttonIcon: styles.ButtonIcon,
    }}
    icon="far fa-bell"
    tooltip="Show Notifications"
  >
    <Notification
      description="The application cannot connect to the database using WebSocket."
      title="Database connection problem!"
      variant={Notification.VARIANT.ALERT}
    />

    <Notification
      description="Current state of decentralisation of databases"
      title="Something new"
      variant={Notification.VARIANT.NEWS}
    />

    <Notification
      description="We updated Schema Designer to version 1.0!"
      title="New update is here!"
      variant={Notification.VARIANT.UPDATE}
    />
  </Dropdown>
);

export default MainFavorites;
