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
  handleClick,

  // Registers
  registerRoot,

  // State
  isOpened,
  stateIsOpened,
}) => {
  const rootClassNames = classNames(rootClassName || className, styles.Root, {
    [styles.RootAlignLeft]: align === 'left',
    [styles.RootIsOpened]: isOpened === undefined ? stateIsOpened : isOpened,
  });

  const dropdownClassNames = classNames(dropdownClassName, styles.Dropdown);
  const listClassNames = classNames(listClassName, styles.List);

  return (
    <div
      className={rootClassNames}
      ref={registerRoot}
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

      {(isOpened === undefined ? stateIsOpened : isOpened) && (
        <div className={dropdownClassNames}>
          {children && (
            <div className={listClassNames}>
              {children}
            </div>
          )}
        </div>
      )}
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
  isOpened: PropTypes.bool,
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
  tooltip: PropTypes.string,
};

export default compose(
  withState('stateIsOpened', 'setOpen', ({ isOpened }) => isOpened),
  withHandlers({
    close: ({ onClose, setOpen }): func => ():void =>
      onClose ? onClose() : setOpen(false),
    open: ({ onOpen, setOpen }): func => ():void =>
      onOpen ? onOpen() : setOpen(true),
  }),
  withHandlers(() => {
    let rootRef;

    return {
      // Handlers
      handleClick: ({ open }): func => (): void => open(),
      handleOutside: ({ close, isOpened, stateIsOpened, onClose, setOpen }): func => (event: Object): void =>
        (isOpened === undefined ? stateIsOpened : isOpened) && !rootRef.contains(event.target) && close(),

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
      const { close, isOpened, open } = this.props;

      if (isOpened !== prevIsOpened) {
        isOpened ? open() : close();
      }
    },

    componentWillUnmount() {
      document.removeEventListener('click', this.props.handleOutside, false);
    },
  }),
)(Dropdown);
