import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { compose, withHandlers, withProps } from 'recompose';

// Styles
import { Typography } from 'styles';
import styles from './Button.scss';

const COLOR = {
  GRADIENT: {
    GREEN: {
      className: styles.RootColorGradientGreen,
      toString: () => 'purple',
    },
    PURPLE: {
      className: styles.RootColorGradientPurple,
      toString: () => 'purple',
    },
  },
};

const Button = ({
  children,
  className,
  classNames: {
    root: rootClassName,
    content: contentClassName,
    icon: iconClassName,
  },
  color: colorProp,
  fullWidth,
  handleClick,
  icon,
  registerButton,
  type = 'button',
  ...props,
}) => {
  const color = colorProp || {};

  const rootClassNames = classNames(
    rootClassName || className,
    styles.Root, color.className,
    {
      [styles.RootVariantFilled]: !!children,
      [styles.RootVariantIcon]: icon && !children,
      [styles.RootVariantFull]: icon && children,
      [styles.RootVariantFullWidth]: !!fullWidth,
    }
  );
  const contentClassNames = classNames(contentClassName, styles.Content);
  const iconClassNames = classNames(iconClassName, styles.Icon, icon);

  return (
    <button {...props}
      className={rootClassNames}
      onClick={handleClick}
      ref={registerButton}
      type={type}
    >
      {icon && <i className={iconClassNames} />}

      {children && (
        <Typography
          className={contentClassNames}
          variant={Typography.VARIANT.BUTTON}
        >
          {children}
        </Typography>
      )}
    </button>
  );
};

Button.defaultProps = {
  classNames: {},
};

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  classNames: PropTypes.shape({
    root: PropTypes.string,
    icon: PropTypes.string,
  }),
  color: PropTypes.oneOfType([
    PropTypes.shape({
      className: PropTypes.string,
    }),
    PropTypes.string,
  ]),
  fullWidth: PropTypes.bool,
  icon: PropTypes.string,
  onClick: PropTypes.func,
  removeAutoBlur: PropTypes.bool,
  type: PropTypes.string,
};

const ComposedButton = compose(
  withProps(({ removeAutoBlur }) => ({
    removeAutoBlur: removeAutoBlur !== undefined ? removeAutoBlur : true,
  })),
  withHandlers(() => {
    let buttonRef;

    return {
      handleClick: ({ onClick, removeAutoBlur }) => (event: Object) => {
        removeAutoBlur && buttonRef.blur();
        onClick && onClick(event);
      },
      registerButton: () => (node: HTMLElement) => {
        buttonRef = node;
      },
    };
  }),
)(Button);

ComposedButton.COLOR = COLOR;

export default ComposedButton;
