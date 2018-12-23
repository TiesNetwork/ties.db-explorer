import classNames from 'classnames';
import { get, keys } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { push } from 'react-router-redux';
import { compose, withHandlers } from 'recompose';

// Components
import Button from 'components/Button';
import Tablespace from '../components/Tablespace';

// Styles
import styles from './Tablespaces.scss';

const DashboardTablespaces = ({
  currentTablespace,
  handleClick,
  isOpened,
  tablespaces,
  onTrigger,
}) => {
  const rootClassNames = classNames(styles.Root, {
    [styles.RootIsOpened]: !!isOpened,
  });

  return (
    <div className={rootClassNames}>
      <Tablespace
        address="TABLESPACE"
        hash={currentTablespace}
        isOpened={isOpened}
        isTrigger
        onClick={onTrigger}
      />

      <div className={styles.Container}>
        <div className={styles.List}>
          {tablespaces.map(tablespaceHash => (
            <Tablespace
              hash={tablespaceHash}
              key={tablespaceHash}
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

const mapStateToProps = ({ entities, views }, { match }) => {
  const tablespaceHash = get(match, 'params.tablespaceHash');

  return {
    currentTablespace: tablespaceHash,
    tablespaces: keys(get(entities, 'tablespaces', [])).filter(hash => hash !== tablespaceHash),
  };
};

export default withRouter(compose(
  connect(mapStateToProps, { push }),
  withHandlers({
    handleClick: ({ onTrigger, push }) => (hash: string) => {
      onTrigger();
      push(`/${hash}`);
    },
  }),
)(DashboardTablespaces));
