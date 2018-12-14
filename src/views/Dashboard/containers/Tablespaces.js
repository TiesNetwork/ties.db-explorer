import classNames from 'classnames';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

// Components
import Button from 'components/Button';
import Tablespace from '../components/Tablespace';

// Styles
import styles from './Tablespaces.scss';

const DashboardTablespaces = ({
  currentTablespaceId,
  handleClick,
  isOpened,
  items,
  onTrigger,
}) => {
  const currentItem = items.filter(({ id }) => id === currentTablespaceId)[0];

  const rootClassNames = classNames(styles.Root, {
    [styles.RootIsOpened]: !!isOpened,
  });

  return (
    <div className={rootClassNames}>
      <Tablespace {...currentItem}
        address="TABLESPACE"
        isOpened={isOpened}
        isTrigger
        onClick={onTrigger}
      />

      <div className={styles.Container}>
        <div className={styles.List}>
          {items.map(tablespace => (
            <Tablespace {...tablespace}
              key={tablespace.id}
              onClick={handleClick}
            />
          ))}
        </div>

        <div className={styles.Actions}>
          <Button
            color={Button.COLOR.GRADIENT.GREEN}
            fullWidth
          >
            Create Tablespace
          </Button>
        </div>
      </div>
    </div>
  );
};

DashboardTablespaces.propTypes = {
  isOpened: PropTypes.bool,
  onTrigger: PropTypes.func,
};

const mapStateToProps = ({ views }) => ({
  currentTablespaceId: get(views, 'dashboard.currentTablespaceId', 0),
  items: get(views, 'dashboard.tablespaces', []),
});

export default connect(mapStateToProps)(DashboardTablespaces);
