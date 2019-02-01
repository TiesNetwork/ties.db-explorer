import classNames from 'classnames';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';

// Components
import Avatar from 'components/Avatar';
import Button from 'components/Button';
import Progress from 'components/Progress';

// Entities
import { TABLESPACES_ENTITY_ID } from 'entities/tablespaces';

// Services
import { getProgressByLink } from 'services/progress/selector';

// Styles
import { COLOR, Typography } from 'styles';
import styles from './Tablespace.scss';

const DashboardTablespace = ({
  color = COLOR[0],
  handleClick,
  hash,
  name,
  progress,
  tables = [],

  // State
  isOpened,
  isSynchronized,
  isTrigger,
}) => {
  const rootClassNames = classNames(styles.Root, {
    [styles.RootIsOpened]: !!isOpened,
    [styles.RootIsTrigger]: !!isTrigger,
  });
  const iconClassNames = classNames(styles.Icon, 'far', 'fa-caret-circle-down');

  return (
    <Button
      classNames={{
        root: rootClassNames,
        content: styles.Content,
      }}
      onClick={handleClick}
    >
      <Avatar
        hash={hash}
        title={name}
      />

      <div className={styles.Info}>
        <Typography
          className={styles.Label}
          noWrap
          variant={Typography.VARIANT.OVERLINE}
        >
          {isTrigger ? 'TABLESPACE' : hash.substr(0, 16)}
        </Typography>

        <Typography
          className={styles.Name}
          noWrap
          variant={Typography.VARIANT.SUBTITLE1}
        >
          {name}
        </Typography>

        {progress && (
          <Progress
            classNames={{
              root: styles.Progress,
              progress: styles.ProgressBar,
            }}
            color={COLOR.PRIMARY}
            value={get(progress, 'value')}
            variant={Progress.VARIANT.LINEAR}
          />
        )}
      </div>

      {isTrigger && <i className={iconClassNames} />}
      {!isTrigger && <div className={styles.Divider} />}
    </Button>
  );
};

DashboardTablespace.propTypes = {
  address: PropTypes.string,
  isOpened: PropTypes.bool,
  isTrigger: PropTypes.bool,
  name: PropTypes.string,
  onClick: PropTypes.func,
};

const mapStateToProps = ({ entities, ...state }, { hash }) => {
  const tablespace = get(entities, `tablespaces.${hash}`);

  return {
    ...tablespace,
    progress: getProgressByLink(state, `${TABLESPACES_ENTITY_ID}_${hash}`),
  };
};

export default compose(
  connect(mapStateToProps),
  withHandlers({
    handleClick: ({ hash, onClick }): func => (): void =>
      onClick && onClick(hash),
  }),
)(DashboardTablespace);
