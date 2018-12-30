import { get } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

// Components
import Button from 'components/Button';

// Containers
import Entities from './containers/Entities';

// Entities
import { FIELDS_ENTITY_ID } from 'entities/fields';
import { INDEXES_ENTITY_ID } from 'entities/indexes';
import { TRIGGERS_ENTITY_ID } from 'entities/triggers';

// Styles
import { Typography } from 'styles';
import styles from './Table.scss';

const Table = ({
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

        <Button className={styles.Edit}>
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

const mapStateToProps = ({ entities }, { match }) =>
  get(entities, `tables.${get(match, 'params.tableHash', '')}`);


export default connect(mapStateToProps)(Table);
