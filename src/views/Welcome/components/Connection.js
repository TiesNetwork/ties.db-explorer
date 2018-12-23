import classNames from 'classnames';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import ReactInterval from 'react-interval';
import { connect } from 'react-redux';
import { compose, lifecycle, withHandlers, withState } from 'recompose';

// Components
import Button from 'components/Button';
import Tooltip from 'components/Tooltip';

// Styles
import { Typography } from 'styles';
import styles from './Connection.scss';

const WelcomeConnection = ({
  count,
  handleTick,
  isOnline,
  isTesting,
  name,
  url,
}) => {
  const className = classNames(styles.Root, {
    [styles.RootIsOnline]: !!isOnline,
    [styles.RootIsTesting]: !!isTesting,
  });

  return (
    <div
      className={className}
      rel="button"
      tabIndex={0}
    >
      <div className={styles.Online}>
        <i className={classNames(styles.OnlineIcon, 'fas', {
          'fa-signal': !isTesting && !!isOnline,
          'fa-signal-slash': !isTesting && !isOnline,
          [`fa-signal-${count}`]: !!isTesting,
        })} />

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
};

WelcomeConnection.propTypes = {
  isOnline: PropTypes.bool,
  name: PropTypes.string,
  url: PropTypes.string,
};

const mapStateToProps = ({ entities }, { id }) =>
  get(entities, `connections.${id}`, {});

export default compose(
  connect(mapStateToProps),
  withState('count', 'setCount', 1),
  withState('isOnline', 'setOnline', false),
  withState('isTesting', 'setTest', true),
  withHandlers({
    handleTick: ({ count, setCount }) => () => setCount(count + 1 > 4 ? 1 : count + 1),
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
        .then(data => {
          setOnline(true);
          setTest(false);
        })
        .catch(error => setOnline(false));
    },
  }),
)(WelcomeConnection);
