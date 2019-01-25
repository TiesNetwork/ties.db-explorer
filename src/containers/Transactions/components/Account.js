import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

// Components
import Avatar from 'components/Avatar';
import { Field } from 'components/Form';

// Services
import { getAccountByHash } from 'entities/accounts';

// Styles
import { Typography } from 'styles';
import styles from './Account.scss';

const TransactionsAccount = ({
  name,
  value,
  ...props,
}) => (
  <div className={styles.Root}>
    <Avatar
      className={styles.Avatar}
      hash={value}
      title={name}
    />

    <div className={styles.Info}>
      <Typography
        className={styles.Hash}
        noWrap
        variant={Typography.VARIANT.OVERLINE}
      >
        {(value || '').substr(0, 16)}
      </Typography>

      <Typography
        noWrap
        variant={Typography.VARIANT.SUBTITLE1}
      >
        {name || 'No Account'}
      </Typography>
    </div>
  </div>
);

TransactionsAccount.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
};

const mapStateToProps = (state: Object, { value }): Object =>
  getAccountByHash(state, value);

const ComposedTransactionsAccount = compose(
  connect(mapStateToProps),
)(TransactionsAccount)

export default (props: Object) => (
  <Field {...props} withoutLabel>
    <ComposedTransactionsAccount />
  </Field>
);
