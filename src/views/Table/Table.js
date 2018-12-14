import React from 'react';

// Components
import Button from 'components/Button';

// Containers
import Fields from './containers/Fields';
import Indexes from './containers/Indexes';
import Triggers from './containers/Triggers';

// Styles
import { Typography } from 'styles';
import styles from './Table.scss';

const Table = ({

}) => (
  <div className={styles.Root}>
    <div className={styles.Header}>
      <Typography
        className={styles.Title}
        variant={Typography.VARIANT.H4}
      >
        Messages
      </Typography>

      <div className={styles.Actions}>
        <Button
          classNames={{
            root: styles.Favorite,
            icon: styles.FavoriteIcon,
          }}
          icon="far fa-star"
        >
          Favorite
        </Button>

        <Button className={styles.Edit}>
          Edit Table
        </Button>
      </div>
    </div>

    <div className={styles.Container}>
      <div className={styles.Fields}>
        <Fields />
      </div>

      <div className={styles.Footer}>
        <div className={styles.Indexes}>
          <Indexes />
        </div>

        <div className={styles.Triggers}>
          <Triggers />
        </div>
      </div>
    </div>

  </div>
);

export default Table;
