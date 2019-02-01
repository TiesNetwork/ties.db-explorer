import classNames from 'classnames';
import { values } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

// Styles
import { COLOR } from 'styles';
import styles from './Progress.scss';

const VARIANT = {
  CIRCLE: 'circle',
  LINEAR: 'linear',
};

const Progress = ({
  className,
  classNames: {
    root: rootClassName,
    circle: circleClassName,
    line: lineClassName,
    progress: progressClassName,
  } = {},
  color = COLOR.PRIMARY,
  size = 40,
  value,
  variant = VARIANT.CIRCLE,
}) => {
  const rootClassNames = classNames(className, rootClassName, styles.Root, {
    // Color
    [styles.RootColorPrimary]: color === COLOR.PRIMARY,
    [styles.RootColorSuccess]: color === COLOR.SUCCESS,

    // Variant
    [styles.RootVariantCircle]: variant === VARIANT.CIRCLE,
    [styles.RootVariantLinear]: variant === VARIANT.LINEAR,
    [styles.RootVariantIndeterminate]: !value,
  });

  const circleClassNames = classNames(circleClassName, styles.Circle);
  const lineClassNames = classNames(lineClassName, styles.Line);
  const progressClassNames = classNames(progressClassName, styles.Progress);

  const displaySize = size + size / 10;

  return (
    <div className={rootClassNames}>
      <div
        className={progressClassNames}
        style={variant === VARIANT.CIRCLE ? {
          height: displaySize,
          width: displaySize,
        } : null}
      >
        {variant === VARIANT.CIRCLE && (
          <svg
            className={styles.Svg}
            viewBox={`${displaySize / 2} ${displaySize / 2} ${displaySize} ${displaySize}`}
          >
            <circle
              className={circleClassNames}
              cx={displaySize}
              cy={displaySize}
              fill="none"
              r={size / 2}
              strokeWidth={size / 10}
            />
          </svg>
        )}

        {variant === VARIANT.LINEAR && (
          <div
            className={lineClassNames}
            style={{ width: `${Math.max(0, Math.min(100, value))}%`}}
          />
        )}
      </div>
    </div>
  );
};

Progress.propTypes = {
  className: PropTypes.string,
  classNames: PropTypes.shape({
    root: PropTypes.string,
    circle: PropTypes.string,
    progress: PropTypes.string,
  }),
  color: PropTypes.oneOf(values(COLOR)),
  size: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  value: PropTypes.number,
  variant: PropTypes.oneOf(values(VARIANT)),
};

Progress.VARIANT = VARIANT;

export default Progress;
