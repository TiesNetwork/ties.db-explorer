module.exports = {
  description: '',
  title: 'Imported account',
  type: 'object',
  version: 0,
  properties: {
    hash: { type: 'string', primary: true },
    name: { type: 'string' },
    json: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        address: { type: 'string' },
        Crypto: {
          type: 'object',
          properties: {
            ciphertext: { type: 'string' },
            cipherparams: {
              type: 'object',
              properties: {
                iv: { type: 'string' },
              },
            },
            cipher: { type: 'string' },
            kdf: { type: 'string' },
            kdfparams: {
              type: 'object',
              properties: {
                dklen: { type: 'number' },
                salt: { type: 'string' },
                n: { type: 'number' },
                r: { type: 'number' },
                p: { type: 'number' },
              },
            },
            mac: { type: 'string' },
          },
        },
        version: { type: 'number' },
      },
    },
  },
  required: ['hash', 'json', 'name'],
};
