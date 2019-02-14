import classNames from 'classnames';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { compose } from 'recompose';
import { reduxForm } from 'redux-form';

// Components
import Button from 'components/Button';
import Form from 'components/Form';

import Account from '../components/Account';

// Entities
import { confirmTransaction } from 'entities/transactions/actions';

// Styles
import { COLOR, Typography } from 'styles';
import styles from './ConfirmForm.scss';

const TransactionsConfirmForm = ({
  // Handlers
  handleDiscard,
  handleSubmit,
  ...props,
}) => {
  const infoIconClassNames = classNames(styles.Icon, styles.InfoIcon, 'fas', 'fa-info');
  const privateIconClassNames = classNames(styles.Icon, styles.PrivateIcon, 'far', 'fa-lock-alt');

  return (
    <Form onSubmit={handleSubmit}>
      <Account name="address" />

      <div className={styles.Private}>
        <i className={privateIconClassNames} />

        <Typography variant={Typography.VARIANT.CAPTION}>
          <FormattedMessage
            id="confirm_private"
            defaultMessage="The private key is stored during the session."
          />
        </Typography>
      </div>

      <div className={styles.Info}>
        <i className={infoIconClassNames} />

        <Typography variant={Typography.VARIANT.CAPTION}>
          <FormattedMessage
            id="confirm_cost_text"
            defaultMessage="Transaction cost is test."
          />
        </Typography>
      </div>

      <div className={styles.Amount}>
        <Typography
          className={styles.AmountText}
          variant={Typography.VARIANT.SUBTITLE1}
        >
          <FormattedMessage
            id="confirm_total"
            defaultMessage="Total amount:"
          />
        </Typography>

        <Typography variant={Typography.VARIANT.H6}>
          0.001 TIE
        </Typography>
      </div>

      <div className={styles.Actions}>
        <Button
          color={COLOR.DANGER}
          onClick={handleDiscard}
        >
          <FormattedMessage
            id="discard"
            defaultMessage="Discard"
          />
        </Button>

        <Button
          color={COLOR.PRIMARY}
          type="submit"
        >
          <FormattedMessage
            id="confirm"
            defaultMessage="Confirm"
          />
        </Button>
      </div>
    </Form>
  );
};

export default compose(
  reduxForm({
    onSubmit: ({ hash }, dispatch) =>
      dispatch(confirmTransaction(hash)),
  }),
)(TransactionsConfirmForm);
