import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';

// Components
import Button from 'components/Button';
import Table from '../components/Table';

// Styles
import styles from './Tables.scss';

const DashboardTables = ({
  items,
}) => (
  <div className={styles.Root}>
    {items && items.length > 0 && (
      <div className={styles.List}>
        {items.map(table => <Table {...table} key={table.id} />)}
      </div>
    )}

    <div className={styles.Actions}>
      <Button
        color={Button.COLOR.GRADIENT.PURPLE}
        fullWidth
      >
        Create Table
      </Button>
    </div>
  </div>
);

const mapStateToProps = ({ views }) => ({
  items: get(views, 'dashboard.tables', []),
});

export default connect(mapStateToProps)(DashboardTables);
