import classNames from 'classnames';
import React from 'react';
import { Route, Switch } from 'react-router-dom';

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
          <Route path={`${match.path}:tablespaceHash`} component={Main} />
        </Switch>
      </div>
    </div>
  );
}

export default Dashboard;
