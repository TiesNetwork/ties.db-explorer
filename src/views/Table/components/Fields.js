import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';

// Styles
import { Typography } from 'styles';
import styles from './Fields.scss';

const TableFields = ({
  items = [],
}) => (
  <div className={styles.Root}>
    {items.map((name: string, index: number) => (
      <Typography
        className={styles.Item}
        key={index}
        variant={Typography.VARIANT.CAPTION}
      >
        {name}
      </Typography>
    ))}
  </div>
);

const mapStateToProps = ({ entities }, { fields = [], tableHash }): Object => ({
  items: fields.map((hash: string) => get(entities, `fields.${tableHash}_${hash}.name`)),
});

export default connect(mapStateToProps)(TableFields);
