import classNames from 'classnames';
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

// Components
import Dropdown from 'components/Dropdown';

// Containers
import { Small } from 'containers/Transactions';

// Entities
import {
  getLastTransactions,
  hasNewTransactions,
  needOpen,
} from 'entities/transactions';

// Styles
import { Typography } from 'styles';
import styles from './Transactions.scss';

const MainTransactions = ({
  // Props
  items,

  // Handlers
  handleClose,
  handleOpen,

  // State
  hasNewTransactions,
  isOpened,
}) => {
  const iconClassNames = classNames(styles.Icon, 'fal', 'fa-receipt');

  return (
    <Dropdown
      classNames={{
        button: styles.Button,
        buttonIcon: styles.ButtonIcon,
      }}
      dot={!!hasNewTransactions}
      icon="far fa-receipt"
      isOpened={isOpened}
      tooltip="Show Transactions"
    >
      {items.map((transactionHash) => (
        <Small
          hash={transactionHash}
          key={transactionHash}
        />
      ))}

      {(!items || items.length === 0) && (
        <div className={styles.Empty}>
          <i className={iconClassNames} />

          <Typography variant={Typography.VARIANT.BODY2}>
            You have not transactions
          </Typography>
        </div>
      )}
    </Dropdown>
  );
};

const mapStateToProps = (state: Object): Object => ({
  hasNewTransactions: hasNewTransactions(state),
  items: getLastTransactions(state),
  isOpened: needOpen(state),
});

export default compose(
  connect(mapStateToProps),
)(MainTransactions);
