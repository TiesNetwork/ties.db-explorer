import classNames from 'classnames';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import { compose, withHandlers, withState } from 'recompose';

// Components
import Dropdown from 'components/Dropdown';
import Progress from 'components/Progress';

import Arrow from 'views/Main/components/Arrow';

// Containers
import { Confirm } from 'containers/Transactions';

// Ducks
import { transactionsIsFetching } from './ducks/selector';

// Entities
import {
  getConfirms,
  hasNewTransactions,
  needOpen,
} from 'entities/transactions/selector';

// Styles
import { Typography } from 'styles';
import styles from './Transactions.scss';

const settings = {
  dots: false,
  draggable: false,
  infinite: false,
  nextArrow: <Arrow variant={Arrow.VARIANT.NEXT} />,
  prevArrow: <Arrow variant={Arrow.VARIANT.PREV} />,
};

const MainTransactions = ({
  // Props
  items,

  // Handlers
  handleClose,
  handleOpen,

  // State
  hasNewTransactions,
  isFetching,
  isNeedOpen,
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
      isOpened={isNeedOpen || isFetching || isOpened}
      onClose={handleClose}
      onOpen={handleOpen}
      tooltip="Show Transactions"
    >
      {items && items.length > 0 ? (
        <Fragment>
          <Slider {...settings}
            arrows={!isFetching}
            className={styles.Slider}
          >
            {items.map((transactionHash) => (
              <div
                className={styles.Item}
                key={transactionHash}
              >
                <Confirm hash={transactionHash} />
              </div>
            ))}
          </Slider>

          {items.length > 1 && (
            <div className={styles.Actions}>
              <Typography
                className={styles.Discard}
                variant={Typography.VARIANT.CAPTION}
              >
                Discard All
              </Typography>

              <Typography
                className={styles.Confirm}
                variant={Typography.VARIANT.CAPTION}
              >
                Confirm All
              </Typography>
            </div>
          )}

          {isFetching && (
            <div className={styles.Fetching}>
              <Progress />
            </div>
          )}
        </Fragment>
      ) : (
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
  items: getConfirms(state),
  isFetching: transactionsIsFetching(state),
  isNeedOpen: needOpen(state),
});

export default compose(
  connect(mapStateToProps),
  withState('isOpened', 'setOpen', false),
  withHandlers({
    handleClose: ({ setOpen }) => () =>
      setOpen(false),
    handleOpen: ({ setOpen }) => () =>
      setOpen(true),
  }),
)(MainTransactions);
