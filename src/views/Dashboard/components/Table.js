import classNames from 'classnames';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link, matchPath, withRouter } from 'react-router-dom';

// Components
import Progress from 'components/Progress';
import Tooltip from 'components/Tooltip';

// Entities
import { TABLES_ENTITY_ID } from 'entities/tables';

// Services
import { getProgressByLink } from 'services/progress/selector';


// Styles
import { COLOR, Typography } from 'styles';
import styles from './Table.scss';

const DashboardTable = ({
  hash,
  name,
  progress,
  tablespaceHash,

  // State
  isCurrent,
  isDistributed,
}) => {
  const className = classNames(styles.Root, {
    [styles.RootIsCurrent]: !!isCurrent,
    [styles.RootIsDistributed]: !!isDistributed,
    [styles.RootIsProgressed]: !!progress,
    [styles.RootIsNotSync]: !name,
  });

  return (
    <Link
      className={className}
      to={`/${tablespaceHash}/table/${hash}`}
    >
      <div className={styles.Info}>
        <Typography
          className={styles.Name}
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
          {!!name && hash.substr(0, 16)}
        </Typography>

        {progress && (
          <Progress
            classNames={{
              root: styles.Progress,
              progress: styles.ProgressBar,
            }}
            color={COLOR.PRIMARY}
            value={get(progress, 'value')}
            variant={Progress.VARIANT.LINEAR}
          />
        )}
      </div>

      {!!name && isDistributed && (
        <Tooltip
          className={styles.Distributed}
          title="table_distributed"
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
  progress: PropTypes.shape({
    value: PropTypes.number,
  }),
  tablespaceHash: PropTypes.string,
};

const mapStateToProps = (state: Object, { hash, location }): Object => {
  const match = matchPath(get(location, 'pathname'), { path: '/:tablespaceHash/table/:tableHash' });
  const table = get(state, `entities.tables.${hash}`);
  const currentTableHash = get(match, 'params.tableHash');

  return {
    ...table,
    isCurrent: hash === currentTableHash,
    isDistributed: get(table, 'ranges', 0) > 0,
    progress: getProgressByLink(state, `${TABLES_ENTITY_ID}_${hash}`),
    tablespaceHash: get(match, 'params.tablespaceHash'),
  };
};

export default withRouter(connect(mapStateToProps)(DashboardTable));
