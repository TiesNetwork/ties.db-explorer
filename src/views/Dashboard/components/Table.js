import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

// Components
import Tooltip from 'components/Tooltip';

// Styles
import { Typography } from 'styles';
import styles from './Table.scss';

const DashboardTable = ({
  address,
  isDistributed,
  name,
}) => {
  const className = classNames(styles.Root, {
    [styles.RootIsDistributed]: !!isDistributed,
  });

  return (
    <div
      className={className}
      role="button"
      tabIndex={0}
    >
      <div className={styles.Info}>
        <Typography
          noWrap
          variant={Typography.VARIANT.SUBTITLE1}
        >
          {name}
        </Typography>

        <Typography
          className={styles.Address}
          noWrap
          variant={Typography.VARIANT.CAPTION}
        >
          {address}
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
    </div>
  );
};

DashboardTable.propTypes = {
  address: PropTypes.string,
  isDistributed: PropTypes.bool,
  name: PropTypes.string,
};

export default DashboardTable;
