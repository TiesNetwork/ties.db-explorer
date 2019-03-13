import classNames from 'classnames';
import React from 'react';
import ReactInterval from 'react-interval';
import { compose, lifecycle, withHandlers, withState } from 'recompose';

// Components
import Button from 'components/Button';
import Tooltip from 'components/Tooltip';

// Styles
import { Typography } from 'styles';
import styles from './Connect.scss';

const ConnectionsConnect = ({
  count,
  name,
  url,
  // Handlers
  handleTick,
  // State
  isOnline,
  isTesting,
}): Function => {
  const rootClassNames = classNames(styles.Root, {
    [styles.RootIsOnline]: !!isOnline,
    [styles.RootIsTesting]: !!isTesting,
  });

  const iconClassNames = classNames(styles.Icon, 'fas', {
    'fa-signal': !isTesting && !!isOnline,
    'fa-signal-slash': !isTesting && !isOnline,
    [`fa-signal-${count}`]: !!isTesting,
  });

  return (
    <div className={rootClassNames}>
      <div className={styles.Online}>
        <i className={iconClassNames} />

        <ReactInterval
          callback={handleTick}
          enabled={isTesting}
          timeout={500}
        />
      </div>

      <div className={styles.Info}>
        <Typography
          className={styles.Name}
          noWrap
          variant={Typography.VARIANT.SUBTITLE1}
        >
          {name}
        </Typography>

        <Typography
          className={styles.Url}
          noWrap
          variant={Typography.VARIANT.CAPTION}
        >
          {url}
        </Typography>
      </div>

      <div className={styles.Delete}>
        <Tooltip title="Delete">
          <Button
            classNames={{
              root: styles.Button,
              icon: styles.ButtonIcon,
            }}
            icon="fas fa-trash-alt"
            removeAutoBlur
          />
        </Tooltip>
      </div>
    </div>
  );
}

export default compose(
  withState('count', 'setCount', 1),
  withState('isOnline', 'setOnline', false),
  withState('isTesting', 'setTest', true),
  withHandlers({
    handleTick: ({ count, setCount }): Function =>
      (): void =>
        setCount(count + 1 > 4 ? 1 : count + 1),
  }),
  lifecycle({
    componentDidMount() {
      const {
        setOnline,
        setTest,
        url,
      } = this.props;

      setTest(true);

      fetch(url, { mode: 'no-cors' })
        .then((data: Object) => {
          setOnline(true);
          setTest(false);
        })
        .catch(error => {
          setOnline(false);
          setTest(false);
        });
    },
  }),
)(ConnectionsConnect);
