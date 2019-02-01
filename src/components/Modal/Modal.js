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
import { Typography } from 'styles';
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
  title,
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
          {title && (
            <Typography
              className={styles.Title}
              variant={Typography.VARIANT.H6}
            >
              {title}
            </Typography>
          )}

          <div className={styles.Content}>
            {typeof children === 'function'
              ? children(props)
              : children
            }
          </div>
        </div>
      </div>
    </Portal>
  );
};

Modal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node,
  ]),
  handleClose: PropTypes.func,
  isOpened: PropTypes.bool,
};

const mapStateToProps = ({ services }, { id, isOpened }) => {
  const modal = get(services, `modals.${id}`);

  return {
    ...modal,
    isOpened: isOpened || !!modal,
  };
};

export default compose(
  connect(mapStateToProps, { closeModal }),
  withHandlers({
    handleClose: ({ closeModal, id }) => () =>
      closeModal(id),
  }),
)(Modal);
