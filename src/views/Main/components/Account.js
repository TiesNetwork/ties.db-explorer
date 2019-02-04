import classNames from 'classnames';
import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';

// Components
import Avatar from 'components/Avatar';
import Button from 'components/Button';

// Containers
import { EDIT_MODAL_ID } from 'containers/Edit';

// Entities
import { ACCOUNTS_ENTITY_ID } from 'entities/accounts';

// Services
import { openModal } from 'services/modals';
import { setCurrentAccount } from 'services/session';

// Styles
import { Typography } from 'styles';
import styles from './Account.scss';

const MainAccount = ({
  address,
  balance,
  hash,
  isDensed,
  isPreview,
  name,

  // Handlers
  handleClick,
  handleEdit,
}) => {
  const rootClassNames = classNames(styles.Root, {
    [styles.RootIsDensed]: !!isDensed,
    [styles.RootIsEmpty]: !hash,
    [styles.RootIsPreview]: !!isPreview,
  });

  return (
    <div className={rootClassNames}>
      <Button
        classNames={{
          root: styles.Button,
          content: styles.ButtonContent,
        }}
        onClick={handleClick}
        removeAutoBlur={!isDensed}
      >
        {hash && (
          <Avatar
            className={styles.Avatar}
            hash={hash}
            title={name}
          />
        )}

        <div className={styles.Info}>
          {!isDensed && (
            <Typography
              className={styles.Balance}
              noWrap
              variant={Typography.VARIANT.OVERLINE}
            >
              {(hash || '').substr(0, 16)}
            </Typography>
          )}

          <Typography
            className={styles.Name}
            noWrap
            variant={Typography.VARIANT.SUBTITLE1}
          >
            {name || 'No Account'}
          </Typography>
        </div>
      </Button>

      {!isDensed && !isPreview && (
        <div className={styles.Actions}>
          <Button
            className={styles.Edit}
            icon="fal fa-cog"
            onClick={handleEdit}
          />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = ({ entities }, { hash }) =>
  get(entities, `accounts.${hash}`, {});

export default compose(
  connect(mapStateToProps, { openModal, setCurrentAccount }),
  withHandlers({
    handleClick: ({
      hash,
      isDensed,
      onClick,
      setCurrentAccount,
    }): func => (): void =>
      isDensed
        ? onClick && onClick()
        : setCurrentAccount(hash),

    handleEdit: ({
      hash,
      isDensed,
      openModal,
    }): func => (): void =>
      openModal(EDIT_MODAL_ID, { type: ACCOUNTS_ENTITY_ID, hash }),
  }),
)(MainAccount);
