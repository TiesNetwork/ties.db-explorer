import { get } from 'lodash';
import React from 'react';

// Components
import { Item, Select } from 'components/Form';

// Entities
import {
  BINARY, BOOLEAN,
  BIG_INT, DECIMAL, DOUBLE,
  FLOAT, INTEGER, LONG,
  DURATION, TIME,
  STRING, UUID,
} from 'entities/fields';

const TYPES = [
  BOOLEAN, INTEGER, BIG_INT,
  LONG, FLOAT, DOUBLE,
  DECIMAL, STRING, BINARY,
  TIME, DURATION, UUID,
];

const FieldType = (props: Object) => (
  <Select
    format={(type: string) => type && ({ label: type, value: type })}
    label="Type"
    name="type"
    parser={(item: Object) => item && get(item, 'value')}
    placeholder="Set Type"
  >
    {({ inputValue, onClick }) => (
      TYPES
        .filter((type: string) => type.indexOf(inputValue) > -1)
        .map((type: string, index: number) => (
          <Item
            key={index}
            label={type}
            onClick={onClick}
            value={type}
          />
        ))
    )}
  </Select>
);

export default FieldType;
