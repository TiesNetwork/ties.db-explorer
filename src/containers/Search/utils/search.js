import { get, values } from 'lodash';

const ENTITIY = {
  fields: {
    icon: 'fas fa-browser',
    title: 'Fields',
  },
  indexes: {
    icon: 'fas fa-key',
    title: 'Indexes',
  },
  triggers: {
    icon: 'fas fa-hashtag',
    title: 'Triggers',
  },
  tables: {
    icon: 'fas fa-table',
    title: 'Tables',
  },
  tablespaces: {
    icon: 'fas fa-user-astronaut',
    title: 'Tablespaces',
  },
};

export default (
  state: Object,
  search: string = '',
  {
    limit = 3,
    whitelist = [],
  },
) => {
  const result = [];

  if (state && search) {
    whitelist.forEach((entity: string) => {
      const items = values(get(state, entity, {}))
        .filter(({ name }) => name.toLowerCase().indexOf(search.toLowerCase()) > -1)
        .slice(0, limit)
        .map(({ hash, name }) => ({
          description: hash.substr(0, 16),
          icon: get(ENTITIY, `${entity}.icon`, ''),
          title: name,
          to: '/0xfe1268890612408eff8ef387953e5cf8d44aa2733e19e5b00173e1c6d3b33260/table/0x67628b0a6c9eb165f0a4200ed8f01e5a49565111141bb9c60565187fae17e021',
        }));

      if (items && items.length > 0) {
        result.push({
          items,
          title: get(ENTITIY, `${entity}.title`, ''),
        });
      }
    });
  }

  return result;
};
