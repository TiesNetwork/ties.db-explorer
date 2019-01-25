import classNames from 'classnames';
import React from 'react';
import { connect } from 'react-redux';

// Components
import Button from 'components/Button';
import Account from 'views/Main/components/Account';

// Services
import { getCurrentAccount } from 'services/session';

// Styles
import { COLOR, Typography } from 'styles';
import styles from './Confirm.scss';

const TransactionsConfirm = ({
  currentAccount,
}) => {
  const iconClassNames = classNames(styles.Icon, 'far', 'fa-lock-alt');

  return (
    <div className={styles.Root}>
      <div className={styles.Header}>
        <div className={styles.Left}>
          <Typography
            variant={Typography.VARIANT.H6}
          >
            Create Tablespace:
          </Typography>

          <Typography
            className={styles.Name}
            variant={Typography.VARIANT.SUBTITLE1}
          >
            «Test transactions»
          </Typography>
        </div>

        <div className={styles.Right}>
          <Button
            className={styles.Info}
            icon="fal fa-info-circle"
          />
        </div>
      </div>

      {currentAccount && (
        <div className={styles.Account}>
          <Account hash={currentAccount.hash} isPreview />
        </div>
      )}

      <div className={styles.Private}>
        <i className={iconClassNames} />

        <Typography
          variant={Typography.VARIANT.CAPTION}
        >
          The private key is stored during the session.
        </Typography>
      </div>

      <div className={styles.Amount}>
        <Typography
          className={styles.AmountLabel}
          variant={Typography.VARIANT.SUBTITLE1}
        >
          Total amount:
        </Typography>

        <Typography
          variant={Typography.VARIANT.H6}
        >
          0.1 TIE
        </Typography>
      </div>

      <div className={styles.Actions}>
        <Button color={COLOR.DANGER}>
          Discard
        </Button>

        <Button color={COLOR.PRIMARY}>
          Confirm
        </Button>
      </div>
    </div>
  );
};

const mapStateToProps = (state: Object): Object => ({
  currentAccount: getCurrentAccount(state),
});

export default connect(mapStateToProps)(TransactionsConfirm);
