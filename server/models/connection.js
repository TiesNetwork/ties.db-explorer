class Connection {

}

module.exports.default = new Connection();
module.exports.schema = {
  description: '',
  title: 'Connection',
  type: 'object',
  version: 0,
  properties: {
    id: { type: 'string', primary: true },
    address: { type: 'string' },
    tablespaces: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
    title: { type: 'string '},
    url: { type: 'string' },
  },
  require: ['title', 'url'],
};
