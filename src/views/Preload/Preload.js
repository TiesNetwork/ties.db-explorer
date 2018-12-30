import { get, isEmpty } from 'lodash';
import React from 'react';
import ReactInterval from 'react-interval';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import { compose, lifecycle, withHandlers, withState } from 'recompose';

// Components
import Link from './components/Link';

// Ducks
import { fetchEntities } from 'entities/actions';

// Styles
import { Typography } from 'styles';
import styles from './Preload.scss';

const Preload = ({
  count,
  handleTick,
}) => (
  <div className={styles.Root}>
    <div className={styles.Header}>
      <div className={styles.Company}>
        <div className={styles.Logo} />

        <Typography className={styles.Title} variant={Typography.VARIANT.H5}>
          Ties.DB
          <span className={styles.SubTitle}>Schema Designer</span>
        </Typography>
      </div>
    </div>

    <div className={styles.Container}>
      <div className={styles.Progress}>
        <Typography
          className={styles.ProgressTitle}
          variant={Typography.VARIANT.H3}
        >
          Fetching schema{'...'.substr(0, count)}
          <ReactInterval
            callback={handleTick}
            count={count}
            enabled
            timeout={1000}
          />
        </Typography>

        <div className={styles.ProgressBar} />

        <Typography
          className={styles.ProgressDescription}
          variant={Typography.VARIANT.CAPTION}
        >
          from the blockchain can take from 1 to 10 minutes
        </Typography>
      </div>

      <div className={styles.About}>
        <Typography
          className={styles.AboutTitle}
          variant={Typography.VARIANT.SUBTITLE1}
        >
          So you can read about us for now:
        </Typography>

        <div className={styles.List}>
          <Link
            description="Blog with latest news and updates"
            title="Follow on Medium"
            to="https://blog.ties.network/"
            variant={Link.VARIANT.MEDIUM}
          />

          <Link
            description="Latest updates"
            title="Follow on Twitter"
            to="https://medium.com/@Ties.DB"
            variant={Link.VARIANT.TWITTER}
          />

          <Link
            description="Live chat with all participants"
            icon="fab fa-telegram"
            title="Chatting on Telegram"
            to="https://t.me/tiesdb"
            variant={Link.VARIANT.TELEGRAM}
          />
        </div>
      </div>
    </div>
  </div>
);

const mapStateToProps = ({ entities }) => ({
  hasEntities: !isEmpty(get(entities, 'tablespaces', [])),
});

export default compose(
  connect(mapStateToProps, { fetchEntities, replace }),
  withState('count', 'setCount', 0),
  withHandlers({
    handleTick: ({ count, setCount }) => () =>
      setCount(count >= 3 ? 0 : count + 1),
  }),
  lifecycle({
    componentDidMount() {
      const { fetchEntities, hasEntities, replace } = this.props;

      // hasEntities
      //   // ? replace('/')
      //   : fetchEntities();
    },
  }),
)(Preload);
