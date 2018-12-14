import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

// Components
import Button from 'components/Button';

// Styles
import { Typography } from 'styles';
import styles from './Tablespace.scss';

const DashboardTablespace = ({
  address,
  color,
  isOpened,
  isTrigger,
  name,
  onClick,
}) => {
  const rootClassNames = classNames(styles.Root, {
    [styles.RootIsOpened]: !!isOpened,
    [styles.RootIsTrigger]: !!isTrigger,
  });
  const iconClassNames = classNames(styles.Icon, 'far', 'fa-caret-circle-down');
  const logoClassNames = classNames(styles.Logo, styles[`LogoColor${color}`]);

  return (
    <Button
      classNames={{
        root: rootClassNames,
        content: styles.Content,
      }}
      onClick={onClick}
    >
      <Typography
        className={logoClassNames}
        variant={Typography.VARIANT.H5}
      >
        {(name || '?').substr(0, 1)}
      </Typography>

      <div className={styles.Info}>
        <Typography
          className={styles.Label}
          noWrap
          variant={Typography.VARIANT.OVERLINE}
        >
          {address}
        </Typography>

        <Typography
          className={styles.Name}
          noWrap
          variant={Typography.VARIANT.SUBTITLE1}
        >
          {name}
        </Typography>
      </div>

      {isTrigger && <i className={iconClassNames} />}
      {!isTrigger && <div className={styles.Divider} />}
    </Button>
  );
};

DashboardTablespace.propTypes = {
  address: PropTypes.string,
  isOpened: PropTypes.bool,
  isTrigger: PropTypes.bool,
  name: PropTypes.string,
  onClick: PropTypes.func,
};

export default DashboardTablespace;
