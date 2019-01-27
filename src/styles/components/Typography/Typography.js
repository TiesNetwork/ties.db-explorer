import classNames from 'classnames';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

// Utils
import generateHeadlineVariants from './utils/generateHeadlineVariants';

import styles from './Typography.scss';

export const COLOR = {
  DANGER: 'danger',
  DARK: 'dark',
  LIGHT: 'light',
  LIGHTER: 'lighter',
  MEDIUM: 'medium',
  PRIMARY: 'primary',
  SUCCESS: 'success',
  WARNING: 'warning',
};

export const VARIANT = {
  ...generateHeadlineVariants(styles),

  BODY1: {
    className: styles.RootVariantBody1,
    component: 'div',
    toValue: () => 'body1',
  },
  BODY2: {
    className: styles.RootVariantBody2,
    component: 'div',
    toValue: () => 'body2',
  },
  BUTTON: {
    className: styles.RootVariantButton,
    component: 'div',
    toValue: () => 'button',
  },
  CAPTION: {
    className: styles.RootVariantCaption,
    component: 'div',
    toValue: () => 'caption',
  },
  OVERLINE: {
    className: styles.RootVariantOverline,
    component: 'div',
    toValue: () => 'overline',
  },
  SUBTITLE1: {
    className: styles.RootVariantSubtitle1,
    component: 'div',
    toValue: () => 'subtitle1',
  },
  SUBTITLE2: {
    className: styles.RootVariantSubtitle2,
    component: 'div',
    toValue: () => 'subtitle2',
  },
};

const Typography = ({
  children,
  className: classNameProp,
  color,
  component = 'div',
  noWrap = false,
  style,
  variant = VARIANT.BODY1,
  ...props,
}) => {
  const className = classNames(
    classNameProp,
    styles.Root,
    variant.className,
    // styles[`RootColor${capitalize(color)}`],
    {
      [styles.RootNowrap]: !!noWrap,
    },
  );

  const Component = component || get(variant, 'component');

  return (
    <Component {...props} className={className} style={style}>
      {children}
    </Component>
  );
};

Typography.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  color: PropTypes.string,
  component: PropTypes.node,
  noWrap: PropTypes.bool,
  variant: PropTypes.shape({
    className: PropTypes.string,
    component: PropTypes.node,
  }),
};

Typography.COLOR = COLOR;
Typography.VARIANT = VARIANT;

export default Typography;
