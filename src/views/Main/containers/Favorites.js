import React from 'react';

// Components
import Dropdown from 'components/Dropdown';
import Favorite from '../components/Favorite';

// Styles
import styles from './Favorites.scss';

const MainFavorites = () => (
  <Dropdown
    classNames={{
      button: styles.Button,
      buttonIcon: styles.ButtonIcon,
    }}
    icon="far fa-star"
    tooltip="Show Favorite Items"
  >
    <Favorite
      noWrap
      title="Messages"
      type="table"
    />

    <Favorite
      description="Current state of decentralisation of databases"
      noWrap
      title="Weekly statistics"
      type="query"
    />
  </Dropdown>
);

export default MainFavorites;
