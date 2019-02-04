import classNames from 'classnames';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose, withHandlers } from 'recompose';

// Ducks
import { EDIT_MODAL_ID } from 'containers/Edit';
import { SEARCH_MODAL_ID } from '../ducks/constants';

// Entities
import { ACTION_DELETE_TYPE } from 'entities/constants';
import {
  deleteField,
  FIELDS_ENTITY_ID,
} from 'entities/fields';
import { INDEXES_ENTITY_ID } from 'entities/indexes';
import {
  deleteTable,
  TABLES_ENTITY_ID,
} from 'entities/tables';
import {
  deleteTablespace,
  TABLESPACES_ENTITY_ID,
} from 'entities/tablespaces';
import { TRIGGERS_ENTITY_ID } from 'entities/triggers';

// Services
import { closeModals, openModal } from 'services/modals';

// Utils
import { capitalize } from 'utils/string';

// Styles
import { Typography } from 'styles';
import styles from './Item.scss';

const SearchItem = ({
  action,
  entity = FIELDS_ENTITY_ID,
  handleClick,
  hash,
  name = '',
  query,
  table,
  tableHash,
  tablespace,
  tablespaceHash,
}) => {
  const rootClassNames = classNames(styles.Root, {
    [styles.RootIsDensed]: entity === TABLESPACES_ENTITY_ID || action === 'create',

    // Entities @todo - make design
    // [styles.RootVariantField]: !action && entity === FIELDS_ENTITY_ID,
    // [styles.RootVariantIndex]: !action && entity === INDEXES_ENTITY_ID,
    // [styles.RootVariantTrigger]: !action && entity === TRIGGERS_ENTITY_ID,
  });

  const iconClassNames = classNames(styles.Icon, 'far',
    action &&{
      'fa-edit': action === 'edit',
      'fa-plus': action === 'create',
      'fa-trash-alt': action === 'delete',
    },
    !action && entity && {
      'fa-bolt': entity === TRIGGERS_ENTITY_ID,
      'fa-key': entity === INDEXES_ENTITY_ID,
      'fa-table': entity === TABLES_ENTITY_ID,
      'fa-th-list': entity === FIELDS_ENTITY_ID,
      'fa-user-astronaut': entity === TABLESPACES_ENTITY_ID,
    },
  );

  const queryIndex = name.toLowerCase().indexOf(query);

  return (
    <div
      className={rootClassNames}
      onClick={handleClick}
      role="button"
      tabIndex={0}
    >
      <i className={iconClassNames} />

      <div className={styles.Info}>
        {hash && (
          <Typography
            className={styles.Hash}
            variant={Typography.VARIANT.OVERLINE}
          >
            {hash.substr(0, 16)}
          </Typography>
        )}

        <Typography
          className={styles.Name}
          variant={Typography.VARIANT.SUBTITLE1}
        >
          {action && `${capitalize(action)} `}
          {action === 'create'
            ? ` ${entity.substr(-entity.length, entity.length - (entity === INDEXES_ENTITY_ID ? 2 : 1))} `
            : ''}

          {name.substr(0, queryIndex)}

          <span className={styles.Query}>
            <span className={styles.QueryContent}>
              {name.substr(queryIndex, query.length)}
            </span>
          </span>

          {name.substr(queryIndex + query.length, name.length)}
        </Typography>

        {entity !== TABLESPACES_ENTITY_ID && (
          <Typography
            className={styles.From}
            variant={Typography.VARIANT.BODY2}
          >
            {action === 'create' ? 'to' : 'from'}&nbsp;

            {entity !== TABLES_ENTITY_ID && table && (
              <span className={styles.Table}>
                {table}
              </span>
            )}

            {entity !== TABLES_ENTITY_ID && tablespace && ` • `}

            {tablespace && (
              <span className={styles.Tablespace}>
                {tablespace}
              </span>
            )}
          </Typography>
        )}
      </div>
    </div>
  );
}

SearchItem.propTypes = {
  action: PropTypes.string,
  entity: PropTypes.oneOf([
    FIELDS_ENTITY_ID,
    INDEXES_ENTITY_ID,
    TABLES_ENTITY_ID,
    TABLESPACES_ENTITY_ID,
    TRIGGERS_ENTITY_ID,
  ]),
  handleClick: PropTypes.func,
  hash: PropTypes.string,
  name: PropTypes.string,
  query: PropTypes.string,
  table: PropTypes.string,
  tableHash: PropTypes.string,
  tablespace: PropTypes.string,
  tablespaceHash: PropTypes.string,
};

const mapStateToProps = ({ entities }, { tableHash, tablespaceHash }): Object => ({
  table: tableHash && get(entities, `tables.${tableHash}.name`),
  tablespace: tablespaceHash && get(entities, `tablespaces.${tablespaceHash}.name`),
});

export default withRouter(compose(
  connect(mapStateToProps, {
    closeModals,
    deleteField,
    deleteTable,
    deleteTablespace,
    openModal,
  }),
  withHandlers({
    handleClick: ({
      action,
      closeModals,
      deleteField,
      deleteTable,
      deleteTablespace,
      entity,
      hash,
      history,
      name,
      openModal,
      tableHash,
      tablespaceHash,
    }): func => () => {
      closeModals(SEARCH_MODAL_ID);

      if (action === ACTION_DELETE_TYPE) {
        switch (entity) {
          case FIELDS_ENTITY_ID:
            deleteField({ hash, tableHash, tablespaceHash });
            break;
          case TABLES_ENTITY_ID:
            deleteTable({ hash, tablespaceHash });
            break;
          case TABLESPACES_ENTITY_ID:
            deleteTablespace(hash);
            break;
          default:
            break;
        };
      } else {
        action
          ? openModal(EDIT_MODAL_ID, {
              hash, type: entity,
              initialValues: {
                hash, name,
                tableHash, tablespaceHash,
              },
            })
          : history.push(`/${tablespaceHash || hash}${tableHash ? `/table/${tableHash}` : ''}`);
      }
    },
  }),
)(SearchItem));
