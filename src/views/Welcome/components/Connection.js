import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

// Components
import Button from 'components/Button';
import Tooltip from 'components/Tooltip';

// Styles
import { Typography } from 'styles';
import styles from './Connection.scss';

const WelcomeConnection = ({
  isOnline,
  name,
  url,
}) => {
  const className = classNames(styles.Root, {
    [styles.RootIsOnline]: !!isOnline,
  });

  return (
    <div
      className={className}
      role="button"
      tabIndex={0}
    >
      <div className={styles.Online}>
        <i className={classNames(styles.OnlineIcon, 'far', {
          'fa-signal': !!isOnline,
          'fa-signal-slash': !isOnline,
        })} />
      </div>

      <div className={styles.Info}>
        <Typography
          className={styles.Name}
          variant={Typography.VARIANT.SUBTITLE1}
        >
          {name}
        </Typography>

        <Typography
          className={styles.Url}
          variant={Typography.VARIANT.CAPTION}
        >
          {url}
        </Typography>
      </div>

      <Tooltip title="Delete">
        <Button
          classNames={{
            root: styles.Button,
            icon: styles.ButtonIcon,
          }}
          icon="fas fa-trash-alt"
        />
      </Tooltip>
    </div>
  );
};

WelcomeConnection.propTypes = {
  isOnline: PropTypes.bool,
  name: PropTypes.string,
  url: PropTypes.string,
};

export default WelcomeConnection;
