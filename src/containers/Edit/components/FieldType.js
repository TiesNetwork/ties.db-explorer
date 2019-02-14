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
    label="edit_type_label"
    name="type"
    parse={(item: Object) => get(item, 'value')}
    placeholder="edit_type_placeholder"
  >
    {({ inputValue, onClick }) => (
      TYPES
        .filter((type: string) => type.toLowerCase().indexOf(inputValue) > -1)
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
