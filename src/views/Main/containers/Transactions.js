import React from 'react';
import { compose, withHandlers, withState } from 'recompose';

// Components
import Dropdown from 'components/Dropdown';

// Containers
import { Confirm } from 'containers/Transactions';

// Styles
import styles from './Transactions.scss';

const MainTransactions = ({
  // Handlers
  handleClose,
  handleOpen,

  // State
  isOpened,
}) => (
  <Dropdown
    classNames={{
      button: styles.Button,
      buttonIcon: styles.ButtonIcon,
    }}
    icon="far fa-receipt"
    isOpened={isOpened}
    onClose={handleClose}
    onOpen={handleOpen}
    tooltip="Show Transactions"
  >
    <Confirm />
  </Dropdown>
);

export default compose(
  withState('isOpened', 'setOpen', true),
  withHandlers({
    handleClose: ({ setOpen }) => () =>
      setOpen(false),
    handleOpen: ({ setOpen }) => () =>
      setOpen(true),
  }),
)(MainTransactions);
