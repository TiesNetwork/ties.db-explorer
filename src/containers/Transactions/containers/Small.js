import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';

// Components
import Button from 'components/Button';

// Containers
import ConfirmForm from './ConfirmForm';

// Entities
import { ACTION_CREATE_TYPE } from 'entities/constants';
import { getHumanEntityName } from 'entities/selector';
import {
  TRANSACTION_CONFIRM_TYPE,
  getTransactionByHash,
  setChecked,
} from 'entities/transactions';

// Services
import { getCurrentAccount } from 'services/session';

// Utils
import { capitalize } from 'utils/string';

// Styles
import { Typography } from 'styles';
import styles from './Small.scss';

const TransactionsSmall = ({
  action = ACTION_CREATE_TYPE,
  entity,
  hash,
  payload,
  type,

  // Handlers
  handleHover,
}) => (
  <div
    className={styles.Root}
    onMouseEnter={handleHover}
  >
    <div className={styles.Header}>
      <Typography
        className={styles.Nonce}
        variant={Typography.VARIANT.CAPTION}
      >
        #{parseInt(hash, 16)}
      </Typography>
    </div>

    <div className={styles.Content}>
      <div className={styles.Left}>
        <Typography variant={Typography.VARIANT.H6}>
          {capitalize(action)}&nbsp;
          {capitalize(getHumanEntityName(entity))}:
        </Typography>

        <Typography
          className={styles.Name}
          variant={Typography.VARIANT.SUBTITLE1}
        >
          «{get(payload, 'name')}»
        </Typography>
      </div>

      <div className={styles.Right}>
        {type === TRANSACTION_CONFIRM_TYPE && (
          <Button
            classNames={{
              root: styles.Info,
              icon: styles.InfoIcon
            }}
            icon="fal fa-info-circle"
          />
        )}
      </div>
    </div>

    <div className={styles.Form}>
      <ConfirmForm />
    </div>
  </div>
);

const mapStateToProps = (state: Object, { hash }): Object => ({
  ...getTransactionByHash(state, hash),
  currentAccount: getCurrentAccount(state),
});

export default compose(
  connect(mapStateToProps, { setChecked }),
  withHandlers({
    handleHover: ({ hash, setChecked }): func => () =>
      setChecked(hash),
  }),
)(TransactionsSmall);