import classNames from 'classnames';
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { reduxForm } from 'redux-form';

// Components
import Button from 'components/Button';
import Form from 'components/Form';

import Account from '../components/Account';

// Services
import { getCurrentAccount } from 'services/session';

// Styles
import { COLOR, Typography } from 'styles';
import styles from './ConfirmForm.scss';

const TransactionsConfirmForm = ({
  // Handlers
  handleDiscard,
  handleSubmit,
}) => {
  const infoIconClassNames = classNames(styles.Icon, styles.InfoIcon, 'fas', 'fa-info');
  const privateIconClassNames = classNames(styles.Icon, styles.PrivateIcon, 'far', 'fa-lock-alt');

  return (
    <Form onSubmit={handleSubmit}>
      <Account name="address" />

      <div className={styles.Private}>
        <i className={privateIconClassNames} />

        <Typography variant={Typography.VARIANT.CAPTION}>
          The private key is stored during the session.
        </Typography>
      </div>

      <div className={styles.Info}>
        <i className={infoIconClassNames} />

        <Typography variant={Typography.VARIANT.CAPTION}>
          Transaction cost is test.
        </Typography>
      </div>

      <div className={styles.Amount}>
        <Typography
          className={styles.AmountText}
          variant={Typography.VARIANT.SUBTITLE1}
        >
          Total amount:
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
          Discard
        </Button>

        <Button
          color={COLOR.PRIMARY}
          onClick={handleDiscard}
        >
          Confirm
        </Button>
      </div>
    </Form>
  );
};

const mapStateToProps = (state: Object): Object => ({
  initialValues: {
    address: getCurrentAccount(state).hash,
  },
});

export default compose(
  connect(mapStateToProps),
  reduxForm({
    form: 'confirmForm',
  })
)(TransactionsConfirmForm);
