import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';

// Components
import Button from 'components/Button';

// Containers
import ConfirmForm from './ConfirmForm';

// Ducks
import { CONFIRM_FORM_ID } from '../ducks/constants';

// Entities
import { ACTION_CREATE_TYPE } from 'entities/constants';
import { getHumanEntityName } from 'entities/selector';
import {
  TRANSACTION_CONFIRM_TYPE,
  getTransactionByHash,
  setChecked,
} from 'entities/transactions';

// Services
import { getCurrentAccountHash } from 'services/session';

// Utils
import { capitalize } from 'utils/string';

// Styles
import { Typography } from 'styles';
import styles from './Confirm.scss';

const TransactionsConfirm = ({
  action = ACTION_CREATE_TYPE,
  entity,
  initialValues,
  hash,
  payload,
  transaction,
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
        #{get(transaction, 'nonce')}
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
      <ConfirmForm
        form={`${CONFIRM_FORM_ID}_${hash}`}
        initialValues={initialValues}
      />
    </div>
  </div>
);

const mapStateToProps = (state: Object, { hash }): Object => {
  const address = getCurrentAccountHash(state);

  return {
    ...getTransactionByHash(state, hash),
    initialValues: { address, hash },
  };
};

export default compose(
  connect(mapStateToProps, { setChecked }),
  withHandlers({
    handleHover: ({ hash, isChecked, setChecked }): func => () =>
      !isChecked && setChecked(hash),
  }),
)(TransactionsConfirm);
