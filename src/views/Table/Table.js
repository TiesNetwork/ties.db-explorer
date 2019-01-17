import { get } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers, withProps } from 'recompose';

// Components
import Button from 'components/Button';

// Containers
import Entities from './containers/Entities';

// Ducks
import { EDIT_MODAL_ID } from 'containers/Edit';

// Entities
import { FIELDS_ENTITY_ID } from 'entities/fields';
import { INDEXES_ENTITY_ID } from 'entities/indexes';
import { TABLES_ENTITY_ID } from 'entities/tables';
import { TRIGGERS_ENTITY_ID } from 'entities/triggers';

// Services
import { openModal } from 'services/modals';

// Styles
import { Typography } from 'styles';
import styles from './Table.scss';

const Table = ({
  handleEdit,
  name,
}) => (
  <div className={styles.Root}>
    <div className={styles.Header}>
      <Typography
        className={styles.Title}
        variant={Typography.VARIANT.H4}
      >
        {name}
      </Typography>

      <div className={styles.Actions}>
        <Button
          classNames={{
            root: styles.Favorite,
            icon: styles.FavoriteIcon,
          }}
          icon="far fa-star"
        >
          Favorite
        </Button>

        <Button
          className={styles.Edit}
          onClick={handleEdit}
        >
          Edit Table
        </Button>
      </div>
    </div>

    <div className={styles.Container}>
      <div className={styles.Fields}>
        <Entities id={FIELDS_ENTITY_ID} />
      </div>

      <div className={styles.Footer}>
        <div className={styles.Indexes}>
          <Entities id={INDEXES_ENTITY_ID} />
        </div>

        <div className={styles.Triggers}>
          <Entities id={TRIGGERS_ENTITY_ID} />
        </div>
      </div>
    </div>

  </div>
);

Table.propTypes = {
  name: PropTypes.string,
};

const mapStateToProps = ({ entities }, { hash }) =>
  get(entities, `tables.${hash}`);

export default compose(
  withProps(({ match }) => ({
    hash: get(match, 'params.tableHash'),
  })),
  connect(mapStateToProps, { openModal }),
  withHandlers({
    handleEdit: ({ hash, openModal }) => () =>
      openModal(EDIT_MODAL_ID, { hash, type: TABLES_ENTITY_ID }),
  }),
)(Table);
