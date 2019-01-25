import classNames from 'classnames';
import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';

// Components
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

const COLOR = [
  { className: styles.RootColorBlue, value: [0, 1] },
  { className: styles.RootColorBluePurple, value: [2, 3] },
  { className: styles.RootColorGreen, value: [4, 5] },
  { className: styles.RootColorPurple, value: [6, 7] },
  { className: styles.RootColorRed, value: [8, 9] },
];

const MainAccount = ({
  address,
  balance,
  color = COLOR[0],
  hash,
  isDensed,
  isPreview,
  name,

  // Handlers
  handleClick,
  handleEdit,
}) => {
  const rootClassNames = classNames(styles.Root, color.className, {
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
        {hash && <div className={styles.Avatar} />}

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

const mapStateToProps = ({ entities }, { hash }) => {
  const account = get(entities, `accounts.${hash}`);

  const hashInt = parseInt(hash, 16);
  const colorNumber = parseInt(hashInt.toString().substr(0, 1), 10);

  return {
    ...account,
    color: COLOR.filter(({ value }) => value.indexOf(colorNumber) > -1)[0],
  };
};

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
