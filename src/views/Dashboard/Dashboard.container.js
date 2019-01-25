import { get, isEmpty, values } from 'lodash';
import { connect } from 'react-redux';
import { matchPath } from 'react-router-dom';
import { compose, lifecycle, withHandlers, withProps, withState } from 'recompose';

// Entities
import { fetchEntities } from 'entities/actions';
import { FIELDS_ENTITY_ID, saveField } from 'entities/fields';
import { INDEXES_ENTITY_ID, saveIndex } from 'entities/indexes';
import { TRIGGERS_ENTITY_ID, saveTrigger } from 'entities/triggers';
import { TABLES_ENTITY_ID, saveTable } from 'entities/tables';
import { TABLESPACES_ENTITY_ID, saveTablespace } from 'entities/tablespaces';

// Types
import { TABLE_VIEW_ID } from './ducks/types';

// View
import Dashboard from './Dashboard';

const mapStateToProps = ({ entities }, { tablespaceHash }) => ({
  hasEntities: !isEmpty(get(entities, 'tablespaces')),
  tablespace: get(entities, `tablespaces.${tablespaceHash}`, values(get(entities, 'tablespaces', []))[0]),
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

  connect(mapStateToProps, {
    fetchEntities,
    saveIndex,
    saveField,
    saveTrigger,
    saveTable,
    saveTablespace,
  }),

  // Redirect rules
  withProps(({ currentTab, history, tablespace, tablespaceHash, tableHash }): void => {
    if (tablespace && !tablespaceHash) {
      history.push(`/${get(tablespace, 'hash')}`);
    } else if ((!currentTab || (currentTab === TABLE_VIEW_ID && !tableHash)) && tablespace && get(tablespace, 'tables', []).length > 0) {
      history.push(`/${tablespaceHash}/${TABLE_VIEW_ID}/${get(tablespace, 'tables.0')}`);
    }
  }),

  withState('isConnected', 'setConnected', false),
  withState('isOpened', 'setOpen', false),
  withState('socket', 'setSocket', false),

  withHandlers({
    handleChangeTab: ({ history, location, tableHash, tablespaceHash }): func => (id: string): void => {
      const lastTableHash = get(location, 'state.tableHash');
      history.push(`/${tablespaceHash}/${id}${lastTableHash ? `/${lastTableHash}` : ''}`, { tableHash });
    },
    handleTrigger: ({ isOpened, setOpen }): func => (): void =>
      setOpen(!isOpened),
  }),

  lifecycle({
    componentDidMount() {
      const {
        fetchEntities,
        hasEntities,
        saveField,
        saveIndex,
        saveTrigger,
        saveTable,
        saveTablespace,
        setConnected,
        setSocket,
      } = this.props;

      const socket = new WebSocket('ws://localhost:3001/schema');

      socket.onmessage = (event: Object): void => {
        const { entity, hash, payload } = JSON.parse(get(event, 'data'), {});

        if (entity && hash) {
          switch (entity) {
            case FIELDS_ENTITY_ID:
              saveField(hash, payload);
              break;
            case INDEXES_ENTITY_ID:
              saveIndex(hash, payload);
              break;
            case TRIGGERS_ENTITY_ID:
              saveTrigger(hash, payload);
              break;
            case TABLESPACES_ENTITY_ID:
              saveTablespace(hash, payload);
              break;
            case TABLES_ENTITY_ID:
              saveTable(hash, payload);
              break;
            default:
              break;
          }
        }
      };

      socket.onopen = (): void => {
        setConnected(true);
        setSocket(socket);

        !hasEntities && fetchEntities();
      };
    },
    componentWillUnmount() {
      const { isConnected, socket } = this.props;
      isConnected && socket && socket.close();
    },
  }),
)(Dashboard);
