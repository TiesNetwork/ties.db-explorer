import classNames from 'classnames';
import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, matchPath } from 'react-router-dom';
import { push } from 'react-router-redux';
import { compose, withHandlers, withProps, withState } from 'recompose';
import url from 'url';

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

        <div className={styles.SidebarWrapper}>
          <div className={styles.Tabs}>
            <Tabs onChange={handleChangeTab} value={currentTab}>
              <Tab icon="fal fa-table" title="Tables" value={TABLE_VIEW_ID} />
              <Tab icon="fal fa-database" title="Queries" value={QUERY_VIEW_ID} />
            </Tabs>
          </div>

          <div className={styles.SidebarContainer}>
            <div className={styles.SidebarList}>
              <Tables />
              <Queries />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.Main}>
        <Switch>
          <Route path={url.resolve(match.url, '/')} component={Main} />
        </Switch>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch: func) => ({
  push: (to: string) => dispatch(push(to)),
});

export default compose(
  connect(null, mapDispatchToProps),
  withProps(({ location }) => {
    const match = matchPath(get(location, 'pathname', ''), { path: '/:viewId' });
    const viewId = get(match, 'params.viewId');

    return {
      currentTab: viewId,
    };
  }),
  withState('isOpened', 'setOpen', false),
  withHandlers({
    handleChangeTab: ({ push }) => (id: string) => {
      push(`/${id}`);
    },
    handleTrigger: ({ isOpened, setOpen }) => () =>
      setOpen(!isOpened),
  }),
)(Dashboard);
