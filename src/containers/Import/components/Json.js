import { get } from 'lodash';
import React from 'react';
import { compose, withHandlers } from 'recompose';

// Components
import Button from 'components/Button';
import { Field } from 'components/Form';

// Styles
import { COLOR } from 'styles';
import styles from './Json.scss';

const ImportJson = ({
  // Props
  id,
  label,
  name,
  value,

  // Handlers
  handleChange,

  // State
  isErred,
}) => (
  <div className={styles.Root}>
    <Button
      classNames={{
        root: styles.Button,
        content: styles.ButtonContent,
      }}
      color={isErred ? COLOR.DANGER : COLOR.SUCCESS}
    >
      {!!value && '0x'}
      {get(value, 'address', label)}

      <input
        className={styles.Input}
        id={id}
        name={name}
        onChange={handleChange}
        type="file"
      />
    </Button>
  </div>
);

const ComposedImportJson = compose(
  withHandlers({
    handleChange: ({ onChange }) => (event: Object) => {
      const file = get(event, 'target.files.0');

      if (file) {
        const reader = new FileReader();

        reader.onload = () => {
          try {
            const json = JSON.parse(get(reader, 'result'));
            onChange && onChange(json);
          } catch(e) { console.error(e) } // eslint-disable-line
        };

        reader.readAsText(file);
      }
    },
  }),
)(ImportJson);

export default (props: Object) => (
  <Field {...props} type="file" withoutLabel>
    <ComposedImportJson />
  </Field>
);
