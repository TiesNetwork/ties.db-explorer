import classNames from 'classnames';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { Portal } from 'react-portal';
import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';

// Ducks
import { closeModal } from 'services/modals';

// Styles
import styles from './Modal.scss';

const Modal = ({
  children,
  className,
  classNames: {
    root: rootClassName,
    container: containerClassName,
  } = {},
  handleClose,
  isOpened,
  ...props,
}) => {
  const rootClassNames = classNames(className || rootClassName, styles.Root);
  const containerClassNames = classNames(containerClassName, styles.Container);

  return isOpened && (
    <Portal>
      <div className={rootClassNames}>
        <div
          className={styles.Backdrop}
          onClick={handleClose}
        />

        <div className={containerClassNames}>
          {typeof children === 'function'
            ? children(props)
            : children
          }
        </div>
      </div>
    </Portal>
  );
};

Modal.propTypes = {
  children: PropTypes.node,
  handleClose: PropTypes.func,
  isOpened: PropTypes.bool,
};

const mapStateToProps = ({ services }, { id }) => {
  const modal = get(services, `modals.${id}`);

  return {
    ...modal,
    isOpened: !!modal,
  };
};

export default compose(
  connect(mapStateToProps, { closeModal }),
  withHandlers({
    handleClose: ({ closeModal }) => () =>
      closeModal('search'),
  }),
)(Modal);
