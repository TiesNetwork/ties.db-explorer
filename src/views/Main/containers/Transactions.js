import classNames from 'classnames';
import React from 'react';
import { compose, withHandlers, withState } from 'recompose';

// Components
import Button from 'components/Button';
import Tooltip from 'components/Tooltip';

// Styles
import styles from './Notifications.scss';

const MainTransactions = ({
  handleBlur,
  handleClick,
  isOpened,
  registerRoot,
}) => {
  const rootClassNames = classNames(styles.Root, {
    [styles.RootIsOpened]: !!isOpened,
  });

  return (
    <div
      className={rootClassNames}
      onBlur={handleBlur}
      ref={registerRoot}
      tabIndex={0}
    >
      <Tooltip title="Show Transactions">
        <Button
          classNames={{
            root: styles.Button,
            icon: styles.ButtonIcon,
          }}
          icon="far fa-receipt"
          onClick={handleClick}
          removeAutoBlur={false}
        />
      </Tooltip>
    </div>
  );
};

export default compose(
  withState('isOpened', 'setOpen', false),
  withHandlers(() => {
    let rootRef;

    return {
      handleBlur: ({ setOpen }) => (event: Object) =>
        !rootRef.contains(event.relatedTarget) && setOpen(false),
      handleClick: ({ setOpen }) => () => setOpen(true),

      registerRoot: () => (node: HTMLElement) => {
        rootRef = node;
      },
    };
  }),
)(MainTransactions);
