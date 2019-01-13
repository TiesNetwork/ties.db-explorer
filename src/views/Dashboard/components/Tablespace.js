import classNames from 'classnames';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';

// Components
import Button from 'components/Button';

// Styles
import { Typography } from 'styles';
import styles from './Tablespace.scss';

const COLOR = [
  { className: styles.RootColorBlue, value: [0, 1] },
  { className: styles.RootColorBluePurple, value: [2, 3] },
  { className: styles.RootColorGreen, value: [4, 5] },
  { className: styles.RootColorPurple, value: [6, 7] },
  { className: styles.RootColorRed, value: [8, 9] },
];

const DashboardTablespace = ({
  color = COLOR[0],
  handleClick,
  hash,
  isOpened,
  isTrigger,
  name,
  tables = [],
}) => {
  const rootClassNames = classNames(styles.Root, color.className, {
    [styles.RootIsOpened]: !!isOpened,
    [styles.RootIsTrigger]: !!isTrigger,
  });
  const iconClassNames = classNames(styles.Icon, 'far', 'fa-caret-circle-down');

  return (
    <Button
      classNames={{
        root: rootClassNames,
        content: styles.Content,
      }}
      onClick={handleClick}
    >
      <Typography
        className={styles.Logo}
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
          {isTrigger ? 'TABLESPACE' : hash.substr(0, 16)}
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

const mapStateToProps = ({ entities }, { hash }) => {
  const tablespace = get(entities, `tablespaces.${hash}`);

  const hashInt = parseInt(hash, 16);
  const colorNumber = parseInt(hashInt.toString().substr(0, 1), 10);

  return {
    ...tablespace,
    color: COLOR.filter(({ value }) => value.indexOf(colorNumber) > -1)[0],
  }
};

export default compose(
  connect(mapStateToProps),
  withHandlers({
    handleClick: ({ hash, onClick }): func => (): void =>
      onClick && onClick(hash),
  }),
)(DashboardTablespace);
