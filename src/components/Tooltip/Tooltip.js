import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

// Styles
import { Typography } from 'styles';
import styles from './Tooltip.scss';

const Tooltip = ({
  children,
  className: classNameProp,
  classNames: {
    root: rootClassName,
    container: containerClassName,
    tooltip: tooltipClassName,
  },
  component: Component = 'div',
  title,
}) => {
  const rootClassNames = classNames(classNameProp || rootClassName, styles.Root);
  const containerClassNames = classNames(containerClassName, styles.Container);
  const tooltipClassNames = classNames(tooltipClassName, styles.Tooltip);

  return (
    <Component className={rootClassNames}>
      <Typography
        className={tooltipClassNames}
        noWrap
        variant={Typography.VARIANT.CAPTION}
      >
        {title}
      </Typography>

      <div className={containerClassNames}>
        {children}
      </div>
    </Component>
  );
};

Tooltip.defaultProps = {
  classNames: {},
};

Tooltip.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  classNames: PropTypes.shape({
    root: PropTypes.string,
    container: PropTypes.string,
    tooltip: PropTypes.string,
  }),
  component: PropTypes.node,
  title: PropTypes.string,
};

export default Tooltip;
