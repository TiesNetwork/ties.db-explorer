import { get, isEmpty, values } from 'lodash';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

// Components
import Progress from 'components/Progress';

// Styles
import styles from './Init.scss';

const Init = ({
  hasEntities,
  tablespace,
}) => (
  <div className={styles.Root}>
    <Fragment>
      {hasEntities && tablespace && <Redirect to={`/${get(tablespace, 'hash')}`} />}
      {!hasEntities && <Redirect to="/preload" />}
    </Fragment>

    <Progress />
  </div>
);

const mapStateToProps = ({ entities }): Object => ({
  hasEntities: !isEmpty(get(entities, 'tablespaces', [])),
  tablespace: values(get(entities, 'tablespaces', {}))[0],
});

export default connect(mapStateToProps)(Init);
