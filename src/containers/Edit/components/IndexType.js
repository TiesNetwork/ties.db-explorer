import { get } from 'lodash';
import React from 'react';

// Components
import { Item, Select } from 'components/Form';

// Entities
import {
  PRIMARY_TYPE_ID,
  INTERNAL_TYPE_ID,
  EXTERNAL_TYPE_ID,

  PRIMARY_TYPE_TITLE,
  INTERNAL_TYPE_TITLE,
  EXTERNAL_TYPE_TITLE,
} from 'entities/indexes/constants';

const TYPES = [
  { label: PRIMARY_TYPE_TITLE, value: PRIMARY_TYPE_ID },
  { label: INTERNAL_TYPE_TITLE, value: INTERNAL_TYPE_ID },
  { label: EXTERNAL_TYPE_TITLE, value: EXTERNAL_TYPE_ID },
];

const IndexType = (props: Object) => (
  <Select
    format={(type: string) => type &&
      TYPES
        .filter(({ value: typeValue }) => typeValue === type)[0]}
    label="edit_type_label"
    name="type"
    parse={(item: Object) => get(item, 'value')}
    placeholder="edit_type_placeholder"
  >
    {({ inputValue, onClick }) => (
      TYPES
        .filter(({ label }): bool => label.toLowerCase().indexOf(inputValue) > -1)
        .map(({ label, value }): func => (
          <Item
            key={value}
            label={label}
            onClick={onClick}
            value={value}
          />
        ))
    )}
  </Select>
);

export default IndexType;
