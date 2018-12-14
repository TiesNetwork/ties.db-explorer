import React from 'react';

// Components
import Button from 'components/Button';

// Styles
import { Typography } from 'styles';
import styles from './Account.scss';

const MainAccount = ({
  address,
  balance,
  name,
}) => (
  <Button
    classNames={{
      root: styles.Root,
      content: styles.Content,
    }}
  >
    <div className={styles.Avatar} />

    <div className={styles.Info}>
      <Typography
        className={styles.Balance}
        variant={Typography.VARIANT.OVERLINE}
      >
        {balance} TIE
      </Typography>

      <Typography
        className={styles.Name}
        noWrap
        variant={Typography.VARIANT.SUBTITLE1}
      >
        {name}
      </Typography>

      <Typography
        className={styles.Address}
        noWrap
        variant={Typography.VARIANT.CAPTION}
      >
        {address}
      </Typography>
    </div>
  </Button>
);

export default MainAccount;
