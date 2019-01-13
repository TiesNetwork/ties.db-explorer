import classNames from 'classnames';
import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, matchPath } from 'react-router-dom';
import { compose, withHandlers, withProps, withState } from 'recompose';

// Components
import Tabs, { Tab } from 'components/Tabs';

// Containers
import Queries from './containers/Queries';
import Tables from './containers/Tables';
import Tablespaces from './containers/Tablespaces';

// Types
import {
  QUERY_VIEW_ID,
  TABLE_VIEW_ID,
} from './ducks/types';

// Views
import Main from 'views/Main';

// Styles
import styles from './Dashboard.scss';

const Dashboard = ({
  currentTab,
  handleChangeTab,
  handleTrigger,
  isOpened,
  match,
  setCurrentTab,
}) => {
  const className = classNames(styles.Root, {
    [styles.RootIsOpened]: !!isOpened,
    [styles.RootViewTables]: currentTab === TABLE_VIEW_ID,
    [styles.RootViewQueries]: currentTab === QUERY_VIEW_ID,
  });

  return (
    <div className={className}>
      <div className={styles.Sidebar}>
        <div className={styles.Tablespaces}>
          <Tablespaces
            isOpened={isOpened}
            onTrigger={handleTrigger}
          />
        </div>

        <div className={styles.Content}>
          <div className={styles.Tabs}>
            <Tabs onChange={handleChangeTab} value={currentTab}>
              <Tab icon="fal fa-table" title="Tables" value={TABLE_VIEW_ID} />
              <Tab icon="fal fa-database" title="Queries" value={QUERY_VIEW_ID} />
            </Tabs>
          </div>

          <div className={styles.Slider}>
            <div className={styles.Track}>
              <Tables />
              <Queries />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.Main}>
        <Switch>
          <Route path={match.path} component={Main} />
        </Switch>
      </div>
    </div>
  );
}

const mapStateToProps = ({ entities }, { tablespaceHash }) => ({
  tablespace: get(entities, `tablespaces.${tablespaceHash}`),
});

export default compose(
  // Parse props
  withProps(({ history, location, tablespace }) => {
    const match = matchPath(get(location, 'pathname', ''), {
      path: '/:tablespaceHash/:viewId?/:tableHash?',
    });

    const tablespaceHash = get(match, 'params.tablespaceHash');
    const tableHash = get(match, 'params.tableHash');
    const viewId = get(match, 'params.viewId');

    return {
      currentTab: viewId,
      tableHash,
      tablespaceHash,
    };
  }),

  connect(mapStateToProps),

  // Redirect rules
  withProps(({ currentTab, history, tablespace, tablespaceHash, tableHash }): void => {
    if ((!currentTab || (currentTab === TABLE_VIEW_ID && !tableHash)) && tablespace && get(tablespace, 'tables', []).length > 0) {
      history.push(`/${tablespaceHash}/${TABLE_VIEW_ID}/${get(tablespace, 'tables.0')}`);
    }
  }),

  withState('isOpened', 'setOpen', false),

  withHandlers({
    handleChangeTab: ({ history, location, tableHash, tablespaceHash }): func => (id: string): void => {
      const lastTableHash = get(location, 'state.tableHash');
      history.push(`/${tablespaceHash}/${id}${lastTableHash ? `/${lastTableHash}` : ''}`, { tableHash });
    },
    handleTrigger: ({ isOpened, setOpen }): func => (): void =>
      setOpen(!isOpened),
  }),
)(Dashboard);
