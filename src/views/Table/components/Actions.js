import classNames from 'classnames';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';

// Components
import Button from 'components/Button';
import Progress from 'components/Progress';

// Entities
import { FIELDS_ENTITY_ID } from 'entities/fields';

// Services
import { getProgressByLink } from 'services/progress/selector';


// Styles
import { COLOR } from 'styles';
import styles from './Actions.scss';

const TableActions = ({
  color,
  handleEdit,
  handleDelete,
  progress,
}) => {
  const rootClassNames = classNames(styles.Root, {
    [styles.RootColorWhite]: color === COLOR.WHITE,
  });

  const deleteClassNames = classNames(styles.Button, styles.Delete);

  return (
    <div className={rootClassNames}>
      {progress ? (
        <Progress
          classNames={{
            root: styles.Progress,
            progress: styles.ProgressBar,
          }}
          color={COLOR.PRIMARY}
          value={get(progress, 'value')}
          variant={Progress.VARIANT.LINEAR}
        />
      ) : (
        <Fragment>
          <Button
            classNames={{
              root: styles.Button,
              icon: styles.Icon,
            }}
            icon="fal fa-edit"
            onClick={handleEdit}
          />

          <Button
            classNames={{
              root: deleteClassNames,
              icon: styles.Icon,
            }}
            icon="fal fa-trash-alt"
            onClick={handleDelete}
          />
        </Fragment>
      )}
    </div>
  );
};

TableActions.propTypes = {
  color: PropTypes.string,
  hash: PropTypes.string,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
};

const mapStateToProps = (state: Object, { entity, hash }): Object => ({
  progress: getProgressByLink(state, `${entity}_${hash}`),
});

export default compose(
  connect(mapStateToProps),
  withHandlers({
    handleEdit: ({ hash, onEdit }) => () =>
      onEdit && onEdit(hash),
    handleDelete: ({ hash, onDelete }) => () =>
      onDelete && onDelete(hash),
  }),
)(TableActions);
