import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { compose, withProps } from 'recompose';

// Styles
import { GRADIENT, Typography } from 'styles';
import styles from './Avatar.scss';

const Avatar = ({
  className,
  classNames: {
    root: rootClassName,
    title: titleClassName,
  } = {},
  color,
  title,
}) => {
  const rootClassNames = classNames(className, rootClassName, styles.Root, {
    [styles.RootColorBlue]: color === GRADIENT.BLUE,
    [styles.RootColorBluePurple]: color === GRADIENT.BLUE_PURPLE,
    [styles.RootColorGreen]: color === GRADIENT.GREEN,
    [styles.RootColorPurple]: color === GRADIENT.PURPLE,
    [styles.RootColorRed]: color === GRADIENT.RED,
  });

  return (
    <div className={rootClassNames}>
      {title && (
        <Typography variant={Typography.VARIANT.H6}>
          {title.substr(0, 1).toUpperCase()}
        </Typography>
      )}
    </div>
  );
};

Avatar.propTypes = {
  className: PropTypes.string,
  classNames: PropTypes.shape({
    root: PropTypes.string,
    title: PropTypes.string,
  }),
  color: PropTypes.oneOf([
    GRADIENT.BLUE,
    GRADIENT.BLUE_PURPLE,
    GRADIENT.GREEN,
    GRADIENT.PURPLE,
    GRADIENT.RED,
  ]),
  title: PropTypes.string,
};

export default compose(
  withProps(({ color, hash = '0x0' }) => {
    const hashInt = parseInt(hash, 16);
    const colorNumber = parseInt(hashInt.toString().substr(0, 1), 10);

    return !color && {
      color: colorNumber > 7
        ? GRADIENT.RED
        : colorNumber > 5
          ? GRADIENT.PURPLE
          : colorNumber > 3
            ? GRADIENT.GREEN
            : colorNumber > 1
              ? GRADIENT.BLUE_PURPLE
              : GRADIENT.BLUE,
    };
  }),
)(Avatar);
