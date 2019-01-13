const { Field } = require('tiesdb-client');

const decodedValue = Field.decodeValue(
  'double',
  Field.encodeValue('double', 1.5),
);
console.log(decodedValue);
