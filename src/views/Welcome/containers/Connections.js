import classNames from 'classnames';
import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

// Actions
import { fetchConnections } from 'entities/connections';

// Components
import Connection from '../components/Connection';

// Styles
import { Typography } from 'styles';
import styles from './Connections.scss';

const WelcomeConnections = ({
  connections,
  isLoading,
}) => {
  const rootClassNames = classNames(styles.Root, {
    [styles.RootIsLoading]: !!isLoading,
  });

  return (
    <div className={rootClassNames}>
      <div className={styles.Loading}>
        <div className={styles.Spinner} />
      </div>

      <div className={styles.Container}>
        <Typography className={styles.Title} variant={Typography.VARIANT.SUBTITLE}>
          Connections
        </Typography>

        {connections && connections.length > 0 && (
          <div className={styles.List}>
            {connections.map(id => <Connection key={id} id={id} />)}
          </div>
        )}

        <div className={styles.Actions}>
          <button className={styles.Button} type="button">
            <i className={classNames(styles.ButtonIcon, 'far', 'fa-plus')} />
            <Typography className={styles.ButtonText} variant={Typography.VARIANT.BUTTON}>
              Create new connection
            </Typography>
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ views }) => get(views, 'welcome');

export default compose(
  connect(mapStateToProps, { fetchConnections }),
  lifecycle({
    componentDidMount() {
      this.props.fetchConnections();
    },
  }),
)(WelcomeConnections);
