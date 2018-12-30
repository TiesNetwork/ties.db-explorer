import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { compose, withHandlers } from 'recompose';

// Components
import Button from 'components/Button';

// Styles
import { COLOR } from 'styles';
import styles from './Actions.scss';

const TableActions = ({
  color,
  handleEdit,
  handleDelete,
}) => {
  const rootClassNames = classNames(styles.Root, {
    [styles.RootColorWhite]: color === COLOR.WHITE,
  });

  return (
    <div className={rootClassNames}>
      <Button
        classNames={{
          root: styles.Button,
          icon: styles.Icon,
        }}
        icon="far fa-edit"
        onClick={handleEdit}
      />

      <Button
        classNames={{
          root: styles.Button,
          icon: styles.Icon,
        }}
        icon="far fa-trash-alt"
        onClick={handleDelete}
      />
    </div>
  );
};

TableActions.propTypes = {
  color: PropTypes.string,
  hash: PropTypes.string,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
};

export default compose(
  withHandlers({
    handleEdit: ({ hash, onEdit }) => () =>
      onEdit && onEdit(hash),
    handleDelete: ({ hash, onDelete }) => () =>
      onDelete && onDelete(hash),
  }),
)(TableActions);
