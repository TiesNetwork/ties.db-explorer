import classNames from 'classnames';
import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { matchPath, withRouter } from 'react-router-dom';
import { compose, withHandlers } from 'recompose';

// Components
import Button from 'components/Button';
import Table from 'components/Table';

// Ducks
import { EDIT_MODAL_ID } from 'containers/Edit';

// Entities
import { INDEXES_ENTITY_ID } from 'entities/indexes';
import { TRIGGERS_ENTITY_ID } from 'entities/triggers';

// Services
import { openModal } from 'services/modals';

// Utils
import createColumns from '../utils/columns';
import createSchema from '../utils/schema';

// Styles
import { Typography } from 'styles';
import styles from './Entities.scss';

const TableEntities = ({
  // Props
  color,
  columns,
  id,
  items,
  isDistributed,
  name,
  title,

  // Handlers
  handleCreate,
  handleEdit,
}) => {
  const rootClassNames = classNames(styles.Root, {
    [styles.RootIsDistributed]: !!isDistributed,

    [styles.RootVariantIndexes]: id === INDEXES_ENTITY_ID,
    [styles.RootVariantTriggers]: id === TRIGGERS_ENTITY_ID,
  });

  return (
    <div className={rootClassNames}>
      <div className={styles.Header}>
        <Typography
          className={styles.Title}
          variant={Typography.VARIANT.H5}
        >
          {title}
        </Typography>

        <div className={styles.Actions}>
          <Button
            color={color}
            onClick={handleCreate}
          >
            Create {name}
          </Button>
        </div>
      </div>

      {items && items.length > 0 && (
        <div className={styles.Container}>
          <Table
            className={styles.Table}
            columns={columns}
            data={items}
            minRows={0}
            showPagination={false}
          />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state, { id, handleEdit, location }) => {
  const schema = createSchema(state, id);
  const match = matchPath(get(location, 'pathname'), {
    path: '/:tablespaceHash/table/:tableHash',
  });

  const tableHash = get(match, 'params.tableHash');
  const table = get(state, `entities.tables.${tableHash}`);

  const isDistributed = get(table, 'ranges', 0) > 0;

  return {
    ...schema, isDistributed, tableHash,
    columns: createColumns(schema, isDistributed),
    items: get(table, get(schema, 'entity'), [])
      .map((hash: string, index: number) => ({
        ...get(state, `entities.${get(schema, 'entity')}.${hash}`),
        index: index + 1,
        actions: {
          hash,
          onEdit: handleEdit,
        },
      })),
  };
};

export default withRouter(compose(
  connect(mapStateToProps, { openModal }),
  withHandlers({
    handleCreate: ({ id, openModal, tableHash }) => () =>
      openModal(EDIT_MODAL_ID, { tableHash, type: id }),
    handleEdit: ({ id, openModal, tableHash }) => (hash: string) =>
      openModal(EDIT_MODAL_ID, { hash, tableHash, type: id })
  }),
  connect(mapStateToProps),
)(TableEntities));
