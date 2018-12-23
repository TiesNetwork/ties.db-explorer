import classNames from 'classnames';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link, matchPath, withRouter } from 'react-router-dom';

// Components
import Tooltip from 'components/Tooltip';

// Styles
import { Typography } from 'styles';
import styles from './Table.scss';

const DashboardTable = ({
  hash,
  isCurrent,
  isDistributed,
  name,
  tablespaceHash,
}) => {
  const className = classNames(styles.Root, {
    [styles.RootIsCurrent]: !!isCurrent,
    [styles.RootIsDistributed]: !!isDistributed,
  });

  return (
    <Link
      className={className}
      to={`/${tablespaceHash}/table/${hash}`}
    >
      <div className={styles.Info}>
        <Typography
          noWrap
          variant={Typography.VARIANT.SUBTITLE1}
        >
          {name}
        </Typography>

        <Typography
          className={styles.Hash}
          noWrap
          variant={Typography.VARIANT.CAPTION}
        >
          {hash}
        </Typography>
      </div>

      {isDistributed && (
        <Tooltip
          className={styles.Distributed}
          title="Distributed"
        >
          <i className={classNames(styles.DistributedIcon, 'fas', 'fa-globe-americas')} />
        </Tooltip>
      )}
    </Link>
  );
};

DashboardTable.propTypes = {
  hash: PropTypes.string,
  isCurrent: PropTypes.bool,
  isDistributed: PropTypes.bool,
  name: PropTypes.string,
  tablespaceHash: PropTypes.string,
};

const mapStateToProps = ({ entities }, { hash, match, location }) => {
  const pathname = get(location, 'pathname');
  const table = get(entities, `tables.${hash}`);
  const tableMatch = matchPath(pathname, {
    exact: true,
    path: '/:tablespaceHash/table/:tableHash',
  });
  const currentTableHash = get(tableMatch, 'params.tableHash');

  return {
    ...table,
    isCurrent: hash === currentTableHash,
    isDistributed: get(table, 'ranges', 0) > 0,
    tablespaceHash: get(match, 'params.tablespaceHash'),
  };
};

export default withRouter(connect(mapStateToProps)(DashboardTable));
