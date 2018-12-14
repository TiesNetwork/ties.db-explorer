import classNames from 'classnames';
import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';

// Components
import Connection from '../components/Connection';

// Styles
import { Typography } from 'styles';
import styles from './Connections.scss';

const WelcomeConnections = ({ items }) => (
  <div className={styles.Root}>
    <Typography className={styles.Title} variant={Typography.VARIANT.SUBTITLE}>
      Connections
    </Typography>

    {items && items.length > 0 && (
      <div className={styles.List}>
        {items.map(connection => <Connection {...connection} key={connection.id} />)}
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
);

const mapStateToProps = ({ views }) => ({
  items: get(views, 'welcome.connections'),
});

export default connect(mapStateToProps)(WelcomeConnections);
