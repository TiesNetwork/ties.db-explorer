import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

// Styles
import { Typography } from 'styles';
import styles from './Text.scss';

const VARIANT = {
  DARK: 'dark',
  LIGHT: 'light',
};

const TableText = ({
  children,
  title,
  variant = VARIANT.DARK,
}) => {
  const rootClassNames = classNames(styles.Root, {
    [styles.RootIsEmpty]: !children && !title,

    [styles.RootVariantDark]: variant === VARIANT.DARK,
    [styles.RootVariantLight]: variant === VARIANT.LIGHT,
  });

  return (
    <Typography
      className={rootClassNames}
      variant={Typography.VARIANT.BODY2}
    >
      {title || children}
    </Typography>
  );
}

TableText.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  variant: PropTypes.oneOf([VARIANT.DARK, VARIANT.LIGHT]),
};

TableText.VARIANT = VARIANT;

export default TableText;
