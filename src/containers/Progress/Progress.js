import classNames from 'classnames';
import { get } from 'lodash';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose, lifecycle, withState } from 'recompose';

// Components
import Progress from 'components/Progress';

// Services
import {
  deleteProgress,
  updateProgress,

  getFisrtProgress,
} from 'services/progress';

// Styles
import { Typography } from 'styles';
import styles from './Progress.scss';

const TYPE = {
  DEFAULT: 'default',
  ERROR: 'error',
  PROGRESS: 'progress',
  SUCCESS: 'success',
};

const ContainersProgress = ({
  count = 0,
  current = 0,
  subTitle,
  title,
  type = TYPE.DEFAULT,
  value,
}) => {
  const rootClassNames = classNames(styles.Root, {
    [styles.RootVariantDefault]: type === TYPE.DEFAULT,
    [styles.RootVariantError]: type === TYPE.ERROR,
    [styles.RootVariantProgress]: type === TYPE.PROGRESS,
    [styles.RootVariantSuccess]: type === TYPE.SUCCESS,
  });

  const iconClassNames = classNames(styles.Icon, 'far', 'fa-list');

  return (
    <div className={rootClassNames}>
      <div className={styles.Container}>
        <i className={iconClassNames} />

        <div className={styles.Content}>
          <Typography
            className={styles.Title}
            variant={Typography.VARIANT.SUBTITLE1}
          >
            {type === TYPE.DEFAULT ? (
              <FormattedMessage
                id="progress_default"
                defaultMessage="All clear 😎"
              />
            ) : title}
          </Typography>

          {!!subTitle && (
            <Typography
              className={styles.SubTitle}
              noWrap
              variant={Typography.VARIANT.CAPTION}
            >
              {subTitle}
            </Typography>
          )}
        </div>

        <Typography
          className={styles.Info}
          variant={Typography.VARIANT.CAPTION}
        >
          {
            type === TYPE.PROGRESS &&
            !!current && !!count &&
            `${Math.min(current, count)}/${count}`
          }
        </Typography>
      </div>

      <div className={styles.Progress}>
        {type === TYPE.PROGRESS && (
          <Progress
            classNames={{
              line: styles.ProgressLine,
              progress: styles.ProgressBar
            }}
            value={value}
            variant={Progress.VARIANT.LINEAR}
          />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: Object): Object =>
  getFisrtProgress(state);

export default compose(
  connect(mapStateToProps, {
    deleteProgress,
    updateProgress,
  }),
  withState('isConnected', 'setConnected', false),
  withState('socket', 'setSocket', false),
  lifecycle({
    componentDidMount() {
      const {
        deleteProgress,
        setConnected,
        setSocket,
        updateProgress,
      } = this.props;

      const socket = new WebSocket('ws://localhost:3001/progress/socket');

      socket.onmessage = (event: Object): void => {
        const { id, type, ...payload } = JSON.parse(get(event, 'data'), {});

        switch (type) {
          case TYPE.ERROR:
          case TYPE.SUCCESS:
            setTimeout(() => deleteProgress(id, { ...payload, type }), 1500);
          // eslint-disable-next-line
          default:
            updateProgress(id, { ...payload, type });
            break;
        }
      };

      socket.onopen = (): void => {
        setConnected(true);
        setSocket(socket);
      };
    },
    componentWillUnmount() {
      const { isConnected, socket } = this.props;
      isConnected && socket && socket.close();
    },
  }),
)(ContainersProgress);
