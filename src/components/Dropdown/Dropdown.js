import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { cloneElement } from 'react';
import { compose, lifecycle, withHandlers, withState } from 'recompose';

// Components
import Button from 'components/Button';
import Tooltip from 'components/Tooltip';

// Styles
import styles from './Dropdown.scss';

const Dropdown = ({
  // Props
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
  dot,
  icon,
  tooltip,
  trigger,

  // Handlers
  handleBlur,
  handleClick,

  // Registers
  registerRoot,

  // State
  _isOpened,
}) => {
  const rootClassNames = classNames(rootClassName || className, styles.Root, {
    [styles.RootAlignLeft]: align === 'left',
    [styles.RootIsOpened]: !!_isOpened,
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
        <Tooltip
          className={styles.Tooltip}
          title={tooltip}
        >
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

      {dot && <div className={styles.Dot} />}

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
  withState('_isOpened', 'setOpen', ({ isOpened }) => isOpened),
  withHandlers(() => {
    let rootRef;

    return {
      // Handlers
      handleBlur: ({ setOpen }): func => (event: Object): void =>
        !rootRef.contains(event.relatedTarget) && setOpen(false),
      handleClick: ({ setOpen }): func => (): void =>
        setOpen(true),
      handleOutside: ({ _isOpened, setOpen }): func => (event: Object): void =>
        _isOpened && !rootRef.contains(event.target) && setOpen(false),

      // Registers
      registerRoot: () => (node: HTMLElement) => {
        rootRef = node;
      },
    };
  }),
  lifecycle({
    componentDidMount() {
      document.addEventListener('click', this.props.handleOutside, false);
    },

    componentDidUpdate({ isOpened: prevIsOpened }) {
      const { isOpened, setOpen } = this.props;
      !prevIsOpened && isOpened && setOpen(true);
    },
  }),
)(Dropdown);
