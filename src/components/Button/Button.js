import classNames from 'classnames';
import { values } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { compose, withHandlers, withProps } from 'recompose';

// Styles
import { COLOR, GRADIENT, Typography } from 'styles';
import styles from './Button.scss';

const Button = ({
  children,
  className,
  classNames: {
    root: rootClassName,
    content: contentClassName,
    icon: iconClassName,
  },
  color,
  fullWidth,
  handleClick,
  icon,
  registerButton,
  removeAutoBlur,
  type = 'button',
  ...props,
}) => {
  const rootClassNames = classNames(
    rootClassName || className,
    styles.Root,
    // Color
    {
      [styles.RootColorAlert]:   color === COLOR.ALERT,
      [styles.RootColorDanger]:  color === COLOR.DANGER,
      [styles.RootColorPrimary]: color === COLOR.PRIMARY,
      [styles.RootColorSecondary]: color === COLOR.SECONDARY,
      [styles.RootColorSuccess]: color === COLOR.SUCCESS,

      [styles.RootGradientGreen]: color === GRADIENT.GREEN,
      [styles.RootGradientPurple]: color === GRADIENT.PURPLE,
    },
    // Variants
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
  color: PropTypes.oneOf([...values(COLOR), ...values(GRADIENT)]),
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

ComposedButton.COLOR = { GRADIENT: {}};

export default ComposedButton;
