import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { cloneElement } from 'react';
import { compose, withHandlers, withState } from 'recompose';

// Components
import Button from 'components/Button';
import Tooltip from 'components/Tooltip';

// Styles
import styles from './Dropdown.scss';

const Dropdown = ({
  align,
  children,
  className,
  classNames: {
    root: rootClassName,
    button: buttonClassName,
    buttonIcon: buttonIconClassName,
    dropdown: dropdownClassName,
    list: listClassName,
  },
  handleBlur,
  handleClick,
  icon,
  isOpened,
  registerRoot,
  tooltip,
  trigger,
}) => {
  const rootClassNames = classNames(rootClassName || className, styles.Root, {
    [styles.RootAlignLeft]: align === 'left',
    [styles.RootIsOpened]: !!isOpened,
  });

  const dropdownClassNames = classNames(dropdownClassName, styles.Dropdown);
  const listClassNames = classNames(listClassName, styles.List);

  return (
    <div
      className={rootClassNames}
      onBlur={handleBlur}
      ref={registerRoot}
      tabIndex={-1}
    >
      {trigger ? cloneElement(trigger, { onClick: handleClick }) : (
        <Tooltip title={tooltip}>
          <Button
            classNames={{
              root: classNames(buttonClassName, styles.Button),
              icon: classNames(buttonIconClassName, styles.ButtonIcon),
            }}
            icon={icon}
            onClick={handleClick}
            removeAutoBlur={false}
          />
        </Tooltip>
      )}

      <div className={dropdownClassNames}>
        {children && (
          <div className={listClassNames}>
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

Dropdown.defaultProps = {
  classNames: {},
};

Dropdown.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  classNames: PropTypes.shape({
    root: PropTypes.string,
    button: PropTypes.string,
    buttonIcon: PropTypes.string,
    list: PropTypes.string,
  }),
  icon: PropTypes.string,
  tooltip: PropTypes.string,
};

export default compose(
  withState('isOpened', 'setOpen', false),
  withHandlers(() => {
    let rootRef;

    return {
      handleBlur: ({ setOpen }) => (event: Object) =>
        !rootRef.contains(event.relatedTarget) && setOpen(false),
      handleClick: ({ setOpen }) => () => setOpen(true),

      registerRoot: () => (node: HTMLElement) => {
        rootRef = node;
      },
    };
  }),
)(Dropdown);
