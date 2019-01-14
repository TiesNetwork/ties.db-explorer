import { get, isEmpty, values } from 'lodash';

// Entities
import { FIELDS_ENTITY_ID } from 'entities/fields';
import { INDEXES_ENTITY_ID } from 'entities/indexes';
import { TABLES_ENTITY_ID } from 'entities/tables';
import { TABLESPACES_ENTITY_ID } from 'entities/tablespaces';
import { TRIGGERS_ENTITY_ID } from 'entities/triggers';


const ACTIONS = ['create', 'edit', 'delete'];
const ENTITIES = [
  FIELDS_ENTITY_ID,
  INDEXES_ENTITY_ID,
  TABLES_ENTITY_ID,
  TABLESPACES_ENTITY_ID,
  TRIGGERS_ENTITY_ID,
];

let currentResult: Object = {};
let currentSearch: string = '';

export default (state: Object, search: string = '', match: Object): Object => {
  if (search === currentSearch) {
    return currentResult;
  }

  // eslint-disable-next-line
  const matches = search.toLowerCase().match(new RegExp(`^(${ACTIONS.join(' |')} )?(${ENTITIES.join('? |')}|indexe?s? )?([a-zA-Z0-9\-_\.]+)?$`));
  const results = {};

  const action = get(matches, '1', '').trim();
  const entity = get(matches, '2', '').trim();
  const query = get(matches, '3', '');

  if (action === 'create' || entity || (!entity && query.length >= 3)) {
    (entity ?
      [`${entity}${entity[entity.length -1] === 's'
        ? ''
        : `${entity}es` === INDEXES_ENTITY_ID
          ? 'es'
          : 's'}`]
      : ENTITIES
    ).forEach((id: string): void => {
        const entities = get(state, `entities.${id}`, []);

        const result = action === 'create'
          ? results[`${id}`] = [{
              action,
              entity: id,
              name: query,
              tableHash: get(match, 'params.tableHash'),
              tablespaceHash: get(match, 'params.tablespaceHash'),
            }]
          : values(entities)
              .filter(({ name }) => name.toLowerCase().indexOf(query) > -1)
              .slice(0, entity ? 5 : 3)
              .map(({ hash, name, tableHash, tablespaceHash }) => ({
                action, hash, name, tableHash, tablespaceHash,
                entity: id,
              }));

        if (!isEmpty(result)) {
          results[`${id}`] = result;
        }
      });
  }

  currentSearch = search;
  currentResult = { query, results };

  return currentResult;
};
